import React, {Component} from 'react';
import {Link} from 'react-router'
import ReactDOM, {render} from 'react-dom'
import {getUUID} from '../extend/method'

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:getUUID()
        };
    }
    componentDidMount(){
        $('.tips').animate({top: '15%'}, "400")
        let that=this
        setTimeout(()=>{
            $('#'+this.state.id).remove()
        },this.props.delay)
    }
    componentWillUnmount(){
        console.log('unmount');
    }
    render() {
        return (<div style={styles.tips} id={this.state.id}>
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
        borderRadius:'3pt',
        fontSize:'10pt',
        border:'0pt solid #fff',
        boxShadow:'0 0 2px 2px #fff',
    },
}

exports.add = function(text,delay){
    let dom=document.createElement('div')
    dom.style.zIndex='9999'
    dom.style.position='fixed'
    dom.style.width='100%'
    dom.style.top='13%'
    dom.className='tips'
    ReactDOM.render(<Alert text={text} delay={delay}  />, document.body.appendChild(dom) )
}

exports.remove = function(){
    $('.tips').remove()
}