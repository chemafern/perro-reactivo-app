
let day = Number(localStorage.getItem('day')||1);
document.getElementById('day').innerText = "Día "+day;

const detailedPlan = [
"Semana1: 10 targets suaves",
"Semana2: nombre + mirada",
"Semana3: estímulos a distancia",
"Semana4: asociación positiva",
"Semana5: exterior fácil",
"Semana6: movimiento",
"Semana7: acercamiento",
"Semana8: vida real"
];

function getPlan(){
 let week = Math.ceil(day/7)-1;
 return detailedPlan[week];
}

document.getElementById('plan').innerText = getPlan();

let seconds=600, interval=null;
function update(){let m=String(Math.floor(seconds/60)).padStart(2,'0');
let s=String(seconds%60).padStart(2,'0');
document.getElementById('timer').innerText=m+":"+s;}
function start(){if(interval)return;
interval=setInterval(()=>{if(seconds>0){seconds--;update()}},1000)}
function pause(){clearInterval(interval);interval=null}
function reset(){seconds=600;update()}

function action(state){
 let text="";
 if(state==="calm") text="Premia";
 if(state==="tense") text="Target + alejar";
 if(state==="react") text="Salir sin corregir";
 document.getElementById('advice').innerText=text;
}

const opts=["Bien hecho","Hecho","Con dificultad","Imposible"];
const ex=["Target","Atencion","Vamos","Estimulos"];
const evalDiv=document.getElementById("eval");

ex.forEach(e=>{
 let div=document.createElement("div");
 div.innerHTML="<b>"+e+"</b><br>";
 opts.forEach(o=>{
  let b=document.createElement("button");
  b.innerText=o;
  b.onclick=()=>{
    localStorage.setItem(e,o);
    saveProgress();
  };
  div.appendChild(b);
 });
 evalDiv.appendChild(div);
});

function saveProgress(){
 let score=0;
 ex.forEach(e=>{
  let v=localStorage.getItem(e);
  if(v==="Bien hecho") score+=3;
  if(v==="Hecho") score+=2;
  if(v==="Con dificultad") score+=1;
 });
 let history=JSON.parse(localStorage.getItem("history")||"[]");
 history.push(score);
 localStorage.setItem("history",JSON.stringify(history));
 drawChart();
}

function drawChart(){
 let canvas=document.getElementById("chart");
 let ctx=canvas.getContext("2d");
 let data=JSON.parse(localStorage.getItem("history")||"[]");
 ctx.clearRect(0,0,300,150);
 data.forEach((v,i)=>{
  ctx.fillRect(i*10,150-v*10,8,v*10);
 });
}

update();
drawChart();
