const STORAGE_KEY='dog-reactive-app-v2';
const EXERCISES=['Target','Nombre/mirada','Vamos (giro)','Reacción ante estímulo'];
const OPTIONS=[{label:'Bien hecho',className:'blue'},{label:'Hecho',className:'green'},{label:'Con dificultad',className:'yellow'},{label:'Imposible',className:'red'}];

function buildPlan(){
  const days=[];
  for(let day=1;day<=56;day++){
    const week=Math.ceil(day/7);
    let goal='',main='',failure='';
    let materials='Premios de alto valor, arnés cómodo, correa normal de 2–3 m. Sin tirones. Sin castigos.';
    const warmup='5 repeticiones de nombre → mirada + 5 targets fáciles. Premia cada acierto con comida muy buena.';
    const easy='3 targets + 2 giros “vamos” muy fáciles. Si está cansado, haz solo 2 y termina.';
    const close='Termina con 3 premios fáciles sin pedir nada. Debe acabar relajado, no excitado.';
    if(week===1){
      goal='Enseñar y fijar el target de mano.';
      main=day<=3?'Haz 10–15 targets. Pon la mano a 5–10 cm de su nariz. Cuando la toque con la nariz: di “sí” y da premio. Espera 1–2 segundos entre repeticiones.'
      :day<=5?'Haz 10–12 targets añadiendo la palabra “toca”. Primero di “toca”, luego presenta la mano a 5–10 cm. Marca y premia cada toque.'
      :'Haz 8–10 targets con un paso de movimiento. Camina 1–2 pasos, para, presenta la mano y premia al tocar.';
      failure='Si duda, acerca más la mano. Si falla 2 veces seguidas, vuelve a una versión más fácil. No repitas rápido.';
    }else if(week===2){
      goal='Mejorar atención y giro contigo.';
      main=day<=10?'Di su nombre 10 veces. Cuando te mire: “sí” y premio. Si no mira en 2 segundos, haz un sonido suave y vuelve a intentarlo.'
      :day<=12?'Haz 8–10 giros “vamos”. Di “vamos”, gira 180º y premia cuando te siga 2–3 pasos.'
      :'Combina 3 secuencias: nombre → premio, target → premio, “vamos” → premio. Haz 3–4 rondas.';
      failure='Si no te sigue en el giro, usa más premio y gira más despacio. Si se dispersa, reduce el entorno.';
    }else if(week===3){
      goal='Ver un estímulo a distancia sin reaccionar.';
      main=day<=17?'Coloca una persona conocida a 30–50 m. Cuando el perro la vea y siga funcional: “sí” y premio. Haz 5–8 repeticiones. La persona no se acerca.'
      :day<=19?'Persona a 30–40 m. Ve estímulo → target → premio. Haz 5–6 repeticiones. Mantén la distancia grande.'
      :'Persona camina 3–5 pasos a 30–50 m. Mientras el perro la ve sin tensión: premio. Cuando desaparece: se acaban los premios.';
      failure='Si deja de comer, fija mucho la vista o se pone rígido: demasiado cerca. Aléjate 10–15 m y vuelve a empezar.';
      materials='Premios de alto valor. Una persona figurante tranquila. Mejor en finca o sitio amplio.';
    }else if(week===4){
      goal='Crear asociación positiva con el estímulo.';
      main=day<=24?'Aparece la persona a distancia. Mientras el perro la mira calmado: da 3–5 premios seguidos. Cuando la persona desaparece: se acaba la comida.'
      :day<=26?'Persona aparece parada a distancia. Ve estímulo → target → premio. Haz 5 repeticiones con mucha calma.'
      :'Persona aparece y tú haces “vamos” para alejarte 3–4 pasos. Premia el giro contigo. Repite 5 veces.';
      failure='Si hay tensión, no esperes. Aumenta distancia y haz una versión más simple: solo ver → premio.';
    }else if(week===5){
      goal='Generalizar en exterior fácil.';
      main=day<=31?'En un lugar tranquilo exterior, cuando vea una persona o perro muy lejos: premio. Haz 4–6 repeticiones. No busques cercanía.'
      :day<=33?'Ve estímulo lejano → “toca” → premio. Haz 4–6 repeticiones solo si sigue comiendo bien.'
      :'Ve estímulo lejano → “vamos” → premio. Haz 4–6 repeticiones con movimiento suave.';
      failure='Si el exterior es demasiado difícil, vuelve a finca o a un entorno más simple durante 2 días.';
    }else if(week===6){
      goal='Trabajar en movimiento sin perder control.';
      main=day<=38?'Caminando despacio, si aparece estímulo lejos: premio mientras avanzas o haces un pequeño arco. Haz 4–6 repeticiones.'
      :day<=40?'Caminando, ve estímulo → target en movimiento → premio. Haz 4–5 repeticiones.'
      :'Caminando, ve estímulo → “vamos” → giro suave → premio. Haz 4–5 repeticiones.';
      failure='Si se acelera por caminar, párate, baja la dificultad y vuelve al formato estático del día 35–36.';
    }else if(week===7){
      goal='Reducir dificultad de forma muy gradual.';
      main=day<=45?'Reduce la distancia solo un poco respecto a la semana 6. 5–10 m menos como máximo. Ve estímulo → premio. Haz 4 repeticiones.'
      :day<=47?'Ve estímulo algo más cerca → target → premio. Haz 4 repeticiones. Si duda, recupera distancia anterior.'
      :'Ve estímulo algo más cerca → “vamos” → premio. Haz 4 repeticiones. Debe seguir comiendo.';
      failure='Si aparece cualquier rojo o dos amarillos en evaluación, mañana no avances. Repite o retrocede.';
    }else{
      goal='Aplicar en vida real con muy poca exposición.';
      main=day<=52?'Paseo real corto. Máximo 1–2 encuentros controlados. En cuanto vea estímulo y siga funcional: premio.'
      :day<=54?'Paseo real corto. Si ve estímulo → target o “vamos” → premio. Evita calles estrechas.'
      :'Paseo real corto con gestión. No busques entrenar mucho: solo evitar errores y premiar 1–2 aciertos buenos.';
      failure='Si el paseo fue demasiado difícil, el siguiente día vuelve a un entorno fácil y solo haz base.';
    }
    days.push({day,week,goal,warmup,main,easy,close,failure,materials});
  }
  return days;
}
const PLAN=buildPlan();

