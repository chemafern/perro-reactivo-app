const STORAGE_KEY='dog-reactive-app-v3';
const EXERCISES=['Target','Nombre/mirada','Vamos (giro)','Reacción ante estímulo'];
const OPTIONS=[
  {label:'Bien hecho', className:'blue'},
  {label:'Hecho', className:'green'},
  {label:'Con dificultad', className:'yellow'},
  {label:'Imposible', className:'red'}
];

function buildPlan(){
  const days=[];
  for(let day=1;day<=56;day++){
    const week=Math.ceil(day/7);
    let goal='',main='',failure='';
    let materials='Premios de alto valor, arnés cómodo y correa normal de 2–3 m.';
    const warmup='5 repeticiones de nombre → mirada + 5 targets fáciles. Premia cada acierto.';
    const easy='3 targets + 2 giros “vamos” muy fáciles. Si está cansado, reduce a 2 repeticiones.';
    const close='Termina con 3 premios fáciles sin pedir nada más.';
    if(week===1){
      goal='Enseñar y fijar el target de mano.';
      if(day<=3){main='Haz 10–15 targets. Pon la mano a 5–10 cm de su nariz. Cuando la toque: di “sí” y da premio.';}
      else if(day<=5){main='Haz 10–12 targets añadiendo la palabra “toca”. Primero di “toca”, luego presenta la mano.';}
      else{main='Haz 8–10 targets con un paso de movimiento. Camina 1–2 pasos, para, presenta la mano y premia.';}
      failure='Si duda, acerca más la mano. Si falla 2 veces seguidas, vuelve a una versión más fácil.';
    }else if(week===2){
      goal='Mejorar atención y giro contigo.';
      if(day<=10){main='Di su nombre 10 veces. Cuando te mire: “sí” y premio.';}
      else if(day<=12){main='Haz 8–10 giros “vamos”. Di “vamos”, gira 180º y premia cuando te siga 2–3 pasos.';}
      else{main='Combina 3 secuencias: nombre → premio, target → premio, “vamos” → premio. Haz 3–4 rondas.';}
      failure='Si no te sigue en el giro, usa más premio y gira más despacio.';
    }else if(week===3){
      goal='Ver un estímulo a distancia sin reaccionar.';
      if(day<=17){main='Coloca una persona conocida a 30–50 m. Cuando la vea y siga funcional: “sí” y premio. Haz 5–8 repeticiones.';}
      else if(day<=19){main='Persona a 30–40 m. Ve estímulo → target → premio. Haz 5–6 repeticiones.';}
      else{main='Persona camina 3–5 pasos a 30–50 m. Mientras el perro la ve sin tensión: premio.';}
      failure='Si deja de comer, fija mucho la vista o se pone rígido: demasiado cerca. Aléjate 10–15 m.';
      materials='Premios de alto valor. Una persona figurante tranquila. Mejor en finca o sitio amplio.';
    }else if(week===4){
      goal='Crear asociación positiva con el estímulo.';
      if(day<=24){main='Aparece la persona a distancia. Mientras la mira calmado: da 3–5 premios seguidos.';}
      else if(day<=26){main='Persona aparece parada a distancia. Ve estímulo → target → premio. Haz 5 repeticiones.';}
      else{main='Persona aparece y tú haces “vamos” para alejarte 3–4 pasos. Premia el giro contigo.';}
      failure='Si hay tensión, aumenta distancia y haz una versión más simple: solo ver → premio.';
    }else if(week===5){
      goal='Generalizar en exterior fácil.';
      if(day<=31){main='En lugar tranquilo exterior, cuando vea una persona o perro muy lejos: premio. Haz 4–6 repeticiones.';}
      else if(day<=33){main='Ve estímulo lejano → “toca” → premio. Haz 4–6 repeticiones.';}
      else{main='Ve estímulo lejano → “vamos” → premio. Haz 4–6 repeticiones con movimiento suave.';}
      failure='Si el exterior es demasiado difícil, vuelve a finca o a un entorno más simple.';
    }else if(week===6){
      goal='Trabajar en movimiento sin perder control.';
      if(day<=38){main='Caminando despacio, si aparece estímulo lejos: premio mientras avanzas o haces un pequeño arco.';}
      else if(day<=40){main='Caminando, ve estímulo → target en movimiento → premio. Haz 4–5 repeticiones.';}
      else{main='Caminando, ve estímulo → “vamos” → giro suave → premio. Haz 4–5 repeticiones.';}
      failure='Si se acelera por caminar, párate y vuelve a formato estático.';
    }else if(week===7){
      goal='Reducir distancia de forma muy gradual.';
      if(day<=45){main='Reduce la distancia solo un poco. 5–10 m menos como máximo. Ve estímulo → premio. Haz 4 repeticiones.';}
      else if(day<=47){main='Ve estímulo algo más cerca → target → premio. Haz 4 repeticiones.';}
      else{main='Ve estímulo algo más cerca → “vamos” → premio. Haz 4 repeticiones.';}
      failure='Si aparece cualquier rojo o dos amarillos, mañana no avances.';
    }else{
      goal='Aplicar en vida real con muy poca exposición.';
      if(day<=52){main='Paseo real corto. Máximo 1–2 encuentros controlados. En cuanto vea estímulo y siga funcional: premio.';}
      else if(day<=54){main='Paseo real corto. Si ve estímulo → target o “vamos” → premio.';}
      else{main='Paseo real corto con gestión. No busques entrenar mucho: evita errores y premia 1–2 aciertos.';}
      failure='Si el paseo fue demasiado difícil, el siguiente día vuelve a un entorno fácil.';
    }
    days.push({day,week,goal,warmup,main,easy,close,failure,materials});
  }
  return days;
}
const PLAN=buildPlan();

