import React from 'react'
import {
  Table,
  Modal,
  Button,
  Tooltip
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
      visibleaw: false,
      recordSoure: null,
      dataRecord:"",
      record:"",
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
    });
   //this.refreshList();
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
    });
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
    //this.refreshList();
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
      url: '/modules/manage/overdue/page.htm',
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
  payMent(title, record) {
    let me = this;
    confirm({
      title: "是否确定进行支付",
      onOk: function () {
      },
      onCancel: function () { }
    });
  },
  render() {
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
    },{
      title: '用户名',
      dataIndex: "userName",
    }, {
        title: '手机号',
        dataIndex: "phone",
    }, {
      title: '订单状态',
      dataIndex: 'orderStatus',
      render: (text, record)=>{ 
        if(record.orderStatus==0){
          return <span className="nbtn wrz">待支付</span>
        }else if (record.orderStatus==1) {
          return <span className="nbtn HZbtn">已支付</span>
        }else if (record.orderStatus==2) {
          return <span className="nbtn wrz">还款中</span>
        }else if (record.orderStatus==3) {
          return <span className="nbtn blacklist">支付失败</span>
        }else if (record.orderStatus==4) {
          return <span className="nbtn HZbtn">保单受理</span>
        }else if (record.orderStatus== 7) {
          return <span className="nbtn TBbtn">退保已处理</span>
        }else{
            return "-"
        }
      }
    }, {
      title: '付租期数',
      dataIndex: 'loanTerm',
      render: (text,record) =>{
        return record.loanTerm + '个月';
      }
    },{
      title: '总额(含手续费和利息)元',
      dataIndex: 'totalAmount',
    },{
        title: '已还款(元)',
        dataIndex: 'hasPayAmount',
    },{
      title: '未还款(元)',
      dataIndex: 'noPayAmount',
    },{
      title: '还款日期',
      dataIndex: "payEndTime",
    },{
      title: '应还款日期',
      dataIndex: "payShouldRepayTime",
    },{
      title: '逾期状态',
      dataIndex: "isOverdue",
      render:(text,record) =>{
        if(record.isOverdue == 1){
          return <span className="nbtn blacklist">逾期</span>
        }else if (record.isOverdue == 0){
          return <span className="nbtn normal">未逾期</span>
        }else{
          return "-";
        }
      }
    },{
      title: '逾期天数(天)',
      dataIndex: "overdueDay",
      render:(text,record) =>{
        return record.overdueDay + '天';  
      }
    },{
      title: '逾期金额(元)',
      dataIndex: "overdueAmount",
    }
    //  {
    //   title: '操作',
    //   render: (text, record,orderNo) => {
    //     return <div>
    //       <Tooltip placement="bottomLeft" title="查看详情" >
    //         <Button className="particulars" onClick={me.showModal.bind(me, '查看详情', record, true,orderNo)}><i className="icon iconfont icon-icon-chakanxq"></i></Button>        
    //       </Tooltip>  
    //     </div>
    //   }    
    // },
  ];
    var state = this.state;
    return (
      <div className="block-panel">
        <Table columns={columns} rowKey={this.rowKey}
          onRowClick={this.onRowClick}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange} />
      </div>
        
    );
  }
})