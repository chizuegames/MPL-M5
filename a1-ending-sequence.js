/* =========================================================
   MPL5 — SECUENCIA FINAL DE A1

   Secuencia:
   A1E -> A1F -> A1F1 -> A1F2 -> FF -> MISIÓN CUMPLIDA

   final-scene-fix.js ya controla FF -> MISIÓN CUMPLIDA.
   Este archivo se carga después y añade A1F1/A1F2 sin alterar otros finales.
   ========================================================= */

const missionCompleteAfterA1Sequence = missionComplete;
let a1EndingStage = 0;
let ignoreCurrentA1Click = false;

/* Precalentamos las dos imágenes para que el cambio sea inmediato. */
["A1F1.png","A1F2.png"].forEach(src=>{
  const img = new Image();
  img.src = src;
});

missionComplete = function(){
  if(state.ended) return;

  /* Solo interceptamos el final correcto de A1. */
  if(state.pendingRoom === "A1" && a1EndingStage === 0){
    a1EndingStage = 1;
    ignoreCurrentA1Click = true;
    state.encounterMode = "a1Final1";
    encounterCard.style.cursor = "pointer";
    setEncounterImage("A1F1.png","SALA DE BOTÍN - CONTINUACIÓN 1");
    return;
  }

  missionCompleteAfterA1Sequence();
};

encounterCard.addEventListener("click",()=>{
  if(ignoreCurrentA1Click){
    ignoreCurrentA1Click = false;
    return;
  }

  if(state.pendingRoom !== "A1") return;

  if(state.encounterMode === "a1Final1"){
    a1EndingStage = 2;
    state.encounterMode = "a1Final2";
    setEncounterImage("A1F2.png","SALA DE BOTÍN - CONTINUACIÓN 2");
    encounterCard.style.cursor = "pointer";
    return;
  }

  if(state.encounterMode === "a1Final2"){
    a1EndingStage = 3;
    missionCompleteAfterA1Sequence();
  }
});
