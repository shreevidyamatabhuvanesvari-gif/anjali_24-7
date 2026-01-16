/* ======================================================
   🧠 ANJALI – CENTRAL EXAM ENGINE (GLOBAL)
   Exam-grade | Browser-safe | No import/export
====================================================== */

window.extractExamFacts = function(articleText, context){

  let facts = [];
  let lines = articleText.split(/[।.\n]/);

  lines.forEach(line=>{
    line = line.trim();
    if(line.length < 15) return;

    /* ===== ECONOMY : CORE EXAM FACTS ===== */

    if(line.includes("उदारीकरण") || line.includes("1991")){
      facts.push({
        q: "भारत में आर्थिक उदारीकरण कब लागू हुआ?",
        ans: "1991"
      });
    }

    if(line.includes("रिज़र्व बैंक") || line.includes("RBI")){
      facts.push({
        q: "भारत की मौद्रिक नीति कौन संचालित करता है?",
        ans: "भारतीय रिज़र्व बैंक"
      });
    }

    if(line.includes("मिश्रित अर्थव्यवस्था")){
      facts.push({
        q: "भारतीय अर्थव्यवस्था किस प्रकार की है?",
        ans: "मिश्रित अर्थव्यवस्था"
      });
    }

    if(line.includes("कृषि") && line.includes("उद्योग") && line.includes("सेवा")){
      facts.push({
        q: "भारतीय अर्थव्यवस्था किन तीन क्षेत्रों पर आधारित है?",
        ans: "कृषि, उद्योग और सेवा क्षेत्र"
      });
    }

    if(line.includes("विदेशी निवेश")){
      facts.push({
        q: "उदारीकरण के बाद भारत में किसका प्रवाह बढ़ा?",
        ans: "विदेशी निवेश"
      });
    }
  });

  return convertFactsToMCQ(deduplicateFacts(facts));
};

/* ========== HELPERS ========== */

function convertFactsToMCQ(facts){
  return facts.map(f=>{
    let wrong = [
      "केवल निजी क्षेत्र",
      "केवल सरकारी क्षेत्र",
      "कोई उल्लेख नहीं"
    ];

    let options = shuffle([f.ans, wrong[0], wrong[1]]);
    options.push("अन्य");

    let correct = ["A","B","C","D"][options.indexOf(f.ans)];

    return {
      q: f.q,
      options: options,
      correct: correct,
      explain: "व्याख्या: " + f.ans + " लेख के अनुसार सही है।"
    };
  });
}

function shuffle(arr){
  return arr.sort(()=>Math.random()-0.5);
}

function deduplicateFacts(facts){
  const seen = new Set();
  return facts.filter(f=>{
    let key = f.q + f.ans;
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
       }
