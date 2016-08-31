import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

class List extends Component {
    render() {
        return (<div>
        	我是列表页
        	<Link to="/">首页</Link>
        	<Link to="/list">列表页</Link>
        </div>)
    }
}

export default List