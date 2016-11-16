webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(172);

	var _reactRedux = __webpack_require__(235);

	var _stores = __webpack_require__(256);

	var _stores2 = _interopRequireDefault(_stores);

	__webpack_require__(264);

	__webpack_require__(268);

	__webpack_require__(270);

	var _Index = __webpack_require__(272);

	var _Index2 = _interopRequireDefault(_Index);

	var _List = __webpack_require__(274);

	var _List2 = _interopRequireDefault(_List);

	var _Message = __webpack_require__(275);

	var _Message2 = _interopRequireDefault(_Message);

	var _Play = __webpack_require__(280);

	var _Play2 = _interopRequireDefault(_Play);

	var _Discover = __webpack_require__(282);

	var _Discover2 = _interopRequireDefault(_Discover);

	var _Mine = __webpack_require__(283);

	var _Mine2 = _interopRequireDefault(_Mine);

	var _TabBarFooter = __webpack_require__(273);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	var _Register = __webpack_require__(276);

	var _Register2 = _interopRequireDefault(_Register);

	var _Login = __webpack_require__(279);

	var _Login2 = _interopRequireDefault(_Login);

	var _actions = __webpack_require__(260);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //资源加载


	//Redux


	//样式加载
	//flex布局兼容性
	//加载公共样式
	//加载项目样式

	//组件加载


	//公共组件


	//初始设置
	var store = (0, _stores2.default)();
	store.subscribe(function () {
	    //每次状态机改变的时候执行
	    console.log(store.getState());
	});

	//主模板

	var Main = function (_Component) {
	    _inherits(Main, _Component);

	    function Main(props) {
	        _classCallCheck(this, Main);

	        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(Main, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'main' },
	                this.props.children,
	                _react2.default.createElement(_TabBarFooter2.default, null)
	            );
	        }
	    }]);

	    return Main;
	}(_react.Component);

	//路由


	_reactDom2.default.render(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(
	        _reactRouter.Router,
	        { history: _reactRouter.browserHistory },
	        _react2.default.createElement(
	            _reactRouter.Route,
	            { path: '/', component: Main },
	            _react2.default.createElement(_reactRouter.IndexRoute, { component: _Index2.default }),
	            _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _Login2.default }),
	            _react2.default.createElement(_reactRouter.Route, { path: '/register', component: _Register2.default }),
	            _react2.default.createElement(_reactRouter.Route, { onEnter: token, path: '/list', component: _List2.default }),
	            _react2.default.createElement(_reactRouter.Route, { onEnter: token, path: '/message', component: _Message2.default }),
	            _react2.default.createElement(_reactRouter.Route, { onEnter: token, path: '/play', component: _Play2.default }),
	            _react2.default.createElement(_reactRouter.Route, { onEnter: token, path: '/discover', component: _Discover2.default }),
	            _react2.default.createElement(_reactRouter.Route, { onEnter: token, path: '/mine', component: _Mine2.default })
	        )
	    )
	), document.body.appendChild(document.createElement('div')));

	function token(nextState, replace, next) {

	    // var headers = new Headers({
	    //     'x-access-token': token
	    // });
	    // fetch('*', {
	    //     method: 'GET', 
	    //     headers: headers
	    // }).then(function(response) {
	    //     console.log(response);
	    //     return response.json();
	    // }).then(function(data) {
	    //     console.log(data);
	    // }).catch(function(e) {
	    //     console.log("error1");
	    // });

	    //登录后的路径
	    var nextPath = nextState.location.pathname;
	    sessionStorage.setItem('nextPath', nextPath);

	    var token = localStorage.getItem('token');
	    if (token) {
	        $.ajax({
	            type: 'GET',
	            url: '*',
	            headers: {
	                'x-access-token': token
	            },
	            success: function success(result) {
	                if (!result.token) {
	                    _reactRouter.browserHistory.push('/login');
	                }
	                console.log(result);
	            }
	        });
	    } else {
	        replace('/login');
	    }
	    next();
	}

	//权限控制的中间
	function auth(nextState, replace, next) {
	    $.ajax({
	        type: "GET",
	        url: "/getSession",
	        success: function success(result) {
	            if (result.accountsId) {
	                next();
	            } else {
	                _reactRouter.browserHistory.push('/login');
	            }
	        }
	    });
	}

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _redux = __webpack_require__(242);

	var _reduxThunk = __webpack_require__(257);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(258);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reducers = __webpack_require__(259);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (initialState) {
		var store = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)()), window.devToolsExtension ? window.devToolsExtension() : function (f) {
			return f;
		})(_redux.createStore)(_reducers2.default, initialState);
		return store;
	};

/***/ },

/***/ 257:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	function createThunkMiddleware(extraArgument) {
	  return function (_ref) {
	    var dispatch = _ref.dispatch;
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        if (typeof action === 'function') {
	          return action(dispatch, getState, extraArgument);
	        }

	        return next(action);
	      };
	    };
	  };
	}

	var thunk = createThunkMiddleware();
	thunk.withExtraArgument = createThunkMiddleware;

	exports['default'] = thunk;

/***/ },

/***/ 258:
/***/ function(module, exports) {

	"use strict";

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	function _typeof(obj) {
	  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	}

	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	var formatTime = function formatTime(time) {
	  return "@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};

	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

	/**
	 * parse the level option of createLogger
	 *
	 * @property {string | function | object} level - console[level]
	 * @property {object} action
	 * @property {array} payload
	 * @property {string} type
	 */

	function getLogLevel(level, action, payload, type) {
	  switch (typeof level === "undefined" ? "undefined" : _typeof(level)) {
	    case "object":
	      return typeof level[type] === "function" ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
	    case "function":
	      return level(action);
	    default:
	      return level;
	  }
	}

	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string | function | object} options.level - console[level]
	 * @property {boolean} options.duration - print duration of each action?
	 * @property {boolean} options.timestamp - print timestamp with each action?
	 * @property {object} options.colors - custom colors
	 * @property {object} options.logger - implementation of the `console` API
	 * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {function} options.stateTransformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 * @property {function} options.errorTransformer - transform error before print
	 */

	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _options$level = options.level;
	  var level = _options$level === undefined ? "log" : _options$level;
	  var _options$logger = options.logger;
	  var logger = _options$logger === undefined ? console : _options$logger;
	  var _options$logErrors = options.logErrors;
	  var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
	  var collapsed = options.collapsed;
	  var predicate = options.predicate;
	  var _options$duration = options.duration;
	  var duration = _options$duration === undefined ? false : _options$duration;
	  var _options$timestamp = options.timestamp;
	  var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	  var transformer = options.transformer;
	  var _options$stateTransfo = options.stateTransformer;
	  var // deprecated
	  stateTransformer = _options$stateTransfo === undefined ? function (state) {
	    return state;
	  } : _options$stateTransfo;
	  var _options$actionTransf = options.actionTransformer;
	  var actionTransformer = _options$actionTransf === undefined ? function (actn) {
	    return actn;
	  } : _options$actionTransf;
	  var _options$errorTransfo = options.errorTransformer;
	  var errorTransformer = _options$errorTransfo === undefined ? function (error) {
	    return error;
	  } : _options$errorTransfo;
	  var _options$colors = options.colors;
	  var colors = _options$colors === undefined ? {
	    title: function title() {
	      return "#000000";
	    },
	    prevState: function prevState() {
	      return "#9E9E9E";
	    },
	    action: function action() {
	      return "#03A9F4";
	    },
	    nextState: function nextState() {
	      return "#4CAF50";
	    },
	    error: function error() {
	      return "#F20404";
	    }
	  } : _options$colors;

	  // exit if console undefined

	  if (typeof logger === "undefined") {
	    return function () {
	      return function (next) {
	        return function (action) {
	          return next(action);
	        };
	      };
	    };
	  }

	  if (transformer) {
	    console.error("Option 'transformer' is deprecated, use stateTransformer instead");
	  }

	  var logBuffer = [];
	  function printBuffer() {
	    logBuffer.forEach(function (logEntry, key) {
	      var started = logEntry.started;
	      var startedTime = logEntry.startedTime;
	      var action = logEntry.action;
	      var prevState = logEntry.prevState;
	      var error = logEntry.error;
	      var took = logEntry.took;
	      var nextState = logEntry.nextState;

	      var nextEntry = logBuffer[key + 1];
	      if (nextEntry) {
	        nextState = nextEntry.prevState;
	        took = nextEntry.started - started;
	      }
	      // message
	      var formattedAction = actionTransformer(action);
	      var isCollapsed = typeof collapsed === "function" ? collapsed(function () {
	        return nextState;
	      }, action) : collapsed;

	      var formattedTime = formatTime(startedTime);
	      var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
	      var title = "action " + (timestamp ? formattedTime : "") + " " + formattedAction.type + " " + (duration ? "(in " + took.toFixed(2) + " ms)" : "");

	      // render
	      try {
	        if (isCollapsed) {
	          if (colors.title) logger.groupCollapsed("%c " + title, titleCSS);else logger.groupCollapsed(title);
	        } else {
	          if (colors.title) logger.group("%c " + title, titleCSS);else logger.group(title);
	        }
	      } catch (e) {
	        logger.log(title);
	      }

	      var prevStateLevel = getLogLevel(level, formattedAction, [prevState], "prevState");
	      var actionLevel = getLogLevel(level, formattedAction, [formattedAction], "action");
	      var errorLevel = getLogLevel(level, formattedAction, [error, prevState], "error");
	      var nextStateLevel = getLogLevel(level, formattedAction, [nextState], "nextState");

	      if (prevStateLevel) {
	        if (colors.prevState) logger[prevStateLevel]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);else logger[prevStateLevel]("prev state", prevState);
	      }

	      if (actionLevel) {
	        if (colors.action) logger[actionLevel]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);else logger[actionLevel]("action", formattedAction);
	      }

	      if (error && errorLevel) {
	        if (colors.error) logger[errorLevel]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);else logger[errorLevel]("error", error);
	      }

	      if (nextStateLevel) {
	        if (colors.nextState) logger[nextStateLevel]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);else logger[nextStateLevel]("next state", nextState);
	      }

	      try {
	        logger.groupEnd();
	      } catch (e) {
	        logger.log("—— log end ——");
	      }
	    });
	    logBuffer.length = 0;
	  }

	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }

	        var logEntry = {};
	        logBuffer.push(logEntry);

	        logEntry.started = timer.now();
	        logEntry.startedTime = new Date();
	        logEntry.prevState = stateTransformer(getState());
	        logEntry.action = action;

	        var returnedValue = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            logEntry.error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }

	        logEntry.took = timer.now() - logEntry.started;
	        logEntry.nextState = stateTransformer(getState());

	        printBuffer();

	        if (logEntry.error) throw logEntry.error;
	        return returnedValue;
	      };
	    };
	  };
	}

	module.exports = createLogger;

