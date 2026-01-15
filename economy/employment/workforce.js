/* ============================================================
   File: economy/employment/workforce.js
   Role: Employment → Workforce Exam Context Engine
   Used by: engine.js (Central Brain)
   Purpose: Extract exam-grade facts & MCQ seeds from articles
=============================================================== */

(function(){

/* This module will be registered inside Central Engine */
window.ANJALI_ENGINE = window.ANJALI_ENGINE || {};
ANJALI_ENGINE.employment = ANJALI_ENGINE.employment || {};
ANJALI_ENGINE.employment.workforce = {};

/* ============================================================
   Workforce Exam Context Categories
   These are the areas from which competitive exams ask questions
=============================================================== */
const CATEGORIES = {
  size: ["कार्यबल","workforce","labour force","श्रम शक्ति"],
  participation: ["श्रम भागीदारी","LFPR","labour participation"],
  demographics: ["महिला","पुरुष","युवा","ग्रामीण","शहरी"],
  education: ["शिक्षा","कुशल","अकुशल","प्रशिक्षण","skill"],
  age: ["आयु","18","60","working age"],
  migration: ["प्रवासन","migrant","स्थानांतरण"],
  productivity: ["उत्पादकता","productivity","दक्षता"]
};

/* ============================================================
   MAIN ANALYSER
   Input: article text (string)
   Output: array of exam-grade facts
=============================================================== */
ANJALI_ENGINE.employment.workforce.extractFacts = function(text){
  let lines = text.split(/[।.\n]/);
  let facts = [];

  lines.forEach(line=>{
    line = line.trim();
    if(line.length < 10) return;

    /* Workforce Size */
    if(contains(line, CATEGORIES.size)){
      facts.push({
        type:"workforce_size",
        q:"कार्यबल (Workforce) का अर्थ क्या है?",
        ans:"काम करने वाले कुल लोगों की संख्या"
      });
    }

    /* Labour Force Participation */
    if(contains(line, CATEGORIES.participation)){
      facts.push({
        type:"lfpr",
        q:"श्रम भागीदारी दर (LFPR) क्या दर्शाती है?",
        ans:"काम करने वालों का कुल जनसंख्या में अनुपात"
      });
    }

    /* Demographics */
    if(contains(line, CATEGORIES.demographics)){
      facts.push({
        type:"demographics",
        q:"कार्यबल को किस आधार पर वर्गीकृत किया जाता है?",
        ans:"लिंग, आयु और क्षेत्र के आधार पर"
      });
    }

    /* Education & Skill */
    if(contains(line, CATEGORIES.education)){
      facts.push({
        type:"skill",
        q:"कार्यबल की गुणवत्ता किस पर निर्भर करती है?",
        ans:"शिक्षा और कौशल स्तर पर"
      });
    }

    /* Working Age */
    if(contains(line, CATEGORIES.age)){
      facts.push({
        type:"age",
        q:"कार्यशील आयु वर्ग किसे कहा जाता है?",
        ans:"18 से 60 वर्ष की जनसंख्या"
      });
    }

    /* Migration */
    if(contains(line, CATEGORIES.migration)){
      facts.push({
        type:"migration",
        q:"प्रवासन का कार्यबल पर क्या प्रभाव पड़ता है?",
        ans:"श्रम की उपलब्धता में परिवर्तन"
      });
    }

    /* Productivity */
    if(contains(line, CATEGORIES.productivity)){
      facts.push({
        type:"productivity",
        q:"कार्यबल की उत्पादकता किससे मापी जाती है?",
        ans:"उत्पादन प्रति श्रमिक"
      });
    }

  });

  return uniqueFacts(facts);
};

/* ============================================================
   MCQ Generator (used by engine.js)
=============================================================== */
ANJALI_ENGINE.employment.workforce.toMCQ = function(fact){
  let wrongs = [
    "केवल बेरोजगारों की संख्या",
    "केवल सरकार द्वारा नियोजित लोग",
    "कोई निश्चित परिभाषा नहीं"
  ];

  shuffle(wrongs);
  let options = [fact.ans, wrongs[0], wrongs[1]];
  shuffle(options);
  options.push("कोई नहीं");   // D always

  const letters = ["A","B","C","D"];

  return {
    q: fact.q,
    a: options[0],
    b: options[1],
    c: options[2],
    d: options[3],
    correct: letters[options.indexOf(fact.ans)],
    explain: "कार्यबल से संबंधित सही अवधारणा: " + fact.ans
  };
};

/* ============================================================
   Utilities
=============================================================== */

function contains(line, words){
  return words.some(w=> line.toLowerCase().includes(w.toLowerCase()));
}

function shuffle(a){
  return a.sort(()=>Math.random()-0.5);
}

function uniqueFacts(arr){
  let map = {};
  return arr.filter(f=>{
    if(map[f.q]) return false;
    map[f.q]=true;
    return true;
  });
}

})();
