"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contacts = void 0;

var _script = require("./script.js");

var _request = require("./request.js");

var _form = require("./form.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Contacts =
/*#__PURE__*/
function () {
  function Contacts(contacts) {
    _classCallCheck(this, Contacts);

    this.create(contacts);
    this.render();
  }

  _createClass(Contacts, [{
    key: "create",
    value: function create(contacts) {
      for (var key in contacts) {
        this[key] = contacts[key];
      }
    }
  }, {
    key: "render",
    value: function render() {
      var tr = document.createElement("tr"),
          tdBtn = document.createElement("td"),
          editBtn = document.createElement("button"),
          saveBtn = document.createElement("button"),
          deleteBtn = document.createElement("button");
      tr.dataset.id = this.id;
      editBtn.innerHTML = "EDIT";
      editBtn.className = "edit-btn btns";
      editBtn.dataset.edit = "edit-".concat(this.id);
      editBtn.addEventListener("click", this.edit.bind(this));
      saveBtn.innerHTML = "SAVE";
      saveBtn.className = "save-btn btns";
      saveBtn.dataset.save = "save-".concat(this.id);
      saveBtn.disabled = true;
      saveBtn.addEventListener('click', this.save.bind(this));
      deleteBtn.innerHTML = "DELETE";
      deleteBtn.className = "delete-btn btns";
      deleteBtn.addEventListener("click", this["delete"].bind(this));
      tdBtn.append(editBtn, saveBtn, deleteBtn);
      tr.innerHTML = "<td><input data-id=\"firstName-".concat(this.id, "\" type=\"text\" value=\"").concat(this.firstName, "\" disabled></td>\n                        <td><input data-id=\"lastName-").concat(this.id, "\" type=\"text\" value=\"").concat(this.lastName, "\" disabled></td>\n                        <td><input data-id=\"phoneNumber-").concat(this.id, "\" type=\"text\" value=\"").concat(this.phoneNumber, "\" disabled></td>");
      tr.append(tdBtn);

      _script.contactsBody.append(tr);
    }
  }, {
    key: "edit",
    value: function edit() {
      var firstNInput = document.querySelector("[data-id=\"firstName-".concat(this.id, "\"]")),
          lastNInput = document.querySelector("[data-id=\"lastName-".concat(this.id, "\"]")),
          phoneNInput = document.querySelector("[data-id=\"phoneNumber-".concat(this.id, "\"]")),
          saveBtn = document.querySelector("[data-save=\"save-".concat(this.id, "\"]")),
          inputArr = [firstNInput, lastNInput, phoneNInput];
      inputArr.forEach(function (input) {
        input.disabled = false;
        input.classList.add('editable');
      });
      saveBtn.classList.toggle('active');
      saveBtn.disabled = false;
    }
  }, {
    key: "save",
    value: function save() {
      var tr = document.querySelector("tr[data-id=\"".concat(this.id, "\"]")),
          firstNInput = document.querySelector("[data-id=\"firstName-".concat(this.id, "\"]")),
          lastNInput = document.querySelector("[data-id=\"lastName-".concat(this.id, "\"]")),
          phoneNInput = document.querySelector("[data-id=\"phoneNumber-".concat(this.id, "\"]"));
      var contact = {
        id: tr.dataset.id,
        firstName: firstNInput.value,
        lastName: lastNInput.value,
        phoneNumber: phoneNInput.value
      };

      _request.Request.request("".concat(_script.contactsURL, "/").concat(this.id), "PUT", contact).then(function () {
        return _form.Form.get();
      });
    }
  }, {
    key: "delete",
    value: function _delete() {
      _request.Request.request("".concat(_script.contactsURL, "/").concat(this.id), "DELETE").then(function () {
        return _form.Form.get();
      });
    }
  }]);

  return Contacts;
}();

exports.Contacts = Contacts;