/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(242);

	var _actions = __webpack_require__(260);

	var _underscore = __webpack_require__(261);

	var _underscore2 = _interopRequireDefault(_underscore);

	__webpack_require__(262);

	var _method = __webpack_require__(263);

	var _method2 = _interopRequireDefault(_method);

	var _Alert = __webpack_require__(278);

	var _Alert2 = _interopRequireDefault(_Alert);

	var _reactRouter = __webpack_require__(172);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //prototype扩展


	function articleList2() {
	    var _console;

	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _actions.GET_ARTICLE:
	            return action.payload;
	        case _actions.ADD_ARTICLE:
	            console.log('之前状态');
	            (_console = console).log.apply(_console, _toConsumableArray(state)); //之前的状态
	            console.log('之后状态');
	            console.log(action.payload); //之后的状态
	            return [action.payload].concat(_toConsumableArray(state));
	        case _actions.PUT_ARTICLE:
	            return state.arrEdit(action.index, action.value);
	        case _actions.DELETE_ARTICLE:
	            console.log(state);
	            return state.arrRemove(action.payload);
	        default:
	            return state;
	    }
	}

	function articleList() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _actions.GET_OK:
	            return action.payload;
	        case _actions.ADD_OK:
	            return [].concat(_toConsumableArray(state), [action.payload]);
	        case _actions.EDIT_OK:
	            return state.arrEdit(action.index, action.value);
	        case _actions.REMOVE_OK:
	            console.log(state);
	            return state.arrRemove(action.payload);
	        default:
	            return state;
	    }
	}

	function register() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _actions.REGISTER:
	            _Alert2.default.remove();
	            _Alert2.default.add(action.payload.message, 3000);
	            return action.payload;
	        default:
	            return state;
	    }
	}
	function login() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _actions.LOGIN:
	            _Alert2.default.remove();
	            localStorage.setItem('token', action.payload.token);
	            console.log(action.payload);
	            _Alert2.default.add(action.payload.message, 2500);
	            //登录成功后跳转
	            setTimeout(function () {
	                _reactRouter.browserHistory.push(sessionStorage.getItem('nextPath'));
	            }, 2500);
	            return action.payload;
	        default:
	            return state;
	    }
	}

	function messages() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _actions.SEND_MESSAGE:
	            return state;
	        default:
	            return state;
	    }
	}

	var todoApp = (0, _redux.combineReducers)({
	    articleList: articleList,
	    articleList2: articleList2,
	    register: register,
	    login: login,
	    messages: messages
	});

	exports.default = todoApp;

/***/ },