function loadState(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {currentDay:1,evaluations:{}};
  }catch(e){
    return {currentDay:1,evaluations:{}};
  }
}
let state=loadState();

function saveState(){localStorage.setItem(STORAGE_KEY, JSON.stringify(state));}
function formatTime(total){
  const m=String(Math.floor(total/60)).padStart(2,'0');
  const s=String(total%60).padStart(2,'0');
  return m+':'+s;
}

let timerSeconds=600;
let timerId=null;
let planOpen=false;

const dayLabel=document.getElementById('dayLabel');
const timerEl=document.getElementById('timer');
const goalEl=document.getElementById('goal');
const warmupEl=document.getElementById('warmup');
const mainEl=document.getElementById('main');
const easyEl=document.getElementById('easy');
const closeEl=document.getElementById('close');
const failureEl=document.getElementById('failure');
const materialsEl=document.getElementById('materials');
const evalGrid=document.getElementById('evalGrid');
const recommendationEl=document.getElementById('recommendation');
const planContent=document.getElementById('planContent');
const togglePlanBtn=document.getElementById('togglePlanBtn');
const toggleArrow=document.getElementById('toggleArrow');

function updatePlanVisibility(){
  planContent.style.display=planOpen ? 'block' : 'none';
  toggleArrow.textContent=planOpen ? '▲' : '▼';
}

togglePlanBtn.addEventListener('click', function(){
  planOpen=!planOpen;
  updatePlanVisibility();
});

document.getElementById('startBtn').addEventListener('click', function(){
  if(timerId){return;}
  timerId=setInterval(function(){
    if(timerSeconds>0){
      timerSeconds=timerSeconds-1;
      timerEl.textContent=formatTime(timerSeconds);
    }
  }, 1000);
});

document.getElementById('pauseBtn').addEventListener('click', function(){
  clearInterval(timerId);
  timerId=null;
});

document.getElementById('resetBtn').addEventListener('click', function(){
  clearInterval(timerId);
  timerId=null;
  timerSeconds=600;
  timerEl.textContent=formatTime(timerSeconds);
});

function currentEvalKey(day){return 'day-'+day;}
function getCurrentEvaluations(){return state.evaluations[currentEvalKey(state.currentDay)] || {};}

function setEvaluation(exercise,label){
  const key=currentEvalKey(state.currentDay);
  if(!state.evaluations[key]){state.evaluations[key]={};}
  state.evaluations[key][exercise]=label;
  saveState();
  renderEval();
  renderRecommendation();
}

function computeRecommendation(values){
  const redCount=values.filter(function(v){return v==='Imposible';}).length;
  const yellowCount=values.filter(function(v){return v==='Con dificultad';}).length;
  const blueCount=values.filter(function(v){return v==='Bien hecho';}).length;
  if(redCount>=1){return 'Mañana baja dificultad: aumenta distancia, reduce repeticiones y repite este día.';}
  if(yellowCount>=2){return 'Mañana mantén el nivel actual: no avances todavía.';}
  if(blueCount===EXERCISES.length){return 'Mañana puedes subir ligeramente la dificultad.';}
  return 'Mañana repite el mismo nivel para consolidar.';
}

function renderRecommendation(){
  const evaluations=getCurrentEvaluations();
  const values=EXERCISES.map(function(ex){return evaluations[ex];}).filter(Boolean);
  if(values.length<EXERCISES.length){
    recommendationEl.textContent='Completa la evaluación para ver la recomendación.';
  }else{
    recommendationEl.textContent=computeRecommendation(values);
  }
}

function renderEval(){
  const evaluations=getCurrentEvaluations();
  evalGrid.innerHTML='';
  EXERCISES.forEach(function(exercise){
    const row=document.createElement('div');
    row.className='eval-row';
    const title=document.createElement('div');
    title.className='eval-title';
    title.textContent=exercise;
    row.appendChild(title);
    const optionRow=document.createElement('div');
    optionRow.className='option-row';
    OPTIONS.forEach(function(opt){
      const btn=document.createElement('button');
      btn.className='color-btn '+opt.className;
      btn.type='button';
      btn.setAttribute('aria-label', opt.label);
      btn.title=opt.label;
      if(evaluations[exercise]===opt.label){btn.classList.add('selected');}
      btn.addEventListener('click', function(){setEvaluation(exercise,opt.label);});
      optionRow.appendChild(btn);
    });
    row.appendChild(optionRow);
    evalGrid.appendChild(row);
  });
}

function render(){
  const day=PLAN[state.currentDay-1];
  dayLabel.textContent='Día '+day.day+' · Semana '+day.week;
  goalEl.textContent=day.goal;
  warmupEl.textContent=day.warmup;
  mainEl.textContent=day.main;
  easyEl.textContent=day.easy;
  closeEl.textContent=day.close;
  failureEl.textContent=day.failure;
  materialsEl.textContent=day.materials;
  timerEl.textContent=formatTime(timerSeconds);
  updatePlanVisibility();
  renderEval();
  renderRecommendation();
}

render();
