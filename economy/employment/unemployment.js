/* =========================================================
   Unemployment Engine
   File: economy/employment/unemployment.js
   Purpose: Extract exam-grade facts about
            Types, causes and features of unemployment
========================================================= */

window.UnemploymentEngine = function(lines, facts){

/* ========= OPEN UNEMPLOYMENT ========= */
lines.forEach(line => {

  if(
    (line.includes("बेरोजगार") || line.includes("नौकरी नहीं") || line.includes("काम नहीं")) &&
    (line.includes("ढूंढ") || line.includes("खोज"))
  ){
    facts.push({
      q: "खुली बेरोजगारी से क्या तात्पर्य है?",
      ans: "जब व्यक्ति काम करने को तैयार हो लेकिन उसे काम न मिले"
    });
  }

});


/* ========= DISGUISED UNEMPLOYMENT ========= */
lines.forEach(line => {

  if(
    (line.includes("छिपी") || line.includes("अधिक लोग") || line.includes("अनावश्यक")) &&
    (line.includes("कृषि") || line.includes("खेत"))
  ){
    facts.push({
      q: "छिपी बेरोजगारी का अर्थ क्या है?",
      ans: "जहाँ अधिक लोग काम कर रहे हों लेकिन उत्पादन नहीं बढ़ता"
    });
  }

});


/* ========= SEASONAL UNEMPLOYMENT ========= */
lines.forEach(line => {

  if(
    (line.includes("मौसमी") || line.includes("फसल") || line.includes("ऋतु")) &&
    (line.includes("काम"))
  ){
    facts.push({
      q: "मौसमी बेरोजगारी किससे संबंधित होती है?",
      ans: "कृषि जैसी मौसमी गतिविधियों से"
    });
  }

});


/* ========= STRUCTURAL UNEMPLOYMENT ========= */
lines.forEach(line => {

  if(
    (line.includes("कौशल") || line.includes("तकनीक") || line.includes("संरचना")) &&
    (line.includes("मिलान नहीं"))
  ){
    facts.push({
      q: "संरचनात्मक बेरोजगारी का मुख्य कारण क्या होता है?",
      ans: "कौशल और नौकरियों के बीच असंतुलन"
    });
  }

});


/* ========= EDUCATED UNEMPLOYMENT ========= */
lines.forEach(line => {

  if(
    (line.includes("शिक्षित") || line.includes("डिग्री")) &&
    (line.includes("नौकरी नहीं"))
  ){
    facts.push({
      q: "शिक्षित बेरोजगारी से क्या तात्पर्य है?",
      ans: "पढ़े-लिखे लोगों को नौकरी न मिलना"
    });
  }

});


/* ========= CYCLICAL UNEMPLOYMENT ========= */
lines.forEach(line => {

  if(
    (line.includes("मंदी") || line.includes("आर्थिक संकट")) &&
    (line.includes("रोजगार"))
  ){
    facts.push({
      q: "आर्थिक मंदी के कारण उत्पन्न बेरोजगारी को क्या कहते हैं?",
      ans: "चक्रिय बेरोजगारी"
    });
  }

});


/* ========= CAUSE BASED ========= */
lines.forEach(line => {

  if(
    (line.includes("जनसंख्या") || line.includes("आबादी")) &&
    (line.includes("तेज़"))
  ){
    facts.push({
      q: "भारत में बेरोजगारी का एक प्रमुख कारण क्या है?",
      ans: "तेज़ जनसंख्या वृद्धि"
    });
  }

});

};
