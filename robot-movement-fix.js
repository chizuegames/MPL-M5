/* =========================================================
   MPL5 — RITMO DE APARICIÓN DEL ROBOT SEGÚN OXÍGENO

   REGLAS:
   - El primer encuentro con el robot no puede ocurrir antes del movimiento 4.
     Desde el movimiento 4 queda obligatorio en la primera sala B elegible.
     Si el movimiento cae en una sala A, el evento A tiene prioridad y el
     encuentro forzado se posterga hasta la siguiente sala B.

   - Después de CADA encuentro con el robot el contador se reinicia.
     Nunca puede aparecer otro robot de inmediato.

   - O2 > 70%:
       4 movimientos completos libres de robot.
       Después de esos 4 movimientos ya se permiten encuentros naturales
       con el robot (A5/A8/B6/B8). No hay encuentro forzado por contador.

   - O2 > 40% y <= 70%:
       4 movimientos completos libres.
       Desde el 5.º movimiento ya puede aparecer un robot si la sala tiene
       un encuentro natural de robot.
       En el 6.º movimiento el robot es OBLIGATORIO si el destino es B.
       Si el 6.º movimiento entra a una A, se posterga hasta la siguiente B.

   - O2 <= 40%:
       3 movimientos completos libres.
       En el 4.º movimiento el robot es OBLIGATORIO si el destino es B.
       Si ese movimiento entra a una A, se posterga hasta la siguiente B.

   - Las salas A nunca son sustituidas por un encuentro aleatorio/forzado.
   - Si una sala cuyo evento propio es ROBOT se visita durante el periodo
     protegido, el robot no aparece todavía y la sala queda sin completar,
     de modo que puede activarse al volver más adelante.
   - Una vez destruido el robot, todo este sistema queda desactivado.
   ========================================================= */

state.movementCount = state.movementCount || 0;
state.hasRobotEncountered = state.hasRobotEncountered || false;
state.movesSinceRobot = Number.isFinite(state.movesSinceRobot) ? state.movesSinceRobot : 0;
state.robotEncounterPending = state.robotEncounterPending || false;

/* Ya no colocamos físicamente al robot al azar en una B concreta.
   El perseguidor aparece por reglas de movimiento/oxígeno. */
chooseRoamingRobotRoom = function(){
  state.robotRoamingRoom = null;
  refreshRoomMarkers();
  return null;
};

function robotTimingForOxygen(){
  if(state.oxygen > 70){
    return {minFree:4, forcedAt:Infinity, label:">70"};
  }
  if(state.oxygen > 40){
    return {minFree:4, forcedAt:6, label:"40-70"};
  }
  return {minFree:3, forcedAt:4, label:"0-40"};
}

function roomIsA(room){
  return /^A\d+$/.test(room);
}

function robotNaturalEncounterAllowed(){
  if(state.robotDefeated) return false;

  /* Antes del primer robot, se protege hasta el movimiento 4. */
  if(!state.hasRobotEncountered){
    return state.movementCount >= 4;
  }

  const timing = robotTimingForOxygen();
  return state.movesSinceRobot > timing.minFree;
}

function robotForcedEncounterIsDue(){
  if(state.robotDefeated) return false;

  /* Primer robot: obligatorio desde el movimiento 4. */
  if(!state.hasRobotEncountered){
    return state.movementCount >= 4;
  }

  if(state.robotEncounterPending) return true;

  const timing = robotTimingForOxygen();
  return Number.isFinite(timing.forcedAt) && state.movesSinceRobot >= timing.forcedAt;
}

/* Registrar cualquier encuentro real con el robot, tanto fijo como forzado. */
const startRobotEncounterMovementBase = startRobotEncounter;
startRobotEncounter = function(room,def){
  state.hasRobotEncountered = true;
  state.movesSinceRobot = 0;
  state.robotEncounterPending = false;
  state.robotRoamingRoom = null;
  refreshRoomMarkers();
  return startRobotEncounterMovementBase(room,def);
};

/* Después de hacerle los 4 puntos de daño del encuentro, desaparece.
   NO queda listo para aparecer inmediatamente: debe respetar el nuevo
   intervalo según el oxígeno que tenga Yumi en los movimientos siguientes. */
finishRobotSkirmish = function(){
  const room = state.pendingRoom;
  if(room){
    state.rooms[room].completed = true;
    state.rooms[room].revealed = true;
  }

  closeEncounter();
  if(room) moveToRoom(room);

  state.robotRoamingRoom = null;
  state.robotEncounterPending = false;
  refreshRoomMarkers();

  setTimeout(()=>showMessage(`EL ROBOT ESCAPÓ<br>VIDA RESTANTE: ${formatNumber(state.robotHp)}`),130);
};