/***/ 260:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getArticle = getArticle;
	exports.addArticle = addArticle;
	exports.login = login;
	exports.register = register;
	exports.addTodo = addTodo;
	exports.removeTodo = removeTodo;
	exports.editTodo = editTodo;
	exports.getTodo = getTodo;
	// action 类型
	var ADD_OK = exports.ADD_OK = 'ADD_OK';
	var REMOVE_OK = exports.REMOVE_OK = 'REMOVE_OK';
	var GET_OK = exports.GET_OK = 'GET_OK';
	var EDIT_OK = exports.EDIT_OK = 'EDIT_OK';

	var LOGIN = exports.LOGIN = 'LOGIN';
	var REGISTER = exports.REGISTER = 'REGISTER';
	var SEND_MESSAGE = exports.SEND_MESSAGE = 'SEND_MESSAGE';

	var GET_ARTICLE = exports.GET_ARTICLE = 'GET_ARTICLE';
	var ADD_ARTICLE = exports.ADD_ARTICLE = 'ADD_ARTICLE';
	var PUT_ARTICLE = exports.PUT_ARTICLE = 'PUT_ARTICLE';
	var DELETE_ARTICLE = exports.DELETE_ARTICLE = 'DELETE_ARTICLE';

	function getArticle(value) {
	    return function (dispatch, getState) {
	        fetch('/article', {
	            method: "GET"
	        }).then(function (response) {
	            return response.json();
	        }).then(function (data) {
	            dispatch({
	                type: 'GET_ARTICLE',
	                payload: data
	            });
	        }).catch(function (err) {
	            console.log("服务器连接失败");
	        });
	    };
	}

	function addArticle(value) {
	    return function (dispatch, getState) {
	        fetch('/article', {
	            method: "POST",
	            headers: { "Content-Type": "application/x-www-form-urlencoded" },
	            body: $.param(value)
	        }).then(function (response) {
	            return response.json();
	        }).then(function (data) {
	            dispatch({
	                type: 'ADD_ARTICLE',
	                payload: value
	            });
	        }).catch(function (err) {
	            console.log("服务器连接失败");
	        });
	    };
	}
	function login(value) {
	    console.log('gogogogogogogog');
	    return function (dispatch, getState) {
	        fetch('/user/login', {
	            method: "POST",
	            headers: { "Content-Type": "application/x-www-form-urlencoded" },
	            body: $.param(value)
	        }).then(function (response) {
	            console.log(response);
	            return response.json();
	        }).then(function (data) {
	            dispatch({
	                type: 'LOGIN',
	                payload: data
	            });
	        }).catch(function (err) {
	            console.log("服务器连接失败");
	        });
	    };
	}

	function register(value) {
	    return function (dispatch, getState) {
	        fetch('/user/register', {
	            method: "POST",
	            headers: { "Content-Type": "application/x-www-form-urlencoded" },
	            body: $.param(value)
	        }).then(function (response) {
	            return response.json();
	        }).then(function (data) {
	            dispatch({
	                type: 'REGISTER',
	                payload: data
	            });
	        }).catch(function (err) {
	            console.log("服务器连接失败");
	        });
	    };

	    // console.log('前端提交注册');
	    // $.post('/user/register', value,(result)=>{
	    //     console.log(result);
	    //     if(result.state=='success'){
	    //         console.log('注册成功')
	    //     }else{
	    //         console.log('注册失败')
	    //     }
	    // })
	    // return {
	    //     type: REGISTER,
	    //     payload: value
	    // }

	    // return (dispatch,getState)=>{
	    //     $.post('/register', value,(result)=>{
	    //         console.log(result);
	    //         result.state=='success'?console.log('注册成功'):console.log('注册失败')
	    //     })

	    // function f1 () {
	    //     return new Promise((resolve, reject)=>{
	    //         $.post('/register', value,(result)=>{
	    //             result.state=='success'?resolve('登录成功'):reject('登录失败')
	    //         })
	    //     })
	    // }
	    // function f2 () {
	    //     return new Promise((resolve, reject)=>{
	    //         $.post('/register', value,(result)=>{
	    //             setTimeout(function() {
	    //                 resolve(result)
	    //             }, 1000);
	    //         })
	    //     })
	    // }
	    // function f3 () {
	    //     console.log('ccc');
	    //     return 'ccc'
	    // }
	    // function f4 () {
	    //     return new Promise((resolve, reject)=>{
	    //         $.post('/register', value,(result)=>{
	    //             result.state=='success'?resolve('登录成功'):reject('登录失败')
	    //         })
	    //     })
	    // }
	    // function f5 () {
	    //     return new Promise((resolve,reject)=>{
	    //         setTimeout(function() {
	    //             resolve('我是f5')
	    //         }, 1000);
	    //     })
	    // }
	    // Promise.all([f1(), f2(), f3()]).then(results=>{
	    //     console.log(results);
	    //     return f4()
	    // }).then(result=>{
	    //     console.log(result);
	    //     return f5()
	    // }).then(result=>{
	    //     console.log(result);
	    // }).catch(console.log('promise error 出错啦'))

	    // }
	}

	// action 创建函数
	function addTodo(value) {
	    console.log(value);
	    return function (dispatch, getState) {
	        dispatch({
	            type: ADD_OK,
	            payload: value
	        });
	    };
	}
	function removeTodo(value) {
	    return {
	        type: REMOVE_OK,
	        payload: value
	    };
	}
	function editTodo(index, value) {
	    return function (dispatch, getState) {
	        dispatch({
	            type: EDIT_OK,
	            index: index,
	            value: value
	        });
	    };
	}
	function getTodo(e) {
	    return function (dispatch, getState) {
	        var array = [7, 8, 9];
	        dispatch({
	            type: GET_OK,
	            payload: array.map(function (x) {
	                return x * x;
	            })
	        });
	    };
	}

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function () {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype,
	      ObjProto = Object.prototype,
	      FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var push = ArrayProto.push,
	      slice = ArrayProto.slice,
	      toString = ObjProto.toString,
	      hasOwnProperty = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var nativeIsArray = Array.isArray,
	      nativeKeys = Object.keys,
	      nativeBind = FuncProto.bind,
	      nativeCreate = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function Ctor() {};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function _(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function optimizeCb(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1:
	        return function (value) {
	          return func.call(context, value);
	        };
	      case 2:
	        return function (value, other) {
	          return func.call(context, value, other);
	        };
	      case 3:
	        return function (value, index, collection) {
	          return func.call(context, value, index, collection);
	        };
	      case 4:
	        return function (accumulator, value, index, collection) {
	          return func.call(context, accumulator, value, index, collection);
	        };
	    }
	    return function () {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function cb(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function (value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
	    return function (obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function baseCreate(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor();
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function property(key) {
	    return function (obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function isArrayLike(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function (obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function (obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function (obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function (obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function (value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function (obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function (obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function (value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function (obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function (obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function (obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function (obj, iteratee, context) {
	    var result = -Infinity,
	        lastComputed = -Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function (obj, iteratee, context) {
	    var result = Infinity,
	        lastComputed = Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function (obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function (obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function (value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function (left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function group(behavior) {
	    return function (obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key].push(value);else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function (result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key]++;else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function (obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function (obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [],
	        fail = [];
	    _.each(obj, function (value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function (array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function (array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function (array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function flatten(input, shallow, strict, startIndex) {
	    var output = [],
	        idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0,
	            len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function (array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function (array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function (array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function () {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function (array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function (array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function (value) {
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function () {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function (array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function (list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function (array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function (array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0,
	        high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function (array, item, idx) {
	      var i = 0,
	          length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	          i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function (start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function (func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function bound() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function (func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function bound() {
	      var position = 0,
	          length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) {
	        args.push(arguments[position++]);
	      }return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function (obj) {
	    var i,
	        length = arguments.length,
	        key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function (func, hasher) {
	    var memoize = function memoize(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function (func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function () {
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function (func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function later() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function () {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function (func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function later() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function (func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function (predicate) {
	    return function () {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function () {
	    var args = arguments;
	    var start = args.length - 1;
	    return function () {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) {
	        result = args[i].call(this, result);
	      }return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function (times, func) {
	    return function () {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function (times, func) {
	    var memo;
	    return function () {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) {
	      if (_.has(obj, key)) keys.push(key);
	    } // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) {
	      keys.push(key);
	    } // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = _.keys(obj),
	        length = keys.length,
	        results = {},
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys[index];
	      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function (obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function (obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj),
	        key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function (object, oiteratee, context) {
	    var result = {},
	        obj = object,
	        iteratee,
	        keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function iteratee(value, key, obj) {
	        return key in obj;
	      };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	  // Return a copy of the object without the blacklisted properties.
	  _.omit = function (obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function iteratee(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function (prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function (obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function (obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function (object, attrs) {
	    var keys = _.keys(attrs),
	        length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };

	  // Internal recursive comparison function for `isEqual`.
	  var eq = function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor,
	          bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a),
	          key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function (a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function (obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function (obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function (obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function (obj) {
	    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
	    _['is' + name] = function (obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function (obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) != 'object') {
	    _.isFunction = function (obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function (obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function (obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function (obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function (obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function (obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function (obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function () {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function (value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function (value) {
	    return function () {
	      return value;
	    };
	  };

	  _.noop = function () {};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function (obj) {
	    return obj == null ? function () {} : function (key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function (attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function (obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function (n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) {
	      accum[i] = iteratee(i);
	    }return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function (min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function () {
	    return new Date().getTime();
	  };

	  // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function createEscaper(map) {
	    var escaper = function escaper(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function (string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function (object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function (prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate: /<%([\s\S]+?)%>/g,
	    interpolate: /<%=([\s\S]+?)%>/g,
	    escape: /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'": "'",
	    '\\': '\\',
	    '\r': 'r',
	    '\n': 'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function escapeChar(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function (text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function template(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function (obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function result(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function (obj) {
	    _.each(_.functions(obj), function (name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function () {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function () {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function () {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(undefined);

/***/ },

/***/ 262:
/***/ function(module, exports) {

	"use strict";

	Array.prototype.arrRemove = function (n) {
	    if (n < 0) return this;else return this.slice(0, n).concat(this.slice(n + 1, this.length));
	};

/***/ },

/***/ 263:
/***/ function(module, exports) {

	'use strict';

	exports.test = function () {
		console.log('test2');
	};
	exports.test1 = function () {
		console.log('test3');
	};

/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(265);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(267)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./flex.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./flex.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(266)();
	// imports


	// module
	exports.push([module.id, "/*! https://github.com/1340641314/flex.css */[flex],[flex]>*,[flex]>[flex]{overflow:hidden}[flex]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}[flex]>*{display:block}[flex]>[flex]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}[flex~=\"dir:left\"]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}[flex~=\"dir:right\"]{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;-webkit-box-pack:end}[flex~=\"dir:top\"]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}[flex~=\"dir:bottom\"]{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-webkit-box-pack:end}[flex~=\"main:left\"]{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}[flex~=\"main:right\"]{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}[flex~=\"main:justify\"]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}[flex~=\"main:center\"]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[flex~=\"cross:top\"]{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start}[flex~=\"cross:bottom\"]{-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end}[flex~=\"cross:center\"]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center}[flex~=\"cross:baseline\"]{-webkit-box-align:baseline;-webkit-align-items:baseline;-ms-flex-align:baseline;-ms-grid-row-align:baseline;align-items:baseline}[flex~=\"cross:stretch\"]{-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}[flex~=\"box:mean\"]>*,[flex~=\"box:first\"]>*,[flex~=\"box:last\"]>*,[flex~=\"box:justify\"]>*{width:0;height:auto;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1}[flex~=\"box:first\"]>:first-child,[flex~=\"box:last\"]>:last-child,[flex~=\"box:justify\"]>:first-child,[flex~=\"box:justify\"]>:last-child{width:auto;-webkit-box-flex:0;-webkit-flex-grow:0;-ms-flex-positive:0;flex-grow:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}[flex~=\"dir:top\"][flex~=\"box:mean\"]>*,[flex~=\"dir:top\"][flex~=\"box:first\"]>*,[flex~=\"dir:top\"][flex~=\"box:last\"]>*,[flex~=\"dir:top\"][flex~=\"box:justify\"]>*,[flex~=\"dir:bottom\"][flex~=\"box:mean\"]>*,[flex~=\"dir:bottom\"][flex~=\"box:first\"]>*,[flex~=\"dir:bottom\"][flex~=\"box:last\"]>*,[flex~=\"dir:bottom\"][flex~=\"box:justify\"]>*{width:auto;height:0;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1}[flex~=\"dir:top\"][flex~=\"box:first\"]>:first-child,[flex~=\"dir:top\"][flex~=\"box:last\"]>:last-child,[flex~=\"dir:top\"][flex~=\"box:justify\"]>:first-child,[flex~=\"dir:top\"][flex~=\"box:justify\"]>:last-child,[flex~=\"dir:bottom\"][flex~=\"box:first\"]>:first-child,[flex~=\"dir:bottom\"][flex~=\"box:last\"]>:last-child,[flex~=\"dir:bottom\"][flex~=\"box:justify\"]>:first-child [flex~=\"dir:bottom\"][flex~=\"box:justify\"]>:last-child{height:auto;-webkit-box-flex:0;-webkit-flex-grow:0;-ms-flex-positive:0;flex-grow:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}[flex-box=\"0\"]{-webkit-box-flex:0;-webkit-flex-grow:0;-ms-flex-positive:0;flex-grow:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}[flex-box=\"1\"]{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1}[flex-box=\"2\"]{-webkit-box-flex:2;-webkit-flex-grow:2;-ms-flex-positive:2;flex-grow:2;-webkit-flex-shrink:2;-ms-flex-negative:2;flex-shrink:2}[flex-box=\"3\"]{-webkit-box-flex:3;-webkit-flex-grow:3;-ms-flex-positive:3;flex-grow:3;-webkit-flex-shrink:3;-ms-flex-negative:3;flex-shrink:3}[flex-box=\"4\"]{-webkit-box-flex:4;-webkit-flex-grow:4;-ms-flex-positive:4;flex-grow:4;-webkit-flex-shrink:4;-ms-flex-negative:4;flex-shrink:4}[flex-box=\"5\"]{-webkit-box-flex:5;-webkit-flex-grow:5;-ms-flex-positive:5;flex-grow:5;-webkit-flex-shrink:5;-ms-flex-negative:5;flex-shrink:5}[flex-box=\"6\"]{-webkit-box-flex:6;-webkit-flex-grow:6;-ms-flex-positive:6;flex-grow:6;-webkit-flex-shrink:6;-ms-flex-negative:6;flex-shrink:6}[flex-box=\"7\"]{-webkit-box-flex:7;-webkit-flex-grow:7;-ms-flex-positive:7;flex-grow:7;-webkit-flex-shrink:7;-ms-flex-negative:7;flex-shrink:7}[flex-box=\"8\"]{-webkit-box-flex:8;-webkit-flex-grow:8;-ms-flex-positive:8;flex-grow:8;-webkit-flex-shrink:8;-ms-flex-negative:8;flex-shrink:8}[flex-box=\"9\"]{-webkit-box-flex:9;-webkit-flex-grow:9;-ms-flex-positive:9;flex-grow:9;-webkit-flex-shrink:9;-ms-flex-negative:9;flex-shrink:9}[flex-box=\"10\"]{-webkit-box-flex:10;-webkit-flex-grow:10;-ms-flex-positive:10;flex-grow:10;-webkit-flex-shrink:10;-ms-flex-negative:10;flex-shrink:10}", ""]);

	// exports


/***/ },

/***/ 266:
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 268:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 270:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(260);

	var action = _interopRequireWildcard(_actions);

	var _TabBarFooter = __webpack_require__(273);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	//组件


	var Index = function (_Component) {
	    _inherits(Index, _Component);

	    function Index(props) {
	        _classCallCheck(this, Index);

	        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

	        _this.state = {
	            color: 'red2'
	        };
	        return _this;
	    }

	    _createClass(Index, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var newState = {};
	            newState[e.target.name] = e.target.value;
	            this.setState(newState);
	        }
	    }, {
	        key: 'handleReset',
	        value: function handleReset(e) {
	            console.log(e);
	            console.log('handleReset');
	            this.refs.color.value = '12345';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var that = this;
	            var _props = this.props;
	            var list = _props.list;
	            var list2 = _props.list2;
	            var addTodo = _props.addTodo;
	            var removeTodo = _props.removeTodo;

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'header' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '菜单'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        '4Pgo'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '菜单'
	                    )
	                ),
	                _react2.default.createElement('img', { src: '/images/pic_maliao.jpg' }),
	                _react2.default.createElement('input', { type: 'text', name: 'color', ref: 'color', onChange: this.handleChange.bind(this) }),
	                _react2.default.createElement(
	                    'button',
	                    { onClick: function onClick() {
	                            that.handleReset.bind(that);addTodo(that.state.color);
	                        } },
	                    'ADD'
	                ),
	                _react2.default.createElement(
	                    'button',
	                    { onClick: function onClick() {
	                            return removeTodo(1);
	                        } },
	                    'REMOVE'
	                ),
	                '111',
	                list.map(function (result, index) {
	                    return _react2.default.createElement(
	                        'div',
	                        { key: index },
	                        result
	                    );
	                }),
	                '222',
	                list2.map(function (result, index) {
	                    console.log('aaaaa');
	                    console.log(result.title);
	                    console.log('bbbbb');
	                    return _react2.default.createElement(
	                        'div',
	                        { key: index },
	                        result.title
	                    );
	                }),
	                '333'
	            );
	        }
	    }]);

	    return Index;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        list: state.articleList,
	        list2: state.articleList2
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Index);

/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TabBarFooter = function (_Component) {
	    _inherits(TabBarFooter, _Component);

	    function TabBarFooter() {
	        _classCallCheck(this, TabBarFooter);

	        return _possibleConstructorReturn(this, (TabBarFooter.__proto__ || Object.getPrototypeOf(TabBarFooter)).apply(this, arguments));
	    }

	    _createClass(TabBarFooter, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'tab-bar-footer' },
	                _react2.default.createElement(
	                    _reactRouter.IndexLink,
	                    { activeClassName: 'footer-active', to: '/' },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'icon iconfont' },
	                        ''
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        '首页'
	                    )
	                ),
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { activeClassName: 'footer-active', to: '/message' },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'icon iconfont' },
	                        ''
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        '消息'
	                    )
	                ),
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { activeClassName: 'footer-active', to: '/play' },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'icon iconfont' },
	                        ''
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        '约起'
	                    )
	                ),
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { activeClassName: 'footer-active', to: '/discover' },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'icon iconfont' },
	                        ''
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        '发现'
	                    )
	                ),
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { activeClassName: 'footer-active', to: '/mine' },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'icon iconfont' },
	                        ''
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        '我的'
	                    )
	                )
	            );
	        }
	    }]);

	    return TabBarFooter;
	}(_react.Component);

	exports.default = TabBarFooter;

/***/ },

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(260);

	var action = _interopRequireWildcard(_actions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	var List = function (_Component) {
	    _inherits(List, _Component);

	    function List() {
	        _classCallCheck(this, List);

	        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	    }

	    _createClass(List, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                '我是列表页',
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/' },
	                    '首页'
	                ),
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/list' },
	                    '列表页'
	                )
	            );
	        }
	    }]);

	    return List;
	}(_react.Component);

	//将state.counter绑定到props的counter


	function mapStateToProps(state) {
	    console.log(state);
	    //这个state就是store里的总state
	    return {};
	}
	//将action的所有方法绑定到props上
	function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	}

	//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(List);

/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(260);

	var action = _interopRequireWildcard(_actions);

	var _TabBarFooter = __webpack_require__(273);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	var _Register = __webpack_require__(276);

	var _Register2 = _interopRequireDefault(_Register);

	var _Login = __webpack_require__(279);

	var _Login2 = _interopRequireDefault(_Login);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	//组件


	var Message = function (_Component) {
	    _inherits(Message, _Component);

	    function Message(props) {
	        _classCallCheck(this, Message);

	        var _this = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(Message, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var newState = {};
	            newState[e.target.name] = e.target.value;
	            this.setState(newState);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var that = this;
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'header' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '菜单'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        '4Pgo'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '菜单'
	                    )
	                ),
	                _react2.default.createElement(
	                    'ul',
	                    { className: 'message-list' },
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        '消息列表111'
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        '消息列表222'
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        '消息列表333'
	                    )
	                ),
	                _react2.default.createElement(_Login2.default, null)
	            );
	        }
	    }]);

	    return Message;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        // messageList:state.messageList,
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Message);

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(260);

	var action = _interopRequireWildcard(_actions);

	var _Submit = __webpack_require__(277);

	var _Submit2 = _interopRequireDefault(_Submit);

	var _Alert = __webpack_require__(278);

	var _Alert2 = _interopRequireDefault(_Alert);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	//按钮组件


	//公用组件


	var Register = function (_Component) {
	    _inherits(Register, _Component);

	    function Register(props) {
	        _classCallCheck(this, Register);

	        var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this, props));

	        _this.state = {
	            canClick: true
	        };
	        return _this;
	    }

	    _createClass(Register, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // let hide = Alert.loading('注册提交中...', 1000)
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var newState = {};
	            newState[e.target.name] = e.target.value;
	            this.setState(newState);
	            console.log(this.state);
	        }
	    }, {
	        key: 'rules',
	        value: function rules() {
	            if (this.state.password != this.state.re_password) {
	                _Alert2.default.add('两次输入的密码不一致...', 2500);
	                this.setState({
	                    canClick: true
	                });
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: 'handleRegister',
	        value: function handleRegister() {
	            this.setState({ canClick: false });
	            if (!this.rules()) {
	                return false;
	            }

	            _Alert2.default.add('注册提交中...', 3000);
	            this.props.register({
	                username: this.state.username,
	                password: this.state.password,
	                re_password: this.state.re_password,
	                nickname: this.state.nickname
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var registerState = this.props.registerState;

	            if (registerState.state == 'error') {
	                this.state.canClick = true;
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'accounts' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'register' },
	                    _react2.default.createElement(
	                        'form',
	                        null,
	                        _react2.default.createElement('input', { type: 'text', name: 'username', placeholder: '用户名', onChange: this.handleChange.bind(this) }),
	                        _react2.default.createElement('input', { type: 'password', name: 'password', placeholder: '密码', onChange: this.handleChange.bind(this) }),
	                        _react2.default.createElement('input', { type: 'password', name: 're_password', placeholder: '确认密码', onChange: this.handleChange.bind(this) }),
	                        _react2.default.createElement('input', { type: 'nickname', name: 'nickname', placeholder: '昵称', onChange: this.handleChange.bind(this) }),
	                        _react2.default.createElement(_Submit2.default, { thisClick: this.handleRegister.bind(this), canClick: this.state.canClick, text: '立即注册' })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'link' },
	                        '已有账号？',
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/login' },
	                            '立即登录'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Register;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        registerState: state.register
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Register);

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Submit = function (_Component) {
	    _inherits(Submit, _Component);

	    function Submit() {
	        _classCallCheck(this, Submit);

	        return _possibleConstructorReturn(this, (Submit.__proto__ || Object.getPrototypeOf(Submit)).apply(this, arguments));
	    }

	    _createClass(Submit, [{
	        key: "render",
	        value: function render() {
	            // console.log(this.props.canClick);
	            if (!!this.props.canClick) {
	                return _react2.default.createElement(
	                    "button",
	                    { onClick: this.props.thisClick, type: "button", style: styles.button },
	                    this.props.text
	                );
	            } else {
	                return _react2.default.createElement(
	                    "button",
	                    { type: "button", style: styles.button2 },
	                    this.props.text
	                );
	            }
	        }
	    }]);

	    return Submit;
	}(_react.Component);

	var styles = {
	    button: {
	        color: '#fff',
	        display: 'block',
	        background: '#800080',
	        textAlign: 'center',
	        animation: 'alertShow .5s',
	        width: '100%',
	        margin: '5px auto 0',
	        padding: '10px 0',
	        borderRadius: '5px',
	        fontSize: '14px'
	    },
	    button2: {
	        color: '#fff',
	        display: 'block',
	        background: '#999',
	        textAlign: 'center',
	        animation: 'alertShow .5s',
	        width: '100%',
	        margin: '5px auto 0',
	        padding: '10px 0',
	        borderRadius: '5px',
	        fontSize: '14px'
	    }
	};
	exports.default = Submit;

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _nodeUuid = __webpack_require__(284);

	var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function getUUID() {
	    return _nodeUuid2.default.v1();
	}

	var Alert = function (_Component) {
	    _inherits(Alert, _Component);

	    function Alert(props) {
	        _classCallCheck(this, Alert);

	        var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

	        _this.state = {
	            id: getUUID()
	        };
	        return _this;
	    }

	    _createClass(Alert, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            $('.tips').show('500').animate({ top: '5px' }, "300");
	            var that = this;
	            setTimeout(function () {
	                $('#' + _this2.state.id).remove();
	            }, this.props.delay);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            console.log('unmount');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // console.log('render');
	            return _react2.default.createElement(
	                'div',
	                { style: styles.tips, id: this.state.id },
	                this.props.text
	            );
	        }
	    }]);

	    return Alert;
	}(_react.Component);

	var styles = {
	    tips: {
	        color: '#fff',
	        display: 'block',
	        background: 'orange',
	        textAlign: 'center',
	        animation: 'alertShow .5s',
	        width: '80%',
	        margin: '5px auto 0',
	        padding: '10px 0',
	        borderRadius: '5px',
	        fontSize: '14px'
	    }
	};

	exports.add = function (text, delay) {
	    var dom = document.createElement('div');
	    dom.style.zIndex = '9999';
	    dom.style.position = 'relative';
	    dom.className = 'tips';
	    _reactDom2.default.render(_react2.default.createElement(Alert, { text: text, delay: delay }), document.body.appendChild(dom));
	};

	exports.remove = function () {
	    $('.tips').remove();
	};

/***/ },

/***/ 279:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(260);

	var action = _interopRequireWildcard(_actions);

	var _Submit = __webpack_require__(277);

	var _Submit2 = _interopRequireDefault(_Submit);

	var _Alert = __webpack_require__(278);

	var _Alert2 = _interopRequireDefault(_Alert);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	//按钮组件

	//公用组件


	var Login = function (_Component) {
	    _inherits(Login, _Component);

	    function Login(props) {
	        _classCallCheck(this, Login);

	        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

	        _this.state = {
	            canClick: true
	        };
	        return _this;
	    }

	    _createClass(Login, [{
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var newState = {};
	            newState[e.target.name] = e.target.value;
	            this.setState(newState);
	            console.log(this.state);
	        }
	    }, {
	        key: 'rules',
	        value: function rules() {
	            if (!this.state.username) {
	                _Alert2.default.add('用户名不能为空', 2500);
	                this.setState({ canClick: true });
	                return false;
	            }
	            if (!this.state.password) {
	                _Alert2.default.add('密码不能为空', 2500);
	                this.setState({ canClick: true });
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: 'handleLogin',
	        value: function handleLogin() {
	            console.log('handleLogin');
	            this.setState({ canClick: false });
	            if (!this.rules()) {
	                return false;
	            }
	            _Alert2.default.add('登录提交中...', 3000);
	            this.props.login({
	                username: this.state.username,
	                password: this.state.password
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var stateLogin = this.props.stateLogin;

	            if (stateLogin.state == 'error') {
	                this.state.canClick = true;
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'accounts' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'login' },
	                    _react2.default.createElement(
	                        'form',
	                        null,
	                        _react2.default.createElement('input', { type: 'text', name: 'username', onChange: this.handleChange.bind(this), placeholder: '用户名' }),
	                        _react2.default.createElement('input', { type: 'password', name: 'password', onChange: this.handleChange.bind(this), placeholder: '密码' }),
	                        _react2.default.createElement(_Submit2.default, { thisClick: this.handleLogin.bind(this), canClick: this.state.canClick, text: '立即登录' })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'link' },
	                        '没有账号？',
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/register' },
	                            '立即注册'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Login;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        stateLogin: state.login
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);

/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _li;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(260);

	var action = _interopRequireWildcard(_actions);

	var _TabBarFooter = __webpack_require__(273);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	var _SendMessage = __webpack_require__(281);

	var _SendMessage2 = _interopRequireDefault(_SendMessage);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	//组件


	var Play = function (_Component) {
	    _inherits(Play, _Component);

	    function Play(props) {
	        _classCallCheck(this, Play);

	        var _this = _possibleConstructorReturn(this, (Play.__proto__ || Object.getPrototypeOf(Play)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(Play, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.props.getArticle();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var newState = {};
	            newState[e.target.name] = e.target.value;
	            this.setState(newState);
	        }
	    }, {
	        key: 'addArticle',
	        value: function addArticle(e) {
	            var data = {
	                title: this.state.title,
	                content: this.state.content
	            };
	            this.props.addArticle(data);
	            //在发表以后，输入框内容清空，状态内容清空
	            this.setState({
	                title: '',
	                content: ''
	            });
	            this.refs.title.value = "";
	            this.refs.content.value = "";
	        }
	    }, {
	        key: 'showId',
	        value: function showId(e) {
	            alert(e.target.id);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var that = this;
	            var _props = this.props;
	            var list = _props.list;
	            var list2 = _props.list2;

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'header' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '菜单'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        '4Pgo'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '菜单'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'play' },
	                    _react2.default.createElement(_SendMessage2.default, null),
	                    _react2.default.createElement('input', { name: 'title', ref: 'title', onChange: this.handleChange.bind(this), type: 'text', placeholder: '标题' }),
	                    _react2.default.createElement('input', { name: 'content', ref: 'content', onChange: this.handleChange.bind(this), type: 'text', placeholder: '内容' }),
	                    _react2.default.createElement(
	                        'button',
	                        { onClick: this.addArticle.bind(this) },
	                        '添加新闻'
	                    ),
	                    list.map(function (result, index) {
	                        return _react2.default.createElement(
	                            'div',
	                            { key: index },
	                            result
	                        );
	                    }),
	                    _react2.default.createElement(
	                        'ul',
	                        { style: styles.list },
	                        list2.map(function (result, index) {
	                            return _react2.default.createElement(
	                                'li',
	                                { style: styles.li, onClick: _this2.showId.bind(_this2), key: index, id: result._id },
	                                _react2.default.createElement(
	                                    'div',
	                                    { style: styles.title },
	                                    result.title
	                                ),
	                                _react2.default.createElement(
	                                    'div',
	                                    { style: styles.createAt },
	                                    moment(result.createAt).format("LL")
	                                )
	                            );
	                        })
	                    )
	                )
	            );
	        }
	    }]);

	    return Play;
	}(_react.Component);

	var styles = {
	    list: {
	        marginLeft: '5%',
	        marginRight: '5%'
	    },
	    li: (_li = {
	        display: 'flex'
	    }, _defineProperty(_li, 'display', '-webkit-flex'), _defineProperty(_li, 'flexDirection', 'row'), _defineProperty(_li, 'justifyContent', 'space-between'), _defineProperty(_li, 'borderBottom', '1px solid #dedede'), _defineProperty(_li, 'padding', '10px 0'), _li),
	    title: {},
	    createAt: {
	        fontSize: '12px',
	        color: '#999'
	    }

	};

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        list: state.articleList,
	        list2: state.articleList2
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Play);

/***/ },

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(260);

	var action = _interopRequireWildcard(_actions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	var SendMessage = function (_Component) {
	    _inherits(SendMessage, _Component);

	    function SendMessage(props) {
	        _classCallCheck(this, SendMessage);

	        var _this = _possibleConstructorReturn(this, (SendMessage.__proto__ || Object.getPrototypeOf(SendMessage)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(SendMessage, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var newState = {};
	            newState[e.target.name] = e.target.value;
	            this.setState(newState);
	        }
	    }, {
	        key: 'handleSendMessage',
	        value: function handleSendMessage() {
	            this.props.sendMessage();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var that = this;
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement('textarea', { name: 'message', id: 'message', onChange: this.handleChange.bind(this) }),
	                _react2.default.createElement(
	                    'button',
	                    { onClick: this.handleSendMessage.bind(this) },
	                    '发送消息'
	                )
	            );
	        }
	    }]);

	    return SendMessage;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        // messageList:state.messageList,
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SendMessage);

/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(260);

	var action = _interopRequireWildcard(_actions);

	var _TabBarFooter = __webpack_require__(273);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	//组件


	var Discover = function (_Component) {
	    _inherits(Discover, _Component);

	    function Discover(props) {
	        _classCallCheck(this, Discover);

	        var _this = _possibleConstructorReturn(this, (Discover.__proto__ || Object.getPrototypeOf(Discover)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(Discover, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var newState = {};
	            newState[e.target.name] = e.target.value;
	            this.setState(newState);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var that = this;
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'header' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '菜单'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        '4Pgo'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '菜单'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'discover' },
	                    '发现'
	                )
	            );
	        }
	    }]);

	    return Discover;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        // messageList:state.messageList,
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Discover);

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(260);

	var action = _interopRequireWildcard(_actions);

	var _TabBarFooter = __webpack_require__(273);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	//组件


	var Mine = function (_Component) {
	    _inherits(Mine, _Component);

	    function Mine(props) {
	        _classCallCheck(this, Mine);

	        var _this = _possibleConstructorReturn(this, (Mine.__proto__ || Object.getPrototypeOf(Mine)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(Mine, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var newState = {};
	            newState[e.target.name] = e.target.value;
	            this.setState(newState);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var that = this;
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'header' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '菜单'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        '4Pgo'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '菜单'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'mine' },
	                    '我的'
	                )
	            );
	        }
	    }]);

	    return Mine;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        // messageList:state.messageList,
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Mine);

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	/*global window, require, define */
	(function (_window) {
	  'use strict';

	  // Unique ID creation requires a high quality random # generator.  We feature
	  // detect to determine the best RNG source, normalizing to a function that
	  // returns 128-bits of randomness, since that's what's usually required

	  var _rng, _mathRNG, _nodeRNG, _whatwgRNG, _previousRoot;

	  function setupBrowser() {
	    // Allow for MSIE11 msCrypto
	    var _crypto = _window.crypto || _window.msCrypto;

	    if (!_rng && _crypto && _crypto.getRandomValues) {
	      // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	      //
	      // Moderately fast, high quality
	      try {
	        var _rnds8 = new Uint8Array(16);
	        _whatwgRNG = _rng = function whatwgRNG() {
	          _crypto.getRandomValues(_rnds8);
	          return _rnds8;
	        };
	        _rng();
	      } catch (e) {}
	    }

	    if (!_rng) {
	      // Math.random()-based (RNG)
	      //
	      // If all else fails, use Math.random().  It's fast, but is of unspecified
	      // quality.
	      var _rnds = new Array(16);
	      _mathRNG = _rng = function _rng() {
	        for (var i = 0, r; i < 16; i++) {
	          if ((i & 0x03) === 0) {
	            r = Math.random() * 0x100000000;
	          }
	          _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	        }

	        return _rnds;
	      };
	      if ('undefined' !== typeof console && console.warn) {
	        console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()");
	      }
	    }
	  }

	  function setupNode() {
	    // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
	    //
	    // Moderately fast, high quality
	    if (true) {
	      try {
	        var _rb = __webpack_require__(289).randomBytes;
	        _nodeRNG = _rng = _rb && function () {
	          return _rb(16);
	        };
	        _rng();
	      } catch (e) {}
	    }
	  }

	  if (_window) {
	    setupBrowser();
	  } else {
	    setupNode();
	  }

	  // Buffer class to use
	  var BufferClass = 'function' === typeof Buffer ? Buffer : Array;

	  // Maps for number <-> hex string conversion
	  var _byteToHex = [];
	  var _hexToByte = {};
	  for (var i = 0; i < 256; i++) {
	    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	    _hexToByte[_byteToHex[i]] = i;
	  }

	  // **`parse()` - Parse a UUID into it's component bytes**
	  function parse(s, buf, offset) {
	    var i = buf && offset || 0,
	        ii = 0;

	    buf = buf || [];
	    s.toLowerCase().replace(/[0-9a-f]{2}/g, function (oct) {
	      if (ii < 16) {
	        // Don't overflow!
	        buf[i + ii++] = _hexToByte[oct];
	      }
	    });

	    // Zero out remaining bytes if string was short
	    while (ii < 16) {
	      buf[i + ii++] = 0;
	    }

	    return buf;
	  }

	  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	  function unparse(buf, offset) {
	    var i = offset || 0,
	        bth = _byteToHex;
	    return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
	  }

	  // **`v1()` - Generate time-based UUID**
	  //
	  // Inspired by https://github.com/LiosK/UUID.js
	  // and http://docs.python.org/library/uuid.html

	  // random #'s we need to init node and clockseq
	  var _seedBytes = _rng();

	  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	  var _nodeId = [_seedBytes[0] | 0x01, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];

	  // Per 4.2.2, randomize (14 bit) clockseq
	  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	  // Previous uuid creation time
	  var _lastMSecs = 0,
	      _lastNSecs = 0;

	  // See https://github.com/broofa/node-uuid for API details
	  function v1(options, buf, offset) {
	    var i = buf && offset || 0;
	    var b = buf || [];

	    options = options || {};

	    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

	    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

	    // Per 4.2.1.2, use count of uuid's generated during the current clock
	    // cycle to simulate higher resolution clock
	    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

	    // Time since last uuid creation (in msecs)
	    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

	    // Per 4.2.1.2, Bump clockseq on clock regression
	    if (dt < 0 && options.clockseq == null) {
	      clockseq = clockseq + 1 & 0x3fff;
	    }

	    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	    // time interval
	    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
	      nsecs = 0;
	    }

	    // Per 4.2.1.2 Throw error if too many uuids are requested
	    if (nsecs >= 10000) {
	      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	    }

	    _lastMSecs = msecs;
	    _lastNSecs = nsecs;
	    _clockseq = clockseq;

	    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	    msecs += 12219292800000;

	    // `time_low`
	    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	    b[i++] = tl >>> 24 & 0xff;
	    b[i++] = tl >>> 16 & 0xff;
	    b[i++] = tl >>> 8 & 0xff;
	    b[i++] = tl & 0xff;

	    // `time_mid`
	    var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
	    b[i++] = tmh >>> 8 & 0xff;
	    b[i++] = tmh & 0xff;

	    // `time_high_and_version`
	    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	    b[i++] = tmh >>> 16 & 0xff;

	    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	    b[i++] = clockseq >>> 8 | 0x80;

	    // `clock_seq_low`
	    b[i++] = clockseq & 0xff;

	    // `node`
	    var node = options.node || _nodeId;
	    for (var n = 0; n < 6; n++) {
	      b[i + n] = node[n];
	    }

	    return buf ? buf : unparse(b);
	  }

	  // **`v4()` - Generate random UUID**

	  // See https://github.com/broofa/node-uuid for API details
	  function v4(options, buf, offset) {
	    // Deprecated - 'format' argument, as supported in v1.2
	    var i = buf && offset || 0;

	    if (typeof options === 'string') {
	      buf = options === 'binary' ? new BufferClass(16) : null;
	      options = null;
	    }
	    options = options || {};

	    var rnds = options.random || (options.rng || _rng)();

	    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	    rnds[6] = rnds[6] & 0x0f | 0x40;
	    rnds[8] = rnds[8] & 0x3f | 0x80;

	    // Copy bytes to buffer, if provided
	    if (buf) {
	      for (var ii = 0; ii < 16; ii++) {
	        buf[i + ii] = rnds[ii];
	      }
	    }

	    return buf || unparse(rnds);
	  }

	  // Export public API
	  var uuid = v4;
	  uuid.v1 = v1;
	  uuid.v4 = v4;
	  uuid.parse = parse;
	  uuid.unparse = unparse;
	  uuid.BufferClass = BufferClass;
	  uuid._rng = _rng;
	  uuid._mathRNG = _mathRNG;
	  uuid._nodeRNG = _nodeRNG;
	  uuid._whatwgRNG = _whatwgRNG;

	  if ('undefined' !== typeof module && module.exports) {
	    // Publish as node.js module
	    module.exports = uuid;
	  } else if (true) {
	    // Publish as AMD module
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return uuid;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // Publish as global (in browsers)
	    _previousRoot = _window.uuid;

	    // **`noConflict()` - (browser only) to reset global 'uuid' var**
	    uuid.noConflict = function () {
	      _window.uuid = _previousRoot;
	      return uuid;
	    };

	    _window.uuid = uuid;
	  }
	})('undefined' !== typeof window ? window : null);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(285).Buffer))

/***/ },

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict';

	var base64 = __webpack_require__(286);
	var ieee754 = __webpack_require__(287);
	var isArray = __webpack_require__(288);

	exports.Buffer = Buffer;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength();

	function typedArraySupport() {
	  try {
	    var arr = new Uint8Array(1);
	    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
	        return 42;
	      } };
	    return arr.foo() === 42 && // typed array instances can be augmented
	    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
	  } catch (e) {
	    return false;
	  }
	}

	function kMaxLength() {
	  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
	}

	function createBuffer(that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length');
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length);
	    }
	    that.length = length;
	  }

	  return that;
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer(arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length);
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error('If encoding is specified then the first argument must be a string');
	    }
	    return allocUnsafe(this, arg);
	  }
	  return from(this, arg, encodingOrOffset, length);
	}

	Buffer.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype;
	  return arr;
	};

	function from(that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number');
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length);
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset);
	  }

	  return fromObject(that, value);
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length);
	};

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    });
	  }
	}

	function assertSize(size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number');
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative');
	  }
	}

	function alloc(that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size);
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
	  }
	  return createBuffer(that, size);
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding);
	};

	function allocUnsafe(that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that;
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size);
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size);
	};

	function fromString(that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding');
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);

	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that;
	}

	function fromArrayLike(that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	function fromArrayBuffer(that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds');
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds');
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that;
	}

	function fromObject(that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that;
	    }

	    obj.copy(that, 0, 0, len);
	    return that;
	  }

	  if (obj) {
	    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0);
	      }
	      return fromArrayLike(that, obj);
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data);
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
	}

	function checked(length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
	  }
	  return length | 0;
	}

	function SlowBuffer(length) {
	  if (+length != length) {
	    // eslint-disable-line eqeqeq
	    length = 0;
	  }
	  return Buffer.alloc(+length);
	}

	Buffer.isBuffer = function isBuffer(b) {
	  return !!(b != null && b._isBuffer);
	};

	Buffer.compare = function compare(a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers');
	  }

	  if (a === b) return 0;

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};

	Buffer.isEncoding = function isEncoding(encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true;
	    default:
	      return false;
	  }
	};

	Buffer.concat = function concat(list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers');
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0);
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers');
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer;
	};

	function byteLength(string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length;
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength;
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0;

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len;
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length;
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2;
	      case 'hex':
	        return len >>> 1;
	      case 'base64':
	        return base64ToBytes(string).length;
	      default:
	        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString(encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return '';
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return '';
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return '';
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end);

	      case 'ascii':
	        return asciiSlice(this, start, end);

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end);

	      case 'base64':
	        return base64Slice(this, start, end);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true;

	function swap(b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16() {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits');
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this;
	};

	Buffer.prototype.swap32 = function swap32() {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits');
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this;
	};

	Buffer.prototype.swap64 = function swap64() {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits');
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this;
	};

	Buffer.prototype.toString = function toString() {
	  var length = this.length | 0;
	  if (length === 0) return '';
	  if (arguments.length === 0) return utf8Slice(this, 0, length);
	  return slowToString.apply(this, arguments);
	};

	Buffer.prototype.equals = function equals(b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return true;
	  return Buffer.compare(this, b) === 0;
	};

	Buffer.prototype.inspect = function inspect() {
	  var str = '';
	  var max = exports.INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>';
	};

	Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer');
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index');
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0;
	  }
	  if (thisStart >= thisEnd) {
	    return -1;
	  }
	  if (start >= end) {
	    return 1;
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0;

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break;
	    }
	  }

	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1;

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset; // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : buffer.length - 1;
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1;else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;else return -1;
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1;
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
	      }
	    }
	    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
	  }

	  throw new TypeError('val must be string, number or Buffer');
	}

	function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1;
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read(buf, i) {
	    if (indexSize === 1) {
	      return buf[i];
	    } else {
	      return buf.readUInt16BE(i * indexSize);
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break;
	        }
	      }
	      if (found) return i;
	    }
	  }

	  return -1;
	}

	Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1;
	};

	Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
	};

	function hexWrite(buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i;
	    buf[offset + i] = parsed;
	  }
	  return i;
	}

	function utf8Write(buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
	}

	function asciiWrite(buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length);
	}

	function latin1Write(buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length);
	}

	function base64Write(buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length);
	}

	function ucs2Write(buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
	}

	Buffer.prototype.write = function write(string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	    // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	    // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	    // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds');
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length);

	      case 'ascii':
	        return asciiWrite(this, string, offset, length);

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length);

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON() {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  };
	};

	function base64Slice(buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf);
	  } else {
	    return base64.fromByteArray(buf.slice(start, end));
	  }
	}

	function utf8Slice(buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break;
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res);
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray(codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
	  }
	  return res;
	}

	function asciiSlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret;
	}

	function latin1Slice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret;
	}

	function hexSlice(buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out;
	}

	function utf16leSlice(buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res;
	}

	Buffer.prototype.slice = function slice(start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf;
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset(offset, ext, length) {
	  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
	}

	Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset];
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | this[offset + 1] << 8;
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] << 8 | this[offset + 1];
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
	};

	Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return this[offset];
	  return (0xff - this[offset] + 1) * -1;
	};

	Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | this[offset + 1] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | this[offset] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
	};

	Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
	};

	Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, true, 23, 4);
	};

	Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, false, 23, 4);
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, true, 52, 8);
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, false, 52, 8);
	};

	function checkInt(buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('Index out of range');
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	function objectWriteUInt16(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	function objectWriteUInt32(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = value >>> 24;
	    this[offset + 2] = value >>> 16;
	    this[offset + 1] = value >>> 8;
	    this[offset] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	    this[offset + 2] = value >>> 16;
	    this[offset + 3] = value >>> 24;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	function checkIEEE754(buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range');
	  if (offset < 0) throw new RangeError('Index out of range');
	}

	function writeFloat(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4;
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert);
	};

	function writeDouble(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8;
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert);
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy(target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0;
	  if (target.length === 0 || this.length === 0) return 0;

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds');
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
	  if (end < 0) throw new RangeError('sourceEnd out of bounds');

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
	  }

	  return len;
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill(val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string');
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding);
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index');
	  }

	  if (end <= start) {
	    return this;
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this;
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean(str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return '';
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str;
	}

	function stringtrim(str) {
	  if (str.trim) return str.trim();
	  return str.replace(/^\s+|\s+$/g, '');
	}

	function toHex(n) {
	  if (n < 16) return '0' + n.toString(16);
	  return n.toString(16);
	}

	function utf8ToBytes(string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue;
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue;
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break;
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break;
	      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break;
	      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break;
	      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else {
	      throw new Error('Invalid code point');
	    }
	  }

	  return bytes;
	}

	function asciiToBytes(str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray;
	}

	function utf16leToBytes(str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break;

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray;
	}

	function base64ToBytes(str) {
	  return base64.toByteArray(base64clean(str));
	}

	function blitBuffer(src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if (i + offset >= dst.length || i >= src.length) break;
	    dst[i + offset] = src[i];
	  }
	  return i;
	}

	function isnan(val) {
	  return val !== val; // eslint-disable-line no-self-compare
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(285).Buffer, (function() { return this; }())))

