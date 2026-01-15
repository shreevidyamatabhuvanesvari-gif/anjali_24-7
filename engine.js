/* ======================================================
   🧠 ANJALI – CENTRAL EXAM BRAIN
   This file connects all domain engines
====================================================== */

/* =================== IMPORT ALL ENGINES =================== */

import { workforceEngine } from "./economy/employment/workforce.js";
import { sectoralEngine } from "./economy/employment/sectoral.js";
import { unemploymentEngine } from "./economy/employment/unemployment.js";
import { indicatorsEngine } from "./economy/employment/indicators.js";
import { trendsEngine } from "./economy/employment/trends.js";
import { schemesEngine } from "./economy/employment/schemes.js";
import { informalEngine } from "./economy/employment/informal.js";

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

/* =================== MASTER EXTRACTOR =================== */

export function extractExamFacts(articleText, domainPath) {

  let engines = ENGINE_REGISTRY[domainPath];
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

/* =================== REMOVE DUPLICATES =================== */

function deduplicateFacts(facts) {
  const seen = new Set();
  return facts.filter(f => {
    const key = f.q + "|" + f.ans;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* =================== MCQ GENERATOR =================== */

export function convertFactsToMCQ(facts) {
  return facts.map(f => {
    let wrong = generateWrongOptions(f.ans);
    let options = shuffle([f.ans, ...wrong.slice(0,2)]);
    options.push("कोई नहीं");

    let correct = ["A","B","C","D"][options.indexOf(f.ans)];

    return {
      q: f.q,
      a: options[0],
      b: options[1],
      c: options[2],
      d: options[3],
      correct: correct,
      exp: "व्याख्या: " + f.ans + " लेख के अनुसार सही है।"
    };
  });
}

/* =================== HELPERS =================== */

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function generateWrongOptions(correct) {
  return [
    "केवल निजी क्षेत्र",
    "अस्थायी प्रवृत्ति",
    "सरकारी नियंत्रण नहीं",
    "कोई उल्लेख नहीं"
  ].filter(x => x !== correct);
}
