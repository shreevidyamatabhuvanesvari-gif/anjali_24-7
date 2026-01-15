/* ======================================================
   🧠 ANJALI CENTRAL BRAIN – engine.js
   Universal Exam Engine
   Author: Anjali System
====================================================== */

/* ========== Global Storage Hook ========== */
window.AnjaliEngine = {
  DB: null,
  exam: null,
  subject: null,
  topic: null
};

/* ========== Attach Database ========== */
AnjaliEngine.attachDB = function(db){
  this.DB = db;
};

/* ========== Set Active Path ========== */
AnjaliEngine.setPath = function(exam, subject, topic){
  this.exam = exam;
  this.subject = subject;
  this.topic = topic;
};

/* ========== Get Active Array ========== */
AnjaliEngine._arr = function(){
  return this.DB[this.exam][this.subject][this.topic];
};

/* ========== Duplicate Guard ========== */
AnjaliEngine.exists = function(q){
  return this._arr().some(x => x.q.trim() === q.trim());
};

/* ========== Save MCQ ========== */
AnjaliEngine.saveMCQ = function(obj){
  if(this.exists(obj.q)) return false;
  this._arr().push(obj);
  return true;
};

/* ========== Delete Last ========== */
AnjaliEngine.deleteLast = function(){
  this._arr().pop();
};

/* ========== Get All ========== */
AnjaliEngine.getAll = function(){
  return this._arr();
};

/* ======================================================
   📄 ARTICLE → FACT → MCQ PIPELINE
====================================================== */

AnjaliEngine.fromArticle = function(text){
  let lines = text.split(/[।.\n]/);
  let facts = [];

  lines.forEach(line=>{
    line = line.trim();
    if(line.length < 15) return;

    /* ---- YEARS ---- */
    let y = line.match(/\d{4}/);
    if(y){
      facts.push({
        q:"इस लेख में कौन-सा वर्ष उल्लेखित है?",
        ans:y[0]
      });
    }

    /* ---- ECONOMY CORE ---- */
    if(line.includes("कृषि") && line.includes("उद्योग") && line.includes("सेवा")){
      facts.push({
        q:"भारतीय अर्थव्यवस्था किन तीन क्षेत्रों पर आधारित है?",
        ans:"कृषि, उद्योग और सेवा क्षेत्र"
      });
    }

    if(line.includes("रिज़र्व बैंक") || line.includes("RBI")){
      facts.push({
        q:"भारत की मौद्रिक नीति का संचालन कौन करता है?",
        ans:"भारतीय रिज़र्व बैंक"
      });
    }

    if(line.includes("उदारीकरण") || line.includes("1991")){
      facts.push({
        q:"भारत में आर्थिक उदारीकरण कब लागू किया गया?",
        ans:"1991"
      });
    }

    if(line.includes("विदेशी निवेश")){
      facts.push({
        q:"उदारीकरण के बाद किसका प्रवाह बढ़ा?",
        ans:"विदेशी निवेश"
      });
    }

    /* ---- GLOBAL ECONOMY ---- */
    if(line.includes("World Bank") || line.includes("विश्व बैंक")){
      facts.push({
        q:"विश्व बैंक का मुख्य कार्य क्या है?",
        ans:"विकासशील देशों को आर्थिक सहायता देना"
      });
    }

    if(line.includes("IMF") || line.includes("अंतरराष्ट्रीय मुद्रा कोष")){
      facts.push({
        q:"IMF का मुख्य उद्देश्य क्या है?",
        ans:"वैश्विक मौद्रिक स्थिरता बनाए रखना"
      });
    }
  });

  return this.toMCQ(facts);
};

/* ======================================================
   🔀 FACT → EXAM MCQ
====================================================== */

AnjaliEngine.toMCQ = function(facts){
  let out = [];

  facts.forEach(f=>{
    let wrongs = ["लोहा आधारित व्यवस्था","केवल शिकार","कोई उल्लेख नहीं"];
    wrongs.sort(()=>Math.random()-0.5);

    let opts = [f.ans, wrongs[0], wrongs[1]];
    opts.sort(()=>Math.random()-0.5);
    opts.push("कोई नहीं"); // D

    let correct = ["A","B","C","D"][opts.indexOf(f.ans)];

    out.push({
      q:f.q,
      a:opts[0],
      b:opts[1],
      c:opts[2],
      d:opts[3],
      correct:correct,
      exp:"व्याख्या: लेख के अनुसार सही उत्तर है — " + f.ans
    });
  });

  return out;
};

/* ======================================================
   📌 ONE-LINER ENGINE
====================================================== */

AnjaliEngine.toOneLiners = function(text){
  let lines = text.split(/[।.\n]/);
  let out = [];

  lines.forEach(l=>{
    if(l.length>20){
      out.push({
        q:l.trim(),
        a:""
      });
    }
  });

  return out;
};
