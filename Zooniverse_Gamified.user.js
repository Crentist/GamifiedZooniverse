// ==UserScript==
// @name        Zooniverse Gamified
// @namespace   colaboratorio
// @description Adds a layer of gamification to Zooniverse
// @match       *://www.zooniverse.org/*
// @version     1
// ==/UserScript==
//window.addEventListener("load", function (){

  console.log("Welcome to Zooniverse Gamified!");
  var awaiting = setInterval(function() {
    var classifierElement = document.querySelector('.classifier');
    if (classifierElement != undefined) {
      clearInterval(awaiting);
      //Llamar a lo de abajo una vez que sé que cargó el elemento
    }
    console.log("DALEs " , classifierElement);
  }, 1000);
  //"use strict";
  
  //var tt;
  //tt = window.location.href;
  //console.log("What? : " + tt);
  if ((window.location.href.indexOf('classify') > -1)) {
    console.log("Found classify element");
    
    lol = document.getElementsByClassName('classifier');
    console.log("DALEs " + lol[0]);
    document.getElementsByClassName('classifier')[0].addEventListener("load", addScoreboardDiv);
    function addScoreboardDiv() {
      console.log("Loaded classifier element");
      var scoreboardDiv = document.createElement('div');
      scoreboardDiv.appendChild(document.createTextNode('Testing'));
      document.getElementsByClassName('task-area')[0].parentNode.insertBefore(scoreboardDiv, document.getElementsByClassName('task-area')[0].nextSibling);
    }
  }
//});
