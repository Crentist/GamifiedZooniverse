// ==UserScript==
// @name        Zooniverse Gamified
// @namespace   colaboratorio
// @description Adds a layer of gamification to Zooniverse
// @match       *://www.zooniverse.org/*
// @version     1
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// ==/UserScript==
//window.addEventListener("load", function (){

	serverUrl = "http://localhost:3000";

  console.log("Welcome to Zooniverse Gamified!");

  if ((window.location.href.indexOf('classify') > -1)) {
  	console.log("Classifying")
	  var awaiting = setInterval(function() { //Se podrá hacer con Promise?
	    var classifierElement = document.querySelector('.classifier');
	    if (classifierElement != undefined) {
	      clearInterval(awaiting);
	      gameOn();
	    }
	  }, 100);

		function doGetRequest(url) {
			//console.log(url);

			var gmr = GM_xmlhttpRequest({
				method: "GET",
				url: url,
				headers: { "Content-Type": "application/json" },				
				onload: function(response) {
					return response;
				}
			});
			//console.log(gmr);

			//var xhr = new XMLHttpRequest();
			//xhr.open("POST", url, false);

			//Send the proper header information along with the request
			//xhr.setRequestHeader("Content-type", "application/json");
			//xhr.send(parameters);	
			//console.log(xhr.responseText);
		}	  

		function doPostRequest(url, parameters) {
			//console.log(url);

			var gmr = GM_xmlhttpRequest({
				method: "POST",
				url: url,
				data: parameters,
				headers: { "Content-Type": "application/json" },				
				onload: function(response) {
					return response;
				}
			});
			//console.log(gmr);

			//var xhr = new XMLHttpRequest();
			//xhr.open("POST", url, false);

			//Send the proper header information along with the request
			//xhr.setRequestHeader("Content-type", "application/json");
			//xhr.send(parameters);	
			//console.log(xhr.responseText);
		}

	  function gameOn() {
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
			/*if (document.getElementsByClassName('field-guide-pullout-toggle')[0] != null) {
 				var containerDiv = document.getElementsByClassName('field-guide-pullout-toggle')[0].parentNode;
 				var node = document.createElement("strong");               
				var textnode = document.createTextNode("Puntoh");        
				node.appendChild(textnode);  
		    var botonScore = document.createElement('button');
		    botonScore.type = 'button';
		    botonScore.className = 'field-guide-pullout-toggle';
		    botonScore.appendChild(node);
		    containerDiv.insertBefore(botonScore, document.getElementsByClassName('field-guide-pullout-toggle')[0].nextSibling);
	  	}*/


	    //Esto por ahí sirve para algo. Agrega un botón que despliega, al costado. Funciona solamente con proyectos que andan, creo, que tienen 'Field Guide'. Por ahí garpa poner los puntos ahí, para que no moleste en otro lado.

	    //document.getElementsByClassName('tabbed-content-tab')[0].text >> esto obtiene el nombre del proyecto
	    //document.getElementsByClassName('continue major-button')[0] >> el botón de Next o Done. Adentro tienen un span que tiene el texto que corresponde
	    //document.getElementsByClassName('drawing-tool-button-input') >> indica que la tarea es de tipo dibujo
	    //document.getElementsByClassName('site-nav__link')[9].children[0].innerHTML >> username logueado

	    projectName = JSON.stringify(document.getElementsByClassName('tabbed-content-tab')[0].text).replace(/"/g,"");

	    if (projectName != null) {
		    params = JSON.stringify({"name": projectName});
		    doPostRequest(serverUrl + "/projects", params);
	  	}

	  	if (document.getElementsByClassName('site-nav__link')[9] == undefined) {
	  		//No está logueado, debería para que ande. Poner un aviso en algún lado. Un alert ni da. Estaría bueno uno de esos cartelitos que hoverean. Para esto y para otras cosas
	  	} else {}
	  	var userList = JSON.parse(doGetRequest(serverUrl + "/users"));
	  	var loggedUser = document.getElementsByClassName('site-nav__link')[9].children[0].innerHTML.replace(/"/g,"");;
	  	if ( userList.find(o => o.zooniverseHandle === loggedUser) != undefined ) {
	  		params = JSON.stringify({"zooniverseHandle": loggedUser});
				doPostRequest(serverUrl + "/users", params);
	  	}

	    //Div + tabla de puntos
      var scoreboardDiv = document.createElement('div');
      scoreboardDiv.style.marginLeft = '1em';
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

      var scoreboardHeaderDiv = document.createElement('div');
      scoreboardHeaderDiv.style.textAlign = 'center';
      scoreboardHeaderDiv.style.padding = '5px 5px 5px 5px';
      var scoreboardHeader = document.createElement('strong');
      scoreboardHeader.innerHTML = "Tabla de puntajes";
      scoreboardHeaderDiv.appendChild(scoreboardHeader);
      scoreboardDiv.appendChild(scoreboardHeaderDiv);
      scoreboardDiv.appendChild(scoreboardTable);
      console.log("Appended table to div");	
      var taskArea = document.getElementsByClassName('task-area')[0];
      taskArea.parentNode.insertBefore(scoreboardDiv, document.getElementsByClassName('task-area')[0].nextSibling);

      var contributionDiv = document.createElement('div');
      contributionDiv.id = 'contributionDiv';
      var contributionHeaderDiv = document.createElement('div');
      contributionHeaderDiv.id = 'contributionHeaderDiv';
      contributionHeaderDiv.style.textAlign = 'center';
      contributionHeaderDiv.style.padding = '5px 5px 5px 5px';
      var strongTitleTextHolder = document.createElement('strong');
      strongTitleTextHolder.appendChild(document.createTextNode('Mi contribución en ' + projectName));
      contributionHeaderDiv.appendChild(strongTitleTextHolder);
      contributionDiv.appendChild(contributionHeaderDiv);

      var contributionDataDiv = document.createElement('div');
      var sinceSpan = document.createElement('span');
      sinceSpan.style.display = 'inline-block';
      var firstContributionDate = '01/01/1900'; //placeholder
      sinceSpan.innerHTML = 'Colaborando desde el <strong> '+ firstContributionDate +' </strong>';

      var lastContributionSpan = document.createElement('span');
      lastContributionSpan.style.float = 'right';
      lastContributionSpan.style.display = 'inline-block';
      var lastContributionDateTime = '12 horas'; //placeholder
      lastContributionSpan.innerHTML = 'Última contribución hace: <strong> '+ lastContributionDateTime +' </strong>';

      contributionDataDiv.appendChild(sinceSpan);
      contributionDataDiv.appendChild(lastContributionSpan);
      contributionDataDiv.appendChild(document.createElement('br'));
      contributionDataDiv.appendChild(document.createElement('br'));

      var classificationsDiv = document.createElement('div');
      classificationsDiv.style.width = '50%';
      classificationsDiv.style.textAlign = 'center';
      classificationsDiv.style.display = 'inline-block';
      var classificationsSpan = document.createElement('span');
      classificationsSpan.innerHTML = 'Clasificaciones';
      classificationsDiv.appendChild(classificationsSpan);
      classificationsDiv.appendChild(document.createElement('br'));
      var classificationCountSpan = document.createElement('span');
      var userClassificationCount = '52'; //placeholder
      classificationCountSpan.innerHTML = '<strong>' + userClassificationCount + '</strong>';
      classificationsDiv.appendChild(classificationCountSpan);
			classificationsDiv.appendChild(document.createElement('br'));

			contributionDataDiv.appendChild(classificationsDiv);

      var badgesDiv = document.createElement('div');
      badgesDiv.style.display = 'inline-block';
      badgesDiv.style.width = '20%';
      badgesDiv.style.position = 'absolute';
      badgesDiv.style.textAlign = 'center';

      var badgesStrong = document.createElement('strong');
      badgesStrong.style.display = 'inline-block';
      badgesStrong.innerHTML = 'Mis insignias';

      badgesDiv.appendChild(badgesStrong);
      badgesDiv.appendChild(document.createElement('br'));
      badgesDiv.appendChild(document.createElement('br'));
      badgesDiv.appendChild(document.createElement('br'));

      var nextMilestoneSpan = document.createElement('span');
      var milestoneText = document.createElement('font');
      milestoneText.size = '1';
      var milestoneValue = '48'; //Placeholder
      milestoneText.innerHTML = 'Realizá <strong> ' + milestoneValue + ' </strong> clasificaciones más para la siguiente insignia!';

      nextMilestoneSpan.appendChild(milestoneText);
      badgesDiv.appendChild(nextMilestoneSpan);

      contributionDataDiv.appendChild(badgesDiv);

      taskArea.appendChild(contributionDiv); //El div con lo de mi colaboración
      taskArea.appendChild(contributionDataDiv);



	  }
	}
