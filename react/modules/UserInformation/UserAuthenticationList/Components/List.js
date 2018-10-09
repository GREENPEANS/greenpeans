import React from 'react'
import ReviewWin from './ReviewWin';
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
      selectedRowKeys: [], // 这里配置默认勾选列
      loading: false,
      data: [],
      pagination: {},
      canEdit: true,
      visible: false,
      visibleAdd:false,
      recordSoure: null,
      dataRecord:"",
      record:"",
    };
  },
  componentWillReceiveProps(nextProps, nextState) {
    //this.clearSelectedList();
    this.fetch(nextProps.params);
  },
//新增跟编辑弹窗
  showModal(title, record, canEdit) {
    var record = record;
    this.setState({
      canEdit: canEdit,
      visible: true,
      title: title,
      record: record,
    }, () => {
      Utils.ajaxData({
        url: '/user/auth/getUserBankInfo.htm',      
        data: {
          userId: record.id
        },
        callback: (result) => {
          if (result.code == 200) {
            console.log(result.data)
            if(result.data.bankInfo != null){
              var dataForm = {};
              dataForm.bankCardNo = result.data.bankInfo.bankCardNo;
              dataForm.bankCode = result.data.bankInfo.bankCode;
              dataForm.bankName = result.data.bankInfo.bankName;
              dataForm.createTime = result.data.bankInfo.createTime;
              dataForm.bankUserName = result.data.bankInfo.bankUserName;
             
              this.refs.ReviewWin.refs.Tab1.setFieldsValue(dataForm);
            }
           
            this.setState({
              recordSoure: result.data.bankInfo
            })
          }else if(result.code == 400){
            var dataForm = {};          
            this.refs.ReviewWin.refs.Tab1.setFieldsValue(dataForm);
            this.setState({
              recordSoure: result.data
            })
          }
        }
      })
    });
  },
  hideModal() {
    this.setState({
      visible: false,
      visibleAdd:false
    });
    this.refreshList();
  },
  rowKey(record) {
    return record.id;
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
      url: '/user/auth/getUserAuthStatus.htm',
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
      title: '用户名',
      dataIndex: 'userRealName',
    }, {
      title: '手机号码',
      dataIndex: "loginName",
    }, {
      title: '身份认证状态',
      dataIndex: 'idStatus',
      render: (text, record)=>{
        if(record.idStatus==10){
          return <span className="nbtn blacklist">未认证</span>
        }else if(record.idStatus==20){
          return <span className="nbtn wrz">认证中</span>
        }else if(record.idStatus==30){
          return <span className="nbtn normal">已认证</span>
        }else{
          return "-"
        }
      }
    }, {
      title: '行驶证认证状态',
      dataIndex: 'driverStatus',
      render: (text, record)=>{
        if(record.idStatus==10){
          return <span className="nbtn blacklist">未完善</span>
        }else if(record.idStatus==20){
          return <span className="nbtn wrz">完善中</span>
        }else if(record.idStatus==30){
          return <span className="nbtn normal">已完善</span>
        }else{
          return "-"
        }
      }
    }, {
      title: '银行卡认证状态',
      dataIndex: "cardStatus",
      render: (text, record)=>{
        if(record.idStatus==10){
          return <span className="nbtn blacklist">未认证</span>
        }else if(record.idStatus==20){
          return <span className="nbtn wrz">认证中</span>
        }else if(record.idStatus==30){
          return <span className="nbtn normal">已认证</span>
        }else{
          return "-"
        }
      }
    }, {
      title: '保单认证状态',
      dataIndex: "policyStatus",
      render: (text, record)=>{
        if(record.idStatus==10){
          return <span className="nbtn blacklist">未认证</span>
        }else if(record.idStatus==20){
          return <span className="nbtn wrz">认证中</span>
        }else if(record.idStatus==30){
          return <span className="nbtn normal">已认证</span>
        }else{
          return "-"
        }
      }
    }, {
      title: '保单邮递认证状态',
      dataIndex: "policyMailStatus",
      render: (text, record)=>{
        if(record.idStatus==10){
          return <span className="nbtn blacklist">未认证</span>
        }else if(record.idStatus==20){
          return <span className="nbtn wrz">认证中</span>
        }else if(record.idStatus==30){
          return <span className="nbtn normal">已认证</span>
        }else{
          return "-"
        }
      }
    }, {
      title: '车险认证状态',
      dataIndex: 'insuranceStatus',
      render: (text, record)=>{
        if(record.idStatus==10){
          return <span className="nbtn blacklist">未认证</span>
        }else if(record.idStatus==20){
          return <span className="nbtn wrz">认证中</span>
        }else if(record.idStatus==30){
          return <span className="nbtn normal">已认证</span>
        }else{
          return "-"
        }
      }
    }, {
      title: '邮箱认证状态',
      dataIndex: 'emailStatus',
      render: (text, record)=>{
        if(record.emailStatus==10){
          return <span className="nbtn blacklist">未认证</span>
        }else if(record.emailStatus==20){
          return <span className="nbtn wrz">认证中</span>
        }else if(record.emailStatus==30){
          return <span className="nbtn normal">已认证</span>
        }else{
          return "-"
        }
      }
    }, {
      title: '用户注册时间',
      dataIndex: 'registTime',
    }, {
      title: '操作',
      dataIndex: "",
      render: (value, record) => {
          return (
              <div style={{ textAlign: "left" }}>
                  <Tooltip placement="bottomLeft" title="查看详情" >
                    <Button className="particulars"  onClick={me.showModal.bind(me, '查看详情', record, false)}><i className="icon iconfont icon-icon-chakanxq"></i></Button>
                  </Tooltip>                   
              </div>
          )
      }
    }];
    var state = this.state;
    return (
      <div className="block-panel">
           <Table columns={columns} rowKey={this.rowKey}  
             onRowClick={this.onRowClick}  
             dataSource={this.state.data}
             pagination={this.state.pagination}
             loading={this.state.loading}
             onChange={this.handleTableChange}  />
           <ReviewWin ref="ReviewWin" visible={state.visible} recordSoure={state.recordSoure} title={state.title} hideModal={me.hideModal} record={state.record}
           canEdit={state.canEdit} />          
      </div>
    );
  }
})