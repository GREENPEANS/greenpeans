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
      lease: '6个月',
      serviceCharge: '10%',
      interestDay: '1%',
      overdueDay:'0.0005',
    }, {
      key: '2',
      lease: '12个月',
      serviceCharge: '10%',
      interestDay: '1%',
      overdueDay:'0.0005',
    }];
    
    const columns = [{
      title: '融租(月)',
      dataIndex: 'lease',
      key: 'lease',
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
      <p style={thisText}>在第一期还款时，需还上总的手续费，利息则按期还</p>
           <Table dataSource={dataSource} columns={columns} />          
      </div>
    );
  }
})