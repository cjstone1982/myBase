import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

class TabBarHeader extends Component {
    render() {
        return (<div className="tab-bar-header">
        	<Link to="/">动态</Link>
            <Link to="/">互助</Link>
            <Link to="/">合作秀</Link>
            <Link to="/">关注</Link>
        	<Link to="/">热门</Link>
        </div>)
    }
}

export default TabBaHeader