function loadState(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||{currentDay:1,evaluations:{},history:[]};}
  catch{return{currentDay:1,evaluations:{},history:[]};}
}
let state=loadState();

function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function formatTime(total){const m=String(Math.floor(total/60)).padStart(2,'0');const s=String(total%60).padStart(2,'0');return `${m}:${s}`;}

let timerSeconds=600,timerId=null;
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
const historyEl=document.getElementById('history');

document.getElementById('startBtn').addEventListener('click',()=>{if(timerId)return;timerId=setInterval(()=>{if(timerSeconds>0){timerSeconds-=1;timerEl.textContent=formatTime(timerSeconds);}},1000);});
document.getElementById('pauseBtn').addEventListener('click',()=>{clearInterval(timerId);timerId=null;});
document.getElementById('resetBtn').addEventListener('click',()=>{clearInterval(timerId);timerId=null;timerSeconds=600;timerEl.textContent=formatTime(timerSeconds);});
document.getElementById('prevDayBtn').addEventListener('click',()=>{state.currentDay=Math.max(1,state.currentDay-1);saveState();render();});
document.getElementById('nextDayBtn').addEventListener('click',()=>{state.currentDay=Math.min(56,state.currentDay+1);saveState();render();});
document.getElementById('saveDayBtn').addEventListener('click',saveTodayAndAdjust);

function currentEvalKey(day){return `day-${day}`;}
function getCurrentEvaluations(){return state.evaluations[currentEvalKey(state.currentDay)]||{};}

