const ASSETS={
  introIncoming:"M01a.png",
  introMission:"M01b.png",
  stationOnly:"MIa.png",
  dockedStation:"MIb.png",
  playerShip:"NVYumi.png",
  playerIcon:"ICOYUMI.png",
  map100:"MIc100.png",
  map60:"MIc60.png",
  map20:"MIc20.png",
  scannerIcon:"Esc1.png",
  checkIcon:"icocheck.png",
  robotIcon:"ICORT.png",
  skualoIcon:"ICOSKU.png",
  robotDefeatCard:"C1E.png"
};

/* Coordenadas del esquema de MPL5 sobre MIc100/60/20. */
const ROOM_LAYOUT={
  A3:{x:13.3,y:19.8},A1:{x:31.6,y:19.8},A2:{x:70.2,y:19.8},A4:{x:86.9,y:19.8},
  B1:{x:13.3,y:29.8},B2:{x:86.9,y:29.8},
  A5:{x:13.3,y:39.9},A6:{x:31.6,y:39.9},B8:{x:50.0,y:39.9},A7:{x:70.2,y:39.9},A8:{x:86.9,y:39.9},
  B5:{x:31.6,y:50.0},B6:{x:50.0,y:50.0},B7:{x:70.2,y:50.0},
  A9:{x:13.3,y:60.0},A10:{x:31.6,y:60.0},B9:{x:50.0,y:60.0},A11:{x:70.2,y:60.0},A12:{x:86.9,y:60.0},
  B3:{x:13.3,y:70.1},B4:{x:86.9,y:70.1},
  A13:{x:13.3,y:80.2},A14:{x:86.9,y:80.2}
};

/* Cada borde rojo del diagrama corresponde a una conexión. */
const GRAPH={
  ENTRADA:["B9"],
  A3:["A1","B1"],A1:["A3"],B1:["A3","A5"],A5:["B1","A6"],
  A6:["A5","B8","B5"],B8:["A6","A7","B6"],A7:["B8","A8","B7"],A8:["A7","B2"],
  B2:["A8","A4"],A4:["B2","A2"],A2:["A4"],
  B5:["A6","A10"],B6:["B8","B9"],B7:["A7","A11"],
  A9:["A10","B3"],A10:["A9","B9","B5"],B9:["A10","A11","B6"],A11:["B9","A12","B7"],A12:["A11","B4"],
  B3:["A9","A13"],A13:["B3"],B4:["A12","A14"],A14:["B4"]
};

