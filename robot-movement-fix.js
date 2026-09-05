/* =========================================================
   MPL5 — APARICIÓN DEL ROBOT SEGÚN MOVIMIENTOS

   Regla:
   - El robot queda programado a partir del movimiento 4.
   - Si el destino de ese movimiento YA fue visitado, el robot aparece allí.
   - Si el destino es una sala NUEVA, se resuelve primero el evento propio
     de esa sala y la aparición se posterga al movimiento siguiente.
   - Tras cada retirada del robot, vuelve a quedar pendiente para el
     siguiente movimiento elegible. Así puede ser perseguido sin consumir
     oxígeno buscando una sala aleatoria concreta.
   - Cada aparición usa al azar cualquiera de las 4 tarjetas de robot.
   ========================================================= */

state.movementCount = state.movementCount || 0;
state.robotEncounterPending = state.robotEncounterPending || false;

/* Eliminamos la antigua colocación aleatoria del robot en una B concreta.
   Con la nueva regla, su aparición depende del movimiento del jugador. */
chooseRoamingRobotRoom = function(){
  state.robotRoamingRoom = null;
  refreshRoomMarkers();
  return null;
};

/* Al terminar cada encuentro sin derrotarlo, queda pendiente para volver a
   aparecer en el próximo movimiento que llegue a una sala ya visitada. */
finishRobotSkirmish = function(){
  const room = state.pendingRoom;
  if(room){
    state.rooms[room].completed = true;
    state.rooms[room].revealed = true;
  }

  closeEncounter();
  if(room) moveToRoom(room);

  state.robotRoamingRoom = null;
  state.robotEncounterPending = !state.robotDefeated;
  refreshRoomMarkers();

  setTimeout(()=>showMessage(`EL ROBOT ESCAPÓ<br>VIDA RESTANTE: ${formatNumber(state.robotHp)}`),130);
};

/* Si el robot muere, cancelamos definitivamente cualquier aparición pendiente. */
const finishRobotDefeatMovementBase = finishRobotDefeat;
finishRobotDefeat = function(){
  state.robotEncounterPending = false;
  state.robotRoamingRoom = null;
  finishRobotDefeatMovementBase();
};

/* Nueva resolución de movimientos. */
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

  /* Escanear/revelar no cuenta como movimiento. */
  if(state.scannerActive && !state.rooms[room].revealed){
    revealRoom(room);
    return;
  }

  const wasVisited = !!state.rooms[room].visited;
  const def = definitionFor(room);

  const cost = getMovementOxygenCost(room);
  if(cost > 0 && !consumeOxygen(cost)) return;

  turnOffScanner();

  /* Desde aquí sí se realizó un movimiento. */
  state.movementCount += 1;

  /* En el cuarto movimiento el robot queda obligatoriamente pendiente.
     Si el 4.º destino es nuevo, la sala conserva su evento y la deuda pasa
     al 5.º movimiento; si el 5.º también es nuevo, pasa al 6.º, etc. */
  if(!state.robotDefeated && state.movementCount >= 4 && !state.robotAwakened){
    state.robotEncounterPending = true;
  }

  /* Si el robot ya fue destruido, sus antiguas salas quedan vacías. */
  if(state.robotDefeated && def.type === "robot"){
    state.rooms[room].visited = true;
    state.rooms[room].revealed = true;
    state.rooms[room].completed = true;
    moveToRoom(room);
    showMessage("SALA VACÍA");
    return;
  }

  /* Una puerta final bloqueada conserva su comportamiento original. */
  if(def.type === "gatedEnding" && !state.robotDefeated){
    openEncounter(room);
    return;
  }

  /* APARICIÓN FORZADA:
     solo sustituye el contenido cuando el destino ya había sido visitado.
     En una sala nueva siempre se muestra primero el evento propio. */
  if(!state.robotDefeated && state.robotEncounterPending && wasVisited){
    state.robotEncounterPending = false;
    state.robotRoamingRoom = null;
    moveToRoom(room);
    setTimeout(()=>openRoamingRobot(room),120);
    return;
  }

  /* Sala nueva: si justamente su evento propio es un robot, ese encuentro
     satisface la aparición pendiente. */
  if(!wasVisited && def.type === "robot"){
    state.robotEncounterPending = false;
  }

  /* Sala ya completada y sin aparición del robot: movimiento normal. */
  if(state.rooms[room].completed){
    moveToRoom(room);
    return;
  }

  /* Sala nueva: resolver su evento original. La aparición del robot, si ya
     estaba pendiente, seguirá pendiente para el movimiento siguiente. */
  state.rooms[room].visited = true;
  openEncounter(room);
};
