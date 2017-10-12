// ==UserScript==
// @name        Zooniverse Gamified
// @namespace   colaboratorio
// @description Adds a layer of gamification to Zooniverse
// @match       *://www.zooniverse.org/*
// @version     1
// ==/UserScript==
//window.addEventListener("load", function (){

  console.log("Welcome to Zooniverse Gamified!");
  if ((window.location.href.indexOf('classify') > -1)) {
	  var awaiting = setInterval(function() { //Se podrá hacer con Promise?
	    var classifierElement = document.querySelector('.classifier');
	    if (classifierElement != undefined) {
	      clearInterval(awaiting);
	      addScoreboard();
	    }
	  }, 100);
	  function addScoreboard() {
	    //var styleLink = document.createElement("LINK");
	    //styleLink.setAttribute("rel", "stylesheet");
	    //styleLink.setAttribute("type", "text/css");
	    //styleLink.setAttribute("href", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
	    //document.head.appendChild(styleLink);



	  	var tableStyle = '.table {  width: 100%;  max-width: 100%;  margin-bottom: @line-height-computed;  > thead,  > tbody,  > tfoot {    > tr {      > th,      > td {        adding: @table-cell-padding;        line-height: @line-height-base;        vertical-align: top;        border-top: 1px solid @table-border-color;      }    }  }  > thead > tr > th {    vertical-align: bottom;    border-bottom: 2px solid @table-border-color;  }  > caption + thead,  > colgroup + thead,  > head:first-child {    > tr:first-child {      > th,      > td {        border-top: 0;      }    }  }  > tbody + tbody {    border-top: 2px solid @table-order-color;  }  .table {    background-color: @body-bg;  } }';

	    var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(tableStyle));
      document.head.appendChild(style);

	    console.log("Found classify element");

      var scoreboardDiv = document.createElement('div');
      var scoreboardTable = document.createElement("table");
      scoreboardTable.className = 'table';
      scoreboardTable.id = "tablaPuntaje";
      console.log("Table created");
      var row = scoreboardTable.insertRow();
      var nickCell = row.insertCell(0);
      var scoreCell = row.insertCell(-1);
      var row2 = scoreboardTable.insertRow();
      var nickCell2 = row2.insertCell(0);
      var scoreCell2 = row2.insertCell(-1);
      nickCell.innerHTML = "Nickname";
      scoreCell.innerHTML = "Score";
			nickCell2.innerHTML = "lomejor";
      scoreCell2.innerHTML = "100";
      scoreboardDiv.appendChild(scoreboardTable); //Meter una tabla acá
      console.log("Appended table to div");	
      document.getElementsByClassName('task-area')[0].parentNode.insertBefore(scoreboardDiv, document.getElementsByClassName('task-area')[0].nextSibling);
	  }
}
