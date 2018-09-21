import React from 'react'
import {
  Table,
  Modal,
  Button,
  Icon,
  Tooltip
} from 'antd';
import ReviewWin from './ReviewWin';
import AddPerson from './AddPerson';
import AddBtn from './AddBtn';
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
      personVisible:false
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
      personVisible:false
    });
    this.refreshList();
  },
  //新增跟编辑弹窗
  showModal(title, record, canEdit,orderNo) {
    var record = record;
    var orderNo = orderNo;
   
    this.setState({
      canEdit: canEdit,
      visible: true,
      title: title,
      record: record,
    }, () => {
      this.refs.ReviewWin.refs.Tab1.setFieldsValue(record);
      this.setState({
        recordSoure: record
      })
    });
  },
  //打开分配弹窗
  showAssignModal(title,canEdit, record) {
    this.setState({
      personVisible: true,
      title: title,
      record: record,
      canEdit:canEdit
    });
  },
  rowKey(record) {
    return record.id;
  },
  
  //新增姓名编辑弹窗
  updateName(title, record, canEdit) {
      this.setState({
          canEdit: canEdit,
          visibleaw: true,
          title: title,
          record: record
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
      var paramsparams = {};
      params = {
        pageSize: 10,
        current: 1,
      }
    }
    Utils.ajaxData({
      url: '/user/auth/getUserAllInfo.htm',
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
      pageSize: pagination.pageSize,
    });
    this.fetch(params);
  },
  componentDidMount() {
    this.fetch();
  },
  onSelectChange (selectedRowKeys)  {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  },
  onRowClick(record) {
    this.setState({
      selectedRowKeys: [record.id],
      selectedrecord: record
    });
  },
  render() {
    var me = this;
    const {
      loading,
      selectedRowKeys,
      
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    var columns = [{
      title: '手机号',
      dataIndex: "loginName",
    }, {
      title: '用户真实姓名',
      dataIndex: "userRealName",
    }, {
      title: '身份证号码',
      dataIndex: 'idNo'
    }, {
      title: '注册时间',
      dataIndex: "registTime",
    }, {
      title: '注册客户端',
      dataIndex: 'registerClient',
    }, {
	    title: '注册地地址',
	    dataIndex: 'registerAddr',
	  },{
      title: '注册地坐标',
      dataIndex: 'registerCoordinate',
    },{
      title: '渠道ID',
      dataIndex: 'channelId',
    },{
      title: '渠道名称',
      dataIndex: 'channelName',
    },{
      title: '用户状态',
      dataIndex: 'state',
      render: (text, record) => {
        if (text == 10) {
          return "黑名单"
        } else {
          return "正常"
        }
      }
    }, {
      title: '操作',
      render: (text, record,orderNo) => {
        return <div>  
          <Tooltip placement="bottomLeft" title="查看详情" >
            <Button className="particulars"  onClick={me.showModal.bind(me, '查看详情', record, true,orderNo)}><i className="icon iconfont icon-icon-chakanxq"></i></Button>        
          </Tooltip>  
          <span className="ant-divider"></span>
          <Tooltip placement="bottomLeft" title="个人推送" >
            <Button className="zise"  onClick={me.showAssignModal.bind(me, '个人推送',false, record) }><i className="icon iconfont icon-quanju_duanxintuisong"></i></Button>        
          </Tooltip>             
              </div>
      }    
    },];
    var state = this.state;
    return (
      <div className="block-panel">    
        <Table  columns={columns} rowKey={this.rowKey}
          onRowClick={this.onRowClick}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange} />
        <ReviewWin ref="ReviewWin" visible={state.visible} recordSoure={state.recordSoure} title={state.title} hideModal={me.hideModal} record={state.record}
          canEdit={state.canEdit} /> 
        <AddPerson ref="AddPerson" visible={state.personVisible} title={state.title} hideModal={me.hideModal} selectRecord={state.record}
          canEdit={state.canEdit}/>         
      </div>
        
    );
  }
})