"use strict";

var contactsURL = "https://60ae836f5b8c300017deab8a.mockapi.io/api/contacts",
    contactsBody = document.querySelector("#contactsBody"); // btnEdit = document.querySelector("#contactsBody"),
// // btnDelete = document.querySelector("#contactsDelete"),
// btnSave = document.querySelector("#contactsSave");

var get = function get(url) {
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
};

function render(data) {
  var contactsRender = data.map(function (contact) {
    return "<tr data-id=".concat(contact.id, ">\n                        <td><input type=\"text\" value=\"").concat(contact.firstName, "\" disabled></td>\n                        <td><input type=\"text\" value=\"").concat(contact.lastName, "\" disabled></td>\n                        <td><input type=\"text\" value=\"").concat(contact.phoneNumber, "\" disabled></td>\n                        <td class=\"actionTD\">\n                            <button class=\"contactsEdit\" class=\"btns\">Edit</button>\n                            \n                            <button class=\"contactsSave\" class=\"btns\">Save</button>\n                        </td>\n                    </tr>");
  }).join('');
  contactsBody.innerHTML = contactsRender;
}

; //<button class="contactsDelete" class="btns">Delete</button>

get(contactsURL).then(function (data) {
  render(data);
  return data;
}).then(function (data) {
  var actionTDs = document.querySelectorAll(".actionTD");
  actionTDs.forEach(function (td) {
    var btnsDelete = document.createElement("button");
    btnsDelete.classList.add("contactsDelete");
    btnsDelete.innerHTML = "Delete";
    td.append(btnsDelete);
  });
  return data;
}).then(function (data) {
  var btnsDelete = document.querySelectorAll(".contactsDelete");
  btnsDelete.forEach(function (btn) {
    var parentId = btn.parentNode.parentNode.dataset.id;
    btn.dataset.id = "".concat(parentId);
  });
  return data;
}).then(function (data) {
  var btnsDelete = document.querySelectorAll(".contactsDelete");
  btnsDelete.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var x = btn.dataset.id;
      console.log(x);
      get("".concat(contactsURL, "/").concat(x), "DELETE");
    });
  });
  return data;
}).then(function (data) {
  var btnsDelete = document.querySelectorAll(".contactsDelete");
  btnsDelete.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // debugger
      get(contactsURL).then(function (data) {
        render(data);
        return data;
      });
    });
  });
  return data;
});