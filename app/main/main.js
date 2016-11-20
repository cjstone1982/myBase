webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(406);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(172);

	var _reactRedux = __webpack_require__(235);

	var _stores = __webpack_require__(407);

	var _stores2 = _interopRequireDefault(_stores);

	__webpack_require__(270);

	__webpack_require__(413);

	__webpack_require__(414);

	__webpack_require__(415);

	var _Index = __webpack_require__(416);

	var _Index2 = _interopRequireDefault(_Index);

	var _List = __webpack_require__(450);

	var _List2 = _interopRequireDefault(_List);

	var _Message = __webpack_require__(451);

	var _Message2 = _interopRequireDefault(_Message);

	var _Play = __webpack_require__(452);

	var _Play2 = _interopRequireDefault(_Play);

	var _Discover = __webpack_require__(454);

	var _Discover2 = _interopRequireDefault(_Discover);

	var _Mine = __webpack_require__(455);

	var _Mine2 = _interopRequireDefault(_Mine);

	var _TabBarFooter = __webpack_require__(417);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	var _Register = __webpack_require__(456);

	var _Register2 = _interopRequireDefault(_Register);

	var _Login = __webpack_require__(458);

	var _Login2 = _interopRequireDefault(_Login);

	var _actions = __webpack_require__(412);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Polyfills

	//资源加载


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
	store.subscribe(function () {//每次状态机改变的时候执行
	    // console.log('当前state');
	    // console.log(store.getState())
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
	            _react2.default.createElement(_reactRouter.Route, { onEnter: token, path: '/mine', component: _Mine2.default }),
	            _react2.default.createElement(_reactRouter.Route, { path: '*', component: _Index2.default })
	        )
	    )
	), document.body.appendChild(document.createElement('div')));

	function token(nextState, replace, next) {
	    //登录后的路径
	    sessionStorage.setItem('nextPath', nextState.location.pathname);
	    //查看本地是否有token
	    if (token) {
	        fetch('*', {
	            method: 'GET',
	            headers: { 'x-access-token': localStorage.getItem('token') }
	        }).then(function (response) {
	            // console.log(response)
	            return response.json();
	        }).then(function (data) {
	            if (!data.token) {
	                _reactRouter.browserHistory.push('/login');
	            }
	            store.dispatch({
	                type: 'CURRENT_USER',
	                payload: data.user
	            });
	        }).catch(function (e) {
	            console.log("fail");
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

/***/ 407:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _redux = __webpack_require__(242);

	var _reduxThunk = __webpack_require__(256);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxPromise = __webpack_require__(263);

	var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

	var _reduxLogger = __webpack_require__(257);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reducers = __webpack_require__(408);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var options = {
		level: 'info',
		duration: true,
		diff: false };
	var logger = (0, _reduxLogger2.default)(options);

	exports.default = function (initialState) {
		var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, _reduxPromise2.default, logger);
		return (0, _redux.compose)(middleware)(_redux.createStore)(_reducers2.default, initialState);
	};

/***/ },

/***/ 408:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _method = __webpack_require__(409);

	var _Alert = __webpack_require__(410);

	var _Alert2 = _interopRequireDefault(_Alert);

	__webpack_require__(411);

	var _actions = __webpack_require__(412);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //prototype扩展

	//文章

	//账户

	//获取登录用户信息


	function currentUser() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _actions.CURRENT_USER:
	            return action.payload;
	            break;
	        default:
	            return state;
	    }
	}

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

	function registerState() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _actions.REGISTER:
	            _Alert2.default.remove();
	            if (action.payload.token) {
	                localStorage.setItem('token', action.payload.token);
	            }
	            _Alert2.default.add(action.payload.message, 2500);
	            setTimeout(function () {
	                _reactRouter.browserHistory.push(sessionStorage.getItem('nextPath'));
	            }, 2500);
	            return action.payload;
	        default:
	            return state;
	    }
	}
	function loginState() {
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
	            if (action.payload.state == 'success') {
	                setTimeout(function () {
	                    _reactRouter.browserHistory.push(sessionStorage.getItem('nextPath'));
	                }, 2500);
	            }
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

	var thisApp = (0, _redux.combineReducers)({
	    currentUser: currentUser,
	    articleList: articleList,
	    articleList2: articleList2,
	    registerState: registerState,
	    loginState: loginState,
	    messages: messages
	});

	exports.default = thisApp;

/***/ },

/***/ 409:
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

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _method = __webpack_require__(409);

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

/***/ 411:
/***/ function(module, exports) {

	"use strict";

	Array.prototype.arrRemove = function (n) {
	    if (n < 0) return this;else return this.slice(0, n).concat(this.slice(n + 1, this.length));
	};

/***/ },

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DELETE_ARTICLE = exports.PUT_ARTICLE = exports.ADD_ARTICLE = exports.GET_ARTICLE = exports.REGISTER = exports.LOGIN = exports.CURRENT_USER = exports.EDIT_OK = exports.GET_OK = exports.REMOVE_OK = exports.ADD_OK = undefined;
	exports.getArticle = getArticle;
	exports.addArticle = addArticle;
	exports.login = login;
	exports.register = register;
	exports.addTodo = addTodo;
	exports.removeTodo = removeTodo;
	exports.editTodo = editTodo;
	exports.getTodo = getTodo;

	var _Alert = __webpack_require__(410);

	var _Alert2 = _interopRequireDefault(_Alert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//action 类型
	var ADD_OK = exports.ADD_OK = 'ADD_OK';
	var REMOVE_OK = exports.REMOVE_OK = 'REMOVE_OK';
	var GET_OK = exports.GET_OK = 'GET_OK';
	var EDIT_OK = exports.EDIT_OK = 'EDIT_OK';

	//获取登录用户信息
	var CURRENT_USER = exports.CURRENT_USER = 'CURRENT_USER';

	//账户
	var LOGIN = exports.LOGIN = 'LOGIN'; //登录
	var REGISTER = exports.REGISTER = 'REGISTER'; //注册

	//文章
	var GET_ARTICLE = exports.GET_ARTICLE = 'GET_ARTICLE'; //获取文章
	var ADD_ARTICLE = exports.ADD_ARTICLE = 'ADD_ARTICLE'; //添加文章
	var PUT_ARTICLE = exports.PUT_ARTICLE = 'PUT_ARTICLE'; //修改文章
	var DELETE_ARTICLE = exports.DELETE_ARTICLE = 'DELETE_ARTICLE'; //删除文章

	console.log('actions actions actions actions actions actions');

	//获取文章
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

	//添加文章
	function addArticle(value) {
	    return function (dispatch, getState) {
	        fetch('/article', {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/x-www-form-urlencoded',
	                'x-access-token': localStorage.getItem('token')
	            },
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

	//登录
	function login(value) {
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
	            console.log("后端服务器连接失败");
	            dispatch({
	                type: 'LOGIN',
	                payload: {
	                    state: 'error',
	                    message: '后端服务器连接失败'
	                }
	            });
	        });
	    };
	}

	//注册
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

/***/ 413:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 414:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 415:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 416:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(406);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(412);

	var action = _interopRequireWildcard(_actions);

	var _TabBarFooter = __webpack_require__(417);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	var _Modal = __webpack_require__(274);

	var _Modal2 = _interopRequireDefault(_Modal);

	var _Button = __webpack_require__(379);

	var _Button2 = _interopRequireDefault(_Button);

	var _WhiteSpace = __webpack_require__(391);

	var _WhiteSpace2 = _interopRequireDefault(_WhiteSpace);

	var _WingBlank = __webpack_require__(392);

	var _WingBlank2 = _interopRequireDefault(_WingBlank);

	var _Toast = __webpack_require__(393);

	var _Toast2 = _interopRequireDefault(_Toast);

	var _Icon = __webpack_require__(389);

	var _Icon2 = _interopRequireDefault(_Icon);

	var _Popup = __webpack_require__(398);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _List = __webpack_require__(399);

	var _List2 = _interopRequireDefault(_List);

	var _ImagePicker = __webpack_require__(402);

	var _ImagePicker2 = _interopRequireDefault(_ImagePicker);

	var _NavBar = __webpack_require__(418);

	var _NavBar2 = _interopRequireDefault(_NavBar);

	var _Popover = __webpack_require__(419);

	var _Popover2 = _interopRequireDefault(_Popover);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//redux


	//组件


	//antd-mobile


	var Item = _Popover2.default.Item;

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
	            visiblePopover: false,
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
	        key: 'onSelect',
	        value: function onSelect(opt) {
	            console.log(opt.props.value);
	            this.setState({
	                visiblePopover: false,
	                selected: opt.props.value
	            });
	        }
	    }, {
	        key: 'handleVisibleChange',
	        value: function handleVisibleChange(visiblePopover) {
	            this.setState({
	                visiblePopover: visiblePopover
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
	                    '\u4E1C\u5434\u8BC1\u5238 (5728\uFF09'
	                ),
	                _react2.default.createElement(
	                    _List2.default.Item,
	                    {
	                        thumb: 'https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png',
	                        onClick: function onClick() {
	                            _this2.onClose2('cancel');
	                        }
	                    },
	                    '\u4E1C\u5434\u8BC1\u5238 (5728\uFF09'
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
	                    '\u66F4\u591A'
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
	                    _NavBar2.default,
	                    { leftContent: '\u8FD4\u56DE', mode: 'light',
	                        onLeftClick: function onLeftClick() {
	                            return console.log('onLeftClick');
	                        },
	                        rightContent: [_react2.default.createElement(_Icon2.default, { key: '0', type: 'search' }), _react2.default.createElement(
	                            _Popover2.default,
	                            { key: '1', visible: this.state.visiblePopover,
	                                overlay: [_react2.default.createElement(
	                                    Item,
	                                    { key: '4', value: 'scan', iconName: 'scan', 'data-seed': 'logId' },
	                                    '\u626B\u4E00\u626B'
	                                ), _react2.default.createElement(
	                                    Item,
	                                    { key: '5', value: 'special', iconName: 'qrcode', style: { whiteSpace: 'nowrap' } },
	                                    '\u6211\u7684\u4E8C\u7EF4\u7801'
	                                ), _react2.default.createElement(
	                                    Item,
	                                    { key: '6', value: 'button ct', iconName: 'question-circle-o' },
	                                    '\u5E2E\u52A9'
	                                )],
	                                popupAlign: { offset: [12, 10] },
	                                onVisibleChange: this.handleVisibleChange.bind(this), onSelect: this.onSelect.bind(this) },
	                            _react2.default.createElement(
	                                'div',
	                                { style: { height: '100%', display: 'flex', alignItems: 'center' } },
	                                _react2.default.createElement(_Icon2.default, { type: 'ellipsis' })
	                            )
	                        )] },
	                    '\u4E2D\u95F4\u5927\u6807\u9898'
	                ),
	                _react2.default.createElement('img', { src: '../images/test3.jpg' }),
	                _react2.default.createElement('img', { width: '80', height: '80', src: __webpack_require__(448) }),
	                _react2.default.createElement('img', { width: '80', height: '80', src: __webpack_require__(449) }),
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
	                        '\u53EF\u5173\u95ED\u5BF9\u8BDD\u6846'
	                    ),
	                    _react2.default.createElement(
	                        _Modal2.default,
	                        {
	                            title: '\u8FD9\u662F title',
	                            closable: true,
	                            maskClosable: true,
	                            transparent: true,
	                            onClose: this.onClose.bind(this),
	                            visible: this.state.visible
	                        },
	                        '\u8FD9\u662F\u5185\u5BB9...',
	                        _react2.default.createElement('br', null),
	                        '\u8FD9\u662F\u5185\u5BB9...',
	                        _react2.default.createElement('br', null)
	                    )
	                ),
	                _react2.default.createElement(_WhiteSpace2.default, { size: 'lg' }),
	                _react2.default.createElement(_Icon2.default, { onClick: this.onClick.bind(this), style: { fontSize: '30px' }, type: 'play-circle' }),
	                _react2.default.createElement(
	                    _Button2.default,
	                    { inline: true, style: { margin: 10 }, onClick: this.sw },
	                    custom ? '自定义' : '常用的',
	                    '\u9009\u62E9\u56FE\u7247\u7684\u65B9\u6CD5'
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
	    var currentUser = state.currentUser;

	    return { currentUser: currentUser };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Index);

/***/ },

/***/ 417:
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
	                        '\uE605'
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        '\u9996\u9875'
	                    )
	                ),
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { activeClassName: 'footer-active', to: '/message' },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'icon iconfont' },
	                        '\uE600'
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        '\u6D88\u606F'
	                    )
	                ),
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { activeClassName: 'footer-active', to: '/play' },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'icon iconfont' },
	                        '\uE604'
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        '\u7EA6\u8D77'
	                    )
	                ),
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { activeClassName: 'footer-active', to: '/discover' },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'icon iconfont' },
	                        '\uE602'
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        '\u53D1\u73B0'
	                    )
	                ),
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { activeClassName: 'footer-active', to: '/mine' },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'icon iconfont' },
	                        '\uE601'
	                    ),
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        '\u6211\u7684'
	                    )
	                )
	            );
	        }
	    }]);

	    return TabBarFooter;
	}(_react.Component);

	exports.default = TabBarFooter;

