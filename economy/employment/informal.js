/* =========================================================
   Informal Sector (Unorganised Sector) Engine
   File: economy/employment/informal.js
   Purpose: Extract informal sector related employment facts
            and convert them into exam-grade Q&A
========================================================= */

window.EmploymentInformalEngine = function(lines, facts){

/* ========= IDENTIFICATION ========= */
lines.forEach(line => {

  if(line.includes("असंगठित") || line.includes("अनौपचारिक") || line.includes("Informal")){
    facts.push({
      q: "असंगठित (Informal) क्षेत्र का क्या अर्थ है?",
      ans: "वह क्षेत्र जहाँ काम नियमित और कानूनी सुरक्षा के बिना होता है"
    });
  }

});


/* ========= WORKERS IN INFORMAL SECTOR ========= */
lines.forEach(line => {

  if(line.includes("मजदूर") || line.includes("दिहाड़ी") || line.includes("घरेलू")){
    facts.push({
      q: "असंगठित क्षेत्र के श्रमिकों की मुख्य विशेषता क्या होती है?",
      ans: "उन्हें निश्चित वेतन और सुरक्षा नहीं मिलती"
    });
  }

});


/* ========= SIZE OF INFORMAL SECTOR ========= */
lines.forEach(line => {

  if(line.includes("अधिकांश") && line.includes("रोजगार")){
    facts.push({
      q: "भारत में अधिकांश लोग किस क्षेत्र में कार्य करते हैं?",
      ans: "असंगठित क्षेत्र"
    });
  }

});


/* ========= PROBLEMS ========= */
lines.forEach(line => {

  if(line.includes("सुरक्षा") || line.includes("बीमा") || line.includes("पेंशन")){
    facts.push({
      q: "असंगठित क्षेत्र के श्रमिकों को किसका अभाव रहता है?",
      ans: "सामाजिक सुरक्षा"
    });
  }

});


/* ========= GOVERNMENT CONCERN ========= */
lines.forEach(line => {

  if(line.includes("सरकार") && line.includes("असंगठित")){
    facts.push({
      q: "सरकार असंगठित क्षेत्र के श्रमिकों के लिए क्या करना चाहती है?",
      ans: "उन्हें सामाजिक और आर्थिक सुरक्षा प्रदान करना"
    });
  }

});


/* ========= EXAM LEVEL CONCEPT ========= */
lines.forEach(line => {

  if(line.includes("ठेका") || line.includes("अस्थायी")){
    facts.push({
      q: "असंगठित क्षेत्र की रोजगार प्रकृति कैसी होती है?",
      ans: "अस्थायी और अनिश्चित"
    });
  }

});

};