const DEFINITIONS={
  A1:{type:"gatedEnding",label:"SALA DE BOTÍN",card:"A1E.png",finalCard:"A1F.png",icon:"ICOBT.png",outcome:"mission"},
  A2:{type:"gatedEnding",label:"SALA DE BOTÍN P",card:"A2E.png",finalCard:"A2F.png",icon:"ICOBT.png",outcome:"gameover"},
  A3:{type:"combat",label:"MARCIANO ROJO",card:"A3E.png",finalCard:"A3F.png",icon:"ICOMR.png",hp:{100:1,60:2,20:2},special:"top",specialReward:"GANASTE UNA GRANADA DE ENERGÍA"},
  A4:{type:"simple",label:"SALA VACÍA",card:"SLV.png",icon:null},
  A5:{type:"robot",label:"ROBOT",card:"A5E.png",finalCard:"A5F.png",icon:"ICORT.png"},
  A6:{type:"simple",label:"CAJA DE OBJETO",card:"CJO.png",icon:"ICOCO.png",reward:"TOMA UN OBJETO"},
  A7:{type:"combat",label:"MARCIANO VERDE E",card:"A7E.png",finalCard:"A7F.png",icon:"ICOMV.png",hp:{100:3,60:3,20:4},requiredLastHit:"fist"},
  A8:{type:"robot",label:"ROBOT",card:"A8E.png",finalCard:"A8F.png",icon:"ICORT.png"},
  A9:{type:"combat",label:"MARCIANO VERDE E",card:"A9E.png",finalCard:"A9F.png",icon:"ICOMV.png",hp:{100:2,60:3,20:3},special:"top",specialReward:"GANASTE UN OBJETO<br>PIERDE UN PURÉE"},
  A10:{type:"simple",label:"TRAMPA DE ENERGÍA",card:"TRE.png",icon:"ICOTR.png",reward:"PIERDE 1 DE ENERGÍA"},
  A11:{type:"combat",label:"MARCIANO ROJO",card:"A11E.png",finalCard:"A11F.png",icon:"ICOMR.png",hp:{100:1,60:2,20:2},special:"top",specialReward:"GANASTE UNA GRANADA DE ENERGÍA"},
  A12:{type:"simple",label:"VIDA",card:"SDV.png",icon:"ICOV.png",reward:"MÁS 1 DE VIDA"},
  A13:{type:"special",label:"SKUALO",card:"A13E.png",finalCard:"A13F.png",icon:"ICOSKU.png",special:"top",reward:"VIDA AL MÁXIMO"},
  A14:{type:"special",label:"ENFERMERA",card:"A14E.png",finalCard:"A14F.png",icon:"ICOEMF.png",special:"lower",reward:"RECUPERA 3 DE SALUD<br>PIERDE 2 DE ENERGÍA",allowBack:true},

  B1:{type:"simple",label:"CAJA DE OBJETO",card:"CJO.png",icon:"ICOCO.png",reward:"TOMA UN OBJETO"},
  B2:{type:"simple",label:"TRAMPA DE ENERGÍA",card:"TRE.png",icon:"ICOTR.png",reward:"PIERDE 1 DE ENERGÍA"},
  B3:{type:"simple",label:"TRAMPA DE VIDA",card:"TRV.png",icon:"ICOTR.png",reward:"PIERDE 1 DE VIDA"},
  B4:{type:"simple",label:"CAJA DE OBJETO",card:"CJO.png",icon:"ICOCO.png",reward:"TOMA UN OBJETO"},
  B5:{type:"simple",label:"TRAMPA DE ENERGÍA",card:"TRE.png",icon:"ICOTR.png",reward:"PIERDE 1 DE ENERGÍA"},
  B6:{type:"robot",label:"ROBOT",card:"B6E.png",finalCard:"B6F.png",icon:"ICORT.png"},
  B7:{type:"simple",label:"VIDA",card:"SDV.png",icon:"ICOV.png",reward:"MÁS 1 DE VIDA"},
  B8:{type:"robot",label:"ROBOT",card:"B8E.png",finalCard:"B8F.png",icon:"ICORT.png"},
  B9:{type:"simple",label:"CAJA DE OBJETO",card:"CJO.png",icon:"ICOCO.png",reward:"TOMA UN OBJETO"}
};

const ROBOT_VARIANTS=[DEFINITIONS.A5,DEFINITIONS.A8,DEFINITIONS.B6,DEFINITIONS.B8];
const ROBOT_START_HP=20;
const ROBOT_SKIRMISH_DAMAGE=5;

const state={
  currentRoom:"ENTRADA",
  previousRoom:null,
  oxygen:100,
  scannerActive:false,
  pendingRoom:null,
  pendingDefinition:null,
  encounterMode:null,
  combat:null,
  gameLocked:true,
  ended:false,
  rooms:{},
  robotHp:ROBOT_START_HP,
  robotDefeated:false,
  robotDefeatedRoom:null,
  robotRoamingRoom:null,
  robotAwakened:false,
  skualoActive:false
};
Object.keys(ROOM_LAYOUT).forEach(room=>state.rooms[room]={revealed:false,completed:false,visited:false});

const $=id=>document.getElementById(id);
const introOverlay=$("introOverlay"),introPage1=$("introPage1"),introPage2=$("introPage2"),dockPage=$("dockPage"),acceptMissionButton=$("acceptMissionButton"),dockBaseImage=$("dockBaseImage"),dockShip=$("dockShip"),dockFlash=$("dockFlash");
const game=$("game"),mapImage=$("mapImage"),roomsLayer=$("roomsLayer"),iconsLayer=$("iconsLayer"),scannerButton=$("scannerButton"),useObjectButton=$("useObjectButton"),musicButton=$("musicButton"),oxygenCounter=$("oxygenCounter");
const tutorialOverlay=$("tutorialOverlay"),tutorialText=$("tutorialText"),tutorialNext=$("tutorialNext");
const encounter=$("encounter"),encounterCard=$("encounterCard"),encounterImage=$("encounterImage"),encounterFallback=$("encounterFallback"),enemyHp=$("enemyHp"),gunButton=$("gunButton"),fistButton=$("fistButton"),specialTopButton=$("specialTopButton"),specialLowerButton=$("specialLowerButton"),grenadeButton=$("grenadeButton"),encounterBackButton=$("encounterBackButton");
const message=$("message"),endOverlay=$("endOverlay"),endTitle=$("endTitle"),endSubtitle=$("endSubtitle"),introMusic=$("introMusic"),bgMusic=$("bgMusic");

