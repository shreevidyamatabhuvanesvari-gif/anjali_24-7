/* =========================================================
   Sectoral Employment Engine
   File: economy/employment/sectoral.js
   Purpose: Extract exam-grade facts about
            Primary, Secondary & Tertiary sector jobs
========================================================= */

window.SectoralEmploymentEngine = function(lines, facts){

/* ========= PRIMARY SECTOR ========= */
lines.forEach(line => {

  if(
    (line.includes("कृषि") || line.includes("खेती") || line.includes("मछली") || line.includes("खनन")) &&
    (line.includes("रोजगार") || line.includes("लोग") || line.includes("काम"))
  ){
    facts.push({
      q: "प्राथमिक क्षेत्र से जुड़े रोजगार किन गतिविधियों पर आधारित होते हैं?",
      ans: "कृषि, खनन, पशुपालन और मत्स्य पालन"
    });
  }

});


/* ========= SECONDARY SECTOR ========= */
lines.forEach(line => {

  if(
    (line.includes("उद्योग") || line.includes("कारखाना") || line.includes("निर्माण")) &&
    (line.includes("रोजगार") || line.includes("काम"))
  ){
    facts.push({
      q: "द्वितीयक क्षेत्र के रोजगार किस गतिविधि से जुड़े होते हैं?",
      ans: "उत्पादन और निर्माण कार्य"
    });
  }

});


/* ========= TERTIARY SECTOR ========= */
lines.forEach(line => {

  if(
    (line.includes("सेवा") || line.includes("बैंक") || line.includes("शिक्षा") || line.includes("स्वास्थ्य") || line.includes("आईटी")) &&
    (line.includes("रोजगार") || line.includes("काम"))
  ){
    facts.push({
      q: "तृतीयक क्षेत्र के रोजगार किन क्षेत्रों से संबंधित होते हैं?",
      ans: "सेवा, बैंकिंग, शिक्षा, स्वास्थ्य और आईटी"
    });
  }

});


/* ========= SECTORAL SHIFT ========= */
lines.forEach(line => {

  if(
    (line.includes("कृषि से") && line.includes("सेवा")) ||
    (line.includes("क्षेत्रों में बदलाव")) ||
    (line.includes("रोजगार संरचना"))
  ){
    facts.push({
      q: "भारत में रोजगार का क्षेत्रीय परिवर्तन किस दिशा में हो रहा है?",
      ans: "कृषि से उद्योग और सेवा क्षेत्र की ओर"
    });
  }

});


/* ========= SECTOR WITH MAX EMPLOYMENT ========= */
lines.forEach(line => {

  if(
    (line.includes("सबसे अधिक") || line.includes("ज्यादा")) &&
    (line.includes("रोजगार")) &&
    (line.includes("कृषि"))
  ){
    facts.push({
      q: "भारत में सबसे अधिक रोजगार किस क्षेत्र में है?",
      ans: "कृषि क्षेत्र"
    });
  }

});

};
