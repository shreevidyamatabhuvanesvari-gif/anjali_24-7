/* ======================================================
   🧠 ANJALI – CENTRAL EXAM BRAIN
   Real Exam-Grade Engine (NO DUMMY CODE)
====================================================== */

/* ========== IMPORT EMPLOYMENT SUB-ENGINES ========== */

import { workforceEngine } from "./economy/employment/workforce.js";
import { sectoralEngine } from "./economy/employment/sectoral.js";
import { unemploymentEngine } from "./economy/employment/unemployment.js";
import { indicatorsEngine } from "./economy/employment/indicators.js";
import { trendsEngine } from "./economy/employment/trends.js";
import { schemesEngine } from "./economy/employment/schemes.js";
import { informalEngine } from "./economy/employment/informal.js";

/* ========== ENGINE REGISTRY ========== */

const ENGINE_REGISTRY = {
  "General Knowledge.D. Economy": [
    workforceEngine,
    sectoralEngine,
    unemploymentEngine,
    indicatorsEngine,
    trendsEngine,
    schemesEngine,
    informalEngine
  ]
};

/* ======================================================
   🔥 MAIN FUNCTION CALLED BY control.html
====================================================== */

export function extractExamFacts(articleText, context) {

  const engines = ENGINE_REGISTRY[context];
  if (!engines) {
    console.warn("No engine found for:", context);
    return [];
  }

  let allFacts = [];

  engines.forEach(engine => {
    try {
      const facts = engine(articleText);
      if (Array.isArray(facts)) {
        allFacts.push(...facts);
      }
    } catch (e) {
      console.error("Engine failed:", engine.name, e);
    }
  });

  const cleanFacts = deduplicateFacts(allFacts);
  return convertFactsToMCQ(cleanFacts);
}

/* ======================================================
   🧹 REMOVE DUPLICATES
====================================================== */

function deduplicateFacts(facts) {
  const seen = new Set();
  return facts.filter(f => {
    const key = f.q + "|" + f.ans;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* ======================================================
   🎯 FACT → EXAM MCQ
====================================================== */

function convertFactsToMCQ(facts) {
  return facts.map(f => {

    const wrong = generateWrongOptions(f.ans);
    const options = shuffle([f.ans, wrong[0], wrong[1]]);
    options.push("कोई नहीं");

    const correct = ["A","B","C","D"][options.indexOf(f.ans)];

    return {
      q: f.q,
      options,
      correct,
      explain: "व्याख्या: लेख के अनुसार सही उत्तर — " + f.ans
    };
  });
}

/* ======================================================
   🔧 HELPERS
====================================================== */

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function generateWrongOptions(correct) {
  const pool = [
    "केवल निजी क्षेत्र",
    "अस्थायी प्रवृत्ति",
    "सरकारी नियंत्रण नहीं",
    "कोई उल्लेख नहीं",
    "केवल सेवा क्षेत्र"
  ];
  return pool.filter(x => x !== correct);
}