/***/ },

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = undefined;

	var _defineProperty2 = __webpack_require__(276);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _slicedToArray2 = __webpack_require__(380);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _classCallCheck2 = __webpack_require__(295);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(296);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(350);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(373);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _icon = __webpack_require__(389);

	var _icon2 = _interopRequireDefault(_icon);

	var _splitObject3 = __webpack_require__(390);

	var _splitObject4 = _interopRequireDefault(_splitObject3);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { "default": obj };
	}

	var __assign = undefined && undefined.__assign || Object.assign || function (t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) {
	            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	    }
	    return t;
	};

	var NavBar = function (_React$Component) {
	    (0, _inherits3["default"])(NavBar, _React$Component);

	    function NavBar() {
	        (0, _classCallCheck3["default"])(this, NavBar);
	        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
	    }

	    NavBar.prototype.render = function render() {
	        var _classNames;

	        var _splitObject = (0, _splitObject4["default"])(this.props, ['prefixCls', 'children', 'mode', 'className', 'iconName', 'leftContent', 'rightContent', 'onLeftClick']),
	            _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2),
	            _splitObject2$ = _splitObject2[0],
	            prefixCls = _splitObject2$.prefixCls,
	            children = _splitObject2$.children,
	            mode = _splitObject2$.mode,
	            className = _splitObject2$.className,
	            iconName = _splitObject2$.iconName,
	            leftContent = _splitObject2$.leftContent,
	            rightContent = _splitObject2$.rightContent,
	            onLeftClick = _splitObject2$.onLeftClick,
	            restProps = _splitObject2[1];

	        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, className, className), (0, _defineProperty3["default"])(_classNames, prefixCls, true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-' + mode, true), _classNames));
	        return _react2["default"].createElement("div", __assign({}, restProps, { className: wrapCls }), _react2["default"].createElement("div", { className: prefixCls + '-left', onClick: onLeftClick }, iconName ? _react2["default"].createElement("span", { className: prefixCls + '-left-icon' }, _react2["default"].createElement(_icon2["default"], { type: iconName })) : null, _react2["default"].createElement("span", { className: prefixCls + '-left-content' }, leftContent)), _react2["default"].createElement("div", { className: prefixCls + '-title' }, children), _react2["default"].createElement("div", { className: prefixCls + '-right' }, rightContent));
	    };

	    return NavBar;
	}(_react2["default"].Component);

	exports["default"] = NavBar;

	NavBar.defaultProps = {
	    prefixCls: 'am-navbar',
	    mode: 'dark',
	    iconName: 'left',
	    onLeftClick: function onLeftClick() {}
	};
	module.exports = exports['default'];

/***/ },

/***/ 419:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = undefined;

	var _slicedToArray2 = __webpack_require__(380);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _classCallCheck2 = __webpack_require__(295);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(296);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(350);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _rcTooltip = __webpack_require__(420);

	var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

	var _item = __webpack_require__(447);

	var _item2 = _interopRequireDefault(_item);

	var _splitObject3 = __webpack_require__(390);

	var _splitObject4 = _interopRequireDefault(_splitObject3);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { "default": obj };
	}

	var __assign = undefined && undefined.__assign || Object.assign || function (t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) {
	            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	    }
	    return t;
	};

	function recursiveCloneChildren(children) {
	    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (ch, _i) {
	        return ch;
	    };

	    return _react2["default"].Children.map(children, function (child, index) {
	        var newChild = cb(child, index);
	        if (newChild && newChild.props && newChild.props.children) {
	            return _react2["default"].cloneElement(newChild, {}, recursiveCloneChildren(newChild.props.children, cb));
	        }
	        return newChild;
	    });
	}

	var Popover = function (_React$Component) {
	    (0, _inherits3["default"])(Popover, _React$Component);

	    function Popover() {
	        (0, _classCallCheck3["default"])(this, Popover);
	        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
	    }

	    Popover.prototype.render = function render() {
	        var _splitObject = (0, _splitObject4["default"])(this.props, ['children', 'prefixCls', 'placement', 'trigger', 'overlay', 'onSelect', 'popupAlign']),
	            _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2),
	            _splitObject2$ = _splitObject2[0],
	            children = _splitObject2$.children,
	            prefixCls = _splitObject2$.prefixCls,
	            placement = _splitObject2$.placement,
	            trigger = _splitObject2$.trigger,
	            overlay = _splitObject2$.overlay,
	            onSelect = _splitObject2$.onSelect,
	            popupAlign = _splitObject2$.popupAlign,
	            restProps = _splitObject2[1];

	        var newChildren = recursiveCloneChildren(overlay, function (child, index) {
	            var extraProps = {
	                firstItem: false,
	                onClick: function onClick() {}
	            };
	            if (child && child.type && child.type.myName === 'PopoverItem' && !child.props.disabled) {
	                extraProps.onClick = function () {
	                    onSelect(child);
	                };
	                extraProps.firstItem = index === 0;
	                return _react2["default"].cloneElement(child, extraProps);
	            }
	            return child;
	        });
	        return _react2["default"].createElement(_rcTooltip2["default"], __assign({ prefixCls: prefixCls, placement: placement, trigger: trigger, overlay: newChildren, popupAlign: popupAlign }, restProps), children);
	    };

	    return Popover;
	}(_react2["default"].Component);

	exports["default"] = Popover;

	Popover.defaultProps = {
	    prefixCls: 'am-popover',
	    placement: 'bottomRight',
	    popupAlign: { overflow: { adjustY: 0, adjustX: 0 } },
	    trigger: ['click'],
	    onSelect: function onSelect() {}
	};
	Popover.Item = _item2["default"];
	module.exports = exports['default'];

/***/ },

/***/ 420:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(421);

/***/ },

/***/ 421:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _placements = __webpack_require__(422);

	var _rcTrigger = __webpack_require__(423);

	var _rcTrigger2 = _interopRequireDefault(_rcTrigger);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	var Tooltip = _react2["default"].createClass({
	  displayName: 'Tooltip',

	  propTypes: {
	    trigger: _react.PropTypes.any,
	    children: _react.PropTypes.any,
	    defaultVisible: _react.PropTypes.bool,
	    visible: _react.PropTypes.bool,
	    placement: _react.PropTypes.string,
	    transitionName: _react.PropTypes.string,
	    animation: _react.PropTypes.any,
	    onVisibleChange: _react.PropTypes.func,
	    afterVisibleChange: _react.PropTypes.func,
	    overlay: _react.PropTypes.oneOfType([_react2["default"].PropTypes.node, _react2["default"].PropTypes.func]).isRequired,
	    overlayStyle: _react.PropTypes.object,
	    overlayClassName: _react.PropTypes.string,
	    prefixCls: _react.PropTypes.string,
	    mouseEnterDelay: _react.PropTypes.number,
	    mouseLeaveDelay: _react.PropTypes.number,
	    getTooltipContainer: _react.PropTypes.func,
	    destroyTooltipOnHide: _react.PropTypes.bool,
	    align: _react.PropTypes.object,
	    arrowContent: _react.PropTypes.any
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      prefixCls: 'rc-tooltip',
	      mouseEnterDelay: 0,
	      destroyTooltipOnHide: false,
	      mouseLeaveDelay: 0.1,
	      align: {},
	      placement: 'right',
	      trigger: ['hover'],
	      arrowContent: null
	    };
	  },
	  getPopupElement: function getPopupElement() {
	    var _props = this.props;
	    var arrowContent = _props.arrowContent;
	    var overlay = _props.overlay;
	    var prefixCls = _props.prefixCls;

	    return [_react2["default"].createElement('div', { className: prefixCls + '-arrow', key: 'arrow' }, arrowContent), _react2["default"].createElement('div', { className: prefixCls + '-inner', key: 'content' }, typeof overlay === 'function' ? overlay() : overlay)];
	  },
	  getPopupDomNode: function getPopupDomNode() {
	    return this.refs.trigger.getPopupDomNode();
	  },
	  render: function render() {
	    var _props2 = this.props;
	    var overlayClassName = _props2.overlayClassName;
	    var trigger = _props2.trigger;
	    var mouseEnterDelay = _props2.mouseEnterDelay;
	    var mouseLeaveDelay = _props2.mouseLeaveDelay;
	    var overlayStyle = _props2.overlayStyle;
	    var prefixCls = _props2.prefixCls;
	    var children = _props2.children;
	    var onVisibleChange = _props2.onVisibleChange;
	    var transitionName = _props2.transitionName;
	    var animation = _props2.animation;
	    var placement = _props2.placement;
	    var align = _props2.align;
	    var destroyTooltipOnHide = _props2.destroyTooltipOnHide;
	    var defaultVisible = _props2.defaultVisible;
	    var getTooltipContainer = _props2.getTooltipContainer;

	    var restProps = _objectWithoutProperties(_props2, ['overlayClassName', 'trigger', 'mouseEnterDelay', 'mouseLeaveDelay', 'overlayStyle', 'prefixCls', 'children', 'onVisibleChange', 'transitionName', 'animation', 'placement', 'align', 'destroyTooltipOnHide', 'defaultVisible', 'getTooltipContainer']);

	    var extraProps = _extends({}, restProps);
	    if ('visible' in this.props) {
	      extraProps.popupVisible = this.props.visible;
	    }
	    return _react2["default"].createElement(_rcTrigger2["default"], _extends({
	      popupClassName: overlayClassName,
	      ref: 'trigger',
	      prefixCls: prefixCls,
	      popup: this.getPopupElement,
	      action: trigger,
	      builtinPlacements: _placements.placements,
	      popupPlacement: placement,
	      popupAlign: align,
	      getPopupContainer: getTooltipContainer,
	      onPopupVisibleChange: onVisibleChange,
	      popupTransitionName: transitionName,
	      popupAnimation: animation,
	      defaultPopupVisible: defaultVisible,
	      destroyPopupOnHide: destroyTooltipOnHide,
	      mouseLeaveDelay: mouseLeaveDelay,
	      popupStyle: overlayStyle,
	      mouseEnterDelay: mouseEnterDelay
	    }, extraProps), children);
	  }
	});

	exports["default"] = Tooltip;
	module.exports = exports['default'];

/***/ },

/***/ 422:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var autoAdjustOverflow = {
	  adjustX: 1,
	  adjustY: 1
	};

	var targetOffset = [0, 0];

	var placements = exports.placements = {
	  left: {
	    points: ['cr', 'cl'],
	    overflow: autoAdjustOverflow,
	    offset: [-4, 0],
	    targetOffset: targetOffset
	  },
	  right: {
	    points: ['cl', 'cr'],
	    overflow: autoAdjustOverflow,
	    offset: [4, 0],
	    targetOffset: targetOffset
	  },
	  top: {
	    points: ['bc', 'tc'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -4],
	    targetOffset: targetOffset
	  },
	  bottom: {
	    points: ['tc', 'bc'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 4],
	    targetOffset: targetOffset
	  },
	  topLeft: {
	    points: ['bl', 'tl'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -4],
	    targetOffset: targetOffset
	  },
	  leftTop: {
	    points: ['tr', 'tl'],
	    overflow: autoAdjustOverflow,
	    offset: [-4, 0],
	    targetOffset: targetOffset
	  },
	  topRight: {
	    points: ['br', 'tr'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -4],
	    targetOffset: targetOffset
	  },
	  rightTop: {
	    points: ['tl', 'tr'],
	    overflow: autoAdjustOverflow,
	    offset: [4, 0],
	    targetOffset: targetOffset
	  },
	  bottomRight: {
	    points: ['tr', 'br'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 4],
	    targetOffset: targetOffset
	  },
	  rightBottom: {
	    points: ['bl', 'br'],
	    overflow: autoAdjustOverflow,
	    offset: [4, 0],
	    targetOffset: targetOffset
	  },
	  bottomLeft: {
	    points: ['tl', 'bl'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 4],
	    targetOffset: targetOffset
	  },
	  leftBottom: {
	    points: ['br', 'bl'],
	    overflow: autoAdjustOverflow,
	    offset: [-4, 0],
	    targetOffset: targetOffset
	  }
	};

	exports["default"] = placements;

/***/ },

/***/ 423:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(424);

/***/ },

