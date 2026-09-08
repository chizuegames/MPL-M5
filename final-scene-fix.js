/* Escena narrativa final antes de mostrar MISIÓN CUMPLIDA. */
let finalMissionScenePending=false;

const finalStoryOverlay=document.getElementById("finalStoryOverlay");

/* Sobrescribe únicamente la resolución visual de misión cumplida.
   La primera llamada muestra FF.png y espera clic/tap del jugador. */
missionComplete=function(){
  if(state.ended||finalMissionScenePending)return;

  state.gameLocked=true;
  finalMissionScenePending=true;

  turnOffScanner();
  encounter.classList.remove("show");

  if(finalStoryOverlay){
    finalStoryOverlay.classList.add("show");
    return;
  }

  /* Fallback por si el overlay no cargara. */
  finalMissionScenePending=false;
  state.ended=true;
  missionSound();
  endOverlay.className="show mission";
  endTitle.textContent="MISIÓN CUMPLIDA";
  endSubtitle.textContent="El objetivo ha sido completado.";
};

function finishMissionAfterFinalScene(){
  if(!finalMissionScenePending)return;

  finalMissionScenePending=false;
  if(finalStoryOverlay)finalStoryOverlay.classList.remove("show");

  state.ended=true;
  state.gameLocked=true;
  missionSound();

  endOverlay.className="show mission";
  endTitle.textContent="MISIÓN CUMPLIDA";
  endSubtitle.textContent="El objetivo ha sido completado.";
}

if(finalStoryOverlay){
  finalStoryOverlay.addEventListener("click",finishMissionAfterFinalScene);
  finalStoryOverlay.addEventListener("touchend",event=>{
    event.preventDefault();
    finishMissionAfterFinalScene();
  },{passive:false});
}
