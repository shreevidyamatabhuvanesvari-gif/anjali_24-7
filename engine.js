/* ======================================================
   🧠 ANJALI – CENTRAL EXAM BRAIN (STEP-5 FINAL)
   Purpose: Article → Exam-Grade MCQ + One-Liners
====================================================== */

/* ========= PUBLIC API ========= */

window.extractExamFacts = function(articleText, contextPath) {
  const lines = splitIntoLines(articleText);

  let mcqs = [];
  let oneLiners = [];

  const seen = new Set(); // deduplication

  lines.forEach(line => {
    const clean = normalize(line);
    if (!isValidLine(clean)) return;

    // Decide type
    if (!hasExamTrigger(clean)) {
      addUnique(oneLiners, clean, seen, "OL");
      return;
    }

    const fact = identifyFact(clean);
    if (!fact) {
      addUnique(oneLiners, clean, seen, "OL");
      return;
    }

    // MCQ possible?
    if (isMCQEligible(fact)) {
      const mcq = buildMCQ(fact);
      addUnique(mcqs, mcq, seen, "MCQ");
    } else {
      addUnique(oneLiners, fact.statement, seen, "OL");
    }
  });

  return {
    mcqs,
    oneLiners
  };
};

/* ========= LINE HANDLING ========= */

function splitIntoLines(text) {
  return text.split(/[।.\n]/).map(l => l.trim());
}

function normalize(line) {
  return line.replace(/\s+/g, " ").trim();
}

function isValidLine(line) {
  return line.length > 25 && line.length < 220;
}

/* ========= EXAM TRIGGERS ========= */

function hasExamTrigger(line) {
  const triggers = [
    "कब", "कौन", "किस", "किसके",
    "पर आधारित", "मुख्य", "उद्देश्य",
    "नीति", "संस्था", "वर्ष", "1991",
    "रिज़र्व बैंक", "RBI", "IMF", "विश्व बैंक"
  ];
  return triggers.some(t => line.includes(t));
}

/* ========= FACT IDENTIFICATION ========= */

function identifyFact(line) {

  if (line.includes("1991")) {
    return {
      type: "YEAR_EVENT",
      question: "भारत में आर्थिक उदारीकरण कब लागू हुआ?",
      answer: "1991",
      explanation: "1991 में भारत में आर्थिक उदारीकरण लागू किया गया।"
    };
  }

  if (line.includes("रिज़र्व बैंक") || line.includes("RBI")) {
    return {
      type: "INSTITUTION",
      question: "भारत की मौद्रिक नीति कौन संचालित करता है?",
      answer: "भारतीय रिज़र्व बैंक",
      explanation: "मौद्रिक नीति का संचालन RBI करता है।"
    };
  }

  if (line.includes("कृषि") && line.includes("उद्योग") && line.includes("सेवा")) {
    return {
      type: "SECTORS",
      question: "भारतीय अर्थव्यवस्था किन क्षेत्रों पर आधारित है?",
      answer: "कृषि, उद्योग और सेवा क्षेत्र",
      explanation: "भारतीय अर्थव्यवस्था तीन मुख्य क्षेत्रों पर आधारित है।"
    };
  }

  if (line.includes("उभरती") || line.includes("विकासशील")) {
    return {
      type: "ECONOMY_TYPE",
      question: "भारत को किस प्रकार की अर्थव्यवस्था माना जाता है?",
      answer: "उभरती हुई अर्थव्यवस्था",
      explanation: "भारत को एक विकासशील व उभरती अर्थव्यवस्था माना जाता है।"
    };
  }

  return null;
}

/* ========= MCQ ELIGIBILITY ========= */

function isMCQEligible(fact) {
  return !!fact.question && !!fact.answer;
}

/* ========= MCQ BUILDER ========= */

function buildMCQ(fact) {
  const wrongOptions = generateWrongOptions(fact.answer);
  let options = shuffle([fact.answer, ...wrongOptions.slice(0, 2)]);
  options.push("कोई नहीं");

  const correctIndex = options.indexOf(fact.answer);

  return {
    q: fact.question,
    a: options[0],
    b: options[1],
    c: options[2],
    d: options[3],
    correct: ["A","B","C","D"][correctIndex],
    exp: "व्याख्या: " + fact.explanation
  };
}

/* ========= HELPERS ========= */

function generateWrongOptions(correct) {
  const pool = [
    "केवल निजी क्षेत्र",
    "केवल कृषि क्षेत्र",
    "केंद्र सरकार",
    "राज्य सरकार",
    "कोई उल्लेख नहीं"
  ];
  return pool.filter(p => p !== correct);
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/* ========= DEDUPLICATION ========= */

function addUnique(arr, item, seen, type) {
  const key = type === "MCQ"
    ? item.q + "|" + item.correct
    : item;

  if (seen.has(key)) return;
  seen.add(key);
  arr.push(item);
   }
