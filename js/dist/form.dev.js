"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _script = require("./script.js");

var _request = require("./request.js");

var _contacts = require("./contacts.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Form =
/*#__PURE__*/
function () {
  function Form(el) {
    _classCallCheck(this, Form);

    this.el = document.querySelector(el);
    this.el.addEventListener('submit', this.submit.bind(this));
  }

  _createClass(Form, [{
    key: "submit",
    value: function submit(e) {
      var firstInput, lastInput, phoneInput, inputsArr, inputValues;
      return regeneratorRuntime.async(function submit$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              firstInput = document.querySelector('#first-input'), lastInput = document.querySelector('#last-input'), phoneInput = document.querySelector('#phone-input'), inputsArr = [firstInput, lastInput, phoneInput], inputValues = {
                firstName: firstInput.value,
                lastName: lastInput.value,
                phoneNumber: phoneInput.value
              };
              inputsArr.forEach(function (input) {
                input.value = "";
              });
              this.add(inputValues);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "add",
    value: function add(inputValues) {
      var newContact, createContact;
      return regeneratorRuntime.async(function add$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_request.Request.request(_script.contactsURL, "POST", inputValues));

            case 2:
              newContact = _context2.sent;
              createContact = new _contacts.Contacts(newContact);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }], [{
    key: "get",
    value: function get() {
      _request.Request.request(_script.contactsURL).then(function (contact) {
        _script.contactsBody.innerHTML = "";
        return contact;
      }).then(function (contact) {
        return contact.forEach(function (contact) {
          return new _contacts.Contacts(contact);
        });
      });
    }
  }]);

  return Form;
}();

exports.Form = Form;