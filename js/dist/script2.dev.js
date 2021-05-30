"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactsBody = exports.contactsURL = void 0;

var _request = require("./request.js");

var _form = require("./form.js");

var _contacts = require("./contacts.js");

var contactsURL = "https://60ae836f5b8c300017deab8a.mockapi.io/api/contacts",
    contactsBody = document.querySelector("#contactsBody");
exports.contactsBody = contactsBody;
exports.contactsURL = contactsURL;

_form.Form.get();

var createContacts = new _form.Form("#createTask");