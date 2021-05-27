"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var contactsURL = "https://60ae836f5b8c300017deab8a.mockapi.io/api/contacts",
    contactsBody = document.querySelector("#contactsBody");

var Contacts =
/*#__PURE__*/
function () {
  function Contacts() {
    _classCallCheck(this, Contacts);
  }

  _createClass(Contacts, null, [{
    key: "get",
    value: function get(url) {
      var method,
          obj,
          options,
          request,
          response,
          _args = arguments;
      return regeneratorRuntime.async(function get$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              method = _args.length > 1 && _args[1] !== undefined ? _args[1] : "GET";
              obj = _args.length > 2 ? _args[2] : undefined;
              options = {
                method: method,
                headers: {
                  'content-type': 'application/json; charset=utf-8'
                }
              };
              if (obj) options.body = JSON.stringify(obj);
              _context.next = 6;
              return regeneratorRuntime.awrap(fetch(url, options));

            case 6:
              request = _context.sent;
              _context.next = 9;
              return regeneratorRuntime.awrap(request.json());

            case 9:
              response = _context.sent;
              return _context.abrupt("return", response);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      });
    } // static render(data) {
    //     let contactsRender = data
    //         .map(contact =>
    //             `<tr data-id=${contact.id}>
    //                         <td><input type="text" value="${contact.firstName}" disabled></td>
    //                         <td><input type="text" value="${contact.lastName}" disabled></td>
    //                         <td><input type="text" value="${contact.phoneNumber}" disabled></td>
    //                         <td class="actionTD">
    //                             <button class="contactsEdit" class="btns">Edit</button>
    //                             <button class="contactsSave" class="btns">Save</button>
    //                         </td>
    //                     </tr>`
    //         )
    //         .join('')
    //     contactsBody.innerHTML = contactsRender;
    // }

  }]);

  return Contacts;
}();

var Dom =
/*#__PURE__*/
function () {
  function Dom(data) {
    _classCallCheck(this, Dom);

    this.data = data;
  }

  _createClass(Dom, null, [{
    key: "render",
    value: function render(data) {
      console.log(data);
      var contactsRender = data.map(function (contact) {
        return "<tr data-id=".concat(contact.id, ">\n                            <td><input type=\"text\" value=\"").concat(contact.firstName, "\" disabled></td>\n                            <td><input type=\"text\" value=\"").concat(contact.lastName, "\" disabled></td>\n                            <td><input type=\"text\" value=\"").concat(contact.phoneNumber, "\" disabled></td>\n                            <td class=\"actionTD\">\n                                <button class=\"contactsEdit\" class=\"btns\">Edit</button>\n                                \n                                <button class=\"contactsSave\" class=\"btns\">Save</button>\n                            </td>\n                        </tr>");
      }).join('');
      contactsBody.innerHTML = contactsRender;
    }
  }, {
    key: "addDeleteBtn",
    value: function addDeleteBtn() {
      var actionTDs = document.querySelectorAll(".actionTD");
      actionTDs.forEach(function (td) {
        var btnsDelete = document.createElement("button");
        btnsDelete.classList.add("contactsDelete");
        btnsDelete.innerHTML = "Delete";
        td.append(btnsDelete);
      });
    }
  }, {
    key: "addDeleteBtnID",
    value: function addDeleteBtnID() {
      var btnsDelete = document.querySelectorAll(".contactsDelete");
      btnsDelete.forEach(function (btn) {
        var parentId = btn.parentNode.parentNode.dataset.id;
        btn.dataset.id = "".concat(parentId);
      });
    }
  }, {
    key: "addELDeleteBtn",
    value: function addELDeleteBtn() {
      var _this = this;

      var btnsDelete = document.querySelectorAll(".contactsDelete");
      btnsDelete.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var x = btn.dataset.id;
          console.log(x);
          Contacts.get("".concat(contactsURL, "/").concat(x), "DELETE");
          console.log(_this);

          _this.render(data);
        });
      });
    }
  }]);

  return Dom;
}();

Contacts.get(contactsURL).then(function (data) {
  Dom.render(data);
  return data;
}).then(function (data) {
  Dom.addDeleteBtn(data);
  return data;
}).then(function (data) {
  Dom.addDeleteBtnID(data);
  return data;
}).then(function (data) {
  Dom.addELDeleteBtn(data);
  return data;
}); // Contacts.get(contactsURL);
// Contacts.render(response)