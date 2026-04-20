document.addEventListener("DOMContentLoaded", function(){
document.getElementById("copyright").innerHTML =
  "© " + new Date().getFullYear() + " Fabiola Zavala | Visualización científica interactiva";

console.log(document.getElementById("btnIndividuo"));
console.log(document.getElementById("btnTipo"));

const speciesData = {

"Ateles geoffroyi": {
common: "Mono araña",
image: "images/ateles.jpg",
description: "Primate arbóreo de larga cola prensil que habita selvas tropicales de Mesoamérica."
},

"Alouatta pigra": {
common: "Saraguato",
image: "images/alouatta.jpg",
description: "Mono aullador característico por sus vocalizaciones potentes, común en selvas de México y Centroamérica."
},

"Cebus capúcinus": {
common: "Capuchino Cara Blanca",
image: "images/cebus.jpg",
description: "Mono ágil y social, distintivo por su pelaje blanco en cara y pecho,es un mono extremadamente ágil y con una estructura social dinámica"
},

"Cebus olivaceus": {
common: "Mono llorón",
image: "images/olivaceus.jpg",
description: "Se caracteriza por su pelaje marrón grisáceo y una marca oscura en la frente; habita principalmente en las selvas del norte de Sudamérica"
},

"Sapajus apella": {
common: "Capuchino Cara negra",
image: "images/sapajus.jpg",
description: "Primate de gran inteligencia, famoso por su destreza manual y su capacidad para resolver problemas complejos"
},

"Lemur catta": {
common: "Lemur",
image: "images/lemur.jpg",
description: "Inconfundible por su cola anillada en blanco y negro; es un primate de hábitos sociales muy marcados que suele pasar tiempo en el suelo"
},

"Leontopithecus chrysomelas": {
common: "Tití cabeza de león",
image: "images/leontopithecus.jpg",
description: "Pequeño primate de pelaje negro con una melena dorada brillante, endémico de los bosques atlánticos de Brasil"
},

"Callithrix jacchus": {
common: "Tití común",
image: "images/callithrix.jpg",
description: "Se distingue por sus prominentes penachos de pelo blanco en las orejas y su pequeño tamaño; es un comunicador muy vocal"
},

"Saguinus oedipus": {
common: "Tití cabeza de algodón",
image: "images/saguinus.jpg",
description: "Notable por su espectacular cresta de pelo blanco algodonoso; es una especie pequeña con expresiones faciales muy vivaces"
},

"Saguinus midas": {
common: "Tití manos doradas",
image: "images/saguinusmidas.jpg",
description: "Característico por el color dorado brillante de sus extremidades que resalta sobre su cuerpo negro; es un saltador excepcional"
},

"Saimiri": {
common: "Mono ardilla",
image: "images/saimiri.jpg",
description: "Mono pequeño y de movimientos rápidos, identificado por su máscara blanca alrededor de los ojos y su cola larga no prensil"
}

};

let select = document.getElementById("speciesSelect");
d3.csv("data.csv").then(function(data){

// obtener especies únicas
let speciesList = [...new Set(data.map(d => d.Especie))];
let validSpecies = new Set();

speciesList.forEach(sp => {

  let hasWild = false;
  let hasCare = false;

  data.forEach(row => {
    if(row.Especie === sp){
      if(row.Condicion === "Vida.silvestre") hasWild = true;
      if(row.Condicion === "Cuidado.profesional") hasCare = true;
    }
  });

  if(hasWild && hasCare){
    validSpecies.add(sp);
  }

});

// llenar menú
speciesList.forEach(function(sp){

  let option = document.createElement("option");
  option.value = sp;
  option.text = sp;

  select.appendChild(option);
});

function getTitleSize() {
  return window.innerWidth < 600 ? 14 : 18;
}
function updateAllTitles() {
  const size = getTitleSize();
if (document.getElementById("plot1")) {
  Plotly.relayout("plot1", {
    title: {
      text: "<b>Tipos de microplásticos por condición de vida</b>",
      font: { size: size },
      x:0.5,
      xanchor:"center"
    }
  });
}

if (document.getElementById("typePlot")) {
  Plotly.relayout("typePlot", {
    title: {
      text:"<b>Especies analizadas</b>",
      font:{ size: size },
      x:0.5,
      xanchor:"center"
    }
  });
}

if (document.getElementById("plot")) {
  Plotly.relayout("plot", {
    title: {
      text:"<b>Microplásticos por individuo</b>",
      font:{ size: size },
      x:0.5,
      xanchor:"center"
    }
  });
}
}
window.addEventListener("resize", updateAllTitles);

const darkLayout = {
  font: { color: "#E5E7EB"
  },

  xaxis: {
    tickfont: { color: "#475569" },
    gridcolor: "rgba(255,255,255,0.05)"
  },

  yaxis: {
   ickfont: { color: "#475569" },
    gridcolor: "rgba(0,0,0,0.1)"
  }
};



// =============================
// Gráfica 1: Tipo de microplástico por condición
// =============================

let silvestreFibra = 0;
let silvestreFragmento = 0;
let cuidadoFibra = 0;
let cuidadoFragmento = 0;

data.forEach(function(row){

let count = Number(row.Cantidad);

if(row.Condicion === "Vida.silvestre" && row.TIpo_MPs === "Fibra"){
silvestreFibra += count;
}

if(row.Condicion === "Vida.silvestre" && row.TIpo_MPs === "Fragmento"){
silvestreFragmento += count;
}

if(row.Condicion === "Cuidado.profesional" && row.TIpo_MPs === "Fibra"){
cuidadoFibra += count;
}

if(row.Condicion === "Cuidado.profesional" && row.TIpo_MPs === "Fragmento"){
cuidadoFragmento += count;
}

});

var traceFibra = {
x: ["Vida silvestre","Cuidado profesional"],
y: [silvestreFibra,cuidadoFibra],
name: "Fibra",
type: "bar",
marker:{color:"#1B4332"},
hovertemplate:
    "Tipo: Fibra<br>" +
    "Condición: %{x}<br>" +
    "Cantidad: %{y}<extra></extra>"
};

var traceFragmento = {
x: ["Vida silvestre","Cuidado profesional"],
y: [silvestreFragmento,cuidadoFragmento],
name: "Fragmento",
type: "bar",
marker:{color:"#52B788"},
hovertemplate:
    "Tipo: Fragmento<br>" +
    "Condición: %{x}<br>" +
    "Cantidad: %{y}<extra></extra>"
};

Plotly.newPlot("plot1",[traceFibra,traceFragmento],{ 
title:{
  text:"<b>Tipos de microplásticos por condición de vida</b>",
   font:{ size: getTitleSize()},
   x:0.5,
   xanchor: "center",
  }, 
 barmode:"group",
  hovermode:"closest",
  height:380,
  yaxis:{
    automargin: true,
    title:{
      text: "<b>No. de partículas encontradas</b>",
      font:{ size:16 },
      standoff:30,
    }
  },
  margin:{
    t: 40
  }
},
{ responsive: true,
  displayModeBar: false }
);
// función para actualizar gráfica

let viewMode = "individual";

function setActiveButton(buttonId){

document.getElementById("viewIndividuals").classList.remove("active-view");
document.getElementById("viewType").classList.remove("active-view");
document.getElementById("viewCondition").classList.remove("active-view");

document.getElementById(buttonId).classList.add("active-view");

}

document.getElementById("viewIndividuals").addEventListener("click",function(){
viewMode = "individual";
setActiveButton("viewIndividuals");
updatePlot(select.value);
});

document.getElementById("viewType").addEventListener("click",function(){
viewMode = "type";
setActiveButton("viewType");
updatePlot(select.value);
});

document.getElementById("viewCondition").addEventListener("click",function(){
viewMode = "condition";
setActiveButton("viewCondition");
updatePlot(select.value);
});

function updatePlot(selectedSpecies){

let info = speciesData[selectedSpecies];

let wildSet = new Set();
let careSet = new Set();

data.forEach(function(row){

if(row.Especie === selectedSpecies){

let count = Number(row.Cantidad);

if(row.Condicion === "Vida.silvestre" && count > 0){
wildSet.add(row.Individuo);
}

if(row.Condicion === "Cuidado.profesional" && count > 0){
careSet.add(row.Individuo);
}

}

});

let nWild = wildSet.size;
let nCare = careSet.size;
let parts = [];

if(nWild > 0){
parts.push("Vida silvestre (n = " + nWild + ")");
}

if(nCare > 0){
parts.push("Cuidado profesional (n = " + nCare + ")");
}

document.getElementById("sampleInfo").innerHTML = parts.join(" | ");

document.getElementById("speciesInfo").innerHTML =
"<h3><i>" + selectedSpecies + "</i></h3>" +
"<p><b>" + info.common + "</b></p>" +
"<img src='" + info.image + "'>" +
"<p style='font-size:14px; margin-top:10px;'>" + info.description + "</p>";

console.log("modo actual:", viewMode);
document.getElementById("insightBox").innerHTML = "";

// 🔥 limpiar solo si NO es condition
if(viewMode !== "condition"){
  document.getElementById("insightBox").innerHTML = "";
}
function getPlotWidth(n){
  if(n === 1) return 500;
  if(n === 2) return 700;
  return 900;
}

// =========================
// CONDITION SIN DATOS
// =========================
if(viewMode === "condition" && !validSpecies.has(selectedSpecies)){

  Plotly.react("plot", [], {
  height:350,
 width: window.innerWidth < 768 ? window.innerWidth * 0.9 : 700, 
  margin:{ t:50, b:100, l:60, r:40 },
    xaxis: {visible:false},
    yaxis: {visible:false},
    annotations: [{
      text:
      "<b>⚠️ Comparación no disponible</b><br><br>" +
      "Los datos disponibles no incluyen ambas condiciones.",
      x:0.5,
      y:0.5,
      xref:"paper",
      yref:"paper",
      showarrow:false,
      align:"center",
      font:{ size:16 },
      standoff: 25
    }]
  },
  { 
    displayModeBar: false,  // 👈 AQUÍ
  });

  return;
}

// =========================
// INDIVIDUAL
// =========================

if(viewMode === "individual"){

let freeData = {};
let careData = {};
// ✅ 1. llenar datos correctamente
data.forEach(function(row){

  if(row.Especie === selectedSpecies){

    let id = row.Individuo;
    let count = Number(row.Cantidad);
if(row.Condicion === "Vida.silvestre"){
      if(!freeData[id]) freeData[id] = 0;
      freeData[id] += count;
    }

    if(row.Condicion === "Cuidado.profesional"){
      if(!careData[id]) careData[id] = 0;
      careData[id] += count;
    }

  }

});
// ✅ 2. calcular después
let totalBars = new Set([
  ...Object.keys(freeData),
  ...Object.keys(careData)
]).size;

// ✅ 3. individuos
let allIndividuals = Array.from(new Set([
  ...Object.keys(freeData),
  ...Object.keys(careData)
]));

let barWidth = allIndividuals.length === 1 ? 0.3 : 0.6;
// ✅ 4. traces
var trace1 = {
  x:Object.keys(freeData),
  y:Object.values(freeData),
  type:"bar",
  name:"Vida silvestre",
  width: allIndividuals.length === 1 ? [0.15] : barWidth,
  marker: { color: "#52B788" } 
};

var trace2 = {
  x:Object.keys(careData),
  y:Object.values(careData),
  type:"bar",
  name:"Cuidado profesional",
  width: allIndividuals.length === 1 ? [0.35] : barWidth,
  marker: { color: "#1B4332" }
 };

// ✅ 5. plot
Plotly.react("plot",[trace1,trace2],{
  height:350,
  width: window.innerWidth < 768 ? window.innerWidth * 0.9 : 700,
  title:{
    text:"<b>Microplásticos por individuo</b>",
    font:{ size: getTitleSize() },
    x:0.5,
    xanchor: "center"
  },

  yaxis:{
    autorange:true,
     automargin:true,
      title:{
      text: "<b>No. de partículas encontradas</b>",
      font:{size: 16}, 
      standoff:15
 }
  },

xaxis:{
  tickangle: totalBars <= 6 ? 0 : 60,
  automargin: false,
  range: [-0.5, allIndividuals.length - 0.5],
  ticktext: allIndividuals.map(name =>
    name.length > 8 ? name.slice(0,8) + "…" : name
  ),
  tickvals: allIndividuals
},

bargap: 0.3,
bargroupgap: 0.15,
},
{  displayModeBar: false }
);
return;
}


// =========================
// TYPE
// =========================
if(viewMode === "type"){

let fiber = 0;
let fragment = 0;

data.forEach(function(row){

if(row.Especie === selectedSpecies){

let count = Number(row.Cantidad);

if(row.TIpo_MPs === "Fibra") fiber += count;
if(row.TIpo_MPs === "Fragmento") fragment += count;

}

});

let xLabels = [];
let yValues = [];
let colors = [];

if(fiber > 0){
xLabels.push("Fibra");
yValues.push(fiber);
colors.push("#1B4332");
}

if(fragment > 0){
xLabels.push("Fragmento");
yValues.push(fragment);
colors.push("#52B788");
}

let traces = [];

if(fiber > 0){
  traces.push({
    x:["Fibra"],
    y:[fiber],
    type:"bar",
    name:"Fibra",
    marker:{color:"#1B4332"},
    width:0.4 
 });
}

if(fragment > 0){
  traces.push({
    x:["Fragmento"],
    y:[fragment],
    type:"bar",
    name:"Fragmento",
    marker:{color:"#52B788"},
    width:0.4
});
}

Plotly.react("plot",traces,{
height:350,
autosize: true,
showlegend: true,
margin:{ t:50, b:100, l:60, r:40 },
title:{
  text:"<b>Tipo de microplásticos</b>",
  font:{size:18},
},
yaxis:{autorange:true,
       title:{
          text: "<b>No. de partículas encontradas</b>",
           font: {size:16}, 
           standoff: 25
           }
         },
xaxis:{
  domain: [0.25, 0.75]
}
},
{ displayModeBar: false }
);
return;
}

// =========================
// CONDITION CON DATOS
// =========================
if(viewMode === "condition"){

let wildFiber = 0;
let wildFragment = 0;
let careFiber = 0;
let careFragment = 0;

data.forEach(function(row){

if(row.Especie === selectedSpecies){

let count = Number(row.Cantidad);

if(row.Condicion === "Vida.silvestre" && row.TIpo_MPs === "Fibra")
wildFiber += count;

if(row.Condicion === "Vida.silvestre" && row.TIpo_MPs === "Fragmento")
wildFragment += count;

if(row.Condicion === "Cuidado.profesional" && row.TIpo_MPs === "Fibra")
careFiber += count;

if(row.Condicion === "Cuidado.profesional" && row.TIpo_MPs === "Fragmento")
careFragment += count;

}

});

// construir dinámicamente
let xLabels = [];
let fiberValues = [];
let fragmentValues = [];

// vida silvestre
if(wildFiber > 0 || wildFragment > 0){
xLabels.push("Vida silvestre");
fiberValues.push(wildFiber);
fragmentValues.push(wildFragment);
}

// cuidado profesional
if(careFiber > 0 || careFragment > 0){
xLabels.push("Cuidado profesional");
fiberValues.push(careFiber);
fragmentValues.push(careFragment);
}

// crear solo si hay datos
console.log("condition data:", fiberValues, fragmentValues);
let traces = [];

if(fiberValues.some(v => v > 0)){
traces.push({
x:xLabels,
y:fiberValues,
name:"Fibra",
type:"bar",
width:0.4,
marker:{color:"#1B4332"},
hovertemplate:
"Especie: " + selectedSpecies + "<br>" +
"Condición: %{x}<br>" +
"Tipo: Fibra<br>" +
"Partículas: %{y}<extra></extra>"
});
}

if(fragmentValues.some(v => v > 0)){
traces.push({
x:xLabels,
y:fragmentValues,
name:"Fragmento",
type:"bar",
width:0.4,
marker:{color:"#52B788"},
hovertemplate:
"Especie: " + selectedSpecies + "<br>" +
"Condición: %{x}<br>" +
"Tipo: Fragmento<br>" +
"Partículas: %{y}<extra></extra>"
});
}

// 🔥 DESCRIPCIÓN CORRECTA (no inferencia)
let totalWild = wildFiber + wildFragment;
let totalCare = careFiber + careFragment;
let interpretation = "";

if(totalWild > totalCare){
  interpretation = "Los datos muestran la cantidad de partículas encontradas en cada condición";
}
else if(totalCare > totalWild){
  interpretation = "Los datos muestran la cantidad de partículas encontrada en los individuos bajo cuidado profesional y en vida silvestre";
}
else{
  interpretation = "Los datos muestran una cantidad similar de microplásticos entre condiciones";
}

interpretation += "<br><br><span style='font-size:12px; color:#666;'><i>Nota: Esta visualización muestra cantidades observadas y no implica diferencias estadísticamente significativas.</i></span>";

document.getElementById("insightBox").innerHTML =
"<div class='card insight-card'>"  
  + "<b>💡 Descripción:</b><br>" + interpretation +
  "</div>";

Plotly.react("plot",traces,{
barmode:"group",
height:350,
width: window.innerWidth < 768 ? window.innerWidth * 0.9 : 700,
title:{
  text: "<b>Microplásticos por condición</b>",
  font:{size:getTitleSize() },
  x:0.5,
  xanchor:"center",
  },
  margin:{ t:50, b:100, l:60, r:40 },
  yaxis:{
   automargin:true,
       title:{
          text:"<b>No. de partículas encontradas</b>",
           font: {size:16},
           standoff: 25,
 }
},
hovermode:"closest"
},
{displayModeBar: false }

);

return;
}
}

// especie inicial
updatePlot(speciesList[0]);

// cuando cambia el menú
select.addEventListener("change", function(){
updatePlot(this.value);
});

// =============================
// Grafica 2: Fibra vs Fragmento por especie
// =============================

// contar partículas por especie y tipo
let fiberCounts = {};
let fragmentCounts = {};

data.forEach(function(row){

let sp = row.Especie;
let count = Number(row.Cantidad);

if(row.TIpo_MPs === "Fibra"){
if(!fiberCounts[sp]) fiberCounts[sp] = 0;
fiberCounts[sp] += count;
}

if(row.TIpo_MPs === "Fragmento"){
if(!fragmentCounts[sp]) fragmentCounts[sp] = 0;
fragmentCounts[sp] += count;
}

});

// lista de especies
let species = [...new Set(data.map(d => d.Especie))];
let speciesWrapped = species.map(name => {
  let parts = name.split(" ");
  return parts.length > 1
    ? parts[0] + "<br>" + parts.slice(1).join(" ")
    : name;
});
// preparar datos
let fiber = species.map(s => fiberCounts[s] || 0);
let fragment = species.map(s => fragmentCounts[s] || 0);

// barras
var traceFiber = {
x: speciesWrapped,
y: fiber,
name: "Fibra",
type: "bar",
marker:{color:"#1B4332"},
hovertemplate:
"Tipo: Fibra<br>" +
"Condición: %{x}<br>" +
"Cantidad: %{y}<extra></extra>"
};


var traceFragment = {
x: speciesWrapped,
y: fragment,
name: "Fragmento",
type: "bar",
marker:{color:"#52B788"},
hovertemplate:
"Tipo: Fragmento<br>" +
"Condición: %{x}<br>" +
"Cantidad: %{y}<extra></extra>"
};

// dibujar gráfica
Plotly.newPlot("typePlot",[traceFiber, traceFragment],{
hovermode:"closest",
    title:{
      text:" <b>Especies analizadas</b>",
      font: {size: getTitleSize(),
      color:"#1F2937" },
      x:0.5,
      xanchor:"center"
  },
 
  xaxis:{
    tickangle: 45,
    automargin: true,
    tickfont:{ size:11, color:"#475569" } // 👈 evita encimado + color legible
  },
  yaxis:{
     title:{
        text:"<b>No. de partículas encontradas</b>",
        font: {size: 16, color: "#1F2937" },
        standoff:25
   }
  },
  margin:{t:50, b:120, l:70, r:30}
},
{ responsive: true,
  displayModeBar: false }

);

});
});

document.getElementById("enterBtn").addEventListener("click", function(){

  document.querySelector(".landing").style.display = "none";

  const dashboard = document.querySelector(".dashboard");
  dashboard.style.display = "block";

  setTimeout(() => {
    Plotly.Plots.resize(document.getElementById("plot"));
    Plotly.Plots.resize(document.getElementById("plot1"));
    Plotly.Plots.resize(document.getElementById("typePlot"));
  }, 300);

});

/* 🔥 resize correcto */
window.addEventListener("resize", () => {
  Plotly.Plots.resize(document.getElementById("plot"));
  Plotly.Plots.resize(document.getElementById("plot1"));
  Plotly.Plots.resize(document.getElementById("typePlot"));
});
const langBtn = document.getElementById("langBtn");

let currentLang = "es";

langBtn.addEventListener("click", () => {

  currentLang = currentLang === "es" ? "en" : "es";

document.querySelectorAll("[data-es]").forEach(el => {
  el.innerHTML = el.getAttribute("data-" + currentLang);
});

langBtn.textContent = currentLang === "es" ? "English" : "Español";
});

document.getElementById("backBtn").addEventListener("click", function () {

  document.querySelector(".dashboard").style.display = "none";
  document.querySelector(".landing").style.display = "flex";

});
