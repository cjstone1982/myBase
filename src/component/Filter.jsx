import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

class Filter extends Component {
    render() {
        return (<div className="filter">
        	<Link to="/">时间</Link>
            <Link to="/">地点</Link>
            <Link to="/">平台</Link>
            <Link to="/">人数</Link>
        </div>)
    }
}

export default Filter