import React, {Component, PropTypes} from 'react';

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'


class Loading extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirectDelay:300,
        }
    }
    componentDidUpdate(){
        const {open} = this.props.loading
        if(open==1){
            $('#leftDoor').animate({width:'50%'},this.state.redirectDelay,'swing')
            $('#rightDoor').animate({width:'50%'},this.state.redirectDelay,'swing')
        }else if(open==0){
            $('#leftDoor').animate({width:'0px'},this.state.redirectDelay,'swing')
            $('#rightDoor').animate({width:'0px'},this.state.redirectDelay,'swing')
        }
    }
    render(){
        return(<div>
            <div id="leftDoor" style={styles.leftDoor}>
               
            </div>
            <div id="rightDoor" style={styles.rightDoor}>
                
            </div>
        </div>)
    }
}

let styles={
    leftDoor:{
        width:'50%',
        height:'1000px',
        position:'fixed',
        left:0,
        top:'45px',
        background:'#efefef',
        zIndex:99,
    },
    rightDoor:{
        width:'50%',
        height:'1000px',
        position:'fixed',
        right:0,
        top:'45px',
        background:'#efefef',
        zIndex:99,
    },
}

let mapStateToProps = state => {
    const {loading} = state
    return{
        loading:loading
    }
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Loading)
