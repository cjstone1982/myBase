import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

class Index extends Component {
    render() {
        return (<div>
        	我是首页
        	<Link to="/">首页</Link>
        	<Link to="/list">列表页</Link>
        </div>)
    }
}

export default Index