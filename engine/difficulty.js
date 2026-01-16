/* ======================================================
   🧠 DIFFICULTY & PATTERN ANALYSER
   Exam-grade intelligence layer
====================================================== */

/**
 * Difficulty तय करता है:
 * Easy / Medium / Hard
 */
export function assignDifficulty(mcq) {
  const q = mcq.q || "";
  const exp = mcq.exp || "";

  // 1️⃣ Direct year / date based → Easy
  if (q.match(/\b(18|19|20)\d{2}\b/)) {
    return "Easy";
  }

  // 2️⃣ Direct institution / body → Easy
  if (
    q.includes("कौन") &&
    (q.includes("रिज़र्व बैंक") ||
     q.includes("RBI") ||
     q.includes("सरकार"))
  ) {
    return "Easy";
  }

  // 3️⃣ Cause–Effect / Purpose based → Hard
  if (
    q.includes("क्यों") ||
    q.includes("उद्देश्य") ||
    q.includes("परिणाम") ||
    q.includes("प्रभाव")
  ) {
    return "Hard";
  }

  // 4️⃣ Reform / Policy + year → Medium
  if (
    q.includes("उदारीकरण") ||
    q.includes("सुधार") ||
    exp.includes("विकास")
  ) {
    return "Medium";
  }

  // Default
  return "Medium";
}

/**
 * Exam Pattern पहचानता है:
 * PYQ-like / Conceptual / Factual
 */
export function detectPattern(mcq) {
  const q = mcq.q || "";

  // PYQ style: short + direct
  if (
    q.length < 60 &&
    (q.includes("कब") || q.includes("कौन"))
  ) {
    return "PYQ-like";
  }

  // Conceptual
  if (
    q.includes("उद्देश्य") ||
    q.includes("प्रभाव") ||
    q.includes("महत्व")
  ) {
    return "Conceptual";
  }

  // Default factual
  return "Factual";
}
