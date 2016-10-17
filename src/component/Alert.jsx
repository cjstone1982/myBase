import React, {Component} from 'react';
import {Link} from 'react-router'
import ReactDOM, {render} from 'react-dom'

class Alert extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        $('.tips').show('500').animate({top: '5px'}, "300")
        let that=this
        setTimeout(function(){
            $('.tips:first').remove()
        },this.props.delay)
    }
    render() {
        console.log('render');
        return (<div style={styles.tips}>
            {this.props.text}
        </div>)
    }
}

var styles={
    tips:{
        color:'#fff',
        display:'block',
        background:'orange',
        textAlign:'center',
        animation:'alertShow .5s',
        width:'80%',
        margin:'5px auto 0',
        padding:'10px 0',
        borderRadius:'5px',
        fontSize:'14px'
    },
}

exports.add = function(text,delay){
    let dom=document.createElement('div')
    dom.style.zIndex='9999'
    dom.style.position='relative'
    dom.className='tips'
    ReactDOM.render(<Alert text={text} delay={delay} />, document.body.appendChild(dom) )
}

exports.remove = function(){
    $('.tips:first').remove()
}