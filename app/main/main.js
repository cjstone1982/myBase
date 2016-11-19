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

	__webpack_require__(269);

	__webpack_require__(270);

	var _Index = __webpack_require__(271);

	var _Index2 = _interopRequireDefault(_Index);

	var _List = __webpack_require__(405);

	var _List2 = _interopRequireDefault(_List);

	var _Message = __webpack_require__(406);

	var _Message2 = _interopRequireDefault(_Message);

	var _Play = __webpack_require__(407);

	var _Play2 = _interopRequireDefault(_Play);

	var _Discover = __webpack_require__(409);

	var _Discover2 = _interopRequireDefault(_Discover);

	var _Mine = __webpack_require__(410);

	var _Mine2 = _interopRequireDefault(_Mine);

	var _TabBarFooter = __webpack_require__(272);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	var _Register = __webpack_require__(411);

	var _Register2 = _interopRequireDefault(_Register);

	var _Login = __webpack_require__(413);

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
	//antd-mobile主样式

	//组件加载


	//公共组件


	//初始设置
	var store = (0, _stores2.default)();
	store.subscribe(function () {
	    //每次状态机改变的时候执行
	    console.log('当前state');
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

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(242);

	var _actions = __webpack_require__(260);

	__webpack_require__(261);

	var _method = __webpack_require__(262);

	var _method2 = _interopRequireDefault(_method);

	var _Alert = __webpack_require__(263);

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
	            if (action.payload.token) {
	                localStorage.setItem('token', action.payload.token);
	            }
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
/***/ function(module, exports) {

	"use strict";

	Array.prototype.arrRemove = function (n) {
	    if (n < 0) return this;else return this.slice(0, n).concat(this.slice(n + 1, this.length));
	};

/***/ },

/***/ 262:
/***/ function(module, exports) {

	'use strict';

	exports.test = function () {
		console.log('test2');
	};

	exports.test1 = function () {
		console.log('test3');
	};

	exports.getUUID = function () {
		var d = new Date().getTime();
		var uuid = 'cjxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
		});
		return uuid;
	};

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _method = __webpack_require__(262);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Alert = function (_Component) {
	    _inherits(Alert, _Component);

	    function Alert(props) {
	        _classCallCheck(this, Alert);

	        var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

	        _this.state = {
	            id: (0, _method.getUUID)()
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

/***/ 268:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 269:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 270:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 271:
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

	var _TabBarFooter = __webpack_require__(272);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	var _Modal = __webpack_require__(273);

	var _Modal2 = _interopRequireDefault(_Modal);

	var _Button = __webpack_require__(378);

	var _Button2 = _interopRequireDefault(_Button);

	var _WhiteSpace = __webpack_require__(390);

	var _WhiteSpace2 = _interopRequireDefault(_WhiteSpace);

	var _WingBlank = __webpack_require__(391);

	var _WingBlank2 = _interopRequireDefault(_WingBlank);

	var _Toast = __webpack_require__(392);

	var _Toast2 = _interopRequireDefault(_Toast);

	var _Icon = __webpack_require__(388);

	var _Icon2 = _interopRequireDefault(_Icon);

	var _Popup = __webpack_require__(397);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _List = __webpack_require__(398);

	var _List2 = _interopRequireDefault(_List);

	var _ImagePicker = __webpack_require__(401);

	var _ImagePicker2 = _interopRequireDefault(_ImagePicker);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	//组件


	//antd-mobile


	var data = [{
	    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
	    id: '2121'
	}, {
	    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
	    id: '2122'
	}];

	var Index = function (_Component) {
	    _inherits(Index, _Component);

	    function Index(props) {
	        _classCallCheck(this, Index);

	        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

	        _this.state = {
	            color: 'red2',
	            visible: false,
	            sel: '',
	            files: data,
	            custom: false
	        };
	        return _this;
	    }

	    _createClass(Index, [{
	        key: 'onChange',
	        value: function onChange(files, type, index) {
	            console.log(files, type, index);
	            this.setState({
	                files: files
	            });
	        }
	    }, {
	        key: 'onAddImageClick',
	        value: function onAddImageClick() {
	            this.setState({
	                files: this.state.files.concat({
	                    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
	                    id: '3'
	                })
	            });
	        }
	    }, {
	        key: 'sw',
	        value: function sw() {
	            this.setState({
	                custom: !this.state.custom
	            });
	        }
	    }, {
	        key: 'showModal',
	        value: function showModal() {
	            this.setState({
	                visible: true
	            });
	        }
	    }, {
	        key: 'onClose',
	        value: function onClose() {
	            this.setState({
	                visible: false
	            });
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick() {
	            var _this2 = this;

	            _Popup2.default.show(_react2.default.createElement(
	                _List2.default,
	                { renderHeader: function renderHeader() {
	                        return '账户总览 (已绑定3个）';
	                    } },
	                _react2.default.createElement(
	                    _List2.default.Item,
	                    {
	                        thumb: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
	                        onClick: function onClick() {
	                            _this2.onClose2('cancel');
	                        }
	                    },
	                    '东吴证券 (5728）'
	                ),
	                _react2.default.createElement(
	                    _List2.default.Item,
	                    {
	                        thumb: 'https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png',
	                        onClick: function onClick() {
	                            _this2.onClose2('cancel');
	                        }
	                    },
	                    '东吴证券 (5728）'
	                ),
	                _react2.default.createElement(
	                    _List2.default.Item,
	                    {
	                        thumb: 'https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png',
	                        arrow: 'horizontal',
	                        onClick: function onClick() {
	                            _this2.onClose2('opt 1');
	                        }
	                    },
	                    '更多'
	                )
	            ));
	        }
	    }, {
	        key: 'onClose2',
	        value: function onClose2(sel) {
	            // if (sel === 'opt 1') {
	            //   // 演示再弹出内容
	            //   this.newInstance();
	            //   return;
	            // }
	            this.setState({ sel: sel });
	            _Popup2.default.hide();
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            console.log('componentWillUnmount');
	        }
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
	            var _state = this.state;
	            var files = _state.files;
	            var custom = _state.custom;

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
	                _react2.default.createElement(
	                    _Button2.default,
	                    { onClick: this.showModal.bind(this) },
	                    'Start'
	                ),
	                _react2.default.createElement(_WhiteSpace2.default, { size: 'lg' }),
	                _react2.default.createElement(
	                    _WingBlank2.default,
	                    null,
	                    _react2.default.createElement(
	                        _Button2.default,
	                        { type: 'ghost', onClick: this.showModal.bind(this) },
	                        '可关闭对话框'
	                    ),
	                    _react2.default.createElement(
	                        _Modal2.default,
	                        {
	                            title: '这是 title',
	                            closable: true,
	                            maskClosable: true,
	                            transparent: true,
	                            onClose: this.onClose.bind(this),
	                            visible: this.state.visible
	                        },
	                        '这是内容...',
	                        _react2.default.createElement('br', null),
	                        '这是内容...',
	                        _react2.default.createElement('br', null)
	                    )
	                ),
	                _react2.default.createElement(_WhiteSpace2.default, { size: 'lg' }),
	                _react2.default.createElement(_Icon2.default, { onClick: this.onClick.bind(this), style: { fontSize: '30px' }, type: 'play-circle' }),
	                _react2.default.createElement(
	                    _Button2.default,
	                    { inline: true, style: { margin: 10 }, onClick: this.sw },
	                    custom ? '自定义' : '常用的',
	                    '选择图片的方法'
	                ),
	                custom ? _react2.default.createElement(_ImagePicker2.default, {
	                    files: files,
	                    onChange: this.onChange.bind(this),
	                    onImageClick: function onImageClick(index, fs) {
	                        return console.log(index, fs);
	                    },
	                    onAddImageClick: this.onAddImageClick,
	                    selectable: files.length < 5
	                }) : _react2.default.createElement(_ImagePicker2.default, {
	                    files: files,
	                    onChange: this.onChange.bind(this),
	                    onImageClick: function onImageClick(index, fs) {
	                        return console.log(index, fs);
	                    },
	                    selectable: files.length < 5
	                })
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

/***/ 405:
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

/***/ 406:
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

	var _TabBarFooter = __webpack_require__(272);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

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
	        key: 'omponentWillMount',
	        value: function omponentWillMount() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            console.log('componentWillUnmount');
	        }
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
	                )
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

/***/ 407:
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

	var _TabBarFooter = __webpack_require__(272);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	var _SendMessage = __webpack_require__(408);

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
	        key: 'omponentWillMount',
	        value: function omponentWillMount() {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            console.log('componentWillUnmount');
	        }
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

/***/ 408:
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

/***/ 409:
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

	var _TabBarFooter = __webpack_require__(272);

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

/***/ 410:
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

	var _TabBarFooter = __webpack_require__(272);

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
	        key: 'omponentWillMount',
	        value: function omponentWillMount() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            console.log('componentWillUnmount');
	        }
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

/***/ 411:
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

	var _Submit = __webpack_require__(412);

	var _Submit2 = _interopRequireDefault(_Submit);

	var _Alert = __webpack_require__(263);

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

/***/ 412:
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

/***/ 413:
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

	var _Submit = __webpack_require__(412);

	var _Submit2 = _interopRequireDefault(_Submit);

	var _Alert = __webpack_require__(263);

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

/***/ }

});