/***/ },

/***/ 286:
/***/ function(module, exports) {

	'use strict';

	exports.toByteArray = toByteArray;
	exports.fromByteArray = fromByteArray;

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

	function init() {
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	init();

	function toByteArray(b64) {
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4');
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = tmp >> 16 & 0xFF;
	    arr[L++] = tmp >> 8 & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
	    arr[L++] = tmp >> 8 & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr;
	}

	function tripletToBase64(num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
	}

	function encodeChunk(uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('');
	}

	function fromByteArray(uint8) {
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[tmp << 4 & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
	    output += lookup[tmp >> 10];
	    output += lookup[tmp >> 4 & 0x3F];
	    output += lookup[tmp << 2 & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('');
	}

/***/ },

/***/ 287:
/***/ function(module, exports) {

	"use strict";

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? nBytes - 1 : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & (1 << -nBits) - 1;
	  s >>= -nBits;
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : (s ? -1 : 1) * Infinity;
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
	  var i = isLE ? 0 : nBytes - 1;
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	};

/***/ },

/***/ 288:
/***/ function(module, exports) {

	'use strict';

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	var rng = __webpack_require__(290);

	function error() {
	  var m = [].slice.call(arguments).join(' ');
	  throw new Error([m, 'we accept pull requests', 'http://github.com/dominictarr/crypto-browserify'].join('\n'));
	}

	exports.createHash = __webpack_require__(292);

	exports.createHmac = __webpack_require__(304);

	exports.randomBytes = function (size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)));
	    } catch (err) {
	      callback(err);
	    }
	  } else {
	    return new Buffer(rng(size));
	  }
	};

	function each(a, f) {
	  for (var i in a) {
	    f(a[i], i);
	  }
	}

	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160'];
	};

	var p = __webpack_require__(305)(exports);
	exports.pbkdf2 = p.pbkdf2;
	exports.pbkdf2Sync = p.pbkdf2Sync;

	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials', 'createCipher', 'createCipheriv', 'createDecipher', 'createDecipheriv', 'createSign', 'createVerify', 'createDiffieHellman'], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet');
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(285).Buffer))