/***/ 424:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _contains = __webpack_require__(425);

	var _contains2 = _interopRequireDefault(_contains);

	var _addEventListener = __webpack_require__(426);

	var _addEventListener2 = _interopRequireDefault(_addEventListener);

	var _Popup = __webpack_require__(430);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _utils = __webpack_require__(445);

	var _getContainerRenderMixin = __webpack_require__(446);

	var _getContainerRenderMixin2 = _interopRequireDefault(_getContainerRenderMixin);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	function noop() {}

	function returnEmptyString() {
	  return '';
	}

	var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];

	var Trigger = _react2["default"].createClass({
	  displayName: 'Trigger',

	  propTypes: {
	    children: _react.PropTypes.any,
	    action: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
	    showAction: _react.PropTypes.any,
	    hideAction: _react.PropTypes.any,
	    getPopupClassNameFromAlign: _react.PropTypes.any,
	    onPopupVisibleChange: _react.PropTypes.func,
	    afterPopupVisibleChange: _react.PropTypes.func,
	    popup: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]).isRequired,
	    popupStyle: _react.PropTypes.object,
	    prefixCls: _react.PropTypes.string,
	    popupClassName: _react.PropTypes.string,
	    popupPlacement: _react.PropTypes.string,
	    builtinPlacements: _react.PropTypes.object,
	    popupTransitionName: _react.PropTypes.string,
	    popupAnimation: _react.PropTypes.any,
	    mouseEnterDelay: _react.PropTypes.number,
	    mouseLeaveDelay: _react.PropTypes.number,
	    zIndex: _react.PropTypes.number,
	    focusDelay: _react.PropTypes.number,
	    blurDelay: _react.PropTypes.number,
	    getPopupContainer: _react.PropTypes.func,
	    destroyPopupOnHide: _react.PropTypes.bool,
	    mask: _react.PropTypes.bool,
	    onPopupAlign: _react.PropTypes.func,
	    popupAlign: _react.PropTypes.object,
	    popupVisible: _react.PropTypes.bool,
	    maskTransitionName: _react.PropTypes.string,
	    maskAnimation: _react.PropTypes.string
	  },

	  mixins: [(0, _getContainerRenderMixin2["default"])({
	    autoMount: false,

	    isVisible: function isVisible(instance) {
	      return instance.state.popupVisible;
	    },
	    getContainer: function getContainer(instance) {
	      var popupContainer = document.createElement('div');
	      var mountNode = instance.props.getPopupContainer ? instance.props.getPopupContainer((0, _reactDom.findDOMNode)(instance)) : document.body;
	      mountNode.appendChild(popupContainer);
	      return popupContainer;
	    },
	    getComponent: function getComponent(instance) {
	      var props = instance.props;
	      var state = instance.state;

	      var mouseProps = {};
	      if (instance.isMouseEnterToShow()) {
	        mouseProps.onMouseEnter = instance.onPopupMouseEnter;
	      }
	      if (instance.isMouseLeaveToHide()) {
	        mouseProps.onMouseLeave = instance.onPopupMouseLeave;
	      }
	      return _react2["default"].createElement(_Popup2["default"], _extends({
	        prefixCls: props.prefixCls,
	        destroyPopupOnHide: props.destroyPopupOnHide,
	        visible: state.popupVisible,
	        className: props.popupClassName,
	        action: props.action,
	        align: instance.getPopupAlign(),
	        onAlign: props.onPopupAlign,
	        animation: props.popupAnimation,
	        getClassNameFromAlign: instance.getPopupClassNameFromAlign
	      }, mouseProps, {
	        getRootDomNode: instance.getRootDomNode,
	        style: props.popupStyle,
	        mask: props.mask,
	        zIndex: props.zIndex,
	        transitionName: props.popupTransitionName,
	        maskAnimation: props.maskAnimation,
	        maskTransitionName: props.maskTransitionName
	      }), typeof props.popup === 'function' ? props.popup() : props.popup);
	    }
	  })],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      prefixCls: 'rc-trigger-popup',
	      getPopupClassNameFromAlign: returnEmptyString,
	      onPopupVisibleChange: noop,
	      afterPopupVisibleChange: noop,
	      onPopupAlign: noop,
	      popupClassName: '',
	      mouseEnterDelay: 0,
	      mouseLeaveDelay: 0.1,
	      focusDelay: 0,
	      blurDelay: 0.15,
	      popupStyle: {},
	      destroyPopupOnHide: false,
	      popupAlign: {},
	      defaultPopupVisible: false,
	      mask: false,
	      action: [],
	      showAction: [],
	      hideAction: []
	    };
	  },
	  getInitialState: function getInitialState() {
	    var props = this.props;
	    var popupVisible = void 0;
	    if ('popupVisible' in props) {
	      popupVisible = !!props.popupVisible;
	    } else {
	      popupVisible = !!props.defaultPopupVisible;
	    }
	    return {
	      popupVisible: popupVisible
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    ALL_HANDLERS.forEach(function (h) {
	      _this['fire' + h] = function (e) {
	        _this.fireEvents(h, e);
	      };
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    this.componentDidUpdate({}, {
	      popupVisible: this.state.popupVisible
	    });
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(_ref) {
	    var popupVisible = _ref.popupVisible;

	    if (popupVisible !== undefined) {
	      this.setState({
	        popupVisible: popupVisible
	      });
	    }
	  },
	  componentDidUpdate: function componentDidUpdate(_, prevState) {
	    var props = this.props;
	    var state = this.state;
	    this.renderComponent(null, function () {
	      if (prevState.popupVisible !== state.popupVisible) {
	        props.afterPopupVisibleChange(state.popupVisible);
	      }
	    });
	    if (this.isClickToHide()) {
	      if (state.popupVisible) {
	        if (!this.clickOutsideHandler) {
	          this.clickOutsideHandler = (0, _addEventListener2["default"])(document, 'mousedown', this.onDocumentClick);
	          this.touchOutsideHandler = (0, _addEventListener2["default"])(document, 'touchstart', this.onDocumentClick);
	        }
	        return;
	      }
	    }
	    if (this.clickOutsideHandler) {
	      this.clickOutsideHandler.remove();
	      this.touchOutsideHandler.remove();
	      this.clickOutsideHandler = null;
	      this.touchOutsideHandler = null;
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.clearDelayTimer();
	    if (this.clickOutsideHandler) {
	      this.clickOutsideHandler.remove();
	      this.touchOutsideHandler.remove();
	      this.clickOutsideHandler = null;
	      this.touchOutsideHandler = null;
	    }
	  },
	  onMouseEnter: function onMouseEnter(e) {
	    this.fireEvents('onMouseEnter', e);
	    this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
	  },
	  onMouseLeave: function onMouseLeave(e) {
	    this.fireEvents('onMouseLeave', e);
	    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
	  },
	  onPopupMouseEnter: function onPopupMouseEnter() {
	    this.clearDelayTimer();
	  },
	  onPopupMouseLeave: function onPopupMouseLeave(e) {
	    // https://github.com/react-component/trigger/pull/13
	    // react bug?
	    if (e.relatedTarget && !e.relatedTarget.setTimeout && this._component && (0, _contains2["default"])(this._component.getPopupDomNode(), e.relatedTarget)) {
	      return;
	    }
	    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
	  },
	  onFocus: function onFocus(e) {
	    this.fireEvents('onFocus', e);
	    // incase focusin and focusout
	    this.clearDelayTimer();
	    if (this.isFocusToShow()) {
	      this.focusTime = Date.now();
	      this.delaySetPopupVisible(true, this.props.focusDelay);
	    }
	  },
	  onMouseDown: function onMouseDown(e) {
	    this.fireEvents('onMouseDown', e);
	    this.preClickTime = Date.now();
	  },
	  onTouchStart: function onTouchStart(e) {
	    this.fireEvents('onTouchStart', e);
	    this.preTouchTime = Date.now();
	  },
	  onBlur: function onBlur(e) {
	    this.fireEvents('onBlur', e);
	    this.clearDelayTimer();
	    if (this.isBlurToHide()) {
	      this.delaySetPopupVisible(false, this.props.blurDelay);
	    }
	  },
	  onClick: function onClick(event) {
	    this.fireEvents('onClick', event);
	    // focus will trigger click
	    if (this.focusTime) {
	      var preTime = void 0;
	      if (this.preClickTime && this.preTouchTime) {
	        preTime = Math.min(this.preClickTime, this.preTouchTime);
	      } else if (this.preClickTime) {
	        preTime = this.preClickTime;
	      } else if (this.preTouchTime) {
	        preTime = this.preTouchTime;
	      }
	      if (Math.abs(preTime - this.focusTime) < 20) {
	        return;
	      }
	      this.focusTime = 0;
	    }
	    this.preClickTime = 0;
	    this.preTouchTime = 0;
	    event.preventDefault();
	    var nextVisible = !this.state.popupVisible;
	    if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
	      this.setPopupVisible(!this.state.popupVisible);
	    }
	  },
	  onDocumentClick: function onDocumentClick(event) {
	    var target = event.target;
	    var root = (0, _reactDom.findDOMNode)(this);
	    var popupNode = this.getPopupDomNode();
	    if (!(0, _contains2["default"])(root, target) && !(0, _contains2["default"])(popupNode, target)) {
	      this.setPopupVisible(false);
	    }
	  },
	  getPopupDomNode: function getPopupDomNode() {
	    // for test
	    if (this._component) {
	      return this._component.isMounted() ? this._component.getPopupDomNode() : null;
	    }
	    return null;
	  },
	  getRootDomNode: function getRootDomNode() {
	    return _reactDom2["default"].findDOMNode(this);
	  },
	  getPopupClassNameFromAlign: function getPopupClassNameFromAlign(align) {
	    var className = [];
	    var props = this.props;
	    var popupPlacement = props.popupPlacement;
	    var builtinPlacements = props.builtinPlacements;
	    var prefixCls = props.prefixCls;

	    if (popupPlacement && builtinPlacements) {
	      className.push((0, _utils.getPopupClassNameFromAlign)(builtinPlacements, prefixCls, align));
	    }
	    if (props.getPopupClassNameFromAlign) {
	      className.push(props.getPopupClassNameFromAlign(align));
	    }
	    return className.join(' ');
	  },
	  getPopupAlign: function getPopupAlign() {
	    var props = this.props;
	    var popupPlacement = props.popupPlacement;
	    var popupAlign = props.popupAlign;
	    var builtinPlacements = props.builtinPlacements;

	    if (popupPlacement && builtinPlacements) {
	      return (0, _utils.getAlignFromPlacement)(builtinPlacements, popupPlacement, popupAlign);
	    }
	    return popupAlign;
	  },
	  setPopupVisible: function setPopupVisible(popupVisible) {
	    this.clearDelayTimer();
	    if (this.state.popupVisible !== popupVisible) {
	      if (!('popupVisible' in this.props)) {
	        this.setState({
	          popupVisible: popupVisible
	        });
	      }
	      this.props.onPopupVisibleChange(popupVisible);
	    }
	  },
	  delaySetPopupVisible: function delaySetPopupVisible(visible, delayS) {
	    var _this2 = this;

	    var delay = delayS * 1000;
	    this.clearDelayTimer();
	    if (delay) {
	      this.delayTimer = setTimeout(function () {
	        _this2.setPopupVisible(visible);
	        _this2.clearDelayTimer();
	      }, delay);
	    } else {
	      this.setPopupVisible(visible);
	    }
	  },
	  clearDelayTimer: function clearDelayTimer() {
	    if (this.delayTimer) {
	      clearTimeout(this.delayTimer);
	      this.delayTimer = null;
	    }
	  },
	  createTwoChains: function createTwoChains(event) {
	    var childPros = this.props.children.props;
	    var props = this.props;
	    if (childPros[event] && props[event]) {
	      return this['fire' + event];
	    }
	    return childPros[event] || props[event];
	  },
	  isClickToShow: function isClickToShow() {
	    var _props = this.props;
	    var action = _props.action;
	    var showAction = _props.showAction;

	    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
	  },
	  isClickToHide: function isClickToHide() {
	    var _props2 = this.props;
	    var action = _props2.action;
	    var hideAction = _props2.hideAction;

	    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
	  },
	  isMouseEnterToShow: function isMouseEnterToShow() {
	    var _props3 = this.props;
	    var action = _props3.action;
	    var showAction = _props3.showAction;

	    return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
	  },
	  isMouseLeaveToHide: function isMouseLeaveToHide() {
	    var _props4 = this.props;
	    var action = _props4.action;
	    var hideAction = _props4.hideAction;

	    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
	  },
	  isFocusToShow: function isFocusToShow() {
	    var _props5 = this.props;
	    var action = _props5.action;
	    var showAction = _props5.showAction;

	    return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
	  },
	  isBlurToHide: function isBlurToHide() {
	    var _props6 = this.props;
	    var action = _props6.action;
	    var hideAction = _props6.hideAction;

	    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
	  },
	  forcePopupAlign: function forcePopupAlign() {
	    if (this.state.popupVisible && this.popupInstance && this.popupInstance.alignInstance) {
	      this.popupInstance.alignInstance.forceAlign();
	    }
	  },
	  fireEvents: function fireEvents(type, e) {
	    var childCallback = this.props.children.props[type];
	    if (childCallback) {
	      childCallback(e);
	    }
	    var callback = this.props[type];
	    if (callback) {
	      callback(e);
	    }
	  },
	  render: function render() {
	    var props = this.props;
	    var children = props.children;
	    var child = _react2["default"].Children.only(children);
	    var newChildProps = {};

	    if (this.isClickToHide() || this.isClickToShow()) {
	      newChildProps.onClick = this.onClick;
	      newChildProps.onMouseDown = this.onMouseDown;
	      newChildProps.onTouchStart = this.onTouchStart;
	    } else {
	      newChildProps.onClick = this.createTwoChains('onClick');
	      newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
	      newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
	    }
	    if (this.isMouseEnterToShow()) {
	      newChildProps.onMouseEnter = this.onMouseEnter;
	    } else {
	      newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
	    }
	    if (this.isMouseLeaveToHide()) {
	      newChildProps.onMouseLeave = this.onMouseLeave;
	    } else {
	      newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
	    }
	    if (this.isFocusToShow() || this.isBlurToHide()) {
	      newChildProps.onFocus = this.onFocus;
	      newChildProps.onBlur = this.onBlur;
	    } else {
	      newChildProps.onFocus = this.createTwoChains('onFocus');
	      newChildProps.onBlur = this.createTwoChains('onBlur');
	    }

	    return _react2["default"].cloneElement(child, newChildProps);
	  }
	});

	exports["default"] = Trigger;
	module.exports = exports['default'];

/***/ },

/***/ 425:
/***/ function(module, exports) {

	"use strict";

	module.exports = function contains(root, n) {
	  var node = n;
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }

	  return false;
	};

/***/ },

