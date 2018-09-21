import React from 'react';
import {
  Table,
  Modal,
  Button,
  Tooltip
} from 'antd';
const objectAssign = require('object-assign');
const confirm = Modal.confirm;
var Tab2 = React.createClass({
  getInitialState() {
    return {
      loading: false,
      data: [],
      pagination: {},
      dataRecord:"",
      record:"",
      canEdit: true,
      visible: false,
      visibleaw: false,
      recordSoure: null,
    };
  },
  rowKey(record) {
    return record.id;
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.activeKey == '2'){  
      this.fetch();
    }
  },
  // 分页
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    pager.orderNo = this.props.record.orderNo,
    this.setState({
      pagination: pager,
    });
    this.fetch(pager);
  },
  // 请求
  fetch(params = {}) {
    console.log(this.props.record.orderNo);
    this.setState({
      loading: true
    });
    if (!params.pageSize) {
      var params = {};
      params = {
        pageSize: 6,
        current: 1,
        orderNo: this.props.record.orderNo,
      }
    }
    Utils.ajaxData({
      url: '/modules/manage/rzorder/pagetarge.htm',
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
  componentDidMount() {
    this.fetch();
  },
  onRowClick(record) {
    this.setState({
      selectedRowKeys: [record.id],
      selectedrecord: record
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
  manualPayments(title, record) {
    
    let me = this;
    let tips = "您是否同意扣款?"
    confirm({
      title: title,
      content: tips,
      onOk() {
        Utils.ajaxData({
          url: "/modules/manage/yeepay/optionYeepay.htm",
          data: {
            userId : record.userId,
            orderPayWay: 2,
            issms : false,
            stageType : 1,
            orderNo: record.orderNo,
            amount: record.moneyMonthPay,
            stageNumber : record.stageNumber
          },
          method: 'post',
          callback: (result) => {
            if (result.code == 200) {
              Modal.success({
                title: result.msg,
              });
              this.setState({
                loading: true
              });
            } else {
              Modal.error({
                title: result.msg,
              });
            }
            this.setState({
              loading: true
            });
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
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
    var columns = [{
      title: '订单号',
      dataIndex: "orderNo",
    }, {
      title: '付租期数',
      dataIndex: "stageCounts",
    }, {
      title: '第几期',
      dataIndex: "stageNumber",
    }, {
      title: '租金总金额',
      dataIndex: "stageTotalCharge",
    }, {
      title: '每期利息',
      dataIndex: "stageCurrentCharge",
    }, {
      title: '期供',
      dataIndex: "monthAmount",
    }, {
      title: '本金',
      dataIndex: "loanAmount",
    }, {
      title: '优惠券使用',
      dataIndex: "coupon",
    }, {
      title: '支付状态',
      dataIndex: "payStatus",
      render: (text, record)=>{
        if(record.payStatus==0){
          return "未支付"
        }else if(record.payStatus==1){
          return "已支付"
        }else if(record.payStatus==2){
          return "支付中"
        }else if(record,payStatus == 3){
          return "支付失败"
        }else{

          return "-"
        }
      }
    }, {
      title: '还款日期',
      dataIndex: "payEndTime",
      render:(text,record) =>{
        if(text == null || text == ""){
          return "未还款";
        }else{
          return text; 
        }
      }
    }, {
      title: '是否逾期',
      dataIndex: "isOverdue",
      render: (text, record)=>{
        if(record.isOverdue==0){
          return "否"
        }else if(record.isOverdue==1){
          return "是"
        }else{
          return "-"
        }
      }
    }, {
      title: '逾期天数(天)',
      dataIndex: "overdueDay",
    }, {
      title: '逾期金额(元)',
      dataIndex: "overdueAmount",
    }, {
      title: '还款状态',
      dataIndex: "payType",
      render: (text, record)=>{
        if(record.payType ==0){
          return "正常还款"
        }else if(record.payType==1){
          return "提前还款"
        }else if(record.payType==2){
          return "本期作废"
        }else{
          return "-"
        }
      }
    }, {
      title: '操作',
      render: (text, record,id) => {
        return <div>
          {record.stagePaymentStatus==2 ? (<a href="javascript:;"><Tooltip placement="bottomLeft" title="手动扣款" >
            <Button className="zibtnone"  onClick={me.manualPayments.bind(me, '手动扣款',record, true)}><i className="icon iconfont icon-woyaohuankuan"></i></Button>        
          </Tooltip></a>) :("-")}  
          <span className="ant-divider"></span>
                                  
        </div>
      }    
    }];
    return (<div className="block-panel">          
              <Table columns={columns} rowKey={this.rowKey}  
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}  />
          </div>
    );
  }
});
export default Tab2;