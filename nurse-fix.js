/* =========================================================
   MPL5 — ENFERMERA A14

   - Se elimina el botón visible "VOLVER AL MAPA".
   - El icono de las manos, ubicado donde normalmente está el puño,
     funciona como rechazo de la ayuda.
   - Al pulsarlo se cierra la tarjeta y Yumi permanece en la habitación
     anterior; A14 queda disponible para volver a intentarlo después.
   ========================================================= */

const openEncounterNurseBase = openEncounter;
openEncounter = function(room, overrideDefinition = null){
  openEncounterNurseBase(room, overrideDefinition);

  if(room !== "A14") return;

  /* No mostrar el cuadro/botón tradicional de volver. */
  encounterBackButton.style.display = "none";

  /* Usamos la zona táctil del puño sobre el icono de las manos. */
  fistButton.setAttribute("aria-label", "Rechazar ayuda y volver al mapa");
  fistButton.style.setProperty("display", "block", "important");
  fistButton.style.setProperty("pointer-events", "auto", "important");
  fistButton.style.setProperty("left", "65%", "important");
  fistButton.style.setProperty("top", "54%", "important");
  fistButton.style.setProperty("width", "31%", "important");
  fistButton.style.setProperty("height", "22%", "important");
  fistButton.style.setProperty("z-index", "180", "important");
};

/* Captura el clic antes del manejador normal del puño. */
fistButton.addEventListener("click", function(event){
  if(state.pendingRoom !== "A14" || state.encounterMode !== "special") return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  /* Permanecer en la habitación desde la que se intentó entrar a A14. */
  closeUnresolved({stayPrevious:true});
}, true);
