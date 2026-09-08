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

/* =========================================================
   AJUSTES VISUALES DEL FINAL
   ========================================================= */

/* Nuevo texto de la escena FF. */
const finalStoryTextSkualo = document.getElementById("finalStoryText");
if(finalStoryTextSkualo){
  finalStoryTextSkualo.textContent = "Skualo y Yumi apenas escaparon. El ala derecha estalló en pedazos y, de sus restos, emergió una criatura mecánica que empezó a devorar la nave lentamente.";
}

/* Fundido de FF al entrar y salir. Se impone sobre el display:none original. */
const finalFadeStyle = document.createElement("style");
finalFadeStyle.textContent = `
#finalStoryOverlay{
  display:flex !important;
  opacity:0;
  visibility:hidden;
  pointer-events:none;
  transition:opacity .45s ease, visibility .45s ease;
}
#finalStoryOverlay.show{
  opacity:1;
  visibility:visible;
  pointer-events:auto;
}
#finalStoryText{
  opacity:0;
  transform:translateX(-50%) translateY(10px);
  transition:opacity .45s ease, transform .45s ease;
}
#finalStoryOverlay.show #finalStoryText{
  opacity:1;
  transform:translateX(-50%) translateY(0);
}
#encounterImage{
  transition:opacity .32s ease;
}
`;
document.head.appendChild(finalFadeStyle);

/* Fundido entre A1F -> A1F1 -> A1F2. Como este archivo se carga antes de
   a1-ending-sequence.js, las llamadas de esa secuencia pasan por aquí. */
const setEncounterImageFadeBase = setEncounterImage;
setEncounterImage = function(src,fallbackLabel){
  const isA1EndingImage = src === "A1F.png" || src === "A1F1.png" || src === "A1F2.png";

  if(!isA1EndingImage){
    setEncounterImageFadeBase(src,fallbackLabel);
    return;
  }

  encounterCard.style.pointerEvents = "none";
  encounterImage.style.opacity = "0";

  setTimeout(()=>{
    setEncounterImageFadeBase(src,fallbackLabel);
    requestAnimationFrame(()=>{
      encounterImage.style.opacity = "1";
    });

    setTimeout(()=>{
      encounterCard.style.pointerEvents = "";
    },340);
  },180);
};

/* Al tocar FF esperamos a que termine el fundido antes de mostrar
   MISIÓN CUMPLIDA. Interceptamos los listeners originales en captura. */
function finishFinalStoryWithFade(event){
  if(!finalStoryOverlay || !finalStoryOverlay.classList.contains("show")) return;
  if(finalStoryOverlay.dataset.closing === "1"){
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  finalStoryOverlay.dataset.closing = "1";
  finalStoryOverlay.classList.remove("show");

  setTimeout(()=>{
    finalStoryOverlay.dataset.closing = "0";
    if(typeof finishMissionAfterFinalScene === "function"){
      finishMissionAfterFinalScene();
    }
  },450);
}

if(finalStoryOverlay){
  finalStoryOverlay.addEventListener("click",finishFinalStoryWithFade,true);
  finalStoryOverlay.addEventListener("touchend",finishFinalStoryWithFade,true);
}

/* =========================================================
   ROBOT DERROTADO: NO DEJAR ICONO EN LA ÚLTIMA UBICACIÓN
   ========================================================= */
const refreshRoomMarkersNoDefeatedRobotBase = refreshRoomMarkers;
refreshRoomMarkers = function(){
  refreshRoomMarkersNoDefeatedRobotBase();

  if(state.robotDefeated){
    const defeatedMarker = document.getElementById("robot-defeated-marker");
    if(defeatedMarker) defeatedMarker.remove();

    /* Respaldo por si el marcador cambia de id pero conserva la clase usada
       por el robot itinerante/derrotado. */
    iconsLayer.querySelectorAll(".robot-roam-image").forEach(marker=>marker.remove());
  }
};