let messageTimer=null,musicPlaying=false,combatLocked=false,introLocked=false,audioCtx=null,tutorialIndex=0;
introMusic.volume=.34;bgMusic.volume=.32;

function randomIndex(max){
  if(max<=1)return 0;
  if(window.crypto&&window.crypto.getRandomValues){const d=new Uint32Array(1);window.crypto.getRandomValues(d);return d[0]%max}
  return Math.floor(Math.random()*max);
}
function choose(list){return list[randomIndex(list.length)]}
function definitionFor(room){return DEFINITIONS[room]||{type:"simple",label:"SALA VACÍA",card:"SLV.png",icon:null}}

function buildRooms(){
  Object.entries(ROOM_LAYOUT).forEach(([room,pos])=>{
    const button=document.createElement("button");
    button.type="button";button.className="room";button.id=`room-${room}`;button.setAttribute("aria-label",`Habitación ${room}`);
    button.style.left=`${pos.x}%`;button.style.top=`${pos.y}%`;
    button.addEventListener("click",()=>handleRoomClick(room));
    roomsLayer.appendChild(button);
  });
}
buildRooms();

const preload=[...Object.values(ASSETS)];
Object.values(DEFINITIONS).forEach(d=>[d.card,d.finalCard,d.icon].filter(Boolean).forEach(x=>preload.push(x)));
preload.filter(Boolean).forEach(src=>{const i=new Image();i.src=src});

function getAudioContext(){try{if(!audioCtx){const C=window.AudioContext||window.webkitAudioContext;audioCtx=new C()}if(audioCtx.state==="suspended")audioCtx.resume();return audioCtx}catch(e){return null}}
function toneSweep(a,b,d,v=.1,t="sine"){try{const c=getAudioContext();if(!c)return;const o=c.createOscillator(),g=c.createGain();o.type=t;o.frequency.setValueAtTime(a,c.currentTime);o.frequency.exponentialRampToValueAtTime(Math.max(20,b),c.currentTime+d);g.gain.setValueAtTime(v,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+d);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+d+.02)}catch(e){}}
function scannerSound(){toneSweep(380,1240,.48,.085,"sine")}
function punchSound(){toneSweep(165,48,.17,.32,"triangle")}
function gunSound(){toneSweep(1250,170,.15,.2,"sawtooth")}
function energyLossSound(){toneSweep(720,180,.33,.11,"sine")}
function itemSound(){toneSweep(520,900,.24,.08,"triangle")}
function robotHitSound(){toneSweep(780,150,.18,.18,"square")}
function deathSound(){[430,300,180,95].forEach((f,i)=>setTimeout(()=>toneSweep(f,Math.max(45,f*.55),.2,.11,i<2?"square":"sawtooth"),i*85))}
function gameOverSound(){toneSweep(240,45,1.1,.18,"sawtooth")}
function missionSound(){[520,690,880,1180].forEach((f,i)=>setTimeout(()=>toneSweep(f,f*1.02,.22,.08,"sine"),i*120))}
function dockingTravelSound(){toneSweep(58,98,2.25,.09,"sawtooth")}
function dockingImpactSound(){toneSweep(115,42,.25,.24,"square");setTimeout(()=>toneSweep(610,610,.11,.08,"sine"),170);setTimeout(()=>toneSweep(830,830,.11,.08,"sine"),270)}

function showIntroPage(page){[introPage1,introPage2,dockPage].forEach(x=>x.classList.remove("active"));page.classList.add("active")}
introPage1.addEventListener("click",async()=>{if(introLocked)return;getAudioContext();showIntroPage(introPage2);try{introMusic.currentTime=0;await introMusic.play()}catch(e){}});
function crossfadeToGameMusic(){bgMusic.volume=.03;bgMusic.play().then(()=>{musicPlaying=true;musicButton.classList.add("music-on")}).catch(()=>{});let current=0;const steps=18,start=introMusic.volume,t=setInterval(()=>{current++;const p=current/steps;introMusic.volume=Math.max(0,start*(1-p));bgMusic.volume=.03+(.32-.03)*p;if(current>=steps){clearInterval(t);introMusic.pause();introMusic.currentTime=0;introMusic.volume=.34;bgMusic.volume=.32}},65)}
acceptMissionButton.addEventListener("click",event=>{event.stopPropagation();if(introLocked)return;introLocked=true;getAudioContext();crossfadeToGameMusic();dockingTravelSound();startDockingSequence()});
function startDockingSequence(){showIntroPage(dockPage);dockBaseImage.src=ASSETS.stationOnly;dockShip.src=ASSETS.playerShip;dockShip.style.display="block";dockShip.classList.remove("docking");void dockShip.offsetWidth;setTimeout(()=>dockShip.classList.add("docking"),180);setTimeout(()=>{dockingImpactSound();dockFlash.classList.remove("flash");void dockFlash.offsetWidth;dockFlash.classList.add("flash");dockBaseImage.src=ASSETS.dockedStation;dockShip.style.display="none"},2450);setTimeout(startGame,3150)}
function startGame(){setMapImage(ASSETS.map100);state.oxygen=100;updateOxygenUI();introOverlay.style.display="none";game.style.display="block";window.scrollTo(0,0);refreshRoomMarkers();showTutorial()}