function setEvaluation(exercise,label){
  const key=currentEvalKey(state.currentDay);
  state.evaluations[key]=state.evaluations[key]||{};
  state.evaluations[key][exercise]=label;
  saveState();
  renderRecommendation();
  renderEval();
}

function computeRecommendation(values){
  const redCount=values.filter(v=>v==='Imposible').length;
  const yellowCount=values.filter(v=>v==='Con dificultad').length;
  const blueCount=values.filter(v=>v==='Bien hecho').length;
  if(redCount>=1){return{text:'Mañana baja dificultad: aumenta distancia, reduce repeticiones y retrocede 1 día.',delta:-1};}
  if(yellowCount>=2){return{text:'Mañana mantén el nivel actual: repite este mismo día para consolidar.',delta:0};}
  if(blueCount===EXERCISES.length){return{text:'Mañana puedes subir ligeramente la dificultad: avanza al día siguiente.',delta:1};}
  return{text:'Mañana repite este nivel para consolidar antes de avanzar.',delta:0};
}

function renderRecommendation(){
  const evaluations=getCurrentEvaluations();
  const values=EXERCISES.map(ex=>evaluations[ex]).filter(Boolean);
  if(values.length<EXERCISES.length){recommendationEl.textContent='Completa la evaluación para ver la recomendación.';return null;}
  const rec=computeRecommendation(values);
  recommendationEl.textContent=rec.text;
  return rec;
}

function saveTodayAndAdjust(){
  const evaluations=getCurrentEvaluations();
  const values=EXERCISES.map(ex=>evaluations[ex]).filter(Boolean);
  if(values.length<EXERCISES.length){recommendationEl.textContent='Falta evaluar alguna categoría.';return;}
  const rec=computeRecommendation(values);
  state.history.unshift({day:state.currentDay,date:new Date().toLocaleDateString('es-ES'),evaluations:evaluations,recommendation:rec.text});
  state.history=state.history.slice(0,14);
  const next=state.currentDay+rec.delta;
  state.currentDay=Math.max(1,Math.min(56,next));
  saveState();
  render();
}

function renderEval(){
  const evaluations=getCurrentEvaluations();
  evalGrid.innerHTML='';
  EXERCISES.forEach(exercise=>{
    const row=document.createElement('div');
    row.className='eval-row';
    const title=document.createElement('div');
    title.className='eval-title';
    title.textContent=exercise;
    row.appendChild(title);
    const optionRow=document.createElement('div');
    optionRow.className='option-row';
    OPTIONS.forEach(opt=>{
      const btn=document.createElement('button');
      btn.className='option';
      btn.textContent=opt.label;
      if(evaluations[exercise]===opt.label){btn.classList.add('selected',opt.className);}
      btn.addEventListener('click',()=>setEvaluation(exercise,opt.label));
      optionRow.appendChild(btn);
    });
    row.appendChild(optionRow);
    evalGrid.appendChild(row);
  });
}

function renderHistory(){
  historyEl.innerHTML='';
  if(!state.history.length){historyEl.textContent='Aún no hay días guardados.';return;}
  state.history.forEach(item=>{
    const div=document.createElement('div');
    div.className='hist-item';
    div.innerHTML=`<strong>Día ${item.day}</strong> · ${item.date}<br>${item.recommendation}`;
    historyEl.appendChild(div);
  });
}

function render(){
  const day=PLAN[state.currentDay-1];
  dayLabel.textContent=`Día ${day.day} · Semana ${day.week}`;
  goalEl.textContent=day.goal;
  warmupEl.textContent=day.warmup;
  mainEl.textContent=day.main;
  easyEl.textContent=day.easy;
  closeEl.textContent=day.close;
  failureEl.textContent=day.failure;
  materialsEl.textContent=day.materials;
  timerEl.textContent=formatTime(timerSeconds);
  renderEval();
  renderRecommendation();
  renderHistory();
}
render();
