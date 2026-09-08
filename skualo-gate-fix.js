/* =========================================================
   MPL5 — REGLA DE SKUALO PARA A1 Y B1

   - A1 y B1 permanecen bloqueadas hasta completar A13 y encontrar a Skualo.
   - Intentar entrar antes no consume oxígeno ni cuenta como movimiento.
   - El escáner sí puede revelar la sala; lo bloqueado es el acceso.
   - Al comenzar la exploración se informa que la señal de Skualo fue
     detectada en la parte inferior de la nave.
   ========================================================= */

state.skualoSignalMessageShown = state.skualoSignalMessageShown || false;

function showSkualoStartSignal(){
  if(state.skualoSignalMessageShown) return;
  state.skualoSignalMessageShown = true;
  setTimeout(()=>{
    showMessage("SE DETECTÓ LA SEÑAL DE SKUALO<br>EN LA PARTE INFERIOR DE LA NAVE");
  },180);
}

/* El tutorial se cierra desde el listener original de app.js. Como este
   listener fue registrado después, comprobamos justo después de ese cierre
   y mostramos entonces el aviso de misión. */
tutorialNext.addEventListener("click",()=>{
  if(!tutorialOverlay.classList.contains("show") && !state.gameLocked){
    showSkualoStartSignal();
  }
});

/* Regla de acceso: A1 y B1 solo se habilitan cuando Skualo ya está con Yumi. */
const handleRoomClickSkualoGateBase = handleRoomClick;
handleRoomClick = function(room){
  const lockedBySkualo = (room === "A1" || room === "B1") && !state.skualoActive;

  if(lockedBySkualo){
    /* Conservamos el comportamiento normal del escáner: puede detectar y
       revelar qué hay en la sala, aunque todavía no permita entrar. */
    if(
      !state.gameLocked &&
      !state.ended &&
      !encounter.classList.contains("show") &&
      room !== state.currentRoom &&
      isAdjacent(room) &&
      state.scannerActive &&
      !state.rooms[room].revealed
    ){
      handleRoomClickSkualoGateBase(room);
      return;
    }

    /* Solo interceptamos un intento real de entrar a una sala adyacente.
       No se descuenta oxígeno y tampoco se incrementa el contador de pasos. */
    if(
      !state.gameLocked &&
      !state.ended &&
      !encounter.classList.contains("show") &&
      room !== state.currentRoom &&
      isAdjacent(room)
    ){
      showMessage("PUERTA BLOQUEADA<br>DEBES ENCONTRAR A SKUALO");
      return;
    }
  }

  handleRoomClickSkualoGateBase(room);
};