async function toggleMusic(){if(!musicPlaying){try{await bgMusic.play();musicPlaying=true;musicButton.classList.add("music-on")}catch(e){showMessage("NO SE PUDO ACTIVAR LA MÚSICA")}return}bgMusic.pause();musicPlaying=false;musicButton.classList.remove("music-on")}
musicButton.addEventListener("click",event=>{event.stopPropagation();toggleMusic()});

const TUTORIAL_MESSAGES=[
  "Durante esta misión puedes llevar 2 baterías de energía y 1 purée de vida.",
  "Si necesitas usar un objeto, da clic en USAR OBJETO."
];
function showTutorial(){state.gameLocked=true;tutorialIndex=0;tutorialText.textContent=TUTORIAL_MESSAGES[0];tutorialNext.textContent="SIGUIENTE";tutorialOverlay.classList.add("show")}
tutorialNext.addEventListener("click",()=>{tutorialIndex++;if(tutorialIndex>=TUTORIAL_MESSAGES.length){tutorialOverlay.classList.remove("show");state.gameLocked=false;return}tutorialText.textContent=TUTORIAL_MESSAGES[tutorialIndex];tutorialNext.textContent="ENTENDIDO"});

function showMessage(html){clearTimeout(messageTimer);message.classList.remove("show");void message.offsetWidth;message.innerHTML=html;message.classList.add("show");messageTimer=setTimeout(()=>message.classList.remove("show"),1650)}
function formatNumber(v){return Number.isInteger(v)?String(v):v.toFixed(1).replace(".",",")}
function formatOxygen(v){return `${formatNumber(v)}%`}
function oxygenPhase(){if(state.oxygen<20)return 20;if(state.oxygen<60)return 60;return 100}
function setMapImage(src){mapImage.onerror=()=>{mapImage.onerror=null;if(mapImage.src.indexOf(ASSETS.map100)===-1)mapImage.src=ASSETS.map100};mapImage.src=src}
function updateOxygenUI(){const phase=oxygenPhase();oxygenCounter.textContent=formatOxygen(state.oxygen);oxygenCounter.classList.remove("phase60","phase20");setMapImage(phase===100?ASSETS.map100:phase===60?ASSETS.map60:ASSETS.map20);if(phase===60)oxygenCounter.classList.add("phase60");if(phase===20)oxygenCounter.classList.add("phase20")}
function consumeOxygen(amount){if(state.ended)return false;state.oxygen=Math.max(0,Math.round((state.oxygen-amount)*10)/10);updateOxygenUI();if(state.oxygen<=0){triggerGameOver("Te has quedado sin oxígeno.");return false}return true}
function getMovementOxygenCost(target){if(state.currentRoom==="ENTRADA")return 0;if(state.rooms[target]?.visited)return 2.5;return 5}
useObjectButton.addEventListener("click",()=>{if(state.gameLocked||state.ended||encounter.classList.contains("show"))return;itemSound();if(consumeOxygen(5))showMessage("OBJETO UTILIZADO<br>−5% O₂")});

