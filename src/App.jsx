//资源加载
// import React, {Component, PropTypes} from './source/js/react.min.js';
// import ReactDOM, {render} from './source/js/react-dom.min.js';
// import { Router, Route, IndexRoute, browserHistory, hashHistory } from './source/js/react-router.min.js';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import {Provider} from 'react-redux';
// import store from './redux/store';

//样式加载
// import 'flex.css'; //flex布局
import './source/css/style.less'; //加载公共样式

//组件加载
import Index from './component/Index';
import List  from './component/List';

// store.subscribe(function () {
//     // console.log(store.getState());
// });

class Main extends Component {
    render() {
        return (
            <div>
            mainbox
            {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    // <Provider>
        <Router history={browserHistory}>
	        <Route path="/" component={Main}>
	            <IndexRoute component={Index} />
	            <Route path="/list" component={List} />
	        </Route>
	    </Router>
    // </Provider>
    ,document.body.appendChild(document.createElement('div'))
    // ,document.getElementById('app')
);