/***/ 426:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = addEventListenerWrap;

	var _addDomEventListener = __webpack_require__(427);

	var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	function addEventListenerWrap(target, eventType, cb) {
	  /* eslint camelcase: 2 */
	  var callback = _reactDom2["default"].unstable_batchedUpdates ? function run(e) {
	    _reactDom2["default"].unstable_batchedUpdates(cb, e);
	  } : cb;
	  return (0, _addDomEventListener2["default"])(target, eventType, callback);
	}
	module.exports = exports['default'];

/***/ },

/***/ 427:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = addEventListener;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _EventObject = __webpack_require__(428);

	var _EventObject2 = _interopRequireDefault(_EventObject);

	function addEventListener(target, eventType, callback) {
	  function wrapCallback(e) {
	    var ne = new _EventObject2['default'](e);
	    callback.call(target, ne);
	  }

	  if (target.addEventListener) {
	    target.addEventListener(eventType, wrapCallback, false);
	    return {
	      remove: function remove() {
	        target.removeEventListener(eventType, wrapCallback, false);
	      }
	    };
	  } else if (target.attachEvent) {
	    target.attachEvent('on' + eventType, wrapCallback);
	    return {
	      remove: function remove() {
	        target.detachEvent('on' + eventType, wrapCallback);
	      }
	    };
	  }
	}

	module.exports = exports['default'];

/***/ },

/***/ 428:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @ignore
	 * event object for dom
	 * @author yiminghe@gmail.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _EventBaseObject = __webpack_require__(429);

	var _EventBaseObject2 = _interopRequireDefault(_EventBaseObject);

	var _objectAssign = __webpack_require__(4);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var TRUE = true;
	var FALSE = false;
	var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

	function isNullOrUndefined(w) {
	  return w === null || w === undefined;
	}

	var eventNormalizers = [{
	  reg: /^key/,
	  props: ['char', 'charCode', 'key', 'keyCode', 'which'],
	  fix: function fix(event, nativeEvent) {
	    if (isNullOrUndefined(event.which)) {
	      event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
	    }

	    // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
	    if (event.metaKey === undefined) {
	      event.metaKey = event.ctrlKey;
	    }
	  }
	}, {
	  reg: /^touch/,
	  props: ['touches', 'changedTouches', 'targetTouches']
	}, {
	  reg: /^hashchange$/,
	  props: ['newURL', 'oldURL']
	}, {
	  reg: /^gesturechange$/i,
	  props: ['rotation', 'scale']
	}, {
	  reg: /^(mousewheel|DOMMouseScroll)$/,
	  props: [],
	  fix: function fix(event, nativeEvent) {
	    var deltaX = undefined;
	    var deltaY = undefined;
	    var delta = undefined;
	    var wheelDelta = nativeEvent.wheelDelta;
	    var axis = nativeEvent.axis;
	    var wheelDeltaY = nativeEvent.wheelDeltaY;
	    var wheelDeltaX = nativeEvent.wheelDeltaX;
	    var detail = nativeEvent.detail;

	    // ie/webkit
	    if (wheelDelta) {
	      delta = wheelDelta / 120;
	    }

	    // gecko
	    if (detail) {
	      // press control e.detail == 1 else e.detail == 3
	      delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
	    }

	    // Gecko
	    if (axis !== undefined) {
	      if (axis === event.HORIZONTAL_AXIS) {
	        deltaY = 0;
	        deltaX = 0 - delta;
	      } else if (axis === event.VERTICAL_AXIS) {
	        deltaX = 0;
	        deltaY = delta;
	      }
	    }

	    // Webkit
	    if (wheelDeltaY !== undefined) {
	      deltaY = wheelDeltaY / 120;
	    }
	    if (wheelDeltaX !== undefined) {
	      deltaX = -1 * wheelDeltaX / 120;
	    }

	    // 默认 deltaY (ie)
	    if (!deltaX && !deltaY) {
	      deltaY = delta;
	    }

	    if (deltaX !== undefined) {
	      /**
	       * deltaX of mousewheel event
	       * @property deltaX
	       * @member Event.DomEvent.Object
	       */
	      event.deltaX = deltaX;
	    }

	    if (deltaY !== undefined) {
	      /**
	       * deltaY of mousewheel event
	       * @property deltaY
	       * @member Event.DomEvent.Object
	       */
	      event.deltaY = deltaY;
	    }

	    if (delta !== undefined) {
	      /**
	       * delta of mousewheel event
	       * @property delta
	       * @member Event.DomEvent.Object
	       */
	      event.delta = delta;
	    }
	  }
	}, {
	  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
	  props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
	  fix: function fix(event, nativeEvent) {
	    var eventDoc = undefined;
	    var doc = undefined;
	    var body = undefined;
	    var target = event.target;
	    var button = nativeEvent.button;

	    // Calculate pageX/Y if missing and clientX/Y available
	    if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
	      eventDoc = target.ownerDocument || document;
	      doc = eventDoc.documentElement;
	      body = eventDoc.body;
	      event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	      event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
	    }

	    // which for click: 1 === left; 2 === middle; 3 === right
	    // do not use button
	    if (!event.which && button !== undefined) {
	      if (button & 1) {
	        event.which = 1;
	      } else if (button & 2) {
	        event.which = 3;
	      } else if (button & 4) {
	        event.which = 2;
	      } else {
	        event.which = 0;
	      }
	    }

	    // add relatedTarget, if necessary
	    if (!event.relatedTarget && event.fromElement) {
	      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
	    }

	    return event;
	  }
	}];

	function retTrue() {
	  return TRUE;
	}

	function retFalse() {
	  return FALSE;
	}

	function DomEventObject(nativeEvent) {
	  var type = nativeEvent.type;

	  var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

	  _EventBaseObject2['default'].call(this);

	  this.nativeEvent = nativeEvent;

	  // in case dom event has been mark as default prevented by lower dom node
	  var isDefaultPrevented = retFalse;
	  if ('defaultPrevented' in nativeEvent) {
	    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
	  } else if ('getPreventDefault' in nativeEvent) {
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
	    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
	  } else if ('returnValue' in nativeEvent) {
	    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
	  }

	  this.isDefaultPrevented = isDefaultPrevented;

	  var fixFns = [];
	  var fixFn = undefined;
	  var l = undefined;
	  var prop = undefined;
	  var props = commonProps.concat();

	  eventNormalizers.forEach(function (normalizer) {
	    if (type.match(normalizer.reg)) {
	      props = props.concat(normalizer.props);
	      if (normalizer.fix) {
	        fixFns.push(normalizer.fix);
	      }
	    }
	  });

	  l = props.length;

	  // clone properties of the original event object
	  while (l) {
	    prop = props[--l];
	    this[prop] = nativeEvent[prop];
	  }

	  // fix target property, if necessary
	  if (!this.target && isNative) {
	    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
	  }

	  // check if target is a text node (safari)
	  if (this.target && this.target.nodeType === 3) {
	    this.target = this.target.parentNode;
	  }

	  l = fixFns.length;

	  while (l) {
	    fixFn = fixFns[--l];
	    fixFn(this, nativeEvent);
	  }

	  this.timeStamp = nativeEvent.timeStamp || Date.now();
	}

	var EventBaseObjectProto = _EventBaseObject2['default'].prototype;

	(0, _objectAssign2['default'])(DomEventObject.prototype, EventBaseObjectProto, {
	  constructor: DomEventObject,

	  preventDefault: function preventDefault() {
	    var e = this.nativeEvent;

	    // if preventDefault exists run it on the original event
	    if (e.preventDefault) {
	      e.preventDefault();
	    } else {
	      // otherwise set the returnValue property of the original event to FALSE (IE)
	      e.returnValue = FALSE;
	    }

	    EventBaseObjectProto.preventDefault.call(this);
	  },

	  stopPropagation: function stopPropagation() {
	    var e = this.nativeEvent;

	    // if stopPropagation exists run it on the original event
	    if (e.stopPropagation) {
	      e.stopPropagation();
	    } else {
	      // otherwise set the cancelBubble property of the original event to TRUE (IE)
	      e.cancelBubble = TRUE;
	    }

	    EventBaseObjectProto.stopPropagation.call(this);
	  }
	});

	exports['default'] = DomEventObject;
	module.exports = exports['default'];

/***/ },

/***/ 429:
/***/ function(module, exports) {

	/**
	 * @ignore
	 * base event object for custom and dom event.
	 * @author yiminghe@gmail.com
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function returnFalse() {
	  return false;
	}

	function returnTrue() {
	  return true;
	}

	function EventBaseObject() {
	  this.timeStamp = Date.now();
	  this.target = undefined;
	  this.currentTarget = undefined;
	}

	EventBaseObject.prototype = {
	  isEventObject: 1,

	  constructor: EventBaseObject,

	  isDefaultPrevented: returnFalse,

	  isPropagationStopped: returnFalse,

	  isImmediatePropagationStopped: returnFalse,

	  preventDefault: function preventDefault() {
	    this.isDefaultPrevented = returnTrue;
	  },

	  stopPropagation: function stopPropagation() {
	    this.isPropagationStopped = returnTrue;
	  },

	  stopImmediatePropagation: function stopImmediatePropagation() {
	    this.isImmediatePropagationStopped = returnTrue;
	    // fixed 1.2
	    // call stopPropagation implicitly
	    this.stopPropagation();
	  },

	  halt: function halt(immediate) {
	    if (immediate) {
	      this.stopImmediatePropagation();
	    } else {
	      this.stopPropagation();
	    }
	    this.preventDefault();
	  }
	};

	exports["default"] = EventBaseObject;
	module.exports = exports["default"];

/***/ },

/***/ 430:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _rcAlign = __webpack_require__(431);

	var _rcAlign2 = _interopRequireDefault(_rcAlign);

	var _rcAnimate = __webpack_require__(361);

	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

	var _PopupInner = __webpack_require__(443);

	var _PopupInner2 = _interopRequireDefault(_PopupInner);

	var _LazyRenderBox = __webpack_require__(444);

	var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	var Popup = _react2["default"].createClass({
	  displayName: 'Popup',

	  propTypes: {
	    visible: _react.PropTypes.bool,
	    style: _react.PropTypes.object,
	    getClassNameFromAlign: _react.PropTypes.func,
	    onAlign: _react.PropTypes.func,
	    getRootDomNode: _react.PropTypes.func,
	    onMouseEnter: _react.PropTypes.func,
	    align: _react.PropTypes.any,
	    destroyPopupOnHide: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    prefixCls: _react.PropTypes.string,
	    onMouseLeave: _react.PropTypes.func
	  },

	  componentDidMount: function componentDidMount() {
	    this.rootNode = this.getPopupDomNode();
	  },
	  onAlign: function onAlign(popupDomNode, align) {
	    var props = this.props;
	    var alignClassName = props.getClassNameFromAlign(props.align);
	    var currentAlignClassName = props.getClassNameFromAlign(align);
	    if (alignClassName !== currentAlignClassName) {
	      this.currentAlignClassName = currentAlignClassName;
	      popupDomNode.className = this.getClassName(currentAlignClassName);
	    }
	    props.onAlign(popupDomNode, align);
	  },
	  getPopupDomNode: function getPopupDomNode() {
	    return _reactDom2["default"].findDOMNode(this.refs.popup);
	  },
	  getTarget: function getTarget() {
	    return this.props.getRootDomNode();
	  },
	  getMaskTransitionName: function getMaskTransitionName() {
	    var props = this.props;
	    var transitionName = props.maskTransitionName;
	    var animation = props.maskAnimation;
	    if (!transitionName && animation) {
	      transitionName = props.prefixCls + '-' + animation;
	    }
	    return transitionName;
	  },
	  getTransitionName: function getTransitionName() {
	    var props = this.props;
	    var transitionName = props.transitionName;
	    if (!transitionName && props.animation) {
	      transitionName = props.prefixCls + '-' + props.animation;
	    }
	    return transitionName;
	  },
	  getClassName: function getClassName(currentAlignClassName) {
	    return this.props.prefixCls + ' ' + this.props.className + ' ' + currentAlignClassName;
	  },
	  getPopupElement: function getPopupElement() {
	    var props = this.props;
	    var align = props.align;
	    var style = props.style;
	    var visible = props.visible;
	    var prefixCls = props.prefixCls;
	    var destroyPopupOnHide = props.destroyPopupOnHide;

	    var className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
	    var hiddenClassName = prefixCls + '-hidden';
	    if (!visible) {
	      this.currentAlignClassName = null;
	    }
	    var newStyle = _extends({}, style, this.getZIndexStyle());
	    var popupInnerProps = {
	      className: className,
	      prefixCls: prefixCls,
	      ref: 'popup',
	      onMouseEnter: props.onMouseEnter,
	      onMouseLeave: props.onMouseLeave,
	      style: newStyle
	    };
	    if (destroyPopupOnHide) {
	      return _react2["default"].createElement(_rcAnimate2["default"], {
	        component: '',
	        exclusive: true,
	        transitionAppear: true,
	        transitionName: this.getTransitionName()
	      }, visible ? _react2["default"].createElement(_rcAlign2["default"], {
	        target: this.getTarget,
	        key: 'popup',
	        ref: this.saveAlign,
	        monitorWindowResize: true,
	        align: align,
	        onAlign: this.onAlign
	      }, _react2["default"].createElement(_PopupInner2["default"], _extends({
	        visible: true
	      }, popupInnerProps), props.children)) : null);
	    }
	    return _react2["default"].createElement(_rcAnimate2["default"], {
	      component: '',
	      exclusive: true,
	      transitionAppear: true,
	      transitionName: this.getTransitionName(),
	      showProp: 'xVisible'
	    }, _react2["default"].createElement(_rcAlign2["default"], {
	      target: this.getTarget,
	      key: 'popup',
	      ref: this.saveAlign,
	      monitorWindowResize: true,
	      xVisible: visible,
	      childrenProps: { visible: 'xVisible' },
	      disabled: !visible,
	      align: align,
	      onAlign: this.onAlign
	    }, _react2["default"].createElement(_PopupInner2["default"], _extends({
	      hiddenClassName: hiddenClassName
	    }, popupInnerProps), props.children)));
	  },
	  getZIndexStyle: function getZIndexStyle() {
	    var style = {};
	    var props = this.props;
	    if (props.zIndex !== undefined) {
	      style.zIndex = props.zIndex;
	    }
	    return style;
	  },
	  getMaskElement: function getMaskElement() {
	    var props = this.props;
	    var maskElement = void 0;
	    if (props.mask) {
	      var maskTransition = this.getMaskTransitionName();
	      maskElement = _react2["default"].createElement(_LazyRenderBox2["default"], {
	        style: this.getZIndexStyle(),
	        key: 'mask',
	        className: props.prefixCls + '-mask',
	        hiddenClassName: props.prefixCls + '-mask-hidden',
	        visible: props.visible
	      });
	      if (maskTransition) {
	        maskElement = _react2["default"].createElement(_rcAnimate2["default"], {
	          key: 'mask',
	          showProp: 'visible',
	          transitionAppear: true,
	          component: '',
	          transitionName: maskTransition
	        }, maskElement);
	      }
	    }
	    return maskElement;
	  },
	  saveAlign: function saveAlign(align) {
	    this.alignInstance = align;
	  },
	  render: function render() {
	    return _react2["default"].createElement('div', null, this.getMaskElement(), this.getPopupElement());
	  }
	});

	exports["default"] = Popup;
	module.exports = exports['default'];

