/* ======================================================
   🧠 ANJALI – CENTRAL EXAM BRAIN (UPGRADED)
====================================================== */

/* =================== IMPORT SUB-ENGINES =================== */
import { workforceEngine } from "./economy/employment/workforce.js";
import { sectoralEngine } from "./economy/employment/sectoral.js";
import { unemploymentEngine } from "./economy/employment/unemployment.js";
import { indicatorsEngine } from "./economy/employment/indicators.js";
import { trendsEngine } from "./economy/employment/trends.js";
import { schemesEngine } from "./economy/employment/schemes.js";
import { informalEngine } from "./economy/employment/informal.js";

/* =================== IMPORT INTELLIGENCE =================== */
import {
  assignDifficulty,
  detectPattern
} from "./engine/difficulty.js";

/* =================== ENGINE REGISTRY =================== */
const ENGINE_REGISTRY = {
  "Economy.Employment": [
    workforceEngine,
    sectoralEngine,
    unemploymentEngine,
    indicatorsEngine,
    trendsEngine,
    schemesEngine,
    informalEngine
  ]
};

/* =================== MASTER FACT EXTRACTOR =================== */
export function extractExamFacts(articleText, domainPath) {
  const engines = ENGINE_REGISTRY[domainPath];
  if (!engines) return [];

  let allFacts = [];

  engines.forEach(engine => {
    try {
      const facts = engine(articleText);
      if (Array.isArray(facts)) {
        allFacts = allFacts.concat(facts);
      }
    } catch (e) {
      console.error("Engine failed:", engine.name, e);
    }
  });

  return deduplicateFacts(allFacts);
}

/* =================== FACT → MCQ (EXAM GRADE) =================== */
export function convertFactsToMCQ(facts) {
  return facts.map(fact => {

    const wrongOptions = generateWrongOptions(fact.ans);
    let options = shuffle([
      fact.ans,
      wrongOptions[0],
      wrongOptions[1]
    ]);
    options.push("कोई नहीं"); // D हमेशा

    const correctIndex = options.indexOf(fact.ans);
    const correct = ["A","B","C","D"][correctIndex];

    const mcq = {
      q: fact.q,
      a: options[0],
      b: options[1],
      c: options[2],
      d: options[3],
      correct: correct,
      exp: "व्याख्या: " + fact.ans + " लेख के अनुसार सही है।"
    };

    /* 🧠 INTELLIGENCE ATTACH */
    mcq.difficulty = assignDifficulty(mcq);
    mcq.pattern = detectPattern(mcq);

    return mcq;
  });
}

/* =================== HELPERS =================== */
function deduplicateFacts(facts) {
  const seen = new Set();
  return facts.filter(f => {
    const key = f.q + "|" + f.ans;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function generateWrongOptions(correct) {
  const pool = [
    "केवल निजी क्षेत्र",
    "सरकारी नियंत्रण नहीं",
    "अस्थायी प्रवृत्ति",
    "कोई उल्लेख नहीं"
  ];
  return pool.filter(x => x !== correct);
       }
