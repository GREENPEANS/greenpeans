import React from 'react'
import {
  Table,
  Modal,
  Button,
  Tooltip
} from 'antd';
import ReviewWin from './ReviewWin';
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
      if(record.orderStatus==0){
         record.orderStatus="待放款"
      }else if (record.orderStatus==1) {
         record.orderStatus="放款中"
      }else if (record.orderStatus==2) {
         record.orderStatus="待还款"
      }else if (record.orderState==3) {
         record.orderStatus="还款失败"
      }else if (record.orderState==4) {
         record.orderStatus="还款中"
      }else if (record.orderState==5) {
         record.orderStatus="还款成功"
      }else if (record.orderState==6) {
         record.orderStatus="还款失败"
      }else{
           record.orderStatus="-"
      }
      this.refs.ReviewWin.refs.Tab1.setFieldsValue(record);
      this.setState({
        recordSoure: record
      })
    });
  },
  rowKey(record) {
    return record.id;
  },

  //报价
  showAssignModal(title,record,canEdit) {
    let me = this;
    confirm({
      title: '您确定是否生成分期记录？',
      content:'请您谨慎操作，此操作只能执行一次！！！！',
      onOk: function() {
        Utils.ajaxData({
          url: '/modules/manage/rzorder/createstage.htm',
          data: {
            'type':'pass',
            'id':record.id,       
          },
          callback: (result) =>{
            if (result.code == 200) {
              Modal.success({
                title: result.msg,
              });
              me.refreshList();
            } else {
              Modal.error({
                title: result.msg,
              });
            }
          }
        })
      },
      onCancel: function() { 
        
      }});
   
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
      url: '/modules/manage/rzorder/page.htm',
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
      title: '订单号',
      dataIndex: 'orderNo',
    }, {
        title: '用户名',
        dataIndex: "userName",
    }, {
        title: '手机号',
        dataIndex: "phone",
    }, {
      title: '合同',
      dataIndex: "loginName",
      render: (text,record) =>{
        return <a href="#" className="heZTo">查看合同</a>
      }
    } , {
      title: '订单状态',
      dataIndex: 'orderStatus',
      render: (text, record)=>{ 
        if(record.orderStatus==0){
          return <span className="nbtn wrz">待放款</span>
        }else if (record.orderStatus==1) {
          return <span className="nbtn HZbtn">放款中</span>
        }else if (record.orderStatus==2) {
          return <span className="nbtn wrz">待还款</span>
        }else if (record.orderStatus==3) {
          return <span className="nbtn blacklist">还款失败</span>
        }else if (record.orderStatus==4) {
          return <span className="nbtn HZbtn">还款中</span>
        }else if (record.orderStatus== 7) {
          return <span className="nbtn TBbtn">逾期退保</span>
        }else{
            return "-"
        }
      }
    }, {
      title: '保险公司',
      dataIndex: 'company',
    }, {
      title: '是否报价',
      dataIndex: 'offerStatus',
      render: (text,record) =>{
        if (record.offerStatus == "0"){
          return <span className="nbtn blacklist">否</span>
        }else if (record.offerStatus == "1"){
          return <span className="nbtn normal">是</span>
        }else{
          return "-"
        }
      }
    },{
        title: '总额(含手续费和利息)元',
        dataIndex: "totalAmount",
    },{
      title: '已还款金额(元)',
      dataIndex: 'hasPayAmount',
    },{
      title: '未还款金额(元)',
      dataIndex: 'noPayAmount',
    } ,{
        title: '报价(元)',  
        dataIndex: 'creditAmount',
    },{
      title: '申请日期',
      dataIndex: "applyTime",
    }, {
      title: '操作',
      render: (text, record,orderNo) => {
        return <div>
          
          <Tooltip placement="bottomLeft" title="查看详情" >
            <Button className="particulars" onClick={me.showModal.bind(me, '查看详情', record, true,orderNo)}><i className="icon iconfont icon-icon-chakanxq"></i></Button>        
          </Tooltip>  

          {record.orderStatus == "0"  ? 
            (<a href="javascript:;">
            <span className="ant-divider"></span>
              <Tooltip placement="bottomLeft" title="分期审核" >
                <Button  className="zibtntwo" onClick={me.showAssignModal.bind(me, '分期审核',record, false)}><i className="icon iconfont icon-audit"></i></Button>        
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
        <ReviewWin ref="ReviewWin" visible={state.visible} recordSoure={state.recordSoure} title={state.title} hideModal={me.hideModal} record={state.record}
          canEdit={state.canEdit} />
      </div>
        
    );
  }
})