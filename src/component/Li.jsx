import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

import Icon     from 'Icon'

class Li extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        // console.log('render li');
        let that=this
        if(this.props.blank){
            return (<div style={{height:this.props.blank+'px', background:'#f1f1f1'}}>
                &nbsp;
            </div>)
        }else{
            return (<div style={styles.li}>
                <Icon style={styles.ico} type={this.props.ico} />
                <div style={styles.title}>{this.props.title}</div>
                <div style={styles.count}>9</div>
                <Icon style={styles.ico2} type="right" />
            </div>)
        }
    }
}

const styles={
    li:{
        height:'35pt',
        lineHeight:'35pt',
        borderBottom:'1pt solid #eee',
        display: 'flex',
        display: '-webkit-flex',
        justifyContent: 'flex-start',
    },
    ico:{
        fontSize:'14pt',
        margin:'11pt',
        flex:1,
    },
    title:{
        fontSize:'12pt',
        flex:8,
    },
    ico2:{
        flex:1,
        fontSize:'14pt',
        margin:'11pt',
        color:'#ccc',
        alignContent: 'flex-end ',
        alignSelf: 'flex-end'
    },
    count:{
        margin:'11pt 0 0 0',
        height:'13pt',
        lineHeight:'14pt',
        textAlign:'center',
        color:"#fff",
        padding:'0 5pt',
        background:'#dd001a',
        borderRadius:'5px',
        fontSize:'9pt',
    },
}

export default Li