/***/ },

/***/ 431:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Align = __webpack_require__(432);

	var _Align2 = _interopRequireDefault(_Align);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	exports["default"] = _Align2["default"]; // export this package's api

	module.exports = exports['default'];

/***/ },

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _domAlign = __webpack_require__(433);

	var _domAlign2 = _interopRequireDefault(_domAlign);

	var _addEventListener = __webpack_require__(426);

	var _addEventListener2 = _interopRequireDefault(_addEventListener);

	var _isWindow = __webpack_require__(442);

	var _isWindow2 = _interopRequireDefault(_isWindow);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	function buffer(fn, ms) {
	  var timer = void 0;

	  function clear() {
	    if (timer) {
	      clearTimeout(timer);
	      timer = null;
	    }
	  }

	  function bufferFn() {
	    clear();
	    timer = setTimeout(fn, ms);
	  }

	  bufferFn.clear = clear;

	  return bufferFn;
	}

	var Align = _react2["default"].createClass({
	  displayName: 'Align',

	  propTypes: {
	    childrenProps: _react.PropTypes.object,
	    align: _react.PropTypes.object.isRequired,
	    target: _react.PropTypes.func,
	    onAlign: _react.PropTypes.func,
	    monitorBufferTime: _react.PropTypes.number,
	    monitorWindowResize: _react.PropTypes.bool,
	    disabled: _react.PropTypes.bool,
	    children: _react.PropTypes.any
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      target: function target() {
	        return window;
	      },
	      onAlign: function onAlign() {},

	      monitorBufferTime: 50,
	      monitorWindowResize: false,
	      disabled: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var props = this.props;
	    // if parent ref not attached .... use document.getElementById
	    this.forceAlign();
	    if (!props.disabled && props.monitorWindowResize) {
	      this.startMonitorWindowResize();
	    }
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var reAlign = false;
	    var props = this.props;

	    if (!props.disabled) {
	      if (prevProps.disabled || prevProps.align !== props.align) {
	        reAlign = true;
	      } else {
	        var lastTarget = prevProps.target();
	        var currentTarget = props.target();
	        if ((0, _isWindow2["default"])(lastTarget) && (0, _isWindow2["default"])(currentTarget)) {
	          reAlign = false;
	        } else if (lastTarget !== currentTarget) {
	          reAlign = true;
	        }
	      }
	    }

	    if (reAlign) {
	      this.forceAlign();
	    }

	    if (props.monitorWindowResize && !props.disabled) {
	      this.startMonitorWindowResize();
	    } else {
	      this.stopMonitorWindowResize();
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.stopMonitorWindowResize();
	  },
	  startMonitorWindowResize: function startMonitorWindowResize() {
	    if (!this.resizeHandler) {
	      this.bufferMonitor = buffer(this.forceAlign, this.props.monitorBufferTime);
	      this.resizeHandler = (0, _addEventListener2["default"])(window, 'resize', this.bufferMonitor);
	    }
	  },
	  stopMonitorWindowResize: function stopMonitorWindowResize() {
	    if (this.resizeHandler) {
	      this.bufferMonitor.clear();
	      this.resizeHandler.remove();
	      this.resizeHandler = null;
	    }
	  },
	  forceAlign: function forceAlign() {
	    var props = this.props;
	    if (!props.disabled) {
	      var source = _reactDom2["default"].findDOMNode(this);
	      props.onAlign(source, (0, _domAlign2["default"])(source, props.target(), props.align));
	    }
	  },
	  render: function render() {
	    var _props = this.props;
	    var childrenProps = _props.childrenProps;
	    var children = _props.children;

	    var child = _react2["default"].Children.only(children);
	    if (childrenProps) {
	      var newProps = {};
	      for (var prop in childrenProps) {
	        if (childrenProps.hasOwnProperty(prop)) {
	          newProps[prop] = this.props[childrenProps[prop]];
	        }
	      }
	      return _react2["default"].cloneElement(child, newProps);
	    }
	    return child;
	  }
	});

	exports["default"] = Align;
	module.exports = exports['default'];

/***/ },

/***/ 433:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(434);

	var _utils2 = _interopRequireDefault(_utils);

	var _getOffsetParent = __webpack_require__(436);

	var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);

	var _getVisibleRectForElement = __webpack_require__(437);

	var _getVisibleRectForElement2 = _interopRequireDefault(_getVisibleRectForElement);

	var _adjustForViewport = __webpack_require__(438);

	var _adjustForViewport2 = _interopRequireDefault(_adjustForViewport);

	var _getRegion = __webpack_require__(439);

	var _getRegion2 = _interopRequireDefault(_getRegion);

	var _getElFuturePos = __webpack_require__(440);

	var _getElFuturePos2 = _interopRequireDefault(_getElFuturePos);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	// http://yiminghe.iteye.com/blog/1124720

	/**
	 * align dom node flexibly
	 * @author yiminghe@gmail.com
	 */

	function isFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
	}

	function isFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
	}

	function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
	}

	function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
	}

	function flip(points, reg, map) {
	  var ret = [];
	  _utils2["default"].each(points, function (p) {
	    ret.push(p.replace(reg, function (m) {
	      return map[m];
	    }));
	  });
	  return ret;
	}

	function flipOffset(offset, index) {
	  offset[index] = -offset[index];
	  return offset;
	}

	function convertOffset(str, offsetLen) {
	  var n = void 0;
	  if (/%$/.test(str)) {
	    n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
	  } else {
	    n = parseInt(str, 10);
	  }
	  return n || 0;
	}

	function normalizeOffset(offset, el) {
	  offset[0] = convertOffset(offset[0], el.width);
	  offset[1] = convertOffset(offset[1], el.height);
	}

	function domAlign(el, refNode, align) {
	  var points = align.points;
	  var offset = align.offset || [0, 0];
	  var targetOffset = align.targetOffset || [0, 0];
	  var overflow = align.overflow;
	  var target = align.target || refNode;
	  var source = align.source || el;
	  offset = [].concat(offset);
	  targetOffset = [].concat(targetOffset);
	  overflow = overflow || {};
	  var newOverflowCfg = {};

	  var fail = 0;
	  // 当前节点可以被放置的显示区域
	  var visibleRect = (0, _getVisibleRectForElement2["default"])(source);
	  // 当前节点所占的区域, left/top/width/height
	  var elRegion = (0, _getRegion2["default"])(source);
	  // 参照节点所占的区域, left/top/width/height
	  var refNodeRegion = (0, _getRegion2["default"])(target);
	  // 将 offset 转换成数值，支持百分比
	  normalizeOffset(offset, elRegion);
	  normalizeOffset(targetOffset, refNodeRegion);
	  // 当前节点将要被放置的位置
	  var elFuturePos = (0, _getElFuturePos2["default"])(elRegion, refNodeRegion, points, offset, targetOffset);
	  // 当前节点将要所处的区域
	  var newElRegion = _utils2["default"].merge(elRegion, elFuturePos);

	  // 如果可视区域不能完全放置当前节点时允许调整
	  if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
	    if (overflow.adjustX) {
	      // 如果横向不能放下
	      if (isFailX(elFuturePos, elRegion, visibleRect)) {
	        // 对齐位置反下
	        var newPoints = flip(points, /[lr]/ig, {
	          l: 'r',
	          r: 'l'
	        });
	        // 偏移量也反下
	        var newOffset = flipOffset(offset, 0);
	        var newTargetOffset = flipOffset(targetOffset, 0);
	        var newElFuturePos = (0, _getElFuturePos2["default"])(elRegion, refNodeRegion, newPoints, newOffset, newTargetOffset);
	        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
	          fail = 1;
	          points = newPoints;
	          offset = newOffset;
	          targetOffset = newTargetOffset;
	        }
	      }
	    }

	    if (overflow.adjustY) {
	      // 如果纵向不能放下
	      if (isFailY(elFuturePos, elRegion, visibleRect)) {
	        // 对齐位置反下
	        var _newPoints = flip(points, /[tb]/ig, {
	          t: 'b',
	          b: 't'
	        });
	        // 偏移量也反下
	        var _newOffset = flipOffset(offset, 1);
	        var _newTargetOffset = flipOffset(targetOffset, 1);
	        var _newElFuturePos = (0, _getElFuturePos2["default"])(elRegion, refNodeRegion, _newPoints, _newOffset, _newTargetOffset);
	        if (!isCompleteFailY(_newElFuturePos, elRegion, visibleRect)) {
	          fail = 1;
	          points = _newPoints;
	          offset = _newOffset;
	          targetOffset = _newTargetOffset;
	        }
	      }
	    }

	    // 如果失败，重新计算当前节点将要被放置的位置
	    if (fail) {
	      elFuturePos = (0, _getElFuturePos2["default"])(elRegion, refNodeRegion, points, offset, targetOffset);
	      _utils2["default"].mix(newElRegion, elFuturePos);
	    }

	    // 检查反下后的位置是否可以放下了
	    // 如果仍然放不下只有指定了可以调整当前方向才调整
	    newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);

	    newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);

	    // 确实要调整，甚至可能会调整高度宽度
	    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
	      newElRegion = (0, _adjustForViewport2["default"])(elFuturePos, elRegion, visibleRect, newOverflowCfg);
	    }
	  }

	  // need judge to in case set fixed with in css on height auto element
	  if (newElRegion.width !== elRegion.width) {
	    _utils2["default"].css(source, 'width', _utils2["default"].width(source) + newElRegion.width - elRegion.width);
	  }

	  if (newElRegion.height !== elRegion.height) {
	    _utils2["default"].css(source, 'height', _utils2["default"].height(source) + newElRegion.height - elRegion.height);
	  }

	  // https://github.com/kissyteam/kissy/issues/190
	  // 相对于屏幕位置没变，而 left/top 变了
	  // 例如 <div 'relative'><el absolute></div>
	  _utils2["default"].offset(source, {
	    left: newElRegion.left,
	    top: newElRegion.top
	  }, {
	    useCssRight: align.useCssRight,
	    useCssBottom: align.useCssBottom,
	    useCssTransform: align.useCssTransform
	  });

	  return {
	    points: points,
	    offset: offset,
	    targetOffset: targetOffset,
	    overflow: newOverflowCfg
	  };
	}

	domAlign.__getOffsetParent = _getOffsetParent2["default"];

	domAlign.__getVisibleRectForElement = _getVisibleRectForElement2["default"];

	exports["default"] = domAlign;
	/**
	 *  2012-04-26 yiminghe@gmail.com
	 *   - 优化智能对齐算法
	 *   - 慎用 resizeXX
	 *
	 *  2011-07-13 yiminghe@gmail.com note:
	 *   - 增加智能对齐，以及大小调整选项
	 **/

	module.exports = exports['default'];

/***/ },

