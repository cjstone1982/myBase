import React, {Component} from 'react';

class Submit extends Component {
    render() {
        console.log(this.props.canClick);
        if(!!this.props.canClick){
            return (<button onClick={this.props.thisClick} type="button" style={styles.button}>
                {this.props.text}
            </button>)
        }else{
            return (<button type="button" style={styles.button2}>
                {this.props.text}
            </button>)
        }
    }
}

var styles={
    button:{
        color:'#fff',
        display:'block',
        background:'#800080',
        textAlign:'center',
        animation:'alertShow .5s',
        width:'100%',
        margin:'5px auto 0',
        padding:'10px 0',
        borderRadius:'5px',
        fontSize:'14px'
    },
    button2:{
        color:'#fff',
        display:'block',
        background:'#999',
        textAlign:'center',
        animation:'alertShow .5s',
        width:'100%',
        margin:'5px auto 0',
        padding:'10px 0',
        borderRadius:'5px',
        fontSize:'14px'
    },
}
export default Submit