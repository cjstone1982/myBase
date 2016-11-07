import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//组件
import TabBarFooter from './TabBarFooter'
import SendMessage from './SendMessage'

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
        this.props.getArticle()
    }
    componentDidMount(){

    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
    }
    addArticle(e){
        let data={
            title:this.state.articleTitle,
            content:this.state.articleContent,
        }
        this.props.addArticle(data)
    }
    showId(e){
        alert(e.target.id)
    }
    render() {
        let that=this
        const {list,list2} = this.props
        return (
            <div>
                <div className="header">
                    <div className="btn">菜单</div>
                    <div className="title">4Pgo</div>
                    <div className="btn">菜单</div>
                </div>
                <div className="play">
                    <SendMessage />
                  
                    <input name="articleTitle" onChange={this.handleChange.bind(this)} type="text" placeholder="标题" />
                    <input name="articleContent" onChange={this.handleChange.bind(this)} type="text" placeholder="内容" />
                    <button onClick={this.addArticle.bind(this)}>添加新闻</button>
                   
                    {list.map(function(result,index){
                        return(<div key={index}>
                            {result}
                        </div>)
                    })}
                    <ul style={styles.list}>
                        {list2.map((result,index)=>{
                            return(<li style={styles.li} onClick={this.showId.bind(this)} key={index} id={result._id}>
                                <div style={styles.title}>{result.title}</div>
                                <div style={styles.createAt}>{moment(result.createAt).format("LL")}</div>
                            </li>)
                        })}
                    </ul>
                {/*
                    <button onClick={function(){
                        fetch('/needle',{method: 'GET'})
                            .then(function(response) {
                                return response.json();
                            })
                            .then(function(data) {
                                console.log(data);
                            })
                            .catch(function(e) {
                                console.log("Oops, error");
                            })
                    }}>GET</button>
                    <button onClick={function(){
                        fetch('/needle',{method: 'POST'})
                            .then(function(response) {
                                return response.json();
                            })
                            .then(function(data) {
                                console.log(data);
                            })
                            .catch(function(e) {
                                console.log("Oops, error");
                            })
                    }}>POST</button>
                    <button onClick={function(){
                        fetch('/needle',{method: 'PUT'})
                            .then(function(response) {
                                return response.json();
                            })
                            .then(function(data) {
                                console.log(data);
                            })
                            .catch(function(e) {
                                console.log("Oops, error");
                            })
                    }}>PUT</button>
                    <button onClick={function(){
                        fetch('/needle',{method: 'DELETE'})
                            .then(function(response) {
                                return response.json();
                            })
                            .then(function(data) {
                                console.log(data);
                            })
                            .catch(function(e) {
                                console.log("Oops, error");
                            })
                    }}>DELETE</button>
*/}
                </div>
            </div>
        )
    }
}

let styles={
    list:{
       marginLeft:'5%',
       marginRight:'5%', 
    },
    li:{
        display:'flex',
        display:'-webkit-flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom:'1px solid #dedede',
        padding:'10px 0'
    },
    title:{

    },
    createAt:{
        fontSize:'12px',
        color:'#999',
    }

}

let mapStateToProps = state => ({
    list:state.articleList,
    list2:state.articleList2,
})
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Play)