function removeMarker(id){const el=$(id);if(el)el.remove()}
function imageMarker(id,room,src,className="map-icon event-icon"){
  removeMarker(id);const pos=ROOM_LAYOUT[room];if(!pos||!src)return null;
  const image=document.createElement("img");image.id=id;image.className=className;image.src=src;image.draggable=false;image.style.left=`${pos.x}%`;image.style.top=`${pos.y}%`;iconsLayer.appendChild(image);return image;
}
function clearMarkers(){
  removeMarker("player-marker");removeMarker("skualo-marker");removeMarker("robot-roaming-marker");removeMarker("robot-defeated-marker");
  Object.keys(ROOM_LAYOUT).forEach(room=>{removeMarker(`check-${room}`);removeMarker(`event-${room}`);removeMarker(`scan-${room}`)});
}
function markerDirection(from,to){if(from==="ENTRADA")return"up";const a=ROOM_LAYOUT[from],b=ROOM_LAYOUT[to];if(!a||!b)return"up";const dx=b.x-a.x,dy=b.y-a.y;return Math.abs(dx)>Math.abs(dy)?(dx>0?"right":"left"):(dy>0?"down":"up")}
function refreshRoomMarkers(){
  clearMarkers();
  Object.keys(ROOM_LAYOUT).forEach(room=>{
    const roomState=state.rooms[room],def=definitionFor(room);
    if(room===state.currentRoom)return;
    if(state.robotDefeated&&room===state.robotDefeatedRoom)return;
    if(!state.robotDefeated&&room===state.robotRoamingRoom)return;
    if(roomState.completed){imageMarker(`check-${room}`,room,ASSETS.checkIcon,"map-icon check-image");return}
    if(state.robotDefeated&&def.type==="robot")return;
    if(roomState.revealed&&def.icon)imageMarker(`event-${room}`,room,def.icon,"map-icon event-icon");
  });
  if(state.robotDefeated&&state.robotDefeatedRoom)imageMarker("robot-defeated-marker",state.robotDefeatedRoom,ASSETS.robotIcon,"map-icon robot-roam-image");
  else if(state.robotRoamingRoom)imageMarker("robot-roaming-marker",state.robotRoamingRoom,ASSETS.robotIcon,"map-icon robot-roam-image");
  if(state.skualoActive&&state.previousRoom&&state.previousRoom!=="ENTRADA")imageMarker("skualo-marker",state.previousRoom,ASSETS.skualoIcon,"map-icon companion-image");
  if(state.currentRoom!=="ENTRADA")imageMarker("player-marker",state.currentRoom,ASSETS.playerIcon,"map-icon player-image");
}
function moveToRoom(room){const old=state.currentRoom;state.previousRoom=old;state.currentRoom=room;state.rooms[room].visited=true;refreshRoomMarkers()}
function adjacentRooms(){return GRAPH[state.currentRoom]||[]}
function isAdjacent(room){return adjacentRooms().includes(room)}

function turnOffScanner(){state.scannerActive=false;scannerButton.classList.remove("scanner-on");Object.keys(ROOM_LAYOUT).forEach(room=>removeMarker(`scan-${room}`))}
function scanNearbyRooms(){
  if(state.gameLocked||state.ended||encounter.classList.contains("show"))return;
  if(state.scannerActive){turnOffScanner();return}
  let count=0;
  adjacentRooms().forEach(room=>{
    const roomState=state.rooms[room];
    if(!roomState.completed&&!roomState.revealed){
      const pos=ROOM_LAYOUT[room],image=document.createElement("img");image.id=`scan-${room}`;image.src=ASSETS.scannerIcon;image.className=`map-icon scan-image dir-${markerDirection(state.currentRoom,room)}`;image.style.left=`${pos.x}%`;image.style.top=`${pos.y}%`;iconsLayer.appendChild(image);count++;
    }
  });
  if(!count){showMessage("SIN NUEVAS SEÑALES");return}
  state.scannerActive=true;scannerButton.classList.add("scanner-on");scannerSound();
}
scannerButton.addEventListener("click",scanNearbyRooms);
function revealRoom(room){const roomState=state.rooms[room],def=definitionFor(room);roomState.revealed=true;removeMarker(`scan-${room}`);if(def.icon)imageMarker(`event-${room}`,room,def.icon,"map-icon event-icon");energyLossSound();showMessage(`${def.label}<br>−2 ENERGÍAS`)}

function resetEncounterUI(){
  encounterCard.className="";encounterCard.style.cursor="default";
  enemyHp.style.display="none";gunButton.style.display="none";fistButton.style.display="none";specialTopButton.style.display="none";specialLowerButton.style.display="none";grenadeButton.style.display="none";encounterBackButton.style.display="none";
  encounterFallback.style.display="none";encounterFallback.textContent="";encounterImage.style.display="block";
  combatLocked=false;state.combat=null;
}
function setEncounterImage(src,label="ENCUENTRO"){
  encounterFallback.style.display="none";encounterImage.style.display="block";encounterImage.alt=label;
  encounterImage.onerror=()=>{encounterImage.onerror=null;encounterImage.style.display="none";encounterFallback.style.display="flex";encounterFallback.innerHTML=`${label}<br><small>Falta el archivo ${src}</small>`};
  encounterImage.src=src||"";
}
function showEncounterShell(room,def){turnOffScanner();state.pendingRoom=room;state.pendingDefinition=def;state.rooms[room].revealed=true;resetEncounterUI();setEncounterImage(def.card,def.label);encounter.classList.add("show")}
function enemyHpFor(def){return def.hp?def.hp[oxygenPhase()]:0}