/***/ },

/***/ 290:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {'use strict';

	(function () {
	  var g = ('undefined' === typeof window ? global : window) || {};
	  _crypto = g.crypto || g.msCrypto || __webpack_require__(291);
	  module.exports = function (size) {
	    // Modern Browsers
	    if (_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */

	      _crypto.getRandomValues(bytes);
	      return bytes;
	    } else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size);
	    } else throw new Error('secure random number generation not supported by this browser\n' + 'use chrome, FireFox or Internet Explorer 11');
	  };
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(285).Buffer))

/***/ },

/***/ 291:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	var createHash = __webpack_require__(293);

	var md5 = toConstructor(__webpack_require__(301));
	var rmd160 = toConstructor(__webpack_require__(303));

	function toConstructor(fn) {
	  return function () {
	    var buffers = [];
	    var m = {
	      update: function update(data, enc) {
	        if (!Buffer.isBuffer(data)) data = new Buffer(data, enc);
	        buffers.push(data);
	        return this;
	      },
	      digest: function digest(enc) {
	        var buf = Buffer.concat(buffers);
	        var r = fn(buf);
	        buffers = null;
	        return enc ? r.toString(enc) : r;
	      }
	    };
	    return m;
	  };
	}

	module.exports = function (alg) {
	  if ('md5' === alg) return new md5();
	  if ('rmd160' === alg) return new rmd160();
	  return createHash(alg);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(285).Buffer))

