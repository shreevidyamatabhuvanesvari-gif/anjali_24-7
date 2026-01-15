/* =========================================================
   Employment Indicators Engine
   File: economy/employment/indicators.js
   Purpose: Extract exam-grade indicators related to
            employment & unemployment from any article
========================================================= */

window.EmploymentIndicatorsEngine = function(lines, facts){

/* ========= UNEMPLOYMENT RATE ========= */
lines.forEach(line => {

  if(
    (line.includes("बेरोजगारी दर") || line.includes("Unemployment Rate")) &&
    (line.includes("%") || line.includes("प्रतिशत"))
  ){
    facts.push({
      q: "बेरोजगारी दर से क्या मापा जाता है?",
      ans: "काम करने योग्य श्रम शक्ति में बेरोजगारों का प्रतिशत"
    });
  }

});


/* ========= LABOUR FORCE ========= */
lines.forEach(line => {

  if(
    (line.includes("श्रम शक्ति") || line.includes("Labour Force")) &&
    (line.includes("काम") || line.includes("रोजगार"))
  ){
    facts.push({
      q: "श्रम शक्ति में किन लोगों को शामिल किया जाता है?",
      ans: "काम करने वाले और काम खोजने वाले दोनों"
    });
  }

});


/* ========= LFPR ========= */
lines.forEach(line => {

  if(
    line.includes("LFPR") ||
    (line.includes("श्रम भागीदारी") && line.includes("दर"))
  ){
    facts.push({
      q: "LFPR का पूर्ण रूप क्या है?",
      ans: "Labour Force Participation Rate"
    });
  }

});


/* ========= WORKER POPULATION RATIO ========= */
lines.forEach(line => {

  if(
    line.includes("WPR") ||
    (line.includes("कार्यशील जनसंख्या") && line.includes("अनुपात"))
  ){
    facts.push({
      q: "WPR से क्या मापा जाता है?",
      ans: "कुल जनसंख्या में कार्यरत लोगों का अनुपात"
    });
  }

});


/* ========= PLFS ========= */
lines.forEach(line => {

  if(
    line.includes("PLFS") ||
    (line.includes("आवधिक श्रम") && line.includes("सर्वेक्षण"))
  ){
    facts.push({
      q: "PLFS किससे संबंधित सर्वेक्षण है?",
      ans: "रोजगार और बेरोजगारी से"
    });
  }

});


/* ========= NSSO ========= */
lines.forEach(line => {

  if(
    line.includes("NSSO") ||
    line.includes("राष्ट्रीय नमूना सर्वेक्षण")
  ){
    facts.push({
      q: "NSSO का मुख्य कार्य क्या है?",
      ans: "रोजगार और सामाजिक-आर्थिक आँकड़े एकत्र करना"
    });
  }

});


/* ========= PERIODICITY ========= */
lines.forEach(line => {

  if(
    (line.includes("वार्षिक") || line.includes("त्रैमासिक")) &&
    (line.includes("रोजगार") || line.includes("आँकड़े"))
  ){
    facts.push({
      q: "रोजगार से जुड़े आँकड़े कितनी अवधि में जारी किए जाते हैं?",
      ans: "वार्षिक और त्रैमासिक आधार पर"
    });
  }

});

};
