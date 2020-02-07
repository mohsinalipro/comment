// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/model/CommentList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var commentList =
/*#__PURE__*/
function () {
  function commentList() {
    _classCallCheck(this, commentList);

    this.commentList = [];
  }

  _createClass(commentList, [{
    key: "addComment",
    value: function addComment(id, username, text, child, parentId) {
      var comment = {
        id: id,
        username: username,
        text: text,
        child: !!child,
        parent: !!parentId,
        parentId: parentId
      };
      this.commentList.push(comment);

      this._persistComments();
    }
  }, {
    key: "editComment",
    value: function editComment(id, text) {
      var updateComment = this.commentList.indexOf(id); // @todo: try to follow immutability over here

      this.commentList[updateComment].text = text;

      this._persistComments();
    }
  }, {
    key: "softDeleteComment",
    value: function softDeleteComment(id, text) {
      var updateComment = this.commentList.find(function (listItem) {
        return listItem.id == id;
      });
      updateComment.text = text;
      updateComment.deleted = true;

      this._persistComments();
    }
  }, {
    key: "deleteComment",
    value: function deleteComment(id) {
      var updatedCommentList = this.commentList.filter(function (listItem) {
        return listItem.id != id;
      });
      this.commentList = updatedCommentList;

      this._persistComments();
    }
  }, {
    key: "_persistComments",
    value: function _persistComments() {
      localStorage.setItem('commentList', JSON.stringify(this.commentList));
    }
  }, {
    key: "readStorage",
    value: function readStorage() {
      var storage = JSON.parse(localStorage.getItem('commentList'));
      if (storage) this.commentList = storage;
    }
  }]);

  return commentList;
}();

exports.default = commentList;
},{}],"js/view/base.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elements = void 0;
var elements = {
  mainCommentTextbox: document.querySelector('.main_comment__box'),
  commentTextbox: document.querySelector('.comment__box'),
  commentList: document.querySelector('.comment__list'),
  viewPreviousButton: document.querySelector('.view_previous_comments-btn')
};
exports.elements = elements;
},{}],"js/helper/getAvatar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getAvatar = function getAvatar(username) {
  var avatars = {
    'Ashish': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user14-95cbccd215b174-s.jpg',
    'Ravi': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user2-565b4bb4c813ca-s.jpg',
    'Suraj': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user13-19873725ed76e2-s.jpg',
    'Saru': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user19-7966a1b638bd69-s.jpg',
    'Mano': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user18-1881baeccb7399-s.jpg',
    'Debo': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user17-919635985f2132-s.jpg'
  };
  return avatars[username];
};

var _default = getAvatar;
exports.default = _default;
},{}],"js/view/commentListView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderChildrenCommentMarkup = exports.renderCommentMarkup = exports.clearInput = exports.getInput = void 0;

var _base = require("./base");

var _getAvatar = _interopRequireDefault(require("../helper/getAvatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getInput = function getInput() {
  return _base.elements.commentTextbox.value;
};

exports.getInput = getInput;

var clearInput = function clearInput() {
  _base.elements.mainCommentTextbox.value = '';
  _base.elements.commentTextbox.value = '';
};

exports.clearInput = clearInput;

var renderCommentMarkup = function renderCommentMarkup(id, username, commentText, child, renderControls) {
  var markup = "\n        <li class=\"comment\" data-id=\"".concat(id, "\">\n            <div class=\"avatar\">\n                <img src=\"").concat((0, _getAvatar.default)(username), "\" />\n            </div>\n            <div class=\"content\">\n                <a href=\"#\">").concat(username, "</a>\n                <p>").concat(commentText, "</p>\n                <div>\n                   ").concat(renderControls(id), "\n                </div>\n            </div>\n        </li>\n    ");
  !child && _base.elements.commentList.insertAdjacentHTML('afterbegin', markup);
  return markup;
};

exports.renderCommentMarkup = renderCommentMarkup;

var renderChildrenCommentMarkup = function renderChildrenCommentMarkup(id, username, commentText, parentCommentId, renderControls) {
  var markup = "\n        <ul class=\"comment__list\">\n            ".concat(renderCommentMarkup(id, username, commentText, true, renderControls), "\n        </ul>\n    ");
  var li = document.querySelector("li[data-id=\"".concat(parentCommentId, "\"]"));
  debugger;
  if (!li) return;
  li.insertAdjacentHTML('afterend', markup);
};

exports.renderChildrenCommentMarkup = renderChildrenCommentMarkup;
},{"./base":"js/view/base.js","../helper/getAvatar":"js/helper/getAvatar.js"}],"js/helper/generateUniqueId.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var generateUniqueId = function generateUniqueId() {
  var uniqueId = new Date().getTime();
  return uniqueId;
};

var _default = generateUniqueId;
exports.default = _default;
},{}],"js/helper/randomName.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var randomUsername = function randomUsername() {
  var usernames = ['Ashish', 'Ravi', 'Suraj', 'Saru', 'Mano', 'Debo'];
  return usernames[Math.floor(Math.random() * usernames.length)];
};

var _default = randomUsername;
exports.default = _default;
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

var _CommentList = _interopRequireDefault(require("./model/CommentList"));