function openEncounter(room,overrideDefinition=null){
  const def=overrideDefinition||definitionFor(room);
  showEncounterShell(room,def);

  if(def.type==="gatedEnding"){
    if(!state.robotDefeated){state.encounterMode="gatedLocked";encounterBackButton.style.display="block";encounterCard.style.cursor="pointer";return}
    state.encounterMode="gatedOpen";encounterCard.style.cursor="pointer";return;
  }

  if(def.type==="robot"){startRobotEncounter(room,def);return}

  if(def.type==="combat"){
    state.encounterMode="combat";encounterCard.classList.add("combat");
    if(def.special==="top")encounterCard.classList.add("special-top");
    const hp=enemyHpFor(def);state.combat={kind:"enemy",room,definition:def,hp,lastHit:null};enemyHp.textContent=formatNumber(hp);return;
  }

  if(def.type==="special"){
    state.encounterMode="special";encounterCard.classList.add(def.special==="lower"?"special-lower":"special-top");if(def.allowBack)encounterBackButton.style.display="block";return;
  }

  state.encounterMode="simple";encounterCard.style.cursor="pointer";
}

function closeEncounter(){encounter.classList.remove("show");state.pendingRoom=null;state.pendingDefinition=null;state.encounterMode=null;resetEncounterUI()}
function completeCurrentRoom(reward=null,{move=true}={}){
  const room=state.pendingRoom;if(!room)return;
  state.rooms[room].completed=true;state.rooms[room].revealed=true;
  closeEncounter();
  if(move)moveToRoom(room);else refreshRoomMarkers();
  if(reward)setTimeout(()=>showMessage(reward),120);
  if(!state.robotDefeated&&state.robotAwakened&&!state.robotRoamingRoom&&room.startsWith("B"))chooseRoamingRobotRoom();
  if(room==="A4"&&state.robotDefeated)setTimeout(()=>showMessage("TENGO UN MAL PRESENTIMIENTO...<br>DEBERÍA USAR EL ESCÁNER"),320);
}
function closeUnresolved({stayPrevious=false}={}){const room=state.pendingRoom;if(room)state.rooms[room].revealed=true;closeEncounter();if(!stayPrevious&&room)moveToRoom(room);else refreshRoomMarkers()}
function animateHit(){encounterCard.classList.remove("hit");void encounterCard.offsetWidth;encounterCard.classList.add("hit")}

function fistDamage(){return state.skualoActive?3:1}
function attackEnemy(kind){
  if(state.encounterMode!=="combat"||combatLocked||!state.combat||state.combat.kind!=="enemy"||state.ended)return;
  combatLocked=true;const combat=state.combat,def=combat.definition;combat.lastHit=kind;
  const damage=kind==="fist"?fistDamage():1;
  if(kind==="fist"){punchSound();showMessage(`${state.skualoActive?"PUÑO POTENCIADO · ":""}−1 VIDA<br>${formatNumber(damage)} DE DAÑO`)}else{gunSound();showMessage("−1 ENERGÍA<br>1 DE DAÑO")}
  combat.hp=Math.max(0,Math.round((combat.hp-damage)*10)/10);enemyHp.textContent=formatNumber(combat.hp);animateHit();
  setTimeout(()=>{
    if(combat.hp>0){combatLocked=false;return}
    const earnsFinal=!!def.finalCard&&(!def.requiredLastHit||combat.lastHit===def.requiredLastHit);
    if(earnsFinal){state.encounterMode="enemyFinal";encounterCard.classList.remove("combat","special-top");enemyHp.style.display="none";setEncounterImage(def.finalCard,`${def.label} - FINAL`);encounterCard.style.cursor="pointer";combatLocked=false;return}
    deathSound();setTimeout(()=>completeCurrentRoom(def.reward||null),360);
  },300);
}

