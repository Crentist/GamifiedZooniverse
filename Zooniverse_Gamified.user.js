// ==UserScript==
// @name        Zooniverse Gamified
// @namespace   colaboratorio
// @description Adds a layer of gamification to Zooniverse
// @match       *://www.zooniverse.org/*
// @version     1
// ==/UserScript==
//window.addEventListener("load", function (){

	serverUrl = "http://localhost:3000"

  console.log("Welcome to Zooniverse Gamified!");
  if ((window.location.href.indexOf('classify') > -1)) {
	  var awaiting = setInterval(function() { //Se podrá hacer con Promise?
	    var classifierElement = document.querySelector('.classifier');
	    if (classifierElement != undefined) {
	      clearInterval(awaiting);
	      addScoreboard();
	    }
	  }, 100);

		function doPostRequest(url, parameters) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(parameters);	
			console.log(xhr.responseText);
		}

	  function addScoreboard() {
	    //var styleLink = document.createElement("LINK");
	    //styleLink.setAttribute("rel", "stylesheet");
	    //styleLink.setAttribute("type", "text/css");
	    //styleLink.setAttribute("href", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
	    //document.head.appendChild(styleLink);



	  	var tableStyle = `element {
												}
												.table > caption + thead > tr:first-child > td, .table > caption + thead > tr:first-child > th, .table > colgroup + thead > tr:first-child > td, .table > colgroup + thead > tr:first-child > th, .table > thead:first-child > tr:first-child > td, .table > thead:first-child > tr:first-child > th {
												    border-top: 0;
												}
												.table > thead > tr > th {
												    vertical-align: bottom;
												    border-bottom: 2px solid #ddd;
												}
												.table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
												    padding: 8px;
												    line-height: 1.42857143;
												    vertical-align: top;
												    border-top: 1px solid #ddd;
												}
												table {
												    border-spacing: 0;
												    border-collapse: collapse;
												}`;

	    var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(tableStyle));
      document.head.appendChild(style);

	    console.log("Found classify element");
			if (document.getElementsByClassName('field-guide-pullout-toggle')[0] != null) {
 				var containerDiv = document.getElementsByClassName('field-guide-pullout-toggle')[0].parentNode;
 				var node = document.createElement("strong");               
				var textnode = document.createTextNode("Puntoh");        
				node.appendChild(textnode);  
		    var botonScore = document.createElement('button');
		    botonScore.type = 'button';
		    botonScore.className = 'field-guide-pullout-toggle';
		    botonScore.appendChild(node);
		    containerDiv.insertBefore(botonScore, document.getElementsByClassName('field-guide-pullout-toggle')[0].nextSibling);
	  	}
	    //Esto por ahí sirve para algo. Agrega un botón que despliega, al costado. Funciona solamente con proyectos que andan, creo, que tienen 'Field Guide'. Por ahí garpa poner los puntos ahí, para que no moleste en otro lado.

	    //document.getElementsByClassName('tabbed-content-tab')[0].text >> esto obtiene el nombre del proyecto
	    //document.getElementsByClassName('continue major-button')[0] >> el botón de Next o Done. Adentro tienen un span que tiene el texto que corresponde
	    //document.getElementsByClassName('drawing-tool-button-input') >> indica que la tarea es de tipo dibujo


	    //projectName = JSON.stringify(document.getElementsByClassName('tabbed-content-tab')[0].text);
	    //if (projectName != null) {
		    //params = JSON.stringify({"name": projectName});
		    //doPostRequest(serverUrl + "/projects", params);
	  	//}

	    //Div + tabla de puntos
      var scoreboardDiv = document.createElement('div');
      var scoreboardTable = document.createElement("table");
      scoreboardTable.className = 'table';
      scoreboardTable.id = "tablaPuntaje";
      console.log("Table created");

      var row = scoreboardTable.insertRow();
      row.style.backgroundColor = "#43bbfd";
      var nickCell = row.insertCell(0);
      var scoreCell = row.insertCell(-1);
      nickCell.innerHTML = "Nickname";
      scoreCell.innerHTML = "Score";

      var row2 = scoreboardTable.insertRow();
      var nickCell2 = row2.insertCell(0);
      var scoreCell2 = row2.insertCell(-1);

			nickCell2.innerHTML = "lomejor";
      scoreCell2.innerHTML = "100";

      //En estos tres últimos bloques del código tengo que primero pedir los colaboradores del proyecto a la API, y luego crear la tabla dentro de algún iterador

      scoreboardDiv.appendChild(scoreboardTable);
      console.log("Appended table to div");	
      document.getElementsByClassName('task-area')[0].parentNode.insertBefore(scoreboardDiv, document.getElementsByClassName('task-area')[0].nextSibling);
	  }
}
