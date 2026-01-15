/* =========================================================
   Employment Trends Engine
   File: economy/employment/trends.js
   Purpose: Detect trends in employment from any article
            and convert them into exam-grade facts
========================================================= */

window.EmploymentTrendsEngine = function(lines, facts){

/* ========= OVERALL EMPLOYMENT TREND ========= */
lines.forEach(line => {

  if(
    (line.includes("रोजगार") || line.includes("employment")) &&
    (line.includes("बढ़") || line.includes("वृद्धि") || line.includes("increase"))
  ){
    facts.push({
      q: "हाल के वर्षों में रोजगार की प्रवृत्ति कैसी रही है?",
      ans: "रोजगार में वृद्धि हुई है"
    });
  }

  if(
    (line.includes("रोजगार") || line.includes("employment")) &&
    (line.includes("घट") || line.includes("कमी") || line.includes("decline"))
  ){
    facts.push({
      q: "हाल के वर्षों में रोजगार की प्रवृत्ति कैसी रही है?",
      ans: "रोजगार में गिरावट आई है"
    });
  }

});


/* ========= SECTORAL TRENDS ========= */
lines.forEach(line => {

  if(
    line.includes("सेवा") &&
    (line.includes("रोजगार") || line.includes("नौकरी"))
  ){
    facts.push({
      q: "हाल के वर्षों में किस क्षेत्र में रोजगार सबसे तेज़ी से बढ़ा है?",
      ans: "सेवा क्षेत्र"
    });
  }

  if(
    line.includes("उद्योग") &&
    (line.includes("रोजगार") || line.includes("नौकरी"))
  ){
    facts.push({
      q: "उद्योग क्षेत्र में रोजगार किससे संबंधित है?",
      ans: "उत्पादन और निर्माण गतिविधियों से"
    });
  }

  if(
    line.includes("कृषि") &&
    (line.includes("रोजगार") || line.includes("कामगार"))
  ){
    facts.push({
      q: "भारत में सबसे अधिक रोजगार कौन सा क्षेत्र प्रदान करता है?",
      ans: "कृषि क्षेत्र"
    });
  }

});


/* ========= URBAN vs RURAL ========= */
lines.forEach(line => {

  if(
    (line.includes("ग्रामीण") && line.includes("रोजगार")) ||
    (line.includes("rural") && line.includes("employment"))
  ){
    facts.push({
      q: "ग्रामीण क्षेत्रों में रोजगार का मुख्य स्रोत क्या है?",
      ans: "कृषि और उससे जुड़ी गतिविधियाँ"
    });
  }

  if(
    (line.includes("शहरी") && line.includes("रोजगार")) ||
    (line.includes("urban") && line.includes("employment"))
  ){
    facts.push({
      q: "शहरी क्षेत्रों में रोजगार मुख्यतः किससे जुड़ा होता है?",
      ans: "उद्योग और सेवा क्षेत्र"
    });
  }

});


/* ========= COVID / CRISIS IMPACT ========= */
lines.forEach(line => {

  if(
    line.includes("कोविड") ||
    line.includes("महामारी") ||
    line.includes("crisis")
  ){
    facts.push({
      q: "कोविड-19 का रोजगार पर क्या प्रभाव पड़ा?",
      ans: "रोजगार में भारी गिरावट आई"
    });
  }

});


/* ========= INFORMAL TO FORMAL SHIFT ========= */
lines.forEach(line => {

  if(
    line.includes("औपचारिक") ||
    line.includes("formal")
  ){
    facts.push({
      q: "हाल के वर्षों में रोजगार किस दिशा में स्थानांतरित हो रहा है?",
      ans: "अनौपचारिक से औपचारिक क्षेत्र की ओर"
    });
  }

});

};
