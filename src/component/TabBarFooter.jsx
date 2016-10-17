import React, {Component, PropTypes} from 'react';
import {Link,IndexLink} from 'react-router'

class TabBarFooter extends Component {
    render() {
        return (<div className="tab-bar-footer">
        	<IndexLink activeClassName="footer-active" to="/"><i className="icon iconfont">&#xe605;</i><b>首页</b></IndexLink>
            <Link activeClassName="footer-active" to="/message"><i className="icon iconfont">&#xe600;</i><b>消息</b></Link>
            <Link activeClassName="footer-active" to="/play"><i className="icon iconfont">&#xe604;</i><b>约起</b></Link>
            <Link activeClassName="footer-active" to="/discover"><i className="icon iconfont">&#xe602;</i><b>发现</b></Link>
        	<Link activeClassName="footer-active" to="/mine"><i className="icon iconfont">&#xe601;</i><b>我的</b></Link>
        </div>)
    }
}

export default TabBarFooter