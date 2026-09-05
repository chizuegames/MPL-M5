/* Reglas adicionales de MPL5.
   1) A3 y A11: el desenlace y la recompensa SOLO se activan con el icono
      especial de la esquina superior izquierda. Si se derrota al marciano
      con puño o pistola, la sala se completa sin A3F/A11F y sin recompensa.
   2) Robot: 24 de vida global y retirada del encuentro tras recibir 4 de daño.
*/

/* La vida global se inicializa en 24 antes del primer encuentro. */
if(!state.robotAwakened && !state.robotDefeated && state.robotHp===20){
  state.robotHp=24;
}

/* Sustituimos únicamente la resolución del combate contra enemigos normales. */
attackEnemy=function(kind){
  if(state.encounterMode!=="combat"||combatLocked||!state.combat||state.combat.kind!=="enemy"||state.ended)return;

  combatLocked=true;
  const combat=state.combat;
  const def=combat.definition;
  combat.lastHit=kind;

  const damage=kind==="fist"?fistDamage():1;

  if(kind==="fist"){
    punchSound();
    showMessage(`${state.skualoActive?"PUÑO POTENCIADO · ":""}−1 VIDA<br>${formatNumber(damage)} DE DAÑO`);
  }else{
    gunSound();
    showMessage("−1 ENERGÍA<br>1 DE DAÑO");
  }

  combat.hp=Math.max(0,Math.round((combat.hp-damage)*10)/10);
  enemyHp.textContent=formatNumber(combat.hp);
  animateHit();

  setTimeout(()=>{
    if(combat.hp>0){
      combatLocked=false;
      return;
    }

    /* A3 y A11: puño/pistola nunca entregan la granada ni muestran A3F/A11F. */
    if(combat.room==="A3" || combat.room==="A11"){
      deathSound();
      setTimeout(()=>completeCurrentRoom(null),360);
      return;
    }

    const earnsFinal=!!def.finalCard&&(!def.requiredLastHit||combat.lastHit===def.requiredLastHit);
    if(earnsFinal){
      state.encounterMode="enemyFinal";
      encounterCard.classList.remove("combat","special-top");
      enemyHp.style.display="none";
      setEncounterImage(def.finalCard,`${def.label} - FINAL`);
      encounterCard.style.cursor="pointer";
      combatLocked=false;
      return;
    }

    deathSound();
    setTimeout(()=>completeCurrentRoom(def.reward||null),360);
  },300);
};

/* Robot: conserva la vida compartida, pero cada tarjeta concluye con 4 de daño. */
attackRobot=function(kind,forcedDamage=null){
  if(state.encounterMode!=="robot"||combatLocked||!state.combat||state.combat.kind!=="robot"||state.robotDefeated||state.ended)return;

  combatLocked=true;
  const combat=state.combat;
  const damage=forcedDamage!==null?forcedDamage:(kind==="fist"?(state.skualoActive?3:.5):1);

  if(kind==="grenade"){
    robotHitSound();
    showMessage("GRANADA DE ENERGÍA<br>5 DE DAÑO AL ROBOT");
  }else if(kind==="fist"){
    punchSound();
    showMessage(`${state.skualoActive?"PUÑO POTENCIADO · ":""}−1 VIDA<br>${formatNumber(damage)} DE DAÑO AL ROBOT`);
  }else{
    gunSound();
    showMessage("−1 ENERGÍA<br>1 DE DAÑO AL ROBOT");
  }

  state.robotHp=Math.max(0,Math.round((state.robotHp-damage)*10)/10);
  combat.damageThisEncounter=Math.round((combat.damageThisEncounter+damage)*10)/10;
  enemyHp.textContent=formatNumber(state.robotHp);
  animateHit();

  setTimeout(()=>{
    if(state.robotHp<=0){
      showRobotDefeat();
      return;
    }

    if(combat.damageThisEncounter>=4){
      showRobotSkirmishFinal();
      return;
    }

    combatLocked=false;
  },310);
};