/***/ 434:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	var _propertyUtils = __webpack_require__(435);

	var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

	var getComputedStyleX = void 0;

	function force(x, y) {
	  return x + y;
	}

	function css(el, name, v) {
	  var value = v;
	  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	    for (var i in name) {
	      if (name.hasOwnProperty(i)) {
	        css(el, i, name[i]);
	      }
	    }
	    return undefined;
	  }
	  if (typeof value !== 'undefined') {
	    if (typeof value === 'number') {
	      value = value + 'px';
	    }
	    el.style[name] = value;
	    return undefined;
	  }
	  return getComputedStyleX(el, name);
	}

	function getClientPosition(elem) {
	  var box = void 0;
	  var x = void 0;
	  var y = void 0;
	  var doc = elem.ownerDocument;
	  var body = doc.body;
	  var docElem = doc && doc.documentElement;
	  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
	  box = elem.getBoundingClientRect();

	  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
	  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
	  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

	  x = box.left;
	  y = box.top;

	  // In IE, most of the time, 2 extra pixels are added to the top and left
	  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
	  // IE6 standards mode, this border can be overridden by setting the
	  // document element's border to zero -- thus, we cannot rely on the
	  // offset always being 2 pixels.

	  // In quirks mode, the offset can be determined by querying the body's
	  // clientLeft/clientTop, but in standards mode, it is found by querying
	  // the document element's clientLeft/clientTop.  Since we already called
	  // getClientBoundingRect we have already forced a reflow, so it is not
	  // too expensive just to query them all.

	  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
	  // 窗口边框标准是设 documentElement ,quirks 时设置 body
	  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
	  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
	  // 标准 ie 下 docElem.clientTop 就是 border-top
	  // ie7 html 即窗口边框改变不了。永远为 2
	  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

	  x -= docElem.clientLeft || body.clientLeft || 0;
	  y -= docElem.clientTop || body.clientTop || 0;

	  return {
	    left: x,
	    top: y
	  };
	}

	function getScroll(w, top) {
	  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
	  var method = 'scroll' + (top ? 'Top' : 'Left');
	  if (typeof ret !== 'number') {
	    var d = w.document;
	    // ie6,7,8 standard mode
	    ret = d.documentElement[method];
	    if (typeof ret !== 'number') {
	      // quirks mode
	      ret = d.body[method];
	    }
	  }
	  return ret;
	}

	function getScrollLeft(w) {
	  return getScroll(w);
	}

	function getScrollTop(w) {
	  return getScroll(w, true);
	}

	function getOffset(el) {
	  var pos = getClientPosition(el);
	  var doc = el.ownerDocument;
	  var w = doc.defaultView || doc.parentWindow;
	  pos.left += getScrollLeft(w);
	  pos.top += getScrollTop(w);
	  return pos;
	}
	function _getComputedStyle(elem, name, cs) {
	  var computedStyle = cs;
	  var val = '';
	  var d = elem.ownerDocument;
	  computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null);

	  // https://github.com/kissyteam/kissy/issues/61
	  if (computedStyle) {
	    val = computedStyle.getPropertyValue(name) || computedStyle[name];
	  }

	  return val;
	}

	var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
	var RE_POS = /^(top|right|bottom|left)$/;
	var CURRENT_STYLE = 'currentStyle';
	var RUNTIME_STYLE = 'runtimeStyle';
	var LEFT = 'left';
	var PX = 'px';

	function _getComputedStyleIE(elem, name) {
	  // currentStyle maybe null
	  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
	  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

	  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
	  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
	  // 在 ie 下不对，需要直接用 offset 方式
	  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

	  // From the awesome hack by Dean Edwards
	  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	  // If we're not dealing with a regular pixel number
	  // but a number that has a weird ending, we need to convert it to pixels
	  // exclude left right for relativity
	  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
	    // Remember the original values
	    var style = elem.style;
	    var left = style[LEFT];
	    var rsLeft = elem[RUNTIME_STYLE][LEFT];

	    // prevent flashing of content
	    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

	    // Put in the new values to get a computed value out
	    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
	    ret = style.pixelLeft + PX;

	    // Revert the changed values
	    style[LEFT] = left;

	    elem[RUNTIME_STYLE][LEFT] = rsLeft;
	  }
	  return ret === '' ? 'auto' : ret;
	}

	if (typeof window !== 'undefined') {
	  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
	}

	function getOffsetDirection(dir, option) {
	  if (dir === 'left') {
	    return option.useCssRight ? 'right' : dir;
	  }
	  return option.useCssBottom ? 'bottom' : dir;
	}

	function oppositeOffsetDirection(dir) {
	  if (dir === 'left') {
	    return 'right';
	  } else if (dir === 'right') {
	    return 'left';
	  } else if (dir === 'top') {
	    return 'bottom';
	  } else if (dir === 'bottom') {
	    return 'top';
	  }
	}

	// 设置 elem 相对 elem.ownerDocument 的坐标
	function setLeftTop(elem, offset, option) {
	  // set position first, in-case top/left are set even on static elem
	  if (css(elem, 'position') === 'static') {
	    elem.style.position = 'relative';
	  }
	  var presetH = -999;
	  var presetV = -999;
	  var horizontalProperty = getOffsetDirection('left', option);
	  var verticalProperty = getOffsetDirection('top', option);
	  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
	  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);

	  if (horizontalProperty !== 'left') {
	    presetH = 999;
	  }

	  if (verticalProperty !== 'top') {
	    presetV = 999;
	  }
	  var originalTransition = '';
	  var originalOffset = getOffset(elem);
	  if ('left' in offset || 'top' in offset) {
	    originalTransition = (0, _propertyUtils.getTransitionProperty)(elem) || '';
	    (0, _propertyUtils.setTransitionProperty)(elem, 'none');
	  }
	  if ('left' in offset) {
	    elem.style[oppositeHorizontalProperty] = '';
	    elem.style[horizontalProperty] = presetH + 'px';
	  }
	  if ('top' in offset) {
	    elem.style[oppositeVerticalProperty] = '';
	    elem.style[verticalProperty] = presetV + 'px';
	  }
	  var old = getOffset(elem);
	  var originalStyle = {};
	  for (var key in offset) {
	    if (offset.hasOwnProperty(key)) {
	      var dir = getOffsetDirection(key, option);
	      var preset = key === 'left' ? presetH : presetV;
	      var off = originalOffset[key] - old[key];
	      if (dir === key) {
	        originalStyle[dir] = preset + off;
	      } else {
	        originalStyle[dir] = preset - off;
	      }
	    }
	  }
	  css(elem, originalStyle);
	  // force relayout
	  force(elem.offsetTop, elem.offsetLeft);
	  if ('left' in offset || 'top' in offset) {
	    (0, _propertyUtils.setTransitionProperty)(elem, originalTransition);
	  }
	  var ret = {};
	  for (var _key in offset) {
	    if (offset.hasOwnProperty(_key)) {
	      var _dir = getOffsetDirection(_key, option);
	      var _off = offset[_key] - originalOffset[_key];
	      if (_key === _dir) {
	        ret[_dir] = originalStyle[_dir] + _off;
	      } else {
	        ret[_dir] = originalStyle[_dir] - _off;
	      }
	    }
	  }
	  css(elem, ret);
	}

	function setTransform(elem, offset) {
	  var originalOffset = getOffset(elem);
	  var originalXY = (0, _propertyUtils.getTransformXY)(elem);
	  var resultXY = { x: originalXY.x, y: originalXY.y };
	  if ('left' in offset) {
	    resultXY.x = originalXY.x + offset.left - originalOffset.left;
	  }
	  if ('top' in offset) {
	    resultXY.y = originalXY.y + offset.top - originalOffset.top;
	  }
	  (0, _propertyUtils.setTransformXY)(elem, resultXY);
	}

	function setOffset(elem, offset, option) {
	  if (option.useCssRight || option.useCssBottom) {
	    setLeftTop(elem, offset, option);
	  } else if (option.useCssTransform && (0, _propertyUtils.getTransformName)() in document.body.style) {
	    setTransform(elem, offset, option);
	  } else {
	    setLeftTop(elem, offset, option);
	  }
	}

	function each(arr, fn) {
	  for (var i = 0; i < arr.length; i++) {
	    fn(arr[i]);
	  }
	}

	function isBorderBoxFn(elem) {
	  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
	}

	var BOX_MODELS = ['margin', 'border', 'padding'];
	var CONTENT_INDEX = -1;
	var PADDING_INDEX = 2;
	var BORDER_INDEX = 1;
	var MARGIN_INDEX = 0;

	function swap(elem, options, callback) {
	  var old = {};
	  var style = elem.style;
	  var name = void 0;

	  // Remember the old values, and insert the new ones
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      old[name] = style[name];
	      style[name] = options[name];
	    }
	  }

	  callback.call(elem);

	  // Revert the old values
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      style[name] = old[name];
	    }
	  }
	}

	function getPBMWidth(elem, props, which) {
	  var value = 0;
	  var prop = void 0;
	  var j = void 0;
	  var i = void 0;
	  for (j = 0; j < props.length; j++) {
	    prop = props[j];
	    if (prop) {
	      for (i = 0; i < which.length; i++) {
	        var cssProp = void 0;
	        if (prop === 'border') {
	          cssProp = '' + prop + which[i] + 'Width';
	        } else {
	          cssProp = prop + which[i];
	        }
	        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
	      }
	    }
	  }
	  return value;
	}

	/**
	 * A crude way of determining if an object is a window
	 * @member util
	 */
	function isWindow(obj) {
	  // must use == for ie8
	  /* eslint eqeqeq:0 */
	  return obj !== null && obj !== undefined && obj == obj.window;
	}

	var domUtils = {};

	each(['Width', 'Height'], function (name) {
	  domUtils['doc' + name] = function (refWin) {
	    var d = refWin.document;
	    return Math.max(
	    // firefox chrome documentElement.scrollHeight< body.scrollHeight
	    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
	    d.documentElement['scroll' + name],
	    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
	    d.body['scroll' + name], domUtils['viewport' + name](d));
	  };

	  domUtils['viewport' + name] = function (win) {
	    // pc browser includes scrollbar in window.innerWidth
	    var prop = 'client' + name;
	    var doc = win.document;
	    var body = doc.body;
	    var documentElement = doc.documentElement;
	    var documentElementProp = documentElement[prop];
	    // 标准模式取 documentElement
	    // backcompat 取 body
	    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
	  };
	});

	/*
	 得到元素的大小信息
	 @param elem
	 @param name
	 @param {String} [extra]  'padding' : (css width) + padding
	 'border' : (css width) + padding + border
	 'margin' : (css width) + padding + border + margin
	 */
	function getWH(elem, name, ex) {
	  var extra = ex;
	  if (isWindow(elem)) {
	    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
	  } else if (elem.nodeType === 9) {
	    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
	  }
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	  var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
	  var computedStyle = getComputedStyleX(elem);
	  var isBorderBox = isBorderBoxFn(elem, computedStyle);
	  var cssBoxValue = 0;
	  if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
	    borderBoxValue = undefined;
	    // Fall back to computed then un computed css if necessary
	    cssBoxValue = getComputedStyleX(elem, name);
	    if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
	      cssBoxValue = elem.style[name] || 0;
	    }
	    // Normalize '', auto, and prepare for extra
	    cssBoxValue = parseFloat(cssBoxValue) || 0;
	  }
	  if (extra === undefined) {
	    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
	  }
	  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
	  var val = borderBoxValue || cssBoxValue;
	  if (extra === CONTENT_INDEX) {
	    if (borderBoxValueOrIsBorderBox) {
	      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
	    }
	    return cssBoxValue;
	  } else if (borderBoxValueOrIsBorderBox) {
	    if (extra === BORDER_INDEX) {
	      return val;
	    }
	    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
	  }
	  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
	}

	var cssShow = {
	  position: 'absolute',
	  visibility: 'hidden',
	  display: 'block'
	};

	// fix #119 : https://github.com/kissyteam/kissy/issues/119
	function getWHIgnoreDisplay() {
	  for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  var val = void 0;
	  var elem = args[0];
	  // in case elem is window
	  // elem.offsetWidth === undefined
	  if (elem.offsetWidth !== 0) {
	    val = getWH.apply(undefined, args);
	  } else {
	    swap(elem, cssShow, function () {
	      val = getWH.apply(undefined, args);
	    });
	  }
	  return val;
	}

	each(['width', 'height'], function (name) {
	  var first = name.charAt(0).toUpperCase() + name.slice(1);
	  domUtils['outer' + first] = function (el, includeMargin) {
	    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
	  };
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

	  domUtils[name] = function (elem, v) {
	    var val = v;
	    if (val !== undefined) {
	      if (elem) {
	        var computedStyle = getComputedStyleX(elem);
	        var isBorderBox = isBorderBoxFn(elem);
	        if (isBorderBox) {
	          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
	        }
	        return css(elem, name, val);
	      }
	      return undefined;
	    }
	    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
	  };
	});

	function mix(to, from) {
	  for (var i in from) {
	    if (from.hasOwnProperty(i)) {
	      to[i] = from[i];
	    }
	  }
	  return to;
	}

	var utils = {
	  getWindow: function getWindow(node) {
	    if (node && node.document && node.setTimeout) {
	      return node;
	    }
	    var doc = node.ownerDocument || node;
	    return doc.defaultView || doc.parentWindow;
	  },
	  offset: function offset(el, value, option) {
	    if (typeof value !== 'undefined') {
	      setOffset(el, value, option || {});
	    } else {
	      return getOffset(el);
	    }
	  },

	  isWindow: isWindow,
	  each: each,
	  css: css,
	  clone: function clone(obj) {
	    var i = void 0;
	    var ret = {};
	    for (i in obj) {
	      if (obj.hasOwnProperty(i)) {
	        ret[i] = obj[i];
	      }
	    }
	    var overflow = obj.overflow;
	    if (overflow) {
	      for (i in obj) {
	        if (obj.hasOwnProperty(i)) {
	          ret.overflow[i] = obj.overflow[i];
	        }
	      }
	    }
	    return ret;
	  },

	  mix: mix,
	  getWindowScrollLeft: function getWindowScrollLeft(w) {
	    return getScrollLeft(w);
	  },
	  getWindowScrollTop: function getWindowScrollTop(w) {
	    return getScrollTop(w);
	  },
	  merge: function merge() {
	    var ret = {};

	    for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
	      args[_key3] = arguments[_key3];
	    }

	    for (var i = 0; i < args.length; i++) {
	      utils.mix(ret, args[i]);
	    }
	    return ret;
	  },

	  viewportWidth: 0,
	  viewportHeight: 0
	};

	mix(utils, domUtils);

	exports["default"] = utils;
	module.exports = exports['default'];