/***/ },

/***/ 293:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _exports = module.exports = function (alg) {
	  var Alg = _exports[alg];
	  if (!Alg) throw new Error(alg + ' is not supported (we accept pull requests)');
	  return new Alg();
	};

	var Buffer = __webpack_require__(285).Buffer;
	var Hash = __webpack_require__(294)(Buffer);

	_exports.sha1 = __webpack_require__(295)(Buffer, Hash);
	_exports.sha256 = __webpack_require__(299)(Buffer, Hash);
	_exports.sha512 = __webpack_require__(300)(Buffer, Hash);

/***/ },

/***/ 294:
/***/ function(module, exports) {

	"use strict";

	module.exports = function (Buffer) {

	  //prototype class for hash functions
	  function Hash(blockSize, finalSize) {
	    this._block = new Buffer(blockSize); //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize;
	    this._blockSize = blockSize;
	    this._len = 0;
	    this._s = 0;
	  }

	  Hash.prototype.init = function () {
	    this._s = 0;
	    this._len = 0;
	  };

	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8";
	      data = new Buffer(data, enc);
	    }

	    var l = this._len += data.length;
	    var s = this._s = this._s || 0;
	    var f = 0;
	    var buffer = this._block;

	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - s % this._blockSize);
	      var ch = t - f;

	      for (var i = 0; i < ch; i++) {
	        buffer[s % this._blockSize + i] = data[i + f];
	      }

	      s += ch;
	      f += ch;

	      if (s % this._blockSize === 0) {
	        this._update(buffer);
	      }
	    }
	    this._s = s;

	    return this;
	  };

	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8;

	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80;

	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1);

	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block);
	      this._block.fill(0);
	    }

	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4);

	    var hash = this._update(this._block) || this._hash();

	    return enc ? hash.toString(enc) : hash;
	  };

	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass');
	  };

	  return Hash;
	};

