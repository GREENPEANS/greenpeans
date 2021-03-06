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
    this.refreshList();
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
      title: "您是否确认进行退保？",
      content:'退保操作只能执行一次，请您谨慎操作！！！',
      onOk: function () {
        Utils.ajaxData({
          url: "/modules/manage/hzoverdue/chargeback.htm",
          data: {
            type: 'detail',
            orderNo: record.orderNo,
          },
          method: 'post',
          callback: (result) => {
            if (result.code == 200) {
              Modal.success({
                title: result.msg,
              });
              me.refreshList();
            }else{
              Modal.error({
                title: result.msg,
              });
            }            
          }
        });
      },
      onCancel: function () { }
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
          return "待放款"
        }else if (record.orderStatus==1) {
          return "放款中"
        }else if (record.orderStatus==2) {
          return "待还款"
        }else if (record.orderState==3) {
          return "还款失败"
        }else if (record.orderState==4) {
          return "还款中"
        }else if (record.orderState==5) {
          return "还款成功"
        }else if (record.orderState==6) {
          return "还款失败"
        }else{
            return "-"
        }
      }
    }, {
      title: '付租期数(天)',
      dataIndex: 'loanTerm',
      // render: (text,record) =>{
      //   return record.loanTerm + '';
      // }
    },{
      title: '总额（含手续费和利息）',
      dataIndex: 'totalAmount',
      render:(text,record) =>{
        return record.totalAmount + '元';  
      }
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
        if(text == "0"){
          return "未逾期";
          
        }else if(text == "1"){
          return "逾期"
        }else{
          return '-'
        }

      }
    },{
      title: '逾期天数(天)',
      dataIndex: "overdueDay",
    },{
      title: '逾期金额(元)',
      dataIndex: "overdueAmount",
    },
     {
      title: '操作',
      render: (text, record,orderNo) => {
        return <div>
          {record.chargeBack == "1" ? (
            <Tooltip placement="bottomLeft" title="逾期退保" >
              <Button className="zise" onClick={me.payMent.bind(me, '逾期退保', record, true,orderNo)}><i className="icon iconfont icon-icon-chakanxq"></i></Button>        
            </Tooltip>  
          ):(
            <span className="ant-divider"></span>
          )}
          
        </div>
      }    
    },
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