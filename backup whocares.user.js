// ==UserScript==
// @name        Playground
// @resource CSS https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require     https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js
// @resource    estilo_navs estilos.css
// @namespace   colaboratorio
// @description Adds a layer of gamification to Zooniverse
// @include     *://www.zooniverse.org/*
// @version     1
// @grant       GM.addStyle
// @grant       GM.getResourceText
// @grant       GM.getResourceUrl
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.xmlHttpRequest
// @grant       unsafeWindow
// @run-at      document-end
// ==/UserScript==

  serverUrl = "http://localhost:3000";

  function doGetRequest(url, callback) {
    GM.xmlHttpRequest({
      method: "GET",
      url: url,
      headers: { "Content-Type": "application/json" },
      synchronous: true,
      onload: function(response) {
        callback(response);
      }
    });
  }

(function() {
    'use strict';
    console.log("Project ranking to be got");
    doGetRequest(serverUrl + "/projects/5/ranking/1", function(response) {
        var jsonResponse = JSON.parse(response.response);
        if ((response.status == 200) || (response.status == 201)) {
            console.log("Project ranking GETed");
            sessionStorage.removeItem("ranking");
            sessionStorage.setItem("ranking", JSON.stringify(jsonResponse));
        }
    });
})();