/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */

	var inherits = __webpack_require__(296).inherits;

	module.exports = function (Buffer, Hash) {

	  var A = 0 | 0;
	  var B = 4 | 0;
	  var C = 8 | 0;
	  var D = 12 | 0;
	  var E = 16 | 0;

	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80);

	  var POOL = [];

	  function Sha1() {
	    if (POOL.length) return POOL.pop().init();

	    if (!(this instanceof Sha1)) return new Sha1();
	    this._w = W;
	    Hash.call(this, 16 * 4, 14 * 4);

	    this._h = null;
	    this.init();
	  }

	  inherits(Sha1, Hash);

	  Sha1.prototype.init = function () {
	    this._a = 0x67452301;
	    this._b = 0xefcdab89;
	    this._c = 0x98badcfe;
	    this._d = 0x10325476;
	    this._e = 0xc3d2e1f0;

	    Hash.prototype.init.call(this);
	    return this;
	  };

	  Sha1.prototype._POOL = POOL;
	  Sha1.prototype._update = function (X) {

	    var a, b, c, d, e, _a, _b, _c, _d, _e;

	    a = _a = this._a;
	    b = _b = this._b;
	    c = _c = this._c;
	    d = _d = this._d;
	    e = _e = this._e;

	    var w = this._w;

	    for (var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j * 4) : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);

	      var t = add(add(rol(a, 5), sha1_ft(j, b, c, d)), add(add(e, W), sha1_kt(j)));

	      e = d;
	      d = c;
	      c = rol(b, 30);
	      b = a;
	      a = t;
	    }

	    this._a = add(a, _a);
	    this._b = add(b, _b);
	    this._c = add(c, _c);
	    this._d = add(d, _d);
	    this._e = add(e, _e);
	  };

	  Sha1.prototype._hash = function () {
	    if (POOL.length < 100) POOL.push(this);
	    var H = new Buffer(20);
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a | 0, A);
	    H.writeInt32BE(this._b | 0, B);
	    H.writeInt32BE(this._c | 0, C);
	    H.writeInt32BE(this._d | 0, D);
	    H.writeInt32BE(this._e | 0, E);
	    return H;
	  };

	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if (t < 20) return b & c | ~b & d;
	    if (t < 40) return b ^ c ^ d;
	    if (t < 60) return b & c | b & d | c & d;
	    return b ^ c ^ d;
	  }

	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
	  }

	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return x + y | 0;
	    //lets see how this goes on testling.
	    //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	    //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	    //  return (msw << 16) | (lsw & 0xFFFF);
	  }

	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return num << cnt | num >>> 32 - cnt;
	  }

	  return Sha1;
	};

/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function (f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function (x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s':
	        return String(args[i++]);
	      case '%d':
	        return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};

	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function (fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function () {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};

	var debugs = {};
	var debugEnviron;
	exports.debuglog = function (set) {
	  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function () {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function () {};
	    }
	  }
	  return debugs[set];
	};

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold': [1, 22],
	  'italic': [3, 23],
	  'underline': [4, 24],
	  'inverse': [7, 27],
	  'white': [37, 39],
	  'grey': [90, 39],
	  'black': [30, 39],
	  'blue': [34, 39],
	  'cyan': [36, 39],
	  'green': [32, 39],
	  'magenta': [35, 39],
	  'red': [31, 39],
	  'yellow': [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};

	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}

	function stylizeNoColor(str, styleType) {
	  return str;
	}

	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function (val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}

	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect && value && isFunction(value.inspect) &&
	  // Filter out the util module, it's inspect function is special
	  value.inspect !== exports.inspect &&
	  // Also filter out any prototype objects using the circular check.
	  !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '',
	      array = false,
	      braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function (key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}

	function formatPrimitive(ctx, value) {
	  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value)) return ctx.stylize('' + value, 'number');
	  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value)) return ctx.stylize('null', 'null');
	}

	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}

	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function (key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
	    }
	  });
	  return output;
	}

	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function (line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function (line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}

	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function (prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol' || // ES6 symbol
	  typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(297);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}

	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function () {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};

	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(298);

	exports._extend = function (origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)))

/***/ },

/***/ 297:
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	module.exports = function isBuffer(arg) {
	  return arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
	};

/***/ },

/***/ 298:
/***/ function(module, exports) {

	'use strict';

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function TempCtor() {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(296).inherits;

	module.exports = function (Buffer, Hash) {

	  var K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];

	  var W = new Array(64);

	  function Sha256() {
	    this.init();

	    this._w = W; //new Array(64)

	    Hash.call(this, 16 * 4, 14 * 4);
	  }

	  inherits(Sha256, Hash);

	  Sha256.prototype.init = function () {

	    this._a = 0x6a09e667 | 0;
	    this._b = 0xbb67ae85 | 0;
	    this._c = 0x3c6ef372 | 0;
	    this._d = 0xa54ff53a | 0;
	    this._e = 0x510e527f | 0;
	    this._f = 0x9b05688c | 0;
	    this._g = 0x1f83d9ab | 0;
	    this._h = 0x5be0cd19 | 0;

	    this._len = this._s = 0;

	    return this;
	  };

	  function S(X, n) {
	    return X >>> n | X << 32 - n;
	  }

	  function R(X, n) {
	    return X >>> n;
	  }

	  function Ch(x, y, z) {
	    return x & y ^ ~x & z;
	  }

	  function Maj(x, y, z) {
	    return x & y ^ x & z ^ y & z;
	  }

	  function Sigma0256(x) {
	    return S(x, 2) ^ S(x, 13) ^ S(x, 22);
	  }

	  function Sigma1256(x) {
	    return S(x, 6) ^ S(x, 11) ^ S(x, 25);
	  }

	  function Gamma0256(x) {
	    return S(x, 7) ^ S(x, 18) ^ R(x, 3);
	  }

	  function Gamma1256(x) {
	    return S(x, 17) ^ S(x, 19) ^ R(x, 10);
	  }

	  Sha256.prototype._update = function (M) {

	    var W = this._w;
	    var a, b, c, d, e, f, g, h;
	    var T1, T2;

	    a = this._a | 0;
	    b = this._b | 0;
	    c = this._c | 0;
	    d = this._d | 0;
	    e = this._e | 0;
	    f = this._f | 0;
	    g = this._g | 0;
	    h = this._h | 0;

	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16 ? M.readInt32BE(j * 4) : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16];

	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w;

	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g;g = f;f = e;e = d + T1;d = c;c = b;b = a;a = T1 + T2;
	    }

	    this._a = a + this._a | 0;
	    this._b = b + this._b | 0;
	    this._c = c + this._c | 0;
	    this._d = d + this._d | 0;
	    this._e = e + this._e | 0;
	    this._f = f + this._f | 0;
	    this._g = g + this._g | 0;
	    this._h = h + this._h | 0;
	  };

	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32);

	    H.writeInt32BE(this._a, 0);
	    H.writeInt32BE(this._b, 4);
	    H.writeInt32BE(this._c, 8);
	    H.writeInt32BE(this._d, 12);
	    H.writeInt32BE(this._e, 16);
	    H.writeInt32BE(this._f, 20);
	    H.writeInt32BE(this._g, 24);
	    H.writeInt32BE(this._h, 28);

	    return H;
	  };

	  return Sha256;
	};

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(296).inherits;

	module.exports = function (Buffer, Hash) {
	  var K = [0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b, 0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817];

	  var W = new Array(160);

	  function Sha512() {
	    this.init();
	    this._w = W;

	    Hash.call(this, 128, 112);
	  }

	  inherits(Sha512, Hash);

	  Sha512.prototype.init = function () {

	    this._a = 0x6a09e667 | 0;
	    this._b = 0xbb67ae85 | 0;
	    this._c = 0x3c6ef372 | 0;
	    this._d = 0xa54ff53a | 0;
	    this._e = 0x510e527f | 0;
	    this._f = 0x9b05688c | 0;
	    this._g = 0x1f83d9ab | 0;
	    this._h = 0x5be0cd19 | 0;

	    this._al = 0xf3bcc908 | 0;
	    this._bl = 0x84caa73b | 0;
	    this._cl = 0xfe94f82b | 0;
	    this._dl = 0x5f1d36f1 | 0;
	    this._el = 0xade682d1 | 0;
	    this._fl = 0x2b3e6c1f | 0;
	    this._gl = 0xfb41bd6b | 0;
	    this._hl = 0x137e2179 | 0;

	    this._len = this._s = 0;

	    return this;
	  };

	  function S(X, Xl, n) {
	    return X >>> n | Xl << 32 - n;
	  }

	  function Ch(x, y, z) {
	    return x & y ^ ~x & z;
	  }

	  function Maj(x, y, z) {
	    return x & y ^ x & z ^ y & z;
	  }

	  Sha512.prototype._update = function (M) {

	    var W = this._w;
	    var a, b, c, d, e, f, g, h;
	    var al, bl, cl, dl, el, fl, gl, hl;

	    a = this._a | 0;
	    b = this._b | 0;
	    c = this._c | 0;
	    d = this._d | 0;
	    e = this._e | 0;
	    f = this._f | 0;
	    g = this._g | 0;
	    h = this._h | 0;

	    al = this._al | 0;
	    bl = this._bl | 0;
	    cl = this._cl | 0;
	    dl = this._dl | 0;
	    el = this._el | 0;
	    fl = this._fl | 0;
	    gl = this._gl | 0;
	    hl = this._hl | 0;

	    for (var i = 0; i < 80; i++) {
	      var j = i * 2;

	      var Wi, Wil;

	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4);
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4);
	      } else {
	        var x = W[j - 15 * 2];
	        var xl = W[j - 15 * 2 + 1];
	        var gamma0 = S(x, xl, 1) ^ S(x, xl, 8) ^ x >>> 7;
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7);

	        x = W[j - 2 * 2];
	        xl = W[j - 2 * 2 + 1];
	        var gamma1 = S(x, xl, 19) ^ S(xl, x, 29) ^ x >>> 6;
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6);

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7 = W[j - 7 * 2];
	        var Wi7l = W[j - 7 * 2 + 1];

	        var Wi16 = W[j - 16 * 2];
	        var Wi16l = W[j - 16 * 2 + 1];

	        Wil = gamma0l + Wi7l;
	        Wi = gamma0 + Wi7 + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
	        Wil = Wil + gamma1l;
	        Wi = Wi + gamma1 + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
	        Wil = Wil + Wi16l;
	        Wi = Wi + Wi16 + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);

	        W[j] = Wi;
	        W[j + 1] = Wil;
	      }

	      var maj = Maj(a, b, c);
	      var majl = Maj(al, bl, cl);

	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7);
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7);
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9);
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9);

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j];
	      var Kil = K[j + 1];

	      var ch = Ch(e, f, g);
	      var chl = Ch(el, fl, gl);

	      var t1l = hl + sigma1l;
	      var t1 = h + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
	      t1l = t1l + chl;
	      t1 = t1 + ch + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
	      t1l = t1l + Kil;
	      t1 = t1 + Ki + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
	      t1l = t1l + Wil;
	      t1 = t1 + Wi + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl;
	      var t2 = sigma0h + maj + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);

	      h = g;
	      hl = gl;
	      g = f;
	      gl = fl;
	      f = e;
	      fl = el;
	      el = dl + t1l | 0;
	      e = d + t1 + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
	      d = c;
	      dl = cl;
	      c = b;
	      cl = bl;
	      b = a;
	      bl = al;
	      al = t1l + t2l | 0;
	      a = t1 + t2 + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
	    }

	    this._al = this._al + al | 0;
	    this._bl = this._bl + bl | 0;
	    this._cl = this._cl + cl | 0;
	    this._dl = this._dl + dl | 0;
	    this._el = this._el + el | 0;
	    this._fl = this._fl + fl | 0;
	    this._gl = this._gl + gl | 0;
	    this._hl = this._hl + hl | 0;

	    this._a = this._a + a + (this._al >>> 0 < al >>> 0 ? 1 : 0) | 0;
	    this._b = this._b + b + (this._bl >>> 0 < bl >>> 0 ? 1 : 0) | 0;
	    this._c = this._c + c + (this._cl >>> 0 < cl >>> 0 ? 1 : 0) | 0;
	    this._d = this._d + d + (this._dl >>> 0 < dl >>> 0 ? 1 : 0) | 0;
	    this._e = this._e + e + (this._el >>> 0 < el >>> 0 ? 1 : 0) | 0;
	    this._f = this._f + f + (this._fl >>> 0 < fl >>> 0 ? 1 : 0) | 0;
	    this._g = this._g + g + (this._gl >>> 0 < gl >>> 0 ? 1 : 0) | 0;
	    this._h = this._h + h + (this._hl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
	  };

	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64);

	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset);
	      H.writeInt32BE(l, offset + 4);
	    }

	    writeInt64BE(this._a, this._al, 0);
	    writeInt64BE(this._b, this._bl, 8);
	    writeInt64BE(this._c, this._cl, 16);
	    writeInt64BE(this._d, this._dl, 24);
	    writeInt64BE(this._e, this._el, 32);
	    writeInt64BE(this._f, this._fl, 40);
	    writeInt64BE(this._g, this._gl, 48);
	    writeInt64BE(this._h, this._hl, 56);

	    return H;
	  };

	  return Sha512;
	};