var commentListView = _interopRequireWildcard(require("./view/commentListView"));

var _base = require("./view/base");

var _generateUniqueId = _interopRequireDefault(require("./helper/generateUniqueId"));

var _randomName = _interopRequireDefault(require("./helper/randomName"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Comment List Model
// Comment List View
// Helpers

/**
 * Store for comments
 */
var state = {};
var defaultShowLimit = 4;
/**
 * Comment List Controller
 */

var controlCommentList = function controlCommentList(commentTextbox, id) {
  var comment = commentTextbox.value;
  var username = (0, _randomName.default)();
  var randomId = (0, _generateUniqueId.default)();
  if (!state.commentList) state.commentList = new _CommentList.default();

  if (comment) {
    var isChild = !!id;
    state.commentList.addComment(randomId, username, comment, isChild, id);
    commentListView.clearInput(); // @todo: think something else here, it's bad

    id ? commentListView.renderChildrenCommentMarkup(randomId, username, comment, id, renderControls) : commentListView.renderCommentMarkup(randomId, username, comment, undefined, renderControls);
  }
};

_base.elements.commentTextbox.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    controlCommentList(_base.elements.commentTextbox, e.target.dataset.id);

    _base.elements.commentTextbox.removeAttribute('data-id');
  }
});

_base.elements.mainCommentTextbox.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    debugger;
    controlCommentList(_base.elements.mainCommentTextbox, e.target.dataset.id);

    _base.elements.mainCommentTextbox.removeAttribute('data-id');
  }
});

_base.elements.commentList.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.tagName !== 'BUTTON') return;
  var btn = e.target;
  var id = btn.dataset.id;
  var li = document.querySelector("li[data-id=\"".concat(id, "\"]"));

  if (btn.classList.contains('comment__reply-btn')) {
    document.querySelector('.main_comment__text-section').style.display = 'block';
    li.insertAdjacentElement('afterend', _base.elements.commentTextbox);

    _base.elements.commentTextbox.focus();

    _base.elements.commentTextbox.setAttribute('data-id', id);
  }

  if (btn.classList.contains('comment__delete-btn')) {
    if (!confirm('Are you sure to delete this item?')) return;
    var isParent = state.commentList.commentList.find(function (comment) {
      return comment.parentId == id;
    });

    if (isParent) {
      var deletedText = 'This comment has been deleted';
      state.commentList.softDeleteComment(id, deletedText);
      li.querySelector('.content p').innerHTML = deletedText;
      e.target.remove();
    } else {
      state.commentList.deleteComment(id);
      li.remove();
    }
  }
});

window.addEventListener('load', function (e) {
  state.commentList = new _CommentList.default();
  state.commentList.readStorage();
  initComments(state, defaultShowLimit);

  _base.elements.viewPreviousButton.addEventListener('click', function (e) {
    initComments(state);

    _base.elements.viewPreviousButton.remove();
  });

  if (!state.commentList || state.commentList && state.commentList.commentList.length <= defaultShowLimit) {
    _base.elements.viewPreviousButton.remove();
  }
});
/**
 * Initialize Comments
 */

var initComments = function initComments(state, limit) {
  //@todo: render n number of comment here based on config.js
  if (!isNaN(limit)) {
    var tempComments = [];

    for (var i = 0; i < limit; i++) {
      var comment = state.commentList.commentList[state.commentList.commentList.length - 1 - i];
      if (comment) tempComments.push(comment);
    }

    for (var _i = 0; _i < tempComments.length; _i++) {
      var _comment = tempComments[_i];
      var id = _comment.id,
          username = _comment.username,
          commentText = _comment.text,
          parentId = _comment.parentId;

      if (parentId) {
        commentListView.renderChildrenCommentMarkup(id, username, commentText, parentId, renderControls);
      } else {
        commentListView.renderCommentMarkup(id, username, commentText, undefined, renderControls);
      }
    }
  } else {
    for (var _i2 = 0; _i2 < state.commentList.commentList.length; _i2++) {
      var _comment2 = state.commentList.commentList[_i2];
      var _id = _comment2.id,
          _username = _comment2.username,
          _commentText = _comment2.text,
          _parentId = _comment2.parentId;

      if (_parentId) {
        commentListView.renderChildrenCommentMarkup(_id, _username, _commentText, _parentId, renderControls);
      } else {
        commentListView.renderCommentMarkup(_id, _username, _commentText, undefined, renderControls);
      }
    }
  }
};
/**
 * Controls
 */


var renderControls = function renderControls(id) {
  var comment = state.commentList.commentList.find(function (c) {
    return c.id == id;
  });
  var output = "<button class=\"comment__reply-btn\" data-id=\"".concat(id, "\">Reply</button>");

  if (comment && !comment.deleted) {
    output += "<button class=\"comment__delete-btn\" data-id=\"".concat(id, "\">Delete</button>");
  }

  return output;
};
},{"./model/CommentList":"js/model/CommentList.js","./view/commentListView":"js/view/commentListView.js","./view/base":"js/view/base.js","./helper/generateUniqueId":"js/helper/generateUniqueId.js","./helper/randomName":"js/helper/randomName.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61510" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map