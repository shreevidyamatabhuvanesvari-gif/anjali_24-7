/* =========================================================
   Employment Government Schemes Engine
   File: economy/employment/schemes.js
   Purpose: Extract employment-related government schemes
            from any article and convert them into
            exam-grade facts
========================================================= */

window.EmploymentSchemesEngine = function(lines, facts){

/* ========= MAJOR EMPLOYMENT SCHEMES ========= */
lines.forEach(line => {

  if(line.includes("मनरेगा") || line.includes("MGNREGA")){
    facts.push({
      q: "ग्रामीण क्षेत्रों में रोजगार प्रदान करने की प्रमुख योजना कौन-सी है?",
      ans: "मनरेगा (MGNREGA)"
    });
  }

  if(line.includes("प्रधानमंत्री रोजगार") || line.includes("PMEGP")){
    facts.push({
      q: "स्वरोजगार को बढ़ावा देने की सरकारी योजना कौन-सी है?",
      ans: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)"
    });
  }

  if(line.includes("मुद्रा") || line.includes("Mudra")){
    facts.push({
      q: "सूक्ष्म उद्यमियों को ऋण देने की योजना कौन-सी है?",
      ans: "प्रधानमंत्री मुद्रा योजना"
    });
  }

  if(line.includes("स्टार्टअप") || line.includes("Startup")){
    facts.push({
      q: "युवाओं को उद्यमिता के लिए प्रोत्साहित करने की योजना कौन-सी है?",
      ans: "स्टार्टअप इंडिया"
    });
  }

  if(line.includes("स्किल") || line.includes("कौशल") || line.includes("Skill India")){
    facts.push({
      q: "युवाओं को रोजगार योग्य बनाने की योजना कौन-सी है?",
      ans: "स्किल इंडिया मिशन"
    });
  }

  if(line.includes("रोजगार मेला") || line.includes("Rozgar Mela")){
    facts.push({
      q: "सरकार द्वारा आयोजित रोजगार प्रदान करने की पहल को क्या कहा जाता है?",
      ans: "रोजगार मेला"
    });
  }

});


/* ========= WOMEN & YOUTH EMPLOYMENT ========= */
lines.forEach(line => {

  if(line.includes("महिला") && line.includes("रोजगार")){
    facts.push({
      q: "सरकार द्वारा महिला रोजगार बढ़ाने का मुख्य उद्देश्य क्या है?",
      ans: "महिलाओं को आर्थिक रूप से आत्मनिर्भर बनाना"
    });
  }

  if(line.includes("युवा") && line.includes("रोजगार")){
    facts.push({
      q: "युवाओं के लिए रोजगार योजनाओं का मुख्य उद्देश्य क्या है?",
      ans: "बेरोज़गारी कम करना"
    });
  }

});


/* ========= RURAL vs URBAN SCHEMES ========= */
lines.forEach(line => {

  if(line.includes("ग्रामीण") && line.includes("योजना")){
    facts.push({
      q: "ग्रामीण रोजगार योजनाओं का मुख्य लक्ष्य क्या है?",
      ans: "ग्रामीण गरीबी और बेरोज़गारी को कम करना"
    });
  }

  if(line.includes("शहरी") && line.includes("रोजगार")){
    facts.push({
      q: "शहरी रोजगार योजनाओं का उद्देश्य क्या है?",
      ans: "शहरी बेरोज़गारों को काम उपलब्ध कराना"
    });
  }

});


};