/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	var helpers = __webpack_require__(302);

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len) {
	  /* append padding */
	  x[len >> 5] |= 0x80 << len % 32;
	  x[(len + 64 >>> 9 << 4) + 14] = len;

	  var a = 1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d = 271733878;

	  for (var i = 0; i < x.length; i += 16) {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;

	    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
	    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
	    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
	    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
	    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
	    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
	    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

	    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
	    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
	    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
	    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
	    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
	    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
	    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
	    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
	    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
	    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
	    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
	    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

	    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
	    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
	    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
	    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
	    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
	    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
	    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
	    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
	    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

	    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
	    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
	    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
	    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
	    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
	    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
	    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
	    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);
	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t) {
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}
	function md5_ff(a, b, c, d, x, s, t) {
	  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t) {
	  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t) {
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t) {
	  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y) {
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return msw << 16 | lsw & 0xFFFF;
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt) {
	  return num << cnt | num >>> 32 - cnt;
	}

	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";

	var intSize = 4;
	var zeroBuffer = new Buffer(intSize);zeroBuffer.fill(0);
	var chrsz = 8;

	function toArray(buf, bigEndian) {
	  if (buf.length % intSize !== 0) {
	    var len = buf.length + (intSize - buf.length % intSize);
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }

	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}

	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}

	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}

	module.exports = { hash: hash };
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(285).Buffer))

/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	module.exports = ripemd160;

	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	// Constants table
	var zl = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
	var zr = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
	var sl = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
	var sr = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];

	var hl = [0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr = [0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];

	var bytesToWords = function bytesToWords(bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << 24 - b % 32;
	  }
	  return words;
	};

	var wordsToBytes = function wordsToBytes(words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
	  }
	  return bytes;
	};

	var processBlock = function processBlock(H, M, offset) {

	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];

	    // Swap
	    M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
	  }

	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;

	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = al + M[offset + zl[i]] | 0;
	    if (i < 16) {
	      t += f1(bl, cl, dl) + hl[0];
	    } else if (i < 32) {
	      t += f2(bl, cl, dl) + hl[1];
	    } else if (i < 48) {
	      t += f3(bl, cl, dl) + hl[2];
	    } else if (i < 64) {
	      t += f4(bl, cl, dl) + hl[3];
	    } else {
	      // if (i<80) {
	      t += f5(bl, cl, dl) + hl[4];
	    }
	    t = t | 0;
	    t = rotl(t, sl[i]);
	    t = t + el | 0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;

	    t = ar + M[offset + zr[i]] | 0;
	    if (i < 16) {
	      t += f5(br, cr, dr) + hr[0];
	    } else if (i < 32) {
	      t += f4(br, cr, dr) + hr[1];
	    } else if (i < 48) {
	      t += f3(br, cr, dr) + hr[2];
	    } else if (i < 64) {
	      t += f2(br, cr, dr) + hr[3];
	    } else {
	      // if (i<80) {
	      t += f1(br, cr, dr) + hr[4];
	    }
	    t = t | 0;
	    t = rotl(t, sr[i]);
	    t = t + er | 0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t = H[1] + cl + dr | 0;
	  H[1] = H[2] + dl + er | 0;
	  H[2] = H[3] + el + ar | 0;
	  H[3] = H[4] + al + br | 0;
	  H[4] = H[0] + bl + cr | 0;
	  H[0] = t;
	};

	function f1(x, y, z) {
	  return x ^ y ^ z;
	}

	function f2(x, y, z) {
	  return x & y | ~x & z;
	}

	function f3(x, y, z) {
	  return (x | ~y) ^ z;
	}

	function f4(x, y, z) {
	  return x & z | y & ~z;
	}

	function f5(x, y, z) {
	  return x ^ (y | ~z);
	}

	function rotl(x, n) {
	  return x << n | x >>> 32 - n;
	}

	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

	  if (typeof message == 'string') message = new Buffer(message, 'utf8');

	  var m = bytesToWords(message);

	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;

	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
	  m[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 0x00ff00ff | (nBitsTotal << 24 | nBitsTotal >>> 8) & 0xff00ff00;

	  for (var i = 0; i < m.length; i += 16) {
	    processBlock(H, m, i);
	  }

	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	    // Shortcut
	    var H_i = H[i];

	    // Swap
	    H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
	  }

	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(285).Buffer))

/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	var createHash = __webpack_require__(292);

	var zeroBuffer = new Buffer(128);
	zeroBuffer.fill(0);

	module.exports = Hmac;

	function Hmac(alg, key) {
	  if (!(this instanceof Hmac)) return new Hmac(alg, key);
	  this._opad = opad;
	  this._alg = alg;

	  var blocksize = alg === 'sha512' ? 128 : 64;

	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key;

	  if (key.length > blocksize) {
	    key = createHash(alg).update(key).digest();
	  } else if (key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize);
	  }

	  var ipad = this._ipad = new Buffer(blocksize);
	  var opad = this._opad = new Buffer(blocksize);

	  for (var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36;
	    opad[i] = key[i] ^ 0x5C;
	  }

	  this._hash = createHash(alg).update(ipad);
	}

	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc);
	  return this;
	};

	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest();
	  return createHash(this._alg).update(this._opad).update(h).digest(enc);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(285).Buffer))

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pbkdf2Export = __webpack_require__(306);

	module.exports = function (crypto, exports) {
	  exports = exports || {};

	  var exported = pbkdf2Export(crypto);

	  exports.pbkdf2 = exported.pbkdf2;
	  exports.pbkdf2Sync = exported.pbkdf2Sync;

	  return exports;
	};

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	module.exports = function (crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest;
	      digest = undefined;
	    }

	    if ('function' !== typeof callback) throw new Error('No callback provided to pbkdf2');

	    setTimeout(function () {
	      var result;

	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest);
	      } catch (e) {
	        return callback(e);
	      }

	      callback(undefined, result);
	    });
	  }

	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations) throw new TypeError('Iterations not a number');

	    if (iterations < 0) throw new TypeError('Bad iterations');

	    if ('number' !== typeof keylen) throw new TypeError('Key length not a number');

	    if (keylen < 0) throw new TypeError('Bad key length');

	    digest = digest || 'sha1';

	    if (!Buffer.isBuffer(password)) password = new Buffer(password);
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt);

	    var hLen,
	        l = 1,
	        r,
	        T;
	    var DK = new Buffer(keylen);
	    var block1 = new Buffer(salt.length + 4);
	    salt.copy(block1, 0, 0, salt.length);

	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length);

	      var U = crypto.createHmac(digest, password).update(block1).digest();

	      if (!hLen) {
	        hLen = U.length;
	        T = new Buffer(hLen);
	        l = Math.ceil(keylen / hLen);
	        r = keylen - (l - 1) * hLen;

	        if (keylen > (Math.pow(2, 32) - 1) * hLen) throw new TypeError('keylen exceeds maximum length');
	      }

	      U.copy(T, 0, 0, hLen);

	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest();

	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k];
	        }
	      }

	      var destPos = (i - 1) * hLen;
	      var len = i == l ? r : hLen;
	      T.copy(DK, destPos, 0, len);
	    }

	    return DK;
	  }

	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(285).Buffer))

/***/ }

});