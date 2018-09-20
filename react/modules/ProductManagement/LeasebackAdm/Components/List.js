import React from 'react'
import {
  Table,
  Modal,
  Tooltip,
  Button
} from 'antd';
var confirm = Modal.confirm;
const objectAssign = require('object-assign');
export default React.createClass({
  getInitialState() {
    return {
      selectedRows: [],
      selectedRowKeys: [], // 这里配置默认勾选列
      loading: false,
      data: [],
      pagination: {
        pageSize: 10,
      },
      canEdit: true,
      visible: false,   
      visible1: false,
      recordSoure: '',
    };
  },
  componentWillReceiveProps(nextProps, nextState) {
  },
  rowKey(record) {
    return record.id;
  },
  reset(title,record){
    this.setState({
      record:record,
      title:title,
      visible1: true
    })
  },
  render() {
    const dataSource = [{
      key: '1',
      leaseBack: '15天',
      serviceCharge: '4%',
      interestDay: '0.0003',
      overdueDay:'0.0005',
    }, {
      key: '2',
      leaseBack: '30天',
      serviceCharge: '8%',
      interestDay: '0.0003',
      overdueDay:'0.0005',
    }, {
      key: '3',
      leaseBack: '45天',
      serviceCharge: '8%',
      interestDay: '0.0003',
      overdueDay:'0.0005',
    }, {
      key: '4',
      leaseBack: '60天',
      serviceCharge: '8%',
      interestDay: '0.0003',
      overdueDay:'0.0005',
    }];
    
    const columns = [{
      title: '售后回租(天)',
      dataIndex: 'leaseBack',
      key: 'leaseBack',
    }, {
      title: '手续费',
      dataIndex: 'serviceCharge',
      key: 'serviceCharge',
    }, {
      title: '利息(天)',
      dataIndex: 'interestDay',
      key: 'interestDay',
    }, {
      title: '逾期(天)',
      dataIndex: 'overdueDay',
      key: 'overdueDay',
    }];
    const thisText ={
      color:'#f00',
      margin: '0 0 10px 0'
    }
    return (
      <div className="block-panel">
      <p style={thisText}>放款时即扣除手续费，本金和利息则按期还</p>
           <Table dataSource={dataSource} columns={columns} />          
      </div>
    );
  }
})