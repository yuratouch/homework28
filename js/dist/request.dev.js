"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Request = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Request =
/*#__PURE__*/
function () {
  function Request() {
    _classCallCheck(this, Request);
  }

  _createClass(Request, null, [{
    key: "request",
    value: function request(url) {
      var method,
          data,
          options,
          request,
          response,
          _args = arguments;
      return regeneratorRuntime.async(function request$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              method = _args.length > 1 && _args[1] !== undefined ? _args[1] : "GET";
              data = _args.length > 2 ? _args[2] : undefined;
              options = {
                method: method,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8'
                }
              };
              if (data) options.body = JSON.stringify(data);
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
    }
  }]);

  return Request;
}();

exports.Request = Request;