gunButton.addEventListener("click",event=>{event.stopPropagation();if(state.encounterMode==="robot")attackRobot("gun");else attackEnemy("gun")});
fistButton.addEventListener("click",event=>{event.stopPropagation();if(state.encounterMode==="robot")attackRobot("fist");else attackEnemy("fist")});

function startRobotEncounter(room,def){
  state.robotAwakened=true;state.robotRoamingRoom=null;state.encounterMode="robot";encounterCard.classList.add("combat","robot");
  state.combat={kind:"robot",room,definition:def,damageThisEncounter:0};enemyHp.textContent=formatNumber(state.robotHp);refreshRoomMarkers();
}
function attackRobot(kind,forcedDamage=null){
  if(state.encounterMode!=="robot"||combatLocked||!state.combat||state.combat.kind!=="robot"||state.robotDefeated||state.ended)return;
  combatLocked=true;const combat=state.combat;
  const damage=forcedDamage!==null?forcedDamage:(kind==="fist"?(state.skualoActive?3:.5):1);
  if(kind==="grenade"){robotHitSound();showMessage("GRANADA DE ENERGÍA<br>5 DE DAÑO AL ROBOT")}
  else if(kind==="fist"){punchSound();showMessage(`${state.skualoActive?"PUÑO POTENCIADO · ":""}−1 VIDA<br>${formatNumber(damage)} DE DAÑO AL ROBOT`)}
  else{gunSound();showMessage("−1 ENERGÍA<br>1 DE DAÑO AL ROBOT")}

  state.robotHp=Math.max(0,Math.round((state.robotHp-damage)*10)/10);
  combat.damageThisEncounter=Math.round((combat.damageThisEncounter+damage)*10)/10;
  enemyHp.textContent=formatNumber(state.robotHp);animateHit();

  setTimeout(()=>{
    if(state.robotHp<=0){showRobotDefeat();return}
    if(combat.damageThisEncounter>=ROBOT_SKIRMISH_DAMAGE){showRobotSkirmishFinal();return}
    combatLocked=false;
  },310);
}
grenadeButton.addEventListener("click",event=>{event.stopPropagation();attackRobot("grenade",5)});

function showRobotSkirmishFinal(){
  const def=state.combat.definition;state.encounterMode="robotFinal";encounterCard.classList.remove("combat","robot");enemyHp.style.display="none";gunButton.style.display="none";fistButton.style.display="none";grenadeButton.style.display="none";
  setEncounterImage(def.finalCard,`${def.label} - RETIRADA`);encounterCard.style.cursor="pointer";combatLocked=false;
}
function showRobotDefeat(){
  state.robotDefeated=true;state.robotHp=0;state.robotDefeatedRoom=state.pendingRoom;state.robotRoamingRoom=null;state.encounterMode="robotDefeat";encounterCard.classList.remove("combat","robot");enemyHp.style.display="none";gunButton.style.display="none";fistButton.style.display="none";grenadeButton.style.display="none";
  setEncounterImage(ASSETS.robotDefeatCard,"ROBOT DERROTADO");encounterCard.style.cursor="pointer";deathSound();combatLocked=false;
}
function chooseRoamingRobotRoom(){
  if(state.robotDefeated||!state.robotAwakened)return null;
  const candidates=Object.keys(state.rooms).filter(room=>room.startsWith("B")&&state.rooms[room].visited&&state.rooms[room].completed);
  if(!candidates.length){state.robotRoamingRoom=null;return null}
  const alternatives=candidates.filter(room=>room!==state.currentRoom);
  state.robotRoamingRoom=choose(alternatives.length?alternatives:candidates);refreshRoomMarkers();return state.robotRoamingRoom;
}
function finishRobotSkirmish(){
  const room=state.pendingRoom;if(room){state.rooms[room].completed=true;state.rooms[room].revealed=true}
  closeEncounter();if(room)moveToRoom(room);chooseRoamingRobotRoom();setTimeout(()=>showMessage(`EL ROBOT ESCAPÓ<br>VIDA RESTANTE: ${formatNumber(state.robotHp)}`),130);
}
function finishRobotDefeat(){
  const room=state.pendingRoom;if(room){state.rooms[room].completed=true;state.rooms[room].revealed=true}
  closeEncounter();if(room)moveToRoom(room);refreshRoomMarkers();setTimeout(()=>showMessage("ROBOT DERROTADO<br>PUERTAS DESBLOQUEADAS"),130);
}
function openRoamingRobot(room){const variant={...choose(ROBOT_VARIANTS),type:"robot",label:"ROBOT"};openEncounter(room,variant)}

