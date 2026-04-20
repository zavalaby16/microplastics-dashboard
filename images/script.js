document.addEventListener("DOMContentLoaded", function(){

let currentLang = "es";

const text = "© " + new Date().getFullYear() + " Fabiola Zavala | Visualización científica interactiva";

const el1 = document.getElementById("copyright");
if (el1) el1.innerHTML = text;

const el2 = document.getElementById("copyrightDashboard");
if (el2) el2.innerHTML = text;

console.log(document.getElementById("btnIndividuo"));
console.log(document.getElementById("btnTipo"));

const speciesData = {

"Ateles geoffroyi": {
  common: {
    es: "Mono araña",
    en: "Spider monkey"
  },
  image: "images/ateles.jpg",
  description: {
    es: "Primate arbóreo de larga cola prensil que habita selvas tropicales de Mesoamérica.",
    en: "Arboreal primate with a long prehensile tail that inhabits tropical forests of Mesoamerica."
  }
},
"Alouatta pigra": {
  common: {
    es: "Saraguato",
    en: "Black howler monkey"
  },
  image: "images/alouatta.jpg",
  description: {
    es: "Mono aullador característico por sus vocalizaciones potentes, común en selvas de México y Centroamérica.",
    en: "Howler monkey known for its powerful vocalizations, common in forests of Mexico and Central America."
  }
},

"Cebus capúcinus": {
  common: {
    es: "Capuchino cara blanca",
    en: "White-faced capuchin"
  },
  image: "images/cebus.jpg",
  description: {
    es: "Mono ágil y social, distintivo por su pelaje blanco en cara y pecho; tiene una estructura social dinámica.",
    en: "Agile and social monkey, distinguished by its white face and chest; it has a dynamic social structure."
  }
},

"Cebus olivaceus": {
  common: {
    es: "Mono llorón",
    en: "Wedge-capped capuchin"
  },
  image: "images/olivaceus.jpg",
  description: {
    es: "Se caracteriza por su pelaje marrón grisáceo y una marca oscura en la frente; habita principalmente en las selvas del norte de Sudamérica.",
    en: "Characterized by its grayish-brown fur and a dark mark on the forehead; it mainly inhabits forests in northern South America."
  }
},

"Sapajus apella": {
  common: {
    es: "Capuchino cara negra",
    en: "Black-capped capuchin"
  },
  image: "images/sapajus.jpg",
  description: {
    es: "Primate de gran inteligencia, famoso por su destreza manual y su capacidad para resolver problemas complejos.",
    en: "Highly intelligent primate known for its manual dexterity and ability to solve complex problems."
  }
},

"Lemur catta": {
  common: {
    es: "Lémur de cola anillada",
    en: "Ring-tailed lemur"
  },
  image: "images/lemur.jpg",
  description: {
    es: "Inconfundible por su cola anillada en blanco y negro; es un primate social que pasa gran parte del tiempo en el suelo.",
    en: "Easily recognized by its black-and-white ringed tail; it is a social primate that spends much of its time on the ground."
  }
},

"Leontopithecus chrysomelas": {
  common: {
    es: "Tití cabeza de león",
    en: "Golden-headed lion tamarin"
  },
  image: "images/leontopithecus.jpg",
  description: {
    es: "Pequeño primate de pelaje negro con una melena dorada brillante, endémico de los bosques atlánticos de Brasil.",
    en: "Small primate with black fur and a bright golden mane, endemic to the Atlantic forests of Brazil."
  }
},
"Callithrix jacchus": {
  common: {
    es: "Tití común",
    en: "Common marmoset"
  },
  image: "images/callithrix.jpg",
  description: {
    es: "Se distingue por sus prominentes penachos de pelo blanco en las orejas y su pequeño tamaño; es un comunicador muy vocal.",
    en: "Distinguished by its prominent white ear tufts and small size; it is a highly vocal communicator."
  }
},
"Saguinus oedipus": {
  common: {
    es: "Tití cabeza de algodón",
    en: "Cotton-top tamarin"
  },
  image: "images/saguinus.jpg",
  description: {
    es: "Notable por su espectacular cresta de pelo blanco algodonoso; es una especie pequeña con expresiones faciales muy vivaces.",
    en: "Notable for its striking white cotton-like crest; it is a small species with very expressive facial features."
  }
},
"Saguinus midas": {
  common: {
    es: "Tití manos doradas",
    en: "Golden-handed tamarin"
  },
  image: "images/saguinusmidas.jpg",
  description: {
    es: "Característico por el color dorado brillante de sus extremidades que resalta sobre su cuerpo negro; es un saltador excepcional.",
    en: "Characterized by the bright golden color of its limbs contrasting with its black body; it is an exceptional jumper."
  }
},
"Saimiri": {
  common: {
    es: "Mono ardilla",
    en: "Squirrel monkey"
  },
  image: "images/saimiri.jpg",
  description: {
    es: "Mono pequeño y de movimientos rápidos, identificado por su máscara blanca alrededor de los ojos y su cola larga no prensil.",
    en: "Small and fast-moving monkey, identified by its white facial mask and long non-prehensile tail."
  }
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

window.updateAllTitles = function() {
  const size = getTitleSize();
if (document.getElementById("plot1")) {
  Plotly.relayout("plot1", {
    title: {
      text: currentLang === "es"
        ? "<b>Tipos de microplásticos por condición de vida</b>"
        : "<b>Types of microplastics by living condition</b>",
      font: { size: size },
      x:0.5,
      xanchor:"center"
    }
  });
}
if (document.getElementById("typePlot")) {
  Plotly.relayout("typePlot", {
    title: {
     text: currentLang === "es"
      ? "<b>Especies analizadas</b>"
      : "<b>Analyzed species</b>",
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
  tickfont: { color: "#475569" },
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

const labels = {
  es: {
    titulo1: "<b>Tipos de microplásticos por condición de vida</b>",
    titulo2: "<b>Especies analizadas</b>",
    titulo3: "<b>Microplásticos por individuo</b>",
    titulo4: "<b>Tipo de microplásticos</b>",
    titulo5: "<b>Microplásticos por condición de vida</b>",
    ejeY: "<b>No. de partículas encontradas</b>",
    silvestre: "Vida silvestre",
    cuidado: "Cuidado profesional",
    fibra: "Fibra",
    fragmento: "Fragmento",
    tipo: "Tipo",
    condicion: "Condición",
    cantidad: "Cantidad"
  },
  en: {
    titulo1: "<b>Types of microplastics by living condition</b>",
    titulo2: "<b>Analyzed species</b>",
    titulo3: "<b>Microplastics per individual</b>",
    titulo4: "<b>Type of microplastics</b>",
    titulo5: "<b>Microplastics by living condition</b>",
    ejeY: "<b>No. of particles found</b>",
    silvestre: "Wildlife",
    cuidado: "Professional care",
    fibra: "Fiber",
    fragmento: "Fragment",
    tipo: "Type",
    condicion: "Condition",
    cantidad: "Count"
  }
};

window.drawPlot1 = function() {

  const lang = currentLang;
  const t = labels[lang];

const traceFibra = {
  x: ["Vida.silvestre", "Cuidado.profesional"],
  y: [silvestreFibra, cuidadoFibra],
  name: t.fibra,
  type: "bar",
  marker: { color: "#1B4332" },
hovertemplate:
  "<b>" + t.fibra + "</b><br>" +
  "%{x}<br>" +
  "%{y} " + (currentLang === "es" ? "Partículas encontradas" : "Particles found") +
  "<extra></extra>"
};
const traceFragmento = {
  x: ["Vida.silvestre", "Cuidado.profesional"],
  y: [silvestreFragmento, cuidadoFragmento],
  name: t.fragmento,
  type: "bar",
  marker: { color: "#52B788" },
  hovertemplate:
  "<b>" + t.fragmento + "</b><br>" +
  "%{x}<br>" +
  "%{y} " + (currentLang === "es" ? "Partículas encontradas" : "Particles found") +
  "<extra></extra>"

};

Plotly.newPlot(
  "plot1",
  [traceFibra, traceFragmento],
  {
    title: {
      text: t.titulo1,
      font: { size: getTitleSize() },
      x: 0.5,
      xanchor: "center"
    },
    barmode: "group",
    hovermode: "closest",
    height: 380,

    xaxis: {
      tickvals: ["Vida.silvestre", "Cuidado.profesional"],
      ticktext: [t.silvestre, t.cuidado]
},

    yaxis: {
      automargin: true,
      title: {
        text: t.ejeY,
        font: { size: 16 },
        standoff: 30
      }
    },
    margin: { t: 40 }
  },
  {
    responsive: true,
    displayModeBar: false
  }
);
};

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

window.updatePlot = function(selectedSpecies){
const t = labels[currentLang];
console.log("idioma actual en plot:", currentLang);

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
  parts.push(
    (currentLang === "es" ? "Vida silvestre" : "Wildlife") +
    " (n = " + nWild + ")"
  );
}

if(nCare > 0){
  parts.push(
    (currentLang === "es" ? "Cuidado profesional" : "Professional care") +
    " (n = " + nCare + ")"
  );
}

document.getElementById("sampleInfo").innerHTML = parts.join(" | ");

document.getElementById("speciesInfo").innerHTML =
"<h3><i>" + selectedSpecies + "</i></h3>" +
"<p><b>" + info.common[currentLang] + "</b></p>" +
"<img src='" + info.image + "'>" +
"<p style='font-size:14px; margin-top:10px;'>" + info.description[currentLang] + "</p>";

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

// 🔥 DESCRIPCIÓN CORRECTA (no inferencia)

const insightTitle = currentLang === "es" ? "💡 Descripción:" : "💡 Insight:";

const noteText = currentLang === "es"
  ? "Nota: Esta visualización muestra cantidades observadas y no implica diferencias estadísticamente significativas."
  : "Note: This visualization shows observed quantities and does not imply statistically significant differences.";
// 🔥 DESCRIPCIÓN CORRECTA (no inferencia)
document.getElementById("insightBox").innerHTML =
"<div class='card insight-card'>"  
  + "<b>" + insightTitle + "</b><br>"
  + "<span style='font-size:12px; color:#666;'><i>" + noteText + "</i></span>" +
"</div>";

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
  name: t.silvestre,
  width: allIndividuals.length === 1 ? [0.15] : barWidth,
  marker: { color: "#52B788" }, 
  hovertemplate:
  "<b>%{x}</b><br>" +
  t.silvestre + "<br>" +
  "%{y} " + (currentLang === "es" ? "Partículas encontradas" : "Particles found") +
  "<extra></extra>"
};

var trace2 = {
  x:Object.keys(careData),
  y:Object.values(careData),
  type:"bar",
  name: t.cuidado,
  width: allIndividuals.length === 1 ? [0.35] : barWidth,
  marker: { color: "#1B4332" },
hovertemplate:
  "<b>%{x}</b><br>" +
  t.cuidado + "<br>" +
  "%{y} " + (currentLang === "es" ? "Partículas encontradas" : "Particles found") +
  "<extra></extra>"
};

// ✅ 5. plot
Plotly.react("plot",[trace1,trace2],{
  height:350,
  width: window.innerWidth < 768 ? window.innerWidth * 0.9 : 700,
  title:{
    text: t.titulo3,
    font:{ size: getTitleSize() },
    x:0.5,
    xanchor: "center"
  },

  yaxis:{
    autorange:true,
     automargin:true,
      title:{
      text: t.ejeY,
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
    name:t.fibra,
    marker:{color:"#1B4332"},
    width:0.4,
    hovertemplate:
  "<b>%{x}</b><br>" +
  "%{y} " + (currentLang === "es" ? "Partículas encontradas" : "Particles found") +
  "<extra></extra>"
 });
}

if(fragment > 0){
  traces.push({
    x:["Fragmento"],
    y:[fragment],
    type:"bar",
    name: t.fragmento,
    marker:{color:"#52B788"},
    width:0.4,
    hovertemplate:
  "<b>%{x}</b><br>" +
  "%{y} " + (currentLang === "es" ? "Partículas encontradas" : "Particles found") +
  "<extra></extra>"
});
}

Plotly.react("plot",traces,{
height:350,
autosize: true,
showlegend: true,
margin:{ t:50, b:100, l:60, r:40 },
title:{
  text:t.titulo4,
  font:{size:18},
},
yaxis:{autorange:true,
       title:{
          text: t.ejeY,
           font: {size:16}, 
           standoff: 25
           }
         },
xaxis:{
  domain: [0.25, 0.75],
  tickvals: ["Fibra", "Fragmento"],
  ticktext: [t.fibra, t.fragmento]
}
},
{ displayModeBar: false }
);
return;
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
name: t.fibra,
type:"bar",
width:0.4,
marker:{color:"#1B4332"},
hovertemplate:
  "<b>" + selectedSpecies + "</b><br>" +
  "%{x} • " + t.fibra + "<br>" +
  "%{y} " + (currentLang === "es" ? "Partículas encontradas" : "Particles found") +
  "<extra></extra>"
});
}

if(fragmentValues.some(v => v > 0)){
traces.push({
x:xLabels,
y:fragmentValues,
name: t.fragmento,
type:"bar",
width:0.4,
marker:{color:"#52B788"},
hovertemplate:
  "<b>" + selectedSpecies + "</b><br>" +
  "%{x} • " + t.fragmento + "<br>" +
  "%{y} " + (currentLang === "es" ? "Partículas encontradas" : "Particles found") +
  "<extra></extra>"
});
}

Plotly.react("plot",traces,{
barmode:"group",
height:350,
autosize:false,
width: window.innerWidth < 768 ? window.innerWidth * 0.9 : 700,
title:{
  text: t.titulo5,
  font:{size:getTitleSize() },
  x:0.5,
  xanchor:"center",
  },
  margin:{ t:50, b:100, l:60, r:40 },
  yaxis:{
   automargin:true,
       title:{
          text: t.ejeY,
           font: {size:16},
           standoff: 25,
         }
       },
     xaxis:{
         tickvals: ["Vida silvestre", "Cuidado profesional"],
         ticktext: [t.silvestre, t.cuidado]
           },
hovermode:"closest"
},
{displayModeBar: false }

);

return;
}
}

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

window.drawPlot2 = function() {

  const t = labels[currentLang];

  // preparar datos
  let fiber = species.map(s => fiberCounts[s] || 0);
  let fragment = species.map(s => fragmentCounts[s] || 0);

  // barras
  var traceFiber = {
    x: speciesWrapped,
    y: fiber,
    name: t.fibra,
    type: "bar",
    marker:{color:"#1B4332"},
    hovertemplate:
  "<b>" + t.fibra + "</b><br>" +
  "%{x}<br>" +
  "%{y} " + (currentLang === "es" ? "Partículas detectadas" : "Particles detected") +
  "<extra></extra>"
  };

  var traceFragment = {
    x: speciesWrapped,
    y: fragment,
    name: t.fragmento,
    type: "bar",
    marker:{color:"#52B788"},
   hovertemplate:
  "<b>" + t.fragmento + "</b><br>" +
  "%{x}<br>" +
  "%{y} " + (currentLang === "es" ? "Partículas encontradas" : "Particles found") +
  "<extra></extra>"
  };

// dibujar gráfica
  Plotly.newPlot("typePlot", [traceFiber, traceFragment], {
    height: 360,
    hovermode: "closest",
    title: {
      text: t.titulo2,
      font: {
        size: getTitleSize(),
        color: "#1F2937"
      },
      x: 0.5,
      xanchor: "center"
    },
    xaxis: {
      tickangle: 45,
      automargin: false,
      tickfont: { size: 11, color: "#475569" }
    },
    yaxis: {
      title: {
        text: t.ejeY,
        font: { size: 16, color: "#1F2937" },
        standoff: 25
      }
    },
    margin: { t: 30, b: 70, l: 80, r: 35 }
  }, {
    responsive: false,
    displayModeBar: false
  });
}; // <--- Aquí termina drawPlot2 correctamente

// Ahora el botón de entrada está DENTRO del flujo
document.getElementById("enterBtn").addEventListener("click", function() {
  document.querySelector(".landing").style.display = "none";
  const dashboard = document.querySelector(".dashboard");
  dashboard.style.display = "block";

  document.getElementById("copyright").innerHTML =
    "© " + new Date().getFullYear() + " Fabiola Zavala | Visualización científica interactiva";

  setTimeout(() => {
    Plotly.Plots.resize(document.getElementById("plot"));
    Plotly.Plots.resize(document.getElementById("plot1"));
    Plotly.Plots.resize(document.getElementById("typePlot"));
  }, 300);
});

/* resize correcto */
window.addEventListener("resize", () => {
  Plotly.Plots.resize(document.getElementById("plot"));
  Plotly.Plots.resize(document.getElementById("plot1"));
  Plotly.Plots.resize(document.getElementById("typePlot"));
});

const langBtn = document.getElementById("langBtn");
const langToggle = document.getElementById("langToggle");

function changeLanguage() {
  const newLang = currentLang === "es" ? "en" : "es";
  currentLang = newLang;

  document.querySelectorAll("[data-es]").forEach(el => {
    if (!el.classList.contains("static")) {
      el.innerHTML = el.getAttribute("data-" + currentLang);
    }
  });

  document.getElementById("viewIndividuals").textContent =
    currentLang === "es" ? "Individuos" : "Individuals";
  document.getElementById("viewType").textContent =
    currentLang === "es" ? "Tipo" : "Type";
  document.getElementById("viewCondition").textContent =
    currentLang === "es" ? "Condición" : "Condition";

  drawPlot1();
  drawPlot2();
  updateAllTitles();
  updatePlot(document.getElementById("speciesSelect").value);

  const label = currentLang === "es" ? "English" : "Español";
  if (langBtn) langBtn.textContent = label;
  if (langToggle) langToggle.textContent = label;

  const text = currentLang === "es"
    ? "© " + new Date().getFullYear() + " Fabiola Zavala | Visualización científica interactiva"
    : "© " + new Date().getFullYear() + " Fabiola Zavala | Interactive scientific visualization";

  const el1 = document.getElementById("copyright");
  if (el1) el1.innerHTML = text;
  const el2 = document.getElementById("copyrightDashboard");
  if (el2) el2.innerHTML = text;
}

if (langBtn) langBtn.onclick = changeLanguage;
if (langToggle) langToggle.onclick = changeLanguage;

document.getElementById("backBtn").addEventListener("click", function() {
    document.querySelector(".dashboard").style.display = "none";
    document.querySelector(".landing").style.display = "flex";
  });

// especie inicial
updatePlot(speciesList[0]);
drawPlot1();
drawPlot2();

  }); // Cierra d3.csv().then
}); // Cierra document.addEventListener