/* Al destruirlo se cancela definitivamente toda aparición futura. */
const finishRobotDefeatMovementBase = finishRobotDefeat;
finishRobotDefeat = function(){
  state.robotEncounterPending = false;
  state.robotRoamingRoom = null;
  finishRobotDefeatMovementBase();
};

function postponeProtectedRobotRoom(room){
  state.rooms[room].visited = true;
  state.rooms[room].revealed = true;
  /* NO se marca completed: el evento de robot sigue disponible para volver. */
  moveToRoom(room);
  showMessage("SIN CONTACTO ROBÓTICO<br>CONTINÚA AVANZANDO");
}

/* =========================================================
   NUEVA RESOLUCIÓN DE MOVIMIENTO
   ========================================================= */
handleRoomClick = function(room){
  if(state.gameLocked || state.ended || encounter.classList.contains("show")) return;

  if(room === state.currentRoom){
    showMessage("ESTÁS EN ESTA SALA");
    return;
  }

  if(!isAdjacent(room)){
    showMessage("SOLO PUEDES IR A UNA SALA ALEDAÑA");
    return;
  }

  /* Escanear o revelar NO cuenta como movimiento. */
  if(state.scannerActive && !state.rooms[room].revealed){
    revealRoom(room);
    return;
  }

  const def = definitionFor(room);
  const wasVisited = !!state.rooms[room].visited;
  const isA = roomIsA(room);

  const cost = getMovementOxygenCost(room);
  if(cost > 0 && !consumeOxygen(cost)) return;

  turnOffScanner();

  /* A partir de aquí sí hubo desplazamiento real. */
  state.movementCount += 1;
  if(state.hasRobotEncountered && !state.robotDefeated){
    state.movesSinceRobot += 1;
  }

  /* Robot destruido: sus antiguas habitaciones quedan vacías. */
  if(state.robotDefeated && def.type === "robot"){
    state.rooms[room].visited = true;
    state.rooms[room].revealed = true;
    state.rooms[room].completed = true;
    moveToRoom(room);
    showMessage("SALA VACÍA");
    return;
  }

  /* Si el contador ya exige robot pero se entra a una A, la A SIEMPRE
     conserva su evento. El robot queda pendiente para la siguiente B. */
  if(!state.robotDefeated && robotForcedEncounterIsDue() && isA){
    state.robotEncounterPending = true;

    /* Si la propia A es un robot, también debe respetar el periodo mínimo.
       Si ya es elegible, ese evento fijo satisface la aparición pendiente. */
    if(def.type === "robot"){
      if(robotNaturalEncounterAllowed()){
        state.robotEncounterPending = false;
        state.rooms[room].visited = true;
        openEncounter(room);
      }else{
        postponeProtectedRobotRoom(room);
      }
      return;
    }

    /* Cualquier otro evento A se resuelve normalmente. */
    if(def.type === "gatedEnding" && !state.robotDefeated){
      openEncounter(room);
      return;
    }

    if(state.rooms[room].completed){
      moveToRoom(room);
      return;
    }

    state.rooms[room].visited = true;
    openEncounter(room);
    return;
  }

  /* Encuentro FORZADO: en una B sustituye el evento de esa sala, sea nueva
     o visitada. Esto permite que el robot alcance al jugador sin obligarlo
     a gastar oxígeno buscando una habitación concreta. */
  if(!state.robotDefeated && robotForcedEncounterIsDue() && !isA){
    state.robotEncounterPending = false;
    state.robotRoamingRoom = null;
    state.rooms[room].visited = true;
    moveToRoom(room);
    setTimeout(()=>openRoamingRobot(room),120);
    return;
  }

  /* Evento propio de robot ANTES de cumplir los movimientos libres:
     se posterga para impedir encuentros demasiado seguidos. */
  if(!state.robotDefeated && def.type === "robot" && !robotNaturalEncounterAllowed()){
    postponeProtectedRobotRoom(room);
    return;
  }

  /* Evento natural de robot ya permitido por el intervalo. */
  if(!state.robotDefeated && def.type === "robot"){
    state.robotEncounterPending = false;
    state.rooms[room].visited = true;
    openEncounter(room);
    return;
  }

  /* Puertas finales conservan su comportamiento original. */
  if(def.type === "gatedEnding" && !state.robotDefeated){
    openEncounter(room);
    return;
  }

  /* Sala ya resuelta: movimiento normal. */
  if(state.rooms[room].completed){
    moveToRoom(room);
    return;
  }

  /* Sala nueva/no completada: resolver su evento normal. */
  state.rooms[room].visited = true;
  openEncounter(room);
};