/***/ },

/***/ 435:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTransformName = getTransformName;
	exports.setTransitionProperty = setTransitionProperty;
	exports.getTransitionProperty = getTransitionProperty;
	exports.getTransformXY = getTransformXY;
	exports.setTransformXY = setTransformXY;
	var vendorPrefix = void 0;

	var jsCssMap = {
	  Webkit: '-webkit-',
	  Moz: '-moz-',
	  // IE did it wrong again ...
	  ms: '-ms-',
	  O: '-o-'
	};

	function getVendorPrefix() {
	  if (vendorPrefix !== undefined) {
	    return vendorPrefix;
	  }
	  vendorPrefix = '';
	  var style = document.createElement('p').style;
	  var testProp = 'Transform';
	  for (var key in jsCssMap) {
	    if (key + testProp in style) {
	      vendorPrefix = key;
	    }
	  }
	  return vendorPrefix;
	}

	function getTransitionName() {
	  return getVendorPrefix() ? getVendorPrefix() + 'TransitionProperty' : 'transitionProperty';
	}

	function getTransformName() {
	  return getVendorPrefix() ? getVendorPrefix() + 'Transform' : 'transform';
	}

	function setTransitionProperty(node, value) {
	  var name = getTransitionName();
	  if (name) {
	    node.style[name] = value;
	    if (name !== 'transitionProperty') {
	      node.style.transitionProperty = value;
	    }
	  }
	}

	function setTransform(node, value) {
	  var name = getTransformName();
	  if (name) {
	    node.style[name] = value;
	    if (name !== 'transform') {
	      node.style.transform = value;
	    }
	  }
	}

	function getTransitionProperty(node) {
	  return node.style.transitionProperty || node.style[getTransitionName()];
	}

	function getTransformXY(node) {
	  var style = window.getComputedStyle(node, null);
	  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());
	  if (transform && transform !== 'none') {
	    var matrix = transform.replace(/[^0-9\-.,]/g, '').split(',');
	    return { x: parseFloat(matrix[12] || matrix[4], 0), y: parseFloat(matrix[13] || matrix[5], 0) };
	  }
	  return {
	    x: 0,
	    y: 0
	  };
	}

	var matrix2d = /matrix\((.*)\)/;
	var matrix3d = /matrix3d\((.*)\)/;

	function setTransformXY(node, xy) {
	  var style = window.getComputedStyle(node, null);
	  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());
	  if (transform && transform !== 'none') {
	    var arr = void 0;
	    var match2d = transform.match(matrix2d);
	    if (match2d) {
	      match2d = match2d[1];
	      arr = match2d.split(',').map(function (item) {
	        return parseFloat(item, 10);
	      });
	      arr[4] = xy.x;
	      arr[5] = xy.y;
	      setTransform(node, 'matrix(' + arr.join(',') + ')');
	    } else {
	      var match3d = transform.match(matrix3d)[1];
	      arr = match3d.split(',').map(function (item) {
	        return parseFloat(item, 10);
	      });
	      arr[12] = xy.x;
	      arr[13] = xy.y;
	      setTransform(node, 'matrix3d(' + arr.join(',') + ')');
	    }
	  } else {
	    setTransform(node, 'translateX(' + xy.x + 'px) translateY(' + xy.y + 'px) translateZ(0)');
	  }
	}

/***/ },

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(434);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	/**
	 * 得到会导致元素显示不全的祖先元素
	 */

	function getOffsetParent(element) {
	  // ie 这个也不是完全可行
	  /*
	   <div style="width: 50px;height: 100px;overflow: hidden">
	   <div style="width: 50px;height: 100px;position: relative;" id="d6">
	   元素 6 高 100px 宽 50px<br/>
	   </div>
	   </div>
	   */
	  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
	  //  In other browsers it only includes elements with position absolute, relative or
	  // fixed, not elements with overflow set to auto or scroll.
	  //        if (UA.ie && ieMode < 8) {
	  //            return element.offsetParent;
	  //        }
	  // 统一的 offsetParent 方法
	  var doc = element.ownerDocument;
	  var body = doc.body;
	  var parent = void 0;
	  var positionStyle = _utils2["default"].css(element, 'position');
	  var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

	  if (!skipStatic) {
	    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
	  }

	  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
	    positionStyle = _utils2["default"].css(parent, 'position');
	    if (positionStyle !== 'static') {
	      return parent;
	    }
	  }
	  return null;
	}

	exports["default"] = getOffsetParent;
	module.exports = exports['default'];

/***/ },

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(434);

	var _utils2 = _interopRequireDefault(_utils);

	var _getOffsetParent = __webpack_require__(436);

	var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	/**
	 * 获得元素的显示部分的区域
	 */
	function getVisibleRectForElement(element) {
	  var visibleRect = {
	    left: 0,
	    right: Infinity,
	    top: 0,
	    bottom: Infinity
	  };
	  var el = (0, _getOffsetParent2["default"])(element);
	  var scrollX = void 0;
	  var scrollY = void 0;
	  var winSize = void 0;
	  var doc = element.ownerDocument;
	  var win = doc.defaultView || doc.parentWindow;
	  var body = doc.body;
	  var documentElement = doc.documentElement;

	  // Determine the size of the visible rect by climbing the dom accounting for
	  // all scrollable containers.
	  while (el) {
	    // clientWidth is zero for inline block elements in ie.
	    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) &&
	    // body may have overflow set on it, yet we still get the entire
	    // viewport. In some browsers, el.offsetParent may be
	    // document.documentElement, so check for that too.
	    el !== body && el !== documentElement && _utils2["default"].css(el, 'overflow') !== 'visible') {
	      var pos = _utils2["default"].offset(el);
	      // add border
	      pos.left += el.clientLeft;
	      pos.top += el.clientTop;
	      visibleRect.top = Math.max(visibleRect.top, pos.top);
	      visibleRect.right = Math.min(visibleRect.right,
	      // consider area without scrollBar
	      pos.left + el.clientWidth);
	      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
	      visibleRect.left = Math.max(visibleRect.left, pos.left);
	    } else if (el === body || el === documentElement) {
	      break;
	    }
	    el = (0, _getOffsetParent2["default"])(el);
	  }

	  // Clip by window's viewport.
	  scrollX = _utils2["default"].getWindowScrollLeft(win);
	  scrollY = _utils2["default"].getWindowScrollTop(win);
	  visibleRect.left = Math.max(visibleRect.left, scrollX);
	  visibleRect.top = Math.max(visibleRect.top, scrollY);
	  winSize = {
	    width: _utils2["default"].viewportWidth(win),
	    height: _utils2["default"].viewportHeight(win)
	  };
	  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
	  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
	  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
	}

	exports["default"] = getVisibleRectForElement;
	module.exports = exports['default'];

/***/ },

/***/ 438:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(434);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
	  var pos = _utils2["default"].clone(elFuturePos);
	  var size = {
	    width: elRegion.width,
	    height: elRegion.height
	  };

	  if (overflow.adjustX && pos.left < visibleRect.left) {
	    pos.left = visibleRect.left;
	  }

	  // Left edge inside and right edge outside viewport, try to resize it.
	  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
	    size.width -= pos.left + size.width - visibleRect.right;
	  }

	  // Right edge outside viewport, try to move it.
	  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
	    // 保证左边界和可视区域左边界对齐
	    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
	  }

	  // Top edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top < visibleRect.top) {
	    pos.top = visibleRect.top;
	  }

	  // Top edge inside and bottom edge outside viewport, try to resize it.
	  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
	    size.height -= pos.top + size.height - visibleRect.bottom;
	  }

	  // Bottom edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
	    // 保证上边界和可视区域上边界对齐
	    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
	  }

	  return _utils2["default"].mix(pos, size);
	}

	exports["default"] = adjustForViewport;
	module.exports = exports['default'];

/***/ },

/***/ 439:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(434);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	function getRegion(node) {
	  var offset = void 0;
	  var w = void 0;
	  var h = void 0;
	  if (!_utils2["default"].isWindow(node) && node.nodeType !== 9) {
	    offset = _utils2["default"].offset(node);
	    w = _utils2["default"].outerWidth(node);
	    h = _utils2["default"].outerHeight(node);
	  } else {
	    var win = _utils2["default"].getWindow(node);
	    offset = {
	      left: _utils2["default"].getWindowScrollLeft(win),
	      top: _utils2["default"].getWindowScrollTop(win)
	    };
	    w = _utils2["default"].viewportWidth(win);
	    h = _utils2["default"].viewportHeight(win);
	  }
	  offset.width = w;
	  offset.height = h;
	  return offset;
	}

	exports["default"] = getRegion;
	module.exports = exports['default'];

/***/ },

/***/ 440:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getAlignOffset = __webpack_require__(441);

	var _getAlignOffset2 = _interopRequireDefault(_getAlignOffset);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
	  var xy = void 0;
	  var diff = void 0;
	  var p1 = void 0;
	  var p2 = void 0;

	  xy = {
	    left: elRegion.left,
	    top: elRegion.top
	  };

	  p1 = (0, _getAlignOffset2["default"])(refNodeRegion, points[1]);
	  p2 = (0, _getAlignOffset2["default"])(elRegion, points[0]);

	  diff = [p2.left - p1.left, p2.top - p1.top];

	  return {
	    left: xy.left - diff[0] + offset[0] - targetOffset[0],
	    top: xy.top - diff[1] + offset[1] - targetOffset[1]
	  };
	}

	exports["default"] = getElFuturePos;
	module.exports = exports['default'];

/***/ },

/***/ 441:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * 获取 node 上的 align 对齐点 相对于页面的坐标
	 */

	function getAlignOffset(region, align) {
	  var V = align.charAt(0);
	  var H = align.charAt(1);
	  var w = region.width;
	  var h = region.height;
	  var x = void 0;
	  var y = void 0;

	  x = region.left;
	  y = region.top;

	  if (V === 'c') {
	    y += h / 2;
	  } else if (V === 'b') {
	    y += h;
	  }

	  if (H === 'c') {
	    x += w / 2;
	  } else if (H === 'r') {
	    x += w;
	  }

	  return {
	    left: x,
	    top: y
	  };
	}

	exports["default"] = getAlignOffset;
	module.exports = exports['default'];

/***/ },

/***/ 442:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = isWindow;
	function isWindow(obj) {
	  /* eslint no-eq-null: 0 */
	  /* eslint eqeqeq: 0 */
	  return obj != null && obj == obj.window;
	}
	module.exports = exports['default'];

/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _LazyRenderBox = __webpack_require__(444);

	var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	var PopupInner = _react2["default"].createClass({
	  displayName: 'PopupInner',

	  propTypes: {
	    hiddenClassName: _react.PropTypes.string,
	    className: _react.PropTypes.string,
	    prefixCls: _react.PropTypes.string,
	    onMouseEnter: _react.PropTypes.func,
	    onMouseLeave: _react.PropTypes.func,
	    children: _react.PropTypes.any
	  },
	  render: function render() {
	    var props = this.props;
	    var className = props.className;
	    if (!props.visible) {
	      className += ' ' + props.hiddenClassName;
	    }
	    return _react2["default"].createElement('div', {
	      className: className,
	      onMouseEnter: props.onMouseEnter,
	      onMouseLeave: props.onMouseLeave,
	      style: props.style
	    }, _react2["default"].createElement(_LazyRenderBox2["default"], { className: props.prefixCls + '-content', visible: props.visible }, props.children));
	  }
	});

	exports["default"] = PopupInner;
	module.exports = exports['default'];

/***/ },

/***/ 444:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	var LazyRenderBox = _react2["default"].createClass({
	  displayName: 'LazyRenderBox',

	  propTypes: {
	    children: _react.PropTypes.any,
	    className: _react.PropTypes.string,
	    visible: _react.PropTypes.bool,
	    hiddenClassName: _react.PropTypes.string
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return nextProps.hiddenClassName || nextProps.visible;
	  },
	  render: function render() {
	    var _props = this.props;
	    var hiddenClassName = _props.hiddenClassName;
	    var visible = _props.visible;

	    var props = _objectWithoutProperties(_props, ['hiddenClassName', 'visible']);

	    if (hiddenClassName || _react2["default"].Children.count(props.children) > 1) {
	      if (!visible && hiddenClassName) {
	        props.className += ' ' + hiddenClassName;
	      }
	      return _react2["default"].createElement('div', props);
	    }

	    return _react2["default"].Children.only(props.children);
	  }
	});

	exports["default"] = LazyRenderBox;
	module.exports = exports['default'];

