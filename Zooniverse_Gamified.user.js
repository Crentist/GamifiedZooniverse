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
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.xmlHttpRequest
// @grant       unsafeWindow
// @run-at      document-end
// ==/UserScript==

  window.onload = function() { 
    console.log("Window loaded. About to execute script");
    executeScript();
  }
 
    var modalStyle = `
                    .modal {
                        display: none; /* Hidden by default */
                        position: fixed; /* Stay in place */
                        z-index: 2; /* Sit on top */
                        padding-top: 5%; /* Location of the box */
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 70%;
                        overflow: auto; /* Enable scroll if needed */
                        background-color: rgb(0,0,0); /* Fallback color */
                        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
                    }

                    /* Modal Content */
                    .modal-content {
                        background-color: #fefefe;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #888;
                        width: 95%;
                        height: 90%;
                    }

                    /* The Close Button */
                    .close {
                        color: #aaaaaa;
                        float: right;
                        font-size: 20px;
                        font-weight: bold;
                    }

                    .close:hover,
                    .close:focus {
                        color: #000;
                        text-decoration: none;
                        cursor: pointer;
                    }
                 `  
  
  var formBootstrap = `
.form-control {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.25;
  color: #464a4c;
  background-color: #fff;
  background-image: none;
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
}

.form-control::-ms-expand {
  background-color: transparent;
  border: 0;
}

.form-control:focus {
  color: #464a4c;
  background-color: #fff;
  border-color: #5cb3fd;
  outline: none;
}

.form-control::-webkit-input-placeholder {
  color: #636c72;
  opacity: 1;
}

.form-control::-moz-placeholder {
  color: #636c72;
  opacity: 1;
}

.form-control:-ms-input-placeholder {
  color: #636c72;
  opacity: 1;
}

.form-control::placeholder {
  color: #636c72;
  opacity: 1;
}

.form-control:disabled, .form-control[readonly] {
  background-color: #eceeef;
  opacity: 1;
}

.form-control:disabled {
  cursor: not-allowed;
}

select.form-control:not([size]):not([multiple]) {
  height: calc(2.25rem + 2px);
}

select.form-control:focus::-ms-value {
  color: #464a4c;
  background-color: #fff;
}

.form-control-file,
.form-control-range {
  display: block;
}

.col-form-label {
  padding-top: calc(0.5rem - 1px * 2);
  padding-bottom: calc(0.5rem - 1px * 2);
  margin-bottom: 0;
}

.col-form-label-lg {
  padding-top: calc(0.75rem - 1px * 2);
  padding-bottom: calc(0.75rem - 1px * 2);
  font-size: 1.25rem;
}

.col-form-label-sm {
  padding-top: calc(0.25rem - 1px * 2);
  padding-bottom: calc(0.25rem - 1px * 2);
  font-size: 0.875rem;
}

.col-form-legend {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0;
  font-size: 1rem;
}

.form-control-static {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0;
  line-height: 1.25;
  border: solid transparent;
  border-width: 1px 0;
}

.form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control,
.input-group-sm > .form-control-static.input-group-addon,
.input-group-sm > .input-group-btn > .form-control-static.btn, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control,
.input-group-lg > .form-control-static.input-group-addon,
.input-group-lg > .input-group-btn > .form-control-static.btn {
  padding-right: 0;
  padding-left: 0;
}

.form-control-sm, .input-group-sm > .form-control,
.input-group-sm > .input-group-addon,
.input-group-sm > .input-group-btn > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}

select.form-control-sm:not([size]):not([multiple]), .input-group-sm > select.form-control:not([size]):not([multiple]),
.input-group-sm > select.input-group-addon:not([size]):not([multiple]),
.input-group-sm > .input-group-btn > select.btn:not([size]):not([multiple]) {
  height: 1.8125rem;
}

.form-control-lg, .input-group-lg > .form-control,
.input-group-lg > .input-group-addon,
.input-group-lg > .input-group-btn > .btn {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

select.form-control-lg:not([size]):not([multiple]), .input-group-lg > select.form-control:not([size]):not([multiple]),
.input-group-lg > select.input-group-addon:not([size]):not([multiple]),
.input-group-lg > .input-group-btn > select.btn:not([size]):not([multiple]) {
  height: 3.166667rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-text {
  display: block;
  margin-top: 0.25rem;
}

.form-check {
  position: relative;
  display: block;
  margin-bottom: 0.5rem;
}

.form-check.disabled .form-check-label {
  color: #636c72;
  cursor: not-allowed;
}

.form-check-label {
  padding-left: 1.25rem;
  margin-bottom: 0;
  cursor: pointer;
}

.form-check-input {
  position: absolute;
  margin-top: 0.25rem;
  margin-left: -1.25rem;
}

.form-check-input:only-child {
  position: static;
}

.form-check-inline {
  display: inline-block;
}

.form-check-inline .form-check-label {
  vertical-align: middle;
}

.form-check-inline + .form-check-inline {
  margin-left: 0.75rem;
}

.form-control-feedback {
  margin-top: 0.25rem;
}

.form-control-success,
.form-control-warning,
.form-control-danger {
  padding-right: 2.25rem;
  background-repeat: no-repeat;
  background-position: center right 0.5625rem;
  -webkit-background-size: 1.125rem 1.125rem;
          background-size: 1.125rem 1.125rem;
}

.has-success .form-control-feedback,
.has-success .form-control-label,
.has-success .col-form-label,
.has-success .form-check-label,
.has-success .custom-control {
  color: #5cb85c;
}

.has-success .form-control {
  border-color: #5cb85c;
}

.has-success .input-group-addon {
  color: #5cb85c;
  border-color: #5cb85c;
  background-color: #eaf6ea;
}

.has-success .form-control-success {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%235cb85c' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E");
}

.has-warning .form-control-feedback,
.has-warning .form-control-label,
.has-warning .col-form-label,
.has-warning .form-check-label,
.has-warning .custom-control {
  color: #f0ad4e;
}

.has-warning .form-control {
  border-color: #f0ad4e;
}

.has-warning .input-group-addon {
  color: #f0ad4e;
  border-color: #f0ad4e;
  background-color: white;
}

.has-warning .form-control-warning {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23f0ad4e' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E");
}

.has-danger .form-control-feedback,
.has-danger .form-control-label,
.has-danger .col-form-label,
.has-danger .form-check-label,
.has-danger .custom-control {
  color: #d9534f;
}

.has-danger .form-control {
  border-color: #d9534f;
}

.has-danger .input-group-addon {
  color: #d9534f;
  border-color: #d9534f;
  background-color: #fdf7f7;
}

.has-danger .form-control-danger {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23d9534f' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E");
}

.form-inline {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}

.form-inline .form-check {
  width: 100%;
}

@media (min-width: 576px) {
  .form-inline label {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin-bottom: 0;
  }
  .form-inline .form-group {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
            flex: 0 0 auto;
    -webkit-flex-flow: row wrap;
        -ms-flex-flow: row wrap;
            flex-flow: row wrap;
    -webkit-box-align: center;
    -webkit-align-items: center;
        -ms-flex-align: center;
            align-items: center;
    margin-bottom: 0;
  }
  .form-inline .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
  }
  .form-inline .form-control-static {
    display: inline-block;
  }
  .form-inline .input-group {
    width: auto;
  }
  .form-inline .form-control-label {
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .form-check {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
        -ms-flex-pack: center;
            justify-content: center;
    width: auto;
    margin-top: 0;
    margin-bottom: 0;
  }
  .form-inline .form-check-label {
    padding-left: 0;
  }
  .form-inline .form-check-input {
    position: relative;
    margin-top: 0;
    margin-right: 0.25rem;
    margin-left: 0;
  }
  .form-inline .custom-control {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
        -ms-flex-pack: center;
            justify-content: center;
    padding-left: 0;
  }
  .form-inline .custom-control-indicator {
    position: static;
    display: inline-block;
    margin-right: 0.25rem;
    vertical-align: text-bottom;
  }
  .form-inline .has-feedback .form-control-feedback {
    top: 0;
  }
}

.btn {
  display: inline-block;
  font-weight: normal;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.btn:focus, .btn:hover {
  text-decoration: none;
}

.btn:focus, .btn.focus {
  outline: 0;
  -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);
          box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);
}

.btn.disabled, .btn:disabled {
  cursor: not-allowed;
  opacity: .65;
}

.btn:active, .btn.active {
  background-image: none;
}

a.btn.disabled,
fieldset[disabled] a.btn {
  pointer-events: none;
}

.btn-primary {
  color: #fff;
  background-color: #0275d8;
  border-color: #0275d8;
}

.btn-primary:hover {
  color: #fff;
  background-color: #025aa5;
  border-color: #01549b;
}

.btn-primary:focus, .btn-primary.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);
          box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);
}

.btn-primary.disabled, .btn-primary:disabled {
  background-color: #0275d8;
  border-color: #0275d8;
}

.btn-primary:active, .btn-primary.active,
.show > .btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #025aa5;
  background-image: none;
  border-color: #01549b;
}

.btn-secondary {
  color: #292b2c;
  background-color: #fff;
  border-color: #ccc;
}

.btn-secondary:hover {
  color: #292b2c;
  background-color: #e6e6e6;
  border-color: #adadad;
}

.btn-secondary:focus, .btn-secondary.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);
          box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);
}

.btn-secondary.disabled, .btn-secondary:disabled {
  background-color: #fff;
  border-color: #ccc;
}

.btn-secondary:active, .btn-secondary.active,
.show > .btn-secondary.dropdown-toggle {
  color: #292b2c;
  background-color: #e6e6e6;
  background-image: none;
  border-color: #adadad;
}

.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #5bc0de;
}

.btn-info:hover {
  color: #fff;
  background-color: #31b0d5;
  border-color: #2aabd2;
}

.btn-info:focus, .btn-info.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);
          box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);
}

.btn-info.disabled, .btn-info:disabled {
  background-color: #5bc0de;
  border-color: #5bc0de;
}

.btn-info:active, .btn-info.active,
.show > .btn-info.dropdown-toggle {
  color: #fff;
  background-color: #31b0d5;
  background-image: none;
  border-color: #2aabd2;
}

.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
}

.btn-success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #419641;
}

.btn-success:focus, .btn-success.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);
          box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);
}

.btn-success.disabled, .btn-success:disabled {
  background-color: #5cb85c;
  border-color: #5cb85c;
}

.btn-success:active, .btn-success.active,
.show > .btn-success.dropdown-toggle {
  color: #fff;
  background-color: #449d44;
  background-image: none;
  border-color: #419641;
}

.btn-warning {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #f0ad4e;
}

.btn-warning:hover {
  color: #fff;
  background-color: #ec971f;
  border-color: #eb9316;
}

.btn-warning:focus, .btn-warning.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);
          box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);
}

.btn-warning.disabled, .btn-warning:disabled {
  background-color: #f0ad4e;
  border-color: #f0ad4e;
}

.btn-warning:active, .btn-warning.active,
.show > .btn-warning.dropdown-toggle {
  color: #fff;
  background-color: #ec971f;
  background-image: none;
  border-color: #eb9316;
}

.btn-danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d9534f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #c9302c;
  border-color: #c12e2a;
}

.btn-danger:focus, .btn-danger.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);
          box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);
}

.btn-danger.disabled, .btn-danger:disabled {
  background-color: #d9534f;
  border-color: #d9534f;
}

.btn-danger:active, .btn-danger.active,
.show > .btn-danger.dropdown-toggle {
  color: #fff;
  background-color: #c9302c;
  background-image: none;
  border-color: #c12e2a;
}

.btn-outline-primary {
  color: #0275d8;
  background-image: none;
  background-color: transparent;
  border-color: #0275d8;
}

.btn-outline-primary:hover {
  color: #fff;
  background-color: #0275d8;
  border-color: #0275d8;
}

.btn-outline-primary:focus, .btn-outline-primary.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);
          box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);
}

.btn-outline-primary.disabled, .btn-outline-primary:disabled {
  color: #0275d8;
  background-color: transparent;
}

.btn-outline-primary:active, .btn-outline-primary.active,
.show > .btn-outline-primary.dropdown-toggle {
  color: #fff;
  background-color: #0275d8;
  border-color: #0275d8;
}

.btn-outline-secondary {
  color: #ccc;
  background-image: none;
  background-color: transparent;
  border-color: #ccc;
}

.btn-outline-secondary:hover {
  color: #fff;
  background-color: #ccc;
  border-color: #ccc;
}

.btn-outline-secondary:focus, .btn-outline-secondary.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);
          box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);
}

.btn-outline-secondary.disabled, .btn-outline-secondary:disabled {
  color: #ccc;
  background-color: transparent;
}

.btn-outline-secondary:active, .btn-outline-secondary.active,
.show > .btn-outline-secondary.dropdown-toggle {
  color: #fff;
  background-color: #ccc;
  border-color: #ccc;
}

.btn-outline-info {
  color: #5bc0de;
  background-image: none;
  background-color: transparent;
  border-color: #5bc0de;
}

.btn-outline-info:hover {
  color: #fff;
  background-color: #5bc0de;
  border-color: #5bc0de;
}

.btn-outline-info:focus, .btn-outline-info.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);
          box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);
}

.btn-outline-info.disabled, .btn-outline-info:disabled {
  color: #5bc0de;
  background-color: transparent;
}

.btn-outline-info:active, .btn-outline-info.active,
.show > .btn-outline-info.dropdown-toggle {
  color: #fff;
  background-color: #5bc0de;
  border-color: #5bc0de;
}

.btn-outline-success {
  color: #5cb85c;
  background-image: none;
  background-color: transparent;
  border-color: #5cb85c;
}

.btn-outline-success:hover {
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
}

.btn-outline-success:focus, .btn-outline-success.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);
          box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);
}

.btn-outline-success.disabled, .btn-outline-success:disabled {
  color: #5cb85c;
  background-color: transparent;
}

.btn-outline-success:active, .btn-outline-success.active,
.show > .btn-outline-success.dropdown-toggle {
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
}

.btn-outline-warning {
  color: #f0ad4e;
  background-image: none;
  background-color: transparent;
  border-color: #f0ad4e;
}

.btn-outline-warning:hover {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #f0ad4e;
}

.btn-outline-warning:focus, .btn-outline-warning.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);
          box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);
}

.btn-outline-warning.disabled, .btn-outline-warning:disabled {
  color: #f0ad4e;
  background-color: transparent;
}

.btn-outline-warning:active, .btn-outline-warning.active,
.show > .btn-outline-warning.dropdown-toggle {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #f0ad4e;
}

.btn-outline-danger {
  color: #d9534f;
  background-image: none;
  background-color: transparent;
  border-color: #d9534f;
}

.btn-outline-danger:hover {
  color: #fff;
  background-color: #d9534f;
  border-color: #d9534f;
}

.btn-outline-danger:focus, .btn-outline-danger.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);
          box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);
}

.btn-outline-danger.disabled, .btn-outline-danger:disabled {
  color: #d9534f;
  background-color: transparent;
}

.btn-outline-danger:active, .btn-outline-danger.active,
.show > .btn-outline-danger.dropdown-toggle {
  color: #fff;
  background-color: #d9534f;
  border-color: #d9534f;
}

.btn-link {
  font-weight: normal;
  color: #0275d8;
  border-radius: 0;
}

.btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {
  background-color: transparent;
}

.btn-link, .btn-link:focus, .btn-link:active {
  border-color: transparent;
}

.btn-link:hover {
  border-color: transparent;
}

.btn-link:focus, .btn-link:hover {
  color: #014c8c;
  text-decoration: underline;
  background-color: transparent;
}

.btn-link:disabled {
  color: #636c72;
}

.btn-link:disabled:focus, .btn-link:disabled:hover {
  text-decoration: none;
}

.btn-lg, .btn-group-lg > .btn {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

.btn-sm, .btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-block + .btn-block {
  margin-top: 0.5rem;
}

input[type="submit"].btn-block,
input[type="reset"].btn-block,
input[type="button"].btn-block {
  width: 100%;
}

.fade {
  opacity: 0;
  -webkit-transition: opacity 0.15s linear;
  -o-transition: opacity 0.15s linear;
  transition: opacity 0.15s linear;
}

.fade.show {
  opacity: 1;
}

.collapse {
  display: none;
}

.collapse.show {
  display: block;
}

tr.collapse.show {
  display: table-row;
}

tbody.collapse.show {
  display: table-row-group;
}

.collapsing {
  position: relative;
  height: 0;
  overflow: hidden;
  -webkit-transition: height 0.35s ease;
  -o-transition: height 0.35s ease;
  transition: height 0.35s ease;
}

.dropup,
.dropdown {
  position: relative;
}

.dropdown-toggle::after {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0.3em;
  vertical-align: middle;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-left: 0.3em solid transparent;
}

.dropdown-toggle:focus {
  outline: 0;
}

.dropup .dropdown-toggle::after {
  border-top: 0;
  border-bottom: 0.3em solid;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #292b2c;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

.dropdown-divider {
  height: 1px;
  margin: 0.5rem 0;
  overflow: hidden;
  background-color: #eceeef;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 3px 1.5rem;
  clear: both;
  font-weight: normal;
  color: #292b2c;
  text-align: inherit;
  white-space: nowrap;
  background: none;
  border: 0;
}

.dropdown-item:focus, .dropdown-item:hover {
  color: #1d1e1f;
  text-decoration: none;
  background-color: #f7f7f9;
}

.dropdown-item.active, .dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #0275d8;
}

.dropdown-item.disabled, .dropdown-item:disabled {
  color: #636c72;
  cursor: not-allowed;
  background-color: transparent;
}

.show > .dropdown-menu {
  display: block;
}

.show > a {
  outline: 0;
}

.dropdown-menu-right {
  right: 0;
  left: auto;
}

.dropdown-menu-left {
  right: auto;
  left: 0;
}

.dropdown-header {
  display: block;
  padding: 0.5rem 1.5rem;
  margin-bottom: 0;
  font-size: 0.875rem;
  color: #636c72;
  white-space: nowrap;
}

.dropdown-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 990;
}

.dropup .dropdown-menu {
  top: auto;
  bottom: 100%;
  margin-bottom: 0.125rem;
}

.btn-group,
.btn-group-vertical {
  position: relative;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  vertical-align: middle;
}

.btn-group > .btn,
.btn-group-vertical > .btn {
  position: relative;
  -webkit-box-flex: 0;
  -webkit-flex: 0 1 auto;
      -ms-flex: 0 1 auto;
          flex: 0 1 auto;
}

.btn-group > .btn:hover,
.btn-group-vertical > .btn:hover {
  z-index: 2;
}

.btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,
.btn-group-vertical > .btn:focus,
.btn-group-vertical > .btn:active,
.btn-group-vertical > .btn.active {
  z-index: 2;
}

.btn-group .btn + .btn,
.btn-group .btn + .btn-group,
.btn-group .btn-group + .btn,
.btn-group .btn-group + .btn-group,
.btn-group-vertical .btn + .btn,
.btn-group-vertical .btn + .btn-group,
.btn-group-vertical .btn-group + .btn,
.btn-group-vertical .btn-group + .btn-group {
  margin-left: -1px;
}

.btn-toolbar {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
          justify-content: flex-start;
}

.btn-toolbar .input-group {
  width: auto;
}

.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {
  border-radius: 0;
}

.btn-group > .btn:first-child {
  margin-left: 0;
}

.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.btn-group > .btn:last-child:not(:first-child),
.btn-group > .dropdown-toggle:not(:first-child) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.btn-group > .btn-group {
  float: left;
}

.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}

.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,
.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.btn-group .dropdown-toggle:active,
.btn-group.open .dropdown-toggle {
  outline: 0;
}

.btn + .dropdown-toggle-split {
  padding-right: 0.75rem;
  padding-left: 0.75rem;
}

.btn + .dropdown-toggle-split::after {
  margin-left: 0;
}

.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {
  padding-right: 0.375rem;
  padding-left: 0.375rem;
}

.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {
  padding-right: 1.125rem;
  padding-left: 1.125rem;
}

.btn-group-vertical {
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
      -ms-flex-align: start;
          align-items: flex-start;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.btn-group-vertical .btn,
.btn-group-vertical .btn-group {
  width: 100%;
}

.btn-group-vertical > .btn + .btn,
.btn-group-vertical > .btn + .btn-group,
.btn-group-vertical > .btn-group + .btn,
.btn-group-vertical > .btn-group + .btn-group {
  margin-top: -1px;
  margin-left: 0;
}

.btn-group-vertical > .btn:not(:first-child):not(:last-child) {
  border-radius: 0;
}

.btn-group-vertical > .btn:first-child:not(:last-child) {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.btn-group-vertical > .btn:last-child:not(:first-child) {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}

.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,
.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

[data-toggle="buttons"] > .btn input[type="radio"],
[data-toggle="buttons"] > .btn input[type="checkbox"],
[data-toggle="buttons"] > .btn-group > .btn input[type="radio"],
[data-toggle="buttons"] > .btn-group > .btn input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}

.input-group {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
}

.input-group .form-control {
  position: relative;
  z-index: 2;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
      -ms-flex: 1 1 auto;
          flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
}

.input-group .form-control:focus, .input-group .form-control:active, .input-group .form-control:hover {
  z-index: 3;
}

.input-group-addon,
.input-group-btn,
.input-group .form-control {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.input-group-addon:not(:first-child):not(:last-child),
.input-group-btn:not(:first-child):not(:last-child),
.input-group .form-control:not(:first-child):not(:last-child) {
  border-radius: 0;
}

.input-group-addon,
.input-group-btn {
  white-space: nowrap;
  vertical-align: middle;
}

.input-group-addon {
  padding: 0.5rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.25;
  color: #464a4c;
  text-align: center;
  background-color: #eceeef;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

.input-group-addon.form-control-sm,
.input-group-sm > .input-group-addon,
.input-group-sm > .input-group-btn > .input-group-addon.btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}

.input-group-addon.form-control-lg,
.input-group-lg > .input-group-addon,
.input-group-lg > .input-group-btn > .input-group-addon.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

.input-group-addon input[type="radio"],
.input-group-addon input[type="checkbox"] {
  margin-top: 0;
}

.input-group .form-control:not(:last-child),
.input-group-addon:not(:last-child),
.input-group-btn:not(:last-child) > .btn,
.input-group-btn:not(:last-child) > .btn-group > .btn,
.input-group-btn:not(:last-child) > .dropdown-toggle,
.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),
.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.input-group-addon:not(:last-child) {
  border-right: 0;
}

.input-group .form-control:not(:first-child),
.input-group-addon:not(:first-child),
.input-group-btn:not(:first-child) > .btn,
.input-group-btn:not(:first-child) > .btn-group > .btn,
.input-group-btn:not(:first-child) > .dropdown-toggle,
.input-group-btn:not(:last-child) > .btn:not(:first-child),
.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.form-control + .input-group-addon:not(:first-child) {
  border-left: 0;
}
`

  var btsNavs = `
                .nav {
                  display: -webkit-box;
                  display: -webkit-flex;
                  display: -ms-flexbox;
                  display: flex;
                  display: block;
                  padding-left: 0;
                  margin-bottom: 0;
                  list-style: none;
                }

                .nav-link {
                  display: block;
                  padding: 0.5em 1em;
                }

                .nav-link:focus, .nav-link:hover {
                  text-decoration: none;
                }

                .nav-link.disabled {
                  color: #636c72;
                  cursor: not-allowed;
                }

                .nav-tabs {
                  border-bottom: 1px solid #ddd;
                }

                .nav-tabs .nav-item {
                  margin-bottom: -1px;
                }

                .nav-tabs .nav-link {
                  border: 1px solid transparent;
                  border-top-right-radius: 0.25rem;
                  border-top-left-radius: 0.25rem;
                }

                .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {
                  border-color: #eceeef #eceeef #ddd;
                }

                .nav-tabs .nav-link.disabled {
                  color: #636c72;
                  background-color: transparent;
                  border-color: transparent;
                }

                .nav-tabs .nav-link.active,
                .nav-tabs .nav-item.show .nav-link {
                  color: #464a4c;
                  background-color: #fff;
                  border-color: #ddd #ddd #fff;
                }

                .nav-tabs .dropdown-menu {
                  margin-top: -1px;
                  border-top-right-radius: 0;
                  border-top-left-radius: 0;
                }
                `
  
  serverUrl = "http://localhost:3000";
  var tasks = [];

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

  function doPostRequest(url, parameters, callback) {
    GM.xmlHttpRequest({
      method: "POST",
      url: url,
      data: parameters,
      headers: { "Content-Type": "application/json" }, 
      synchronous: true,
      onload: function(response) {
        callback(response);
      }
    });
  }

  function doDeleteRequest(url, callback) {
    GM.xmlHttpRequest({
      method: "DELETE",
      url: url,
      headers: { "Content-Type": "application/json" }, 
      synchronous: true,
      onload: function(response) {
        callback(response);
      }
    });
  }  

  function loadBootstrap() {
    var link = document.createElement("link");
    link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap-grid.min.css";
    link.rel="stylesheet";
    link.type="text/css";
    document.head.appendChild(link);
  }

  function addStyle(css) {
    var head = document.head || document.getElementsByTagName('head')[0];
    if (head) {
      var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    } 
  } 

  function wait_for_element(className, action) {
    console.log("Awaiting for "+className);
    var awaiting = setInterval(function() { //Se podrá hacer con Promise?
      var element = document.querySelector("."+className);
      if (element != undefined) {
        clearInterval(awaiting);
        console.log(className+" loaded");
        action();
      }
    }, 100);    
  }

  function create_login_form() {
    console.log("Creating login form");
    var form = document.createElement("form");
    form.id = "loginForm";
    
    var handleDiv = document.createElement("div");
    handleDiv.className = "form-group";
    
    var handleLabel = document.createElement("label");    
    handleLabel.textContent = "Nombre de usuario";
    handleLabel.style = "color:black";
    
    var handleInput = document.createElement("input");
    handleInput.id = "handleInput";
    handleInput.className = "form-control";
    handleInput.placeholder = "Ingrese nombre de usuario";
   
    handleDiv.appendChild(handleLabel);
    handleDiv.appendChild(handleInput);
    
    var passwordDiv = document.createElement("div");
    passwordDiv.className = "form-group";
    
    var passwordLabel = document.createElement("label");    
    passwordLabel.textContent = "Contraseña";
    passwordLabel.style = "color:black";
    
    var passwordInput = document.createElement("input");
    passwordInput.id = "passwordInput";
    passwordInput.className = "form-control";
    passwordInput.placeholder = "Contraseña";
    
    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);
    
    var submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "btn btn-default";
    submitBtn.textContent = "Ingresar";
    
    form.appendChild(handleDiv);
    form.appendChild(passwordDiv);
    form.appendChild(submitBtn);
   
    submitBtn.addEventListener("click", function() {
      var handleValue = document.getElementById("handleInput").value;
      var passwordValue = document.getElementById("passwordInput").value;
      
      var userData = {
        "handle": handleValue,
        "password": passwordValue
      }
      
      var params = JSON.stringify({"user": userData});
      doPostRequest(serverUrl + "/login", params, function(response) {
        jsonResponse = JSON.parse(response.response);
        if (response.status == 200) {
          console.log("User logged in");
          var user_id = jsonResponse["user"]["id"];
          var user_token = jsonResponse["user"]["token"];
          var user_handle = jsonResponse["user"]["handle"];
          sessionStorage.removeItem("user_id");
          sessionStorage.removeItem("user_token");
          sessionStorage.removeItem("user_handle");
          sessionStorage.removeItem("user_data");
          sessionStorage.setItem("user_id", user_id);
          sessionStorage.setItem("user_token", user_token);
          sessionStorage.setItem("user_handle", user_handle);
          sessionStorage.setItem("user_data", JSON.stringify(jsonResponse["user"]))
          location.reload();
          console.log("Los valores guardados son:");
          console.log(sessionStorage.getItem("user_id"));
          console.log(sessionStorage.getItem("user_token"));
          console.log(sessionStorage.getItem("user_handle"));
          //Lo mismo que en el registro
        }
        else {
          //Mirar los errores y cambiar los campos
          //jsonResponseErrors.each
          console.log(jsonResponse["errors"]);
          //Un iterador con un case/switch ???
        }
      });

    });    
     
    return form;
  }

  function create_register_form() {
    console.log("Creating register form");
    var form = document.createElement("form");
    form.id = "registerForm";
    
    var handleDiv = document.createElement("div");
    handleDiv.className = "form-group";
    
    var handleLabel = document.createElement("label");    
    handleLabel.textContent = "Nombre de usuario";
    handleLabel.style = "color:black";
    
    var handleInput = document.createElement("input");
    handleInput.id = "handleInput";
    handleInput.className = "form-control";
    handleInput.placeholder = "Ingrese nombre de usuario";
   
    handleDiv.appendChild(handleLabel);
    handleDiv.appendChild(handleInput);
    
    var emailDiv = document.createElement("div");
    emailDiv.className = "form-group"; 
    
    var emailLabel = document.createElement("label");    
    emailLabel.textContent = "E-Mail";
    emailLabel.style = "color:black";
    
    var emailInput = document.createElement("input");
    emailInput.id = "emailInput"
    emailInput.className = "form-control";
    emailInput.placeholder = "Ingrese su correo electrónico";    

    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);    
    
    var passwordDiv = document.createElement("div");
    passwordDiv.className = "form-group";
    
    var passwordLabel = document.createElement("label");    
    passwordLabel.textContent = "Contraseña";
    passwordLabel.style = "color:black";
    
    var passwordInput = document.createElement("input");
    passwordInput.id = "passwordInput";
    passwordInput.className = "form-control";
    passwordInput.type = "password"
    passwordInput.placeholder = "Contraseña";
    
    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);
    
    var confirmPassDiv = document.createElement("div");
    confirmPassDiv.className = "form-group";
    
    var confirmPassLabel = document.createElement("label");    
    confirmPassLabel.textContent = "Confirmar contraseña";
    confirmPassLabel.style = "color:black";
    
    var confirmPassInput = document.createElement("input");
    confirmPassInput.className = "form-control";
    confirmPassInput.type = "password"
    confirmPassInput.placeholder = "Vuelva a ingresar la contraseña";
    
    confirmPassDiv.appendChild(confirmPassLabel);
    confirmPassDiv.appendChild(confirmPassInput);    
    
    var submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "btn btn-default";
    submitBtn.textContent = "Registro";
    
    submitBtn.addEventListener("click", function() {
      var handleValue = document.getElementById("handleInput").value;
      var emailValue = document.getElementById("emailInput").value;
      var passwordValue = document.getElementById("passwordInput").value;
      
      var userData = {
        "handle": handleValue,
        "email": emailValue,
        "password": passwordValue
      };
      
      var params = JSON.stringify({"user": userData});
      doPostRequest(serverUrl + "/register", params, function(response) {
        jsonResponse = JSON.parse(response.response)
        if (response.status == 200) {
         //Cerrar el modal, y toda la bola en el DOM para mostrar las cosas de usuario logueado
          console.log("User successfully registered");
          var user_token = jsonResponse["user"]["token"];
          sessionStorage.removeItem("user_id");
          sessionStorage.removeItem("user_token");
          sessionStorage.removeItem("user_handle");
          sessionStorage.removeItem("user_data");
          sessionStorage.setItem("user_id", user_id);
          sessionStorage.setItem("user_token", user_token);
          sessionStorage.setItem("user_handle", user_handle);
          sessionStorage.setItem("user_data", JSON.stringify(jsonResponse["user"]))
          location.reload();
          //var modal = document.getElementById("gZooModalWrapper");
          //modal.style.display = "none";
          //Cambiar lo que va en el modal, o poner algo distinto en GZoo
        }
        else {
          //Mirar los errores y cambiar los campos
          jsonResponseErrors = JSON.parse(response.response)["errors"];
          console.log(jsonResponse);
          //Un iterador con un case/switch ???
        }
      });
    });
    
    form.appendChild(handleDiv);
    form.appendChild(emailDiv);
    form.appendChild(passwordDiv);
    form.appendChild(confirmPassDiv);
    form.appendChild(submitBtn);
     
    return form;
  }

  function create_nav_tabs() {
    console.log("Creating nav tabs");
    var navigation = document.createElement("nav");
    navigation.style = "display: flex"; //No sé por qué no funciona desde la clase. Un override en algún lugar, maldición
    
    var registerTabLink = document.createElement("a");
    registerTabLink.href = "#";
    registerTabLink.className = "nav-link col-6";
    registerTabLink.textContent = "Registrarse";
    
    var loginTabLink = document.createElement("a");
    loginTabLink.href = "#";
    loginTabLink.className = "active nav-link col-6";
    loginTabLink.textContent = "Ingresar";
 
    loginTabLink.addEventListener("click", function() {
      //Poner el form de login si es que no está activo (y sacar el otro?)
      var loginForm = document.getElementById("loginForm");
      if (loginForm == undefined) {
        var registerForm = document.getElementById("registerForm");
        var modal = document.querySelector(".modal-content");
        modal.removeChild(registerForm);
        registerTabLink.className = "nav-link col-6";
        loginTabLink.className = "active nav-link col-6";        
        modal.appendChild(create_login_form());
      }      
    });    

    registerTabLink.addEventListener("click", function() {
      //Poner el form de registro si es que no está activo (y sacar el otro?)
      var registerForm = document.getElementById("registerForm");
      if (registerForm == undefined) {
        var loginForm = document.getElementById("loginForm");
        var modal = document.querySelector(".modal-content");
        modal.removeChild(loginForm);
        registerTabLink.className = "active nav-link col-6";
        loginTabLink.className = "nav-link col-6";
        modal.appendChild(create_register_form());
      }
    });    
    
    navigation.className = "nav nav-tabs"; 
 
    navigation.appendChild(loginTabLink);    
    navigation.appendChild(registerTabLink);
    
    return navigation;
  }

  function add_gzoo_to_navbar(callback) {
    console.log("About to stick GZoo's button in the navbar");
        
    var modalWrapper = document.createElement('div');
    modalWrapper.id = "gZooModalWrapper";
    modalWrapper.className = "modal";
    modalWrapper.className += " col-4 offset-4";
    modalWrapper.style.display = "none"; 
    
    var gZooModal = document.createElement('div');
    gZooModal.id = "gZooModal";
    gZooModal.className = "modal-content";
    
    var closeModal = document.createElement('span');
    closeModal.className = "close";
    closeModal.innerHTML = "&times;";
    gZooModal.appendChild(closeModal);    
    
    var gZooButton = document.createElement("button");
    gZooButton.id = "gZooAccount";
    gZooButton.className = "site-nav__link";
    
    var gZooSpan = document.createElement("span");
    gZooSpan.className = "site-nav__inbox-link";
    
    var textSpan = document.createElement("span");
    textSpan.innerHTML = "GZoo";
    gZooButton.appendChild(gZooSpan);
    gZooSpan.appendChild(textSpan);
    
    callback(gZooModal);
    
    console.log("Stuff created");
    gZooButton.onclick = function() {
      if (modalWrapper.style.display === "none") {
        modalWrapper.style.display = "block";
      }
      else {
        modalWrapper.style.display = "none";
      }
    }
    
    closeModal.onclick = function() {
      modalWrapper.style.display = "none";
    }
    
    modalWrapper.appendChild(gZooModal);

    //document.getElementsByTagName("body")[0].prepend(modalWrapper);
    
    document.querySelector(".app-layout").prepend(modalWrapper);
    
    console.log("Events attached");
    
    if (!(document.querySelector(".account-bar") == undefined)) {
      document.querySelector(".account-bar").prepend(gZooButton);
      console.log("Attached GZoo thingy into the account bar");      
    }
    else {
      if (!(document.querySelector(".login-bar") == undefined)) {
        document.querySelector(".login-bar").prepend(gZooButton);
        console.log("Attached GZoo thingy into the login bar");      
      }
    }
    
    wait_for_element("account-bar", function() {
      document.querySelector(".account-bar").prepend(gZooButton);
      console.log("Attached GZoo thingy into the thing");
    });   
  }

  function project_landing_page() {
    return /^https:\/\/www\.zooniverse\.org\/projects\/.+\/.+$/.test(window.location.href);
  }

  function classify_page() {
    return (window.location.href.indexOf('classify') > -1);
  }

  function index_page() {
    return (window.location.href == "https://www.zooniverse.org/");
  }

  function site_url() {
    return window.location.host
  }

  function user_is_logged_in() {
    var user_token = sessionStorage.getItem("user_token");
    if (user_token == undefined) {
      return false;  
    }
    return true;     
  }

  function user_site_logged_in() {
    return (document.getElementsByClassName('modal-form-trigger site-nav__modal secret-button').length != 0);
  }

  function user_site_username() {
    if (user_site_logged_in()) {
      return (document.getElementsByClassName('modal-form-trigger site-nav__modal secret-button')[0].children[0].children[0].textContent);
    }
    else {
      return "";
    }
  }

  function current_project_name() {
    return document.getElementsByClassName("sc-cSHVUG MmxFZ")[0].children[0].textContent;
  }

  function user_not_joined() {
    wait_for_element("sc-cSHVUG", function() {
      doGetRequest(serverUrl+"/projects", function(response) {
        jsonResponse = JSON.parse(response.response);
        sessionStorage.setItem("projects", JSON.stringify(jsonResponse));
        var not_found = true;
        console.log("Projects:");
        console.log(jsonResponse);
        if (jsonResponse.length > 0) {
          var i = 0;

          while ((not_found) && (i < jsonResponse.length)) {
            if (jsonResponse[i]["name"] == current_project_name()) {
              not_found = false;
              var project = jsonResponse[i];
            }
            i++;
          }
          if (!not_found) {
            var collaborators = project["collaborators"];
            var i = 0;
            var not_found = true;
            var user_id = sessionStorage.getItem("user_id");
            while ((not_found) && (i < collaborators.length)) {
              if (collaborators[i]["id"] == user_id) {
                not_found = false;
              }
              i++;
            }
          }
        }

        sessionStorage.removeItem("user_not_joined");
        sessionStorage.setItem("user_not_joined", not_found);
      });
    });
  }

  function accounts_not_linked() {
    user_id = sessionStorage.getItem("user_id");
    //Acá podría usar el token
    doGetRequest(serverUrl + "/users/"+user_id+"/sites_usernames", function(response) {
      jsonResponse = JSON.parse(response.response);
      console.log("are accounts linked?");
      console.log(jsonResponse);
      if ((jsonResponse["sites_usernames"] == undefined) || (jsonResponse["sites_usernames"][site_url()] == undefined) || !((jsonResponse["sites_usernames"][site_url()]).includes(user_site_username()))) {
        sessionStorage.setItem("linked", false);
      }
      else {
        sessionStorage.setItem("linked", true);
      }
    });
  }

  function executeScript() {
    loadBootstrap();
    console.log("Welcome to Zooniverse Gamified!");

    console.log("EXECUTE SCRIPT. Los valores guardados son:");
    console.log(sessionStorage.getItem("user_id"));
    console.log(sessionStorage.getItem("user_token"));
    console.log(sessionStorage.getItem("user_handle"));

    //En el navbar
    if (document.getElementById("gZooAccount") == undefined) {
      console.log("GZoo navbar button is not defined");
      addStyle(modalStyle);
      addStyle(formBootstrap);
      addStyle(btsNavs);
      if (user_is_logged_in()) {
        console.log("User logged in. Add GZoo navbar thing");
        add_gzoo_to_navbar(function(gZooModal) {
          //Insertar un row con un <p> que diga qué usuario está logueado

          var loggedRow = document.createElement('div');
          loggedRow.className = "row";
          var loggedCol = document.createElement('div');
          loggedCol.className = "col-8 offset-2";
          var loggedP = document.createElement('p');
          var user_handle = sessionStorage.getItem("user_handle");
          loggedP.textContent = "Logueado como "+user_handle;

          loggedCol.appendChild(loggedP);
          loggedRow.appendChild(loggedCol);

          gZooModal.appendChild(loggedRow);
          //Lo siguiente, si está logueado en Zooniverse y si las cuentas no están linkeadas
          if (user_site_logged_in()) {
            console.log("User logged in in Zooniverse");
            accounts_not_linked();
            var linked = sessionStorage.getItem("linked");
            if (linked == "false") {
              console.log("Accounts are not linked");
              var connectRow = document.createElement('div');
              connectRow.className = "row";
              var connectCol = document.createElement('div');
              connectCol.className = "col-8 offset-2";
              var connectP = document.createElement('p');
              connectP.textContent = "Las cuentas no están vinculadas";
              var connectButton = document.createElement('button');
              connectButton.textContent = "Vincular cuentas";
              
              connectButton.addEventListener("click", function() {
                user_id = sessionStorage.getItem("user_id");
                params = JSON.stringify({"site": site_url(), "username": user_site_username()});

                doPostRequest(serverUrl+"/users/"+user_id+"/site_username", params, function(response) {
                  jsonResponse = JSON.parse(response.response);
                  console.log(jsonResponse);
                  if (response.status == 201) {
                    //location.reload();
                  }
                  else {
                    //Alguna especie de error
                  }
                });
              });
              
              connectCol.appendChild(connectP);
              connectCol.appendChild(connectButton);
              connectRow.appendChild(connectCol);
              
              gZooModal.appendChild(connectRow); 
            }
            else {
              console.log("Accounts are linked");
              //Está logueado y las cuentas están linkeadas
              var profileDiv = document.createElement("div");
              profileDiv.id = "profileDiv";
              profileDiv.className = "container";
              profileDiv.style.borderStyle = "dotted";
              profileDiv.style.minHeight = "100px";
              coso.id = "1111111223";
              gZooModal.appendChild(profileDiv);
              
              //<div class="container" style="border-style: dotted;min-height: 100px;"></div>
            }
          }
          else {
            //Por favor ingrese sesión en Zooniverse
            var askLoginRow = document.createElement('div');
            askLoginRow.className = "row";
            var askLoginDiv = document.createElement('div');
            askLoginDiv.className = "col-8 offset-2";
            var askLoginP = document.createElement('p');
            askLoginP.textContent = "Por favor, ingrese sesión en el sitio";

            askLoginDiv.appendChild(askLoginP);
            askLoginRow.appendChild(askLoginDiv);

            gZooModal.appendChild(askLoginRow);
          }

          var logoutRow = document.createElement('div');
          logoutRow.className = "row";
          var logoutCol = document.createElement('div');
          logoutCol.className = "col-8 offset-2";
          var logoutButton = document.createElement('button');
          logoutButton.textContent = "Cerrar sesión";

          logoutButton.addEventListener("click", function() {
            sessionStorage.removeItem("user_id");
            sessionStorage.removeItem("user_token");
            sessionStorage.removeItem("user_handle");
            location.reload();
          });

          logoutCol.appendChild(logoutButton);
          logoutRow.appendChild(logoutCol);
          
          gZooModal.appendChild(document.createElement("br"));
          gZooModal.appendChild(logoutRow);
          
          //El botón de GZoo en el navbar tendría que mostrar otras cosas
          //El perfil?
        });
      }
      else {
        add_gzoo_to_navbar(function(gZooModal) {
          gZooModal.appendChild(create_nav_tabs());
          gZooModal.appendChild(create_login_form());   
        });
      }
    }
    
    //En la página de inicio

    if (index_page()) {
      console.log("In Zooniverse's index page");
      var unDiv = document.createElement("div");
      unDiv.id = "userSiteCollaboration";
      unDiv.className = "col-3 offset-8";
      unDiv.style = "float: right";
      //document.querySelector(".home-page-for-user__content").prepend(unDiv);
      if (user_is_logged_in() && user_site_logged_in()) {
        //Módulo con datos del sitio (Zooniverse)
        
        
        //Lo siguiente pone un div más o menos coherente, mirar luego
        var unDiv = document.createElement("div");
        unDiv.id = "userSiteCollaboration";
        unDiv.className = "col-3 offset-8";
        unDiv.style = "float: right";
        document.querySelector(".home-page-for-user__content").prepend(unDiv);
      }
      else {
        //Nada. O bien, un coso para que loguee

      }

    }
    
    //En la pantalla principal del proyecto

    if (project_landing_page()) {
      console.log("In a project's landing page");
      user_not_joined();
      var not_joined = sessionStorage.getItem("user_not_joined");
      if ((user_is_logged_in()) && (not_joined == "true")) { 
        console.log("User logged in and not joined");
        wait_for_element("project-home-page__call-to-action", function() {
          var buttonsDiv = document.querySelector(".project-home-page__call-to-action");
          var joinButton = document.createElement("button");
          joinButton.textContent = "Unirse al proyecto en GZoo";

          joinButton.addEventListener("click", function() {
            params = JSON.stringify({"project": current_project_name(), "site": "zooniverse.org"});
            var user_id = sessionStorage.getItem("user_id");
            doPostRequest(serverUrl+"/users/"+user_id+"/join_project", params, function(response) {
              // >>>>>>>> CONTINUE HERE
              location.reload(); //O algo que no necesariamente recargue todo
            });
          });

          buttonsDiv.appendChild(joinButton);
          console.log("Attached Join button");
        });     
      }
      else {
        if (!(user_is_logged_in())) {
          console.log("Please log in.")
          wait_for_element("project-home-page__call-to-action", function() {
            var buttonsDiv = document.querySelector(".project-home-page__call-to-action");
            var joinButton = document.createElement("button");
            joinButton.disabled = true;
            joinButton.textContent = "Ingrese sesión en GZoo";
            buttonsDiv.appendChild(joinButton);
            console.log("Attached Join button");
          });            
        }
        else {
          console.log("Joined.")
          wait_for_element("project-home-page__call-to-action", function() {
            var buttonsDiv = document.querySelector(".project-home-page__call-to-action");
            var joinButton = document.createElement("button");
            joinButton.disabled = true;
            joinButton.textContent = "Unido!";
            buttonsDiv.appendChild(joinButton);
            console.log("Attached Join button");
          }); 



        }
      }

    }

    //En la clasificación de un proyecto. Funcionalidad específica para esa pantalla
    if (classify_page()) {
      console.log("In a project's classification page");
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
        function addScoreboard(project) { //Como parámetro, el elemento html donde se quiera insertar el div del scoreboard
          //Div + tabla de puntos

          var row = scoreboardTable.insertRow();
          row.style.backgroundColor = "#43bbfd";
          var nickCell = row.insertCell(0);
          var scoreCell = row.insertCell(-1);
          nickCell.innerHTML = "Nickname";
          scoreCell.innerHTML = "Score";

          var row2 = scoreboardTable.insertRow();
          var nickCell2 = row2.insertCell(0);
          var scoreCell2 = row2.insertCell(-1);

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

        function addContribution(project, loggedUser) { //Como parámetro, el elemento html donde se quiera insertar el div de contribución
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

          var userCollaboration = doGetRequest("/users/"+user.id+"/collaboration/"+project.id);        

          var firstContributionDate = userCollaboration.created_at;
          // '01/01/1900'; //placeholder. created_at es la primera; updated_at es la última

          sinceSpan.innerHTML = 'Colaborando desde el <strong>' + firstContributionDate + '</strong>';

          var lastContributionSpan = document.createElement('span');
          lastContributionSpan.style.float = 'right';
          lastContributionSpan.style.display = 'inline-block';
          var lastContributionDateTime = userCollaboration.updated_at;
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

        projectName = document.getElementsByClassName('tabbed-content-tab')[0].text.replace(/"/g,"");          

        //POSTeo de una. Si ya existe con ese nombre, me lo devuelve
        params = JSON.stringify({"name": projectName});
        var project = doPostRequest(serverUrl + "/projects", params);

        //Tengo que traerme los datos del proyecto actual (o sea, levantar el id a partir de lo anterior). A partir de esto, agarrar el colaborador actual de la lista de colaboradores del proyecto, y armar el coso de info de abajo

        if (!(user_site_logged_in())) {
          //No está logueado, debería para que ande. Poner un aviso en algún lado. Un alert ni da. Estaría bueno uno de esos cartelitos que hoverean. Para esto y para otras cosas
        } else {
          var loggedUser = document.getElementsByClassName('site-nav__link')[9].children[0].innerHTML.replace(/"/g,"");

          if (userIsCollaborator(project, loggedUser)) {
            addContribution(project, loggedUser);
          }
          else {
            askToJoin();    
          }
        }

        var scoreboardDiv = document.createElement('div');
        scoreboardDiv.style.marginLeft = '1em';
        scoreboardDiv.style.width = '20%';
        var scoreboardTable = document.createElement("table");
        scoreboardTable.className = 'table';
        scoreboardTable.id = "tablaPuntaje";
        console.log("Table created");      

        if (project.collaborators != undefined) {
          addScoreboard(project);
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
        }, 100); //end awaiting2

      }
    }
    
  }