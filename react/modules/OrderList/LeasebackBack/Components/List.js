import React from 'react'
import {
  Table,
  Modal,
  Button,
  Tooltip
} from 'antd';
import AddUserWin from './AddUserWin';
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
  rowKey(record) {
    return record.id;
  },
  
  //编辑详情
  showAssignModal(title,record,canEdit) {
    var me = this;
    this.setState({
      personVisible: true,
      title: title,
      record: record,
      canEdit:canEdit
    });
    if (record.status == 0){
        record.status="待处理"
    }else if (record.status == 1){
        record.status="已处理"
    }else if (record.status == 2){
        record.status="已拒绝"
    };
    this.refs.AddUserWin.setFieldsValue(record);
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
      url: '/modules/manage/billback/page.htm',
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
      selectedRowKeys
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
    };
    const hasSelected = selectedRowKeys.length > 0;
    var columns = [{
      title: '回租订单号',
      dataIndex: 'orderNo',
    }, {
        title: '用户名',
        dataIndex: "userName",
    }, {
        title: '手机号',
        dataIndex: "phone",
    },{
        title: '地址',
        dataIndex: "addressAetail",
    },{
      title: '申请时间',
      dataIndex: 'createTime',
    },{
      title: '物流公司',
      dataIndex: 'logisticsCompany',
    },{
      title: '物流订单号',
      dataIndex: 'logisticsId',
    },{
      title: '备注',
      dataIndex: 'remark',
    } ,{
        title: '处理状态',
        dataIndex: 'status',
        render: (text, record)=>{
          if (record.status == 1){
            return <span className="nbtn normal">已处理</span>
          }else if (record.status == 2){
            return <span className="nbtn blacklist">已拒绝</span>
          }else if (record.status == 3){
            return <span className="nbtn wrz">待处理</span>
          }else if (record.status == 4){
            return <span className="nbtn wrz">未回递</span>
          }else{
            return "-"
          }
        }
    }, {
      title: '操作',
      render: (text, record,orderNo) => {
        return <div>
          <Tooltip placement="bottomLeft" title="查看详情" >
            <Button className="particulars" onClick={me.showAssignModal.bind(me, '查看详情', record, true,orderNo)}><i className="icon iconfont icon-icon-chakanxq"></i></Button>        
          </Tooltip>  
                 

          
          {record.status == 0  ? 
          (<a href="javascript:;">
          <span className="ant-divider"></span> 
          <Tooltip placement="bottomLeft" title="编辑详情" >
            <Button  className="audit" onClick={me.showAssignModal.bind(me, '操作',record, false)}><i className="icon iconfont icon-audit"></i></Button>        
          </Tooltip></a>  )  
          : 
          (<a href="javascript:;"></a>)
          }

        </div>
      }    
    },];
    var state = this.state;
    return (
      <div className="block-panel">
        <Table columns={columns} rowKey={this.rowKey}
          onRowClick={this.onRowClick}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange} />
         <AddUserWin ref="AddUserWin" visible={state.personVisible} title={state.title} hideModal={me.hideModal} selectRecord={state.record}
          canEdit={state.canEdit}/> 
       
      </div>
        
    );
  }
})