// ==UserScript==
// @name        Zooniverse Gamified
// @resource CSS https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require     https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js
// @namespace   colaboratorio
// @description Adds a layer of gamification to Zooniverse
// @include     *://www.zooniverse.org/*
// @version     1
// @grant       GM.addStyle
// @grant       GM.getResourceText
// @grant       GM.getResourceUrl
// @grant       GM.xmlhttpRequest
// @grant       unsafeWindow
// ==/UserScript==
//window.addEventListener("load", function (){

  serverUrl = "http://localhost:3000";
  var tasks = [];

  function doGetRequest(url) {
    var xhttp = GM.xmlhttpRequest({
      method: "GET",
      url: url,
      headers: { "Content-Type": "application/json" },        
      synchronous: true
    });
    return xhttp.responseText;
  }   

  function doPostRequest(url, parameters) {
    var xhttp = GM.xmlhttpRequest({
      method: "POST",
      url: url,
      data: parameters,
      headers: { "Content-Type": "application/json" },        
      synchronous: true
    });
    return xhttp.responseText;
  }

  function loadBoostrap() {
    var link = document.createElement("link");
    link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap-grid.min.css";
    link.rel="stylesheet";
    link.type="text/css";
    document.head.appendChild(link);
    //return link;
  }

  loadBootstrap();

  console.log("Welcome to Zooniverse Gamified!");

  //En la página de inicio

  //En el navbar
    //Si está logueado, si no lo está

  //En la pantalla principal del proyecto

  //En la clasificación de un proyecto. Funcionalidad específica para esa pantalla
  if ((window.location.href.indexOf('classify') > -1)) {
    console.log("Classifying")
    var awaiting = setInterval(function() { //Se podrá hacer con Promise?
      var classifierElement = document.querySelector('.classifier');
      if (classifierElement != undefined) {
        clearInterval(awaiting);
        gameOn();
      }
    }, 100);


    function userIsCollaborator(project, loggedUser) {
      if (project.collaborators != undefined) {
        return ((project.collaborators.find(o => o.zooniverseHandle === loggedUser)) != undefined);
      }
      return false;
    }

    function taskType() {
      if (document.getElementsByClassName('answer minor-button answer-button').length > 0) return "simpleQuestion";
      if (document.getElementsByClassName('drawing-tool-button-input').length > 0) return "drawing";
      return "notSupported";
    }

    function addEventToButton(project, user) {
      console.log("UGH dale loco");
      //console.log(project);
      //console.log(user);
      document.getElementsByClassName('continue major-button')[0].addEventListener("click", addEvent, false); 
      function addEvent() {
        var buttonText = document.getElementsByClassName('continue major-button')[0].children[0].innerHTML;
        if (buttonText == 'Done') {
          //POSTear los puntos. Generar la colaboración si es necesario, y luego sumar los puntos.
          console.log(project);
          if (!(userIsCollaborator(project,user))) {
            params = JSON.stringify({"user_id": user.id, "project_id": project.id});
            console.log(project.id);
            console.log(params);
            doPostRequest(serverUrl + "/projects/"+project.id+"/collaborations", params);
          } 
          params = JSON.stringify({"tasks": tasks});
          var userCollaboration = doGetRequest("/users/"+user.id+"/collaboration/"+project.id);
          doPostRequest(serverUrl + "/projects/"+project.id+"/collaborations/"+userCollaboration.id+"/increment", params);    
          tasks = [];     
        } else if (buttonText == 'Next') {
          //Agregar el tipo de tarea que se acaba de resolver. Si el Next indica que se pasa a la siguiente tarea, no hacer nada.
          if (document.getElementsByClassName('classification-summary')[0] == undefined) {
            tasks.push(taskType());
          }
          console.log("tareas so far:");
          console.log(tasks);
        }

      }     
    }


    function gameOn() {
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

      //document.getElementsByClassName('continue major-button')[0] >> el botón de Next o Done. Adentro tienen un span que tiene el texto que corresponde
      //addEventToButton(project, user);
      //document.getElementsByClassName('continue major-button')[0].addEventListener("change", addEventToButton(project, user)); 
      

      //document.getElementsByClassName('drawing-tool-button-input') >> indica que la tarea es de tipo dibujo
      //document.getElementsByClassName('answer minor-button answer-button') >> si el tamaño del arreglo es mayor a 0. respuestas pregunta. O sea, es una pregunta común

      projectName = document.getElementsByClassName('tabbed-content-tab')[0].text.replace(/"/g,"");    
      
      function addScoreboard() { //Como parámetro, el elemento html donde se quiera insertar el div del scoreboard
        //Div + tabla de puntos
        var scoreboardDiv = document.createElement('div');
        scoreboardDiv.style.marginLeft = '1em';
        scoreboardDiv.style.width = '20%';
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

      }      
      
      
      function addContribution() { //Como parámetro, el elemento html donde se quiera insertar el div de contribución
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

        //sinceSpan.innerHTML = 'Colaborando desde el <strong> '+ firstContributionDate +' </strong>';
        sinceSpan.innerHTML = 'Aún no has colaborado en este proyecto';

        var lastContributionSpan = document.createElement('span');
        lastContributionSpan.style.float = 'right';
        lastContributionSpan.style.display = 'inline-block';
        var lastContributionDateTime = 'Nunca'; //placeholder
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
        var userClassificationCount = '0'; //placeholder
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
        milestoneText.innerHTML = '';//'Realizá <strong> ' + milestoneValue + ' </strong> clasificaciones más para la siguiente insignia!';

        nextMilestoneSpan.appendChild(milestoneText);
        badgesDiv.appendChild(nextMilestoneSpan);

        contributionDataDiv.appendChild(badgesDiv);

        taskArea.appendChild(contributionDiv); //El div con lo de mi colaboración
        taskArea.appendChild(contributionDataDiv);


      }
      //POSTeo de una. Si ya existe con ese nombre, me lo devuelve
      params = JSON.stringify({"name": projectName});
      var project = doPostRequest(serverUrl + "/projects", params);

      //Tengo que traerme los datos del proyecto actual (o sea, levantar el id a partir de lo anterior). A partir de esto, agarrar el colaborador actual de la lista de colaboradores del proyecto, y armar el coso de info de abajo

      if (document.getElementsByClassName('site-nav__link')[9] == undefined) {
        //No está logueado, debería para que ande. Poner un aviso en algún lado. Un alert ni da. Estaría bueno uno de esos cartelitos que hoverean. Para esto y para otras cosas
      } else {
        var loggedUser = document.getElementsByClassName('site-nav__link')[9].children[0].innerHTML.replace(/"/g,"");
        params = JSON.stringify({"zooniverseHandle": loggedUser});
        var user = doPostRequest(serverUrl + "/users", params);
        if (userIsCollaborator(project, loggedUser)) {
          //llenar el coso de mi colaboración con los valores que correspondan
          //Adicionalmente, que sea colaborador implica que al menos tenga una clasificación
          var userCollaboration = doGetRequest("/users/"+user.id+"/collaboration/"+project.id);
          var firstContributionDate = userCollaboration.created_at;// '01/01/1900'; //placeholder. created_at es la primera; updated_at es la última
          sinceSpan.innerHTML = 'Colaborando desde el <strong>' + firstContributionDate + '</strong>';
          lastContributionDateTime = userCollaboration.updated_at;
          lastContributionSpan.innerHTML = 'Última contribución hace: <strong> '+ lastContributionDateTime +' </strong>';
          var userClassificationCount = '0'; //placeholder
          classificationCountSpan.innerHTML = '<strong> ' + userClassificationCount + ' </strong>';
        }
      }

      if (project.collaborators != undefined) {
      } else {
        scoreboardTable.innerHTML = "<center> Aún no hay colaboradores en este proyecto. Sé el primero </center>";
      }
    //document.getElementsByClassName('task-container')[0].addEventListener("change", );
    addEventToButton(project, user);

    var notAdded = true;
    var awaiting2 = setInterval(function() { 
      var sumario = document.getElementsByClassName('classification-summary')[0];
      var markQuest = document.getElementsByClassName('markdown question')[0];
      if ((sumario != undefined) && notAdded) {
        addEventToButton(project, user);
        notAdded = false;
        var awaiting3 = setInterval(function() { 
          var markQuest = document.getElementsByClassName('markdown question')[0];
          if (markQuest != undefined) {
            addEventToButton(project, user);
            clearInterval(awaiting3);
          }
        }, 100);
      } else if (sumario == undefined) {
        notAdded = true;
      }
    }, 100);
    }
  }