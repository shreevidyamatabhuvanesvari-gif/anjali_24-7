/* ===========================================================
   🧠 ANJALI CENTRAL EXAM ENGINE
   This is the brain of the entire system.
   It decides:
   - Which subject engine to use
   - How to extract facts
   - How to avoid duplicates
   - How to store MCQs
=========================================================== */

const AnjaliEngine = (function(){

  /* ===============================
     INTERNAL MEMORY
  =============================== */
  let engines = {};      // subject engines
  let usedQuestions = new Set();   // to avoid duplicates

  /* ===============================
     REGISTER SUBJECT ENGINE
     Example: Economy, History, Polity
  =============================== */
  function registerEngine(subjectName, engineObject){
    engines[subjectName] = engineObject;
  }

  /* ===============================
     MAIN ENTRY: ARTICLE → MCQs
  =============================== */
  function generateFromArticle(subject, articleText){

    if(!engines[subject]){
      throw "No engine registered for " + subject;
    }

    const engine = engines[subject];
    const lines = articleText.split(/[।\n\.]/);
    let facts = [];

    lines.forEach(line=>{
      line = line.trim();
      if(line.length < 10) return;

      const extracted = engine.extract(line);
      if(Array.isArray(extracted)){
        extracted.forEach(f=>facts.push(f));
      }
    });

    if(facts.length === 0){
      return [];
    }

    const mcqs = facts.map(f => makeMCQ(f))
                      .filter(q => q !== null);

    return mcqs;
  }

  /* ===============================
     FACT → EXAM MCQ
  =============================== */
  function makeMCQ(fact){

    const key = fact.q + "::" + fact.ans;
    if(usedQuestions.has(key)) return null;   // prevent duplicates
    usedQuestions.add(key);

    const wrongs = getDistractors(fact.ans);
    const options = shuffle([fact.ans, wrongs[0], wrongs[1], "कोई नहीं"]);

    const letters = ["A","B","C","D"];
    const correct = letters[options.indexOf(fact.ans)];

    return {
      q: fact.q,
      a: options[0],
      b: options[1],
      c: options[2],
      d: options[3],
      correct: correct,
      exp: "इसका सही उत्तर है: " + fact.ans
    };
  }

  /* ===============================
     COMMON DISTRACTORS
  =============================== */
  function getDistractors(answer){
    const pool = [
      "लोहा आधारित व्यवस्था",
      "केवल शिकार पर आधारित",
      "कोई उल्लेख नहीं",
      "कृषि आधारित",
      "औद्योगिक व्यवस्था",
      "सरकारी नियंत्रण नहीं"
    ];

    return pool.filter(x=>x!==answer)
               .sort(()=>Math.random()-0.5)
               .slice(0,2);
  }

  /* ===============================
     UTIL
  =============================== */
  function shuffle(arr){
    return arr.sort(()=>Math.random()-0.5);
  }

  /* ===============================
     PUBLIC API
  =============================== */
  return {
    registerEngine,
    generateFromArticle
  };

})();,
