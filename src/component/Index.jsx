import 'whatwg-fetch'
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

//antd
import { Table } from 'antd';

const columns = [
    { title : 'Name',    dataIndex: 'name',    key: 'name'    },
    { title : 'Role',    dataIndex: 'role',    key: 'role'    },
    { title : 'Age',     dataIndex: 'age',     key: 'age'     },
    { title : 'Address', dataIndex: 'address', key: 'address' },
    { title : 'Action',  dataIndex: '',        key: 'x',      render: () => <a href="#">Edit</a>   },
    { title : 'Action',  dataIndex: '',        key: 'y',      render: () => <a href="#">Delete</a> },
];

const data = [
    {
        key: 1,
        name: 'John Brown',
        role: 'superAdministrator',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    }, {
        key: 2,
        name: 'Jim Green',
        role: 'administrator',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    }, {
        key: 3,
        name: 'Joe Black',
        role: 'administrator',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentWillMount(){
    }
    componentDidMount(){
       
    }
    componentWillUnmount(){
    }
    handleChange(e){
        var newState={}
        newState[e.target.name]=e.target.value
        this.setState(newState)
    }
    render() {
        return (<div style={styles.index}>
            <Table columns={columns} rowSelection={rowSelection} expandedRowRender={
                record => <p>{record.description}</p>
            } dataSource={data} className="table" size="middle"/>
        </div>)
    }
}

const styles={
    index:{
       // width:'100%',
    },
}

let mapStateToProps = state => {
    // const {currentUser}=state
    return {}
}
let mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Index)
