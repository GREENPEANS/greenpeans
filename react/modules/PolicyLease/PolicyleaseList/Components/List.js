import React from 'react'
import {
  Table,
  Modal,
  Button,
  Tooltip
} from 'antd';
import ReviewWin from './ReviewWin';
import AddPerson from './AddPerson';
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
    this.setState({
      personVisible: true,
      title: title,
      record: record,
      canEdit:canEdit
    });
    Utils.ajaxData({
      url: '/modules/manage/rzorder/offer.htm',
      data: {
        'type':'',
        'orderNo': record.orderNo,
        'userId':record.userId,       
      },
      callback: (result) =>{
        
        if(result.code == 200){
          this.refs.AddPerson.setFieldsValue(result.data);
        }

        
      }
    })
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
    } , {
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
      title: '保险公司',
      dataIndex: 'company',
    }, {
      title: '是否报价',
      dataIndex: 'offerStatus',
      render: (text,record) =>{
        if (record.offerStatus == "0"){
          return "否"
        }else if (record.offerStatus == "1"){
          return "是"
        }else{
          return "-"
        }
      }
    },{
        title: '总额(含手续费和利息)元',
        dataIndex: "totalAmount",
    },{
      title: '优惠券使用',
      dataIndex: '11',
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
          {record.offerStatus == "0"  ? 
            (<a href="javascript:;">
              <Tooltip placement="bottomLeft" title="报价" >
                <Button  className="zibtntwo" onClick={me.showAssignModal.bind(me, '报价',record, false)}><i className="icon iconfont icon-audit"></i></Button>        
              </Tooltip><span className="ant-divider"></span></a>  )  
            : 
            (<a href="javascript:;"></a>)
          }

          
          <Tooltip placement="bottomLeft" title="查看详情" >
            <Button className="particulars" onClick={me.showModal.bind(me, '查看详情', record, true,orderNo)}><i className="icon iconfont icon-icon-chakanxq"></i></Button>        
          </Tooltip>  

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
        <AddPerson ref="AddPerson" visible={state.personVisible} title={state.title} hideModal={me.hideModal} selectRecord={state.record}
          canEdit={state.canEdit}/>  
      </div>
        
    );
  }
})