/***/ },

/***/ 445:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	exports.getAlignFromPlacement = getAlignFromPlacement;
	exports.getPopupClassNameFromAlign = getPopupClassNameFromAlign;
	function isPointsEq(a1, a2) {
	  return a1[0] === a2[0] && a1[1] === a2[1];
	}

	function getAlignFromPlacement(builtinPlacements, placementStr, align) {
	  var baseAlign = builtinPlacements[placementStr] || {};
	  return _extends({}, baseAlign, align);
	}

	function getPopupClassNameFromAlign(builtinPlacements, prefixCls, align) {
	  var points = align.points;
	  for (var placement in builtinPlacements) {
	    if (builtinPlacements.hasOwnProperty(placement)) {
	      if (isPointsEq(builtinPlacements[placement].points, points)) {
	        return prefixCls + '-placement-' + placement;
	      }
	    }
	  }
	  return '';
	}

/***/ },

/***/ 446:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	exports["default"] = getContainerRenderMixin;

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	function defaultGetContainer() {
	  var container = document.createElement('div');
	  document.body.appendChild(container);
	  return container;
	}

	function getContainerRenderMixin(config) {
	  var _config$autoMount = config.autoMount;
	  var autoMount = _config$autoMount === undefined ? true : _config$autoMount;
	  var _config$autoDestroy = config.autoDestroy;
	  var autoDestroy = _config$autoDestroy === undefined ? true : _config$autoDestroy;
	  var isVisible = config.isVisible;
	  var getComponent = config.getComponent;
	  var _config$getContainer = config.getContainer;
	  var getContainer = _config$getContainer === undefined ? defaultGetContainer : _config$getContainer;

	  var mixin = void 0;

	  function _renderComponent(instance, componentArg, ready) {
	    if (!isVisible || instance._component || isVisible(instance)) {
	      if (!instance._container) {
	        instance._container = getContainer(instance);
	      }
	      _reactDom2["default"].unstable_renderSubtreeIntoContainer(instance, getComponent(instance, componentArg), instance._container, function callback() {
	        instance._component = this;
	        if (ready) {
	          ready.call(this);
	        }
	      });
	    }
	  }

	  if (autoMount) {
	    mixin = _extends({}, mixin, {
	      componentDidMount: function componentDidMount() {
	        _renderComponent(this);
	      },
	      componentDidUpdate: function componentDidUpdate() {
	        _renderComponent(this);
	      }
	    });
	  }

	  if (!autoMount || !autoDestroy) {
	    mixin = _extends({}, mixin, {
	      renderComponent: function renderComponent(componentArg, ready) {
	        _renderComponent(this, componentArg, ready);
	      }
	    });
	  }

	  function _removeContainer(instance) {
	    if (instance._container) {
	      var container = instance._container;
	      _reactDom2["default"].unmountComponentAtNode(container);
	      container.parentNode.removeChild(container);
	      instance._container = null;
	    }
	  }

	  if (autoDestroy) {
	    mixin = _extends({}, mixin, {
	      componentWillUnmount: function componentWillUnmount() {
	        _removeContainer(this);
	      }
	    });
	  } else {
	    mixin = _extends({}, mixin, {
	      removeContainer: function removeContainer() {
	        _removeContainer(this);
	      }
	    });
	  }

	  return mixin;
	}
	module.exports = exports['default'];

/***/ },

/***/ 447:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defineProperty2 = __webpack_require__(276);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _slicedToArray2 = __webpack_require__(380);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _classCallCheck2 = __webpack_require__(295);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(296);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(350);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(373);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _objectAssign = __webpack_require__(4);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _icon = __webpack_require__(389);

	var _icon2 = _interopRequireDefault(_icon);

	var _splitObject3 = __webpack_require__(390);

	var _splitObject4 = _interopRequireDefault(_splitObject3);

	var _touchableFeedback = __webpack_require__(376);

	var _touchableFeedback2 = _interopRequireDefault(_touchableFeedback);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { "default": obj };
	}

	var __assign = undefined && undefined.__assign || Object.assign || function (t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) {
	            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	    }
	    return t;
	};

	var Item = function (_React$Component) {
	    (0, _inherits3["default"])(Item, _React$Component);

	    function Item() {
	        (0, _classCallCheck3["default"])(this, Item);
	        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
	    }

	    Item.prototype.render = function render() {
	        var _cls;

	        var _splitObject = (0, _splitObject4["default"])(this.props, ['children', 'className', 'prefixCls', 'iconName', 'disabled', 'touchFeedback', 'activeStyle', 'firstItem']),
	            _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2),
	            _splitObject2$ = _splitObject2[0],
	            children = _splitObject2$.children,
	            className = _splitObject2$.className,
	            prefixCls = _splitObject2$.prefixCls,
	            iconName = _splitObject2$.iconName,
	            disabled = _splitObject2$.disabled,
	            touchFeedback = _splitObject2$.touchFeedback,
	            activeStyle = _splitObject2$.activeStyle,
	            firstItem = _splitObject2$.firstItem,
	            restProps = _splitObject2[1];

	        var style = (0, _objectAssign2["default"])({}, this.props.style);
	        if (touchFeedback) {
	            style = (0, _objectAssign2["default"])(style, activeStyle);
	        }
	        var cls = (_cls = {}, (0, _defineProperty3["default"])(_cls, className, !!className), (0, _defineProperty3["default"])(_cls, prefixCls + '-item', true), (0, _defineProperty3["default"])(_cls, prefixCls + '-item-disabled', disabled), (0, _defineProperty3["default"])(_cls, prefixCls + '-item-active', touchFeedback), (0, _defineProperty3["default"])(_cls, prefixCls + '-item-fix-active-arrow', firstItem && touchFeedback), _cls);
	        return _react2["default"].createElement("div", __assign({ className: (0, _classnames2["default"])(cls) }, restProps, { style: style }), iconName ? _react2["default"].createElement("span", { className: prefixCls + '-item-icon' }, _react2["default"].createElement(_icon2["default"], { type: iconName })) : null, _react2["default"].createElement("span", { className: prefixCls + '-item-content' }, children));
	    };

	    return Item;
	}(_react2["default"].Component);

	Item.defaultProps = {
	    prefixCls: 'am-popover',
	    disabled: false
	};
	exports["default"] = (0, _touchableFeedback2["default"])(Item, 'PopoverItem');
	module.exports = exports['default'];

/***/ },

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "/images/test.jpg";

/***/ },

/***/ 449:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "/images/test2.jpg";

/***/ },

/***/ 450:
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

	var _actions = __webpack_require__(412);

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
	                '\u6211\u662F\u5217\u8868\u9875',
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/' },
	                    '\u9996\u9875'
	                ),
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/list' },
	                    '\u5217\u8868\u9875'
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

/***/ 451:
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

	var _actions = __webpack_require__(412);

	var action = _interopRequireWildcard(_actions);

	var _TabBarFooter = __webpack_require__(417);

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
	                        '\u83DC\u5355'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        '4Pgo'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '\u83DC\u5355'
	                    )
	                ),
	                _react2.default.createElement(
	                    'ul',
	                    { className: 'message-list' },
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        '\u6D88\u606F\u5217\u8868111'
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        '\u6D88\u606F\u5217\u8868222'
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        '\u6D88\u606F\u5217\u8868333'
	                    )
	                )
	            );
	        }
	    }]);

	    return Message;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    var currentUser = state.currentUser;

	    return { currentUser: currentUser };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Message);

/***/ },

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _li;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(406);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(412);

	var action = _interopRequireWildcard(_actions);

	var _TabBarFooter = __webpack_require__(417);

	var _TabBarFooter2 = _interopRequireDefault(_TabBarFooter);

	var _SendMessage = __webpack_require__(453);

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
	            var getArticle = this.props.getArticle;

	            getArticle();
	        }
	    }, {
	        key: 'omponentWillMount',
	        value: function omponentWillMount() {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            console.info('componentWillUnmount');
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
	            var _props = this.props;
	            var currentUser = _props.currentUser;
	            var addArticle = _props.addArticle;

	            var data = {
	                title: this.state.title,
	                content: this.state.content
	            };
	            addArticle(data);
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
	            var _props2 = this.props;
	            var currentUser = _props2.currentUser;
	            var articleList = _props2.articleList;
	            var articleList2 = _props2.articleList2;

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'header' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '\u83DC\u5355'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        '4Pgo'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '\u83DC\u5355'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'play' },
	                    '\u5F53\u524D\u7528\u6237:',
	                    currentUser.username,
	                    currentUser.nickname,
	                    _react2.default.createElement(_SendMessage2.default, null),
	                    _react2.default.createElement('input', { name: 'title', ref: 'title', onChange: this.handleChange.bind(this), type: 'text', placeholder: '\u6807\u9898' }),
	                    _react2.default.createElement('input', { name: 'content', ref: 'content', onChange: this.handleChange.bind(this), type: 'text', placeholder: '\u5185\u5BB9' }),
	                    _react2.default.createElement(
	                        'button',
	                        { onClick: this.addArticle.bind(this) },
	                        '\u6DFB\u52A0\u65B0\u95FB'
	                    ),
	                    articleList.map(function (result, index) {
	                        return _react2.default.createElement(
	                            'div',
	                            { key: index },
	                            result
	                        );
	                    }),
	                    _react2.default.createElement(
	                        'ul',
	                        { style: styles.list },
	                        articleList2.map(function (result, index) {
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
	    var currentUser = state.currentUser;
	    var articleList = state.articleList;
	    var articleList2 = state.articleList2;

	    return { currentUser: currentUser, articleList: articleList, articleList2: articleList2 };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Play);

/***/ },

/***/ 453:
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

	var _actions = __webpack_require__(412);

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
	                    '\u53D1\u9001\u6D88\u606F'
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

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(406);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(412);

	var action = _interopRequireWildcard(_actions);

	var _TabBarFooter = __webpack_require__(417);

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
	                        '\u83DC\u5355'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        '4Pgo'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '\u83DC\u5355'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'discover' },
	                    '\u53D1\u73B0'
	                )
	            );
	        }
	    }]);

	    return Discover;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    var currentUser = state.currentUser;

	    return { currentUser: currentUser };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Discover);

/***/ },

/***/ 455:
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

	var _actions = __webpack_require__(412);

	var action = _interopRequireWildcard(_actions);

	var _TabBarFooter = __webpack_require__(417);

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
	                        '\u83DC\u5355'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        '4Pgo'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn' },
	                        '\u83DC\u5355'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'mine' },
	                    '\u6211\u7684'
	                )
	            );
	        }
	    }]);

	    return Mine;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(state) {
	    var currentUser = state.currentUser;

	    return { currentUser: currentUser };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Mine);

/***/ },

/***/ 456:
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

	var _actions = __webpack_require__(412);

	var action = _interopRequireWildcard(_actions);

	var _Submit = __webpack_require__(457);

	var _Submit2 = _interopRequireDefault(_Submit);

	var _Alert = __webpack_require__(410);

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
	                        _react2.default.createElement('input', { type: 'text', name: 'username', placeholder: '\u7528\u6237\u540D', onChange: this.handleChange.bind(this) }),
	                        _react2.default.createElement('input', { type: 'password', name: 'password', placeholder: '\u5BC6\u7801', onChange: this.handleChange.bind(this) }),
	                        _react2.default.createElement('input', { type: 'password', name: 're_password', placeholder: '\u786E\u8BA4\u5BC6\u7801', onChange: this.handleChange.bind(this) }),
	                        _react2.default.createElement('input', { type: 'nickname', name: 'nickname', placeholder: '\u6635\u79F0', onChange: this.handleChange.bind(this) }),
	                        _react2.default.createElement(_Submit2.default, { thisClick: this.handleRegister.bind(this), canClick: this.state.canClick, text: '\u7ACB\u5373\u6CE8\u518C' })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'link' },
	                        '\u5DF2\u6709\u8D26\u53F7\uFF1F',
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/login' },
	                            '\u7ACB\u5373\u767B\u5F55'
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
	        registerState: state.registerState
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Register);

/***/ },

/***/ 457:
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

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(406);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	var _redux = __webpack_require__(242);

	var _reactRedux = __webpack_require__(235);

	var _actions = __webpack_require__(412);

	var action = _interopRequireWildcard(_actions);

	var _Submit = __webpack_require__(457);

	var _Submit2 = _interopRequireDefault(_Submit);

	var _Alert = __webpack_require__(410);

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
	            // console.log(this.state);
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
	            // console.log('handleLogin');
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
	            console.log(this.props);
	            var loginState = this.props.loginState;

	            if (loginState.state == 'error') {
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
	                        _react2.default.createElement('input', { type: 'text', name: 'username', onChange: this.handleChange.bind(this), placeholder: '\u7528\u6237\u540D' }),
	                        _react2.default.createElement('input', { type: 'password', name: 'password', onChange: this.handleChange.bind(this), placeholder: '\u5BC6\u7801' }),
	                        _react2.default.createElement(_Submit2.default, { thisClick: this.handleLogin.bind(this), canClick: this.state.canClick, text: '\u7ACB\u5373\u767B\u5F55' })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'link' },
	                        '\u6CA1\u6709\u8D26\u53F7\uFF1F',
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/register' },
	                            '\u7ACB\u5373\u6CE8\u518C'
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
	        loginState: state.loginState
	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(action, dispatch);
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);

/***/ }

});