import React from 'react'
import {
  Table,
  Modal
} from 'antd';
import Push from './Push';
import PushOne from './PushOne';
import AddWin from './AddWin';
var confirm = Modal.confirm;
const objectAssign = require('object-assign');
export default React.createClass({
  getInitialState() {
    return {
      selectedRowKeys: [], // 这里配置默认勾选列
      loading: false,
      data: [],
      pagination: {},
      canEdit: true,
      visible: false,
      visibleaw: false,
      recordSoure: null,
      dataRecord:"",
      record:"",
      button: false,
      selectedRows:[],
      visibleapush:false,
      visibleapushTwo:false,
      ids:[],
    };
  },
  componentWillReceiveProps(nextProps, nextState) {
    this.clearSelectedList();
    this.fetch(nextProps.params);
  },
  hideModal() {
    this.setState({
      visible: false,
      visibleaw: false,
      visibleapush:false,
      visibleapushTwo:false
    });
    this.refreshList();
  },
  //选择
  onSelectChange(selectedRowKeys) {
      this.setState({
          selectedRowKeys
      });
  },
  onSelectAll(selected, selectedRows, changeRows) {
	    var selectedRowKeys = this.state.selectedRowKeys;
	    if (selected) {
	      for (var i = 0; i < selectedRows.length; i++) {
	        selectedRowKeys.push(selectedRows[i].id);
	      }
	    } else {
	      selectedRowKeys = [];
	    }
	    //console.log(selectedRowKeys);
	    this.setState({
	      selectedRows: selectedRows,
	      selectedRowKeys: selectedRowKeys,
	      button: selected,
	    })
	},
  rowKey(record) {
    return record.id;
  },
  
  //单推
  PushMessage(title, record, canEdit) {
      this.setState({
          canEdit: canEdit,
          visibleaw: true,
          title: title,
          record: record
      });
  },
  pushToMany(title,canEdit){
	    var selectedRowKeys = this.state.selectedRowKeys;
	  this.setState({
          canEdit: canEdit,
          visibleapush: true,
          title: title,
          ids:selectedRowKeys
      });
  },
  pushToManyByTime(title,canEdit){
	  this.setState({
          canEdit: canEdit,
          visibleapushTwo: true,
          title: title,
      });
  },
  //分页
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.refreshList();
  },
  fetch(params = {}) {
    this.setState({
      loading: true
    });
    if (!params.pageSize) {
      var params = {};
      params = {
        pageSize: 10,
        current: 1,
      }
    }
    Utils.ajaxData({
      url: '/modules/manage/cl/cluser/list.htm',
      data: params,
      callback: (result) => {
        const pagination = this.state.pagination;
        pagination.current = params.current;
        pagination.pageSize = params.pageSize;
        pagination.total = result.page.total;
        if (!pagination.current) {
          pagination.current = 1
        };
        this.setState({
          loading: false,
          data: result.data,
          pagination
        });
      }
    });
  },
  clearSelectedList() {
    this.setState({
      selectedRowKeys: [],
    });
  },
  refreshList() {
    var pagination = this.state.pagination;
    var params = objectAssign({}, this.props.params, {
      current: pagination.current,
      pageSize: pagination.pageSize
    });
    this.fetch(params);
  },
  componentDidMount() {
    this.fetch();
  },

  onRowClick(record) {
	  var button = this.state.button;
	    var id = record.id;
	    var selectedRows = this.state.selectedRows;
	    var selectedRowKeys = this.state.selectedRowKeys;
	    if (selectedRowKeys.indexOf(id) < 0) {
	      selectedRowKeys.push(id);
	      selectedRows.push(record);
	    } else {
	      selectedRowKeys.remove(id);
	      selectedRows.remove(record);
	    }
	    if (selectedRowKeys[0]) {
	      button = true;
	    } else {
	      //console.log(11111111);
	      button = false;
	    }
    this.setState({
    	  selectedRows: selectedRows,
	      selectedRowKeys: selectedRowKeys,
	      button: button
    });
  },
  render() {
    var me = this;
    const {
      loading,
      selectedRowKeys
    } = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onSelectAll: this.onSelectAll,
    };
    let openEdit = true;
    if (hasSelected && selectedRowKeys.indexOf("0") === -1) {
        openEdit = false;
    }
    var columns = [{
      title: '手机号码',
      dataIndex: "loginName",
    }, {
      title: '真实姓名',
      dataIndex: "realName",
    }, {
      title: '身份证号码',
      dataIndex: 'idNo'
    },{
      title: '注册时间',
      dataIndex: "registTime",
    }, {
      title: '操作',
      render: (text, record) => {
        return <div>
         <a href="#" onClick={me.PushMessage.bind(me, '推送消息',record, false)}>推送消息</a>
        </div>
      }    
    },];
    var state = this.state;
    return (
      <div className="block-panel">
      <div className="actionBtns" style={{ marginBottom: 16 }}>
		      <button disabled={!state.button} onClick={me.pushToMany.bind(me, '消息推送',false)} className="ant-btn">
		      			多人推送消息
		      </button>
	       <button disabled={state.button} onClick={me.pushToManyByTime.bind(me, '消息推送',false)} className="ant-btn">
	       			注册时间推送消息
	       </button>
      </div>
        <Table columns={columns} rowKey={this.rowKey}
        	rowSelection={rowSelection}
          onRowClick={this.onRowClick}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange} 
        />
        <AddWin ref="AddWin" visible={state.visibleaw} title={state.title} hideModal={me.hideModal} dataTable={state.dataTable} tableCommentList={state.tableCommentList} record={state.record} 
        canEdit={state.canEdit} dataRecord={state.dataRecord} dataName={state.dataName} />     
        <Push ref="Push" visible={state.visibleapush} title={state.title} hideModal={me.hideModal}  record={state.record} 
        canEdit={state.canEdit} dataRecord={state.dataRecord} ids={state.ids} />    
        <PushOne ref="PushOne" visible={state.visibleapushTwo} title={state.title} hideModal={me.hideModal}  record={state.record} 
        canEdit={state.canEdit} dataRecord={state.dataRecord}/>   
        </div>
        
    );
  }
})