function activateSpecial(){
  const def=state.pendingDefinition;if(!def)return;
  if(state.encounterMode==="combat"&&def.special==="top"){
    state.encounterMode="specialFinal";state.combat=null;encounterCard.classList.remove("combat","special-top");enemyHp.style.display="none";setEncounterImage(def.finalCard,`${def.label} - FINAL`);encounterCard.style.cursor="pointer";itemSound();return;
  }
  if(state.encounterMode==="special"){
    state.encounterMode="specialFinal";encounterCard.classList.remove("special-top","special-lower");encounterBackButton.style.display="none";setEncounterImage(def.finalCard,`${def.label} - FINAL`);encounterCard.style.cursor="pointer";itemSound();
  }
}
specialTopButton.addEventListener("click",event=>{event.stopPropagation();activateSpecial()});
specialLowerButton.addEventListener("click",event=>{event.stopPropagation();activateSpecial()});
encounterBackButton.addEventListener("click",event=>{event.stopPropagation();if(state.encounterMode==="gatedLocked"){closeUnresolved({stayPrevious:true});return}if(state.encounterMode==="special"&&state.pendingDefinition?.allowBack){closeUnresolved();return}});

encounterCard.addEventListener("click",()=>{
  const def=state.pendingDefinition;
  if(!def)return;
  if(state.encounterMode==="simple"){completeCurrentRoom(def.reward||null);return}
  if(state.encounterMode==="enemyFinal"){completeCurrentRoom(def.reward||null);return}
  if(state.encounterMode==="specialFinal"){
    if(state.pendingRoom==="A13")state.skualoActive=true;
    completeCurrentRoom(def.specialReward||def.reward||null);
    return;
  }
  if(state.encounterMode==="robotFinal"){finishRobotSkirmish();return}
  if(state.encounterMode==="robotDefeat"){finishRobotDefeat();return}
  if(state.encounterMode==="gatedLocked"){closeUnresolved({stayPrevious:true});showMessage("PUERTA BLOQUEADA<br>DEBES DERROTAR AL ROBOT");return}
  if(state.encounterMode==="gatedOpen"){
    state.encounterMode="endingFinal";setEncounterImage(def.finalCard,`${def.label} - FINAL`);encounterCard.style.cursor="pointer";return;
  }
  if(state.encounterMode==="endingFinal"){
    if(def.outcome==="mission")missionComplete();else triggerGameOver("Has activado el final incorrecto de la misión.");
  }
});

function handleRoomClick(room){
  if(state.gameLocked||state.ended||encounter.classList.contains("show"))return;
  if(room===state.currentRoom){showMessage("ESTÁS EN ESTA SALA");return}
  if(!isAdjacent(room)){showMessage("SOLO PUEDES IR A UNA SALA ALEDAÑA");return}

  if(state.scannerActive&&!state.rooms[room].revealed){revealRoom(room);return}

  const cost=getMovementOxygenCost(room);if(cost>0&&!consumeOxygen(cost))return;
  turnOffScanner();

  const def=definitionFor(room);
  if(def.type==="gatedEnding"&&!state.robotDefeated){openEncounter(room);return}
  if(state.robotDefeated&&def.type==="robot"){state.rooms[room].visited=true;state.rooms[room].revealed=true;state.rooms[room].completed=true;moveToRoom(room);showMessage("SALA VACÍA");return}

  const wasVisited=state.rooms[room].visited;
  if(!state.robotDefeated&&state.robotRoamingRoom===room&&wasVisited){moveToRoom(room);setTimeout(()=>openRoamingRobot(room),120);return}

  if(state.rooms[room].completed){moveToRoom(room);return}

  state.rooms[room].visited=true;
  openEncounter(room);
}

function triggerGameOver(reason="Has muerto durante la misión."){if(state.ended)return;state.ended=true;state.gameLocked=true;turnOffScanner();encounter.classList.remove("show");gameOverSound();endOverlay.className="show gameover";endTitle.textContent="HAS MUERTO";endSubtitle.innerHTML=reason}
function missionComplete(){if(state.ended)return;state.ended=true;state.gameLocked=true;turnOffScanner();encounter.classList.remove("show");missionSound();endOverlay.className="show mission";endTitle.textContent="MISIÓN CUMPLIDA";endSubtitle.textContent="El objetivo ha sido completado."}

let lastTouchEnd=0;document.addEventListener("touchend",event=>{const now=Date.now();if(now-lastTouchEnd<=300)event.preventDefault();lastTouchEnd=now},{passive:false});
