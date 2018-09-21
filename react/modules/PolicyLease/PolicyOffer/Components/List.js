import React from 'react'
import {
  Table,
  Modal,
  Button,
  Tooltip
} from 'antd';
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
      url: '/modules/manage/rzapply/page.htm',
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
      title: '车牌号',
      dataIndex: 'carNumber',
    }, {
        title: '车架号',
        dataIndex: "carSelfNumber",
    }, {
        title: '发动机号',
        dataIndex: "carEngineNumber",
    }, {
      title: '主要保险',
      dataIndex: "insuranceMain",
    } , {
      title: '附加保险',
      dataIndex: 'insuranceAddition',
    }, {
      title: '授信额度',
      dataIndex: 'creditAmount',
    }, {
      title: '审核状态',
      dataIndex: 'status',
      render: (text,record) =>{
        if (record.status == "0"){
          return "待审核"
        }else if (record.status == "1"){
          return "审核通过"
        }else if(record,status == "3"){
          return "未通过"
        }else if(record,status == "4"){
          return "完成"
        }else{
          return "-"
        }
      }
    },{
        title: '审核时间',
        dataIndex: "checkTime",
    }, {
      title: '操作',
      render: (text, record,orderNo) => {
        return <div>
          {record.status == "0"  ? 
            (<a href="javascript:;">
              <Tooltip placement="bottomLeft" title="报价" >
                <Button  className="zibtntwo" onClick={me.showAssignModal.bind(me, '报价',record, false)}><i className="icon iconfont icon-audit"></i></Button>        
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
        <AddPerson ref="AddPerson" visible={state.personVisible} title={state.title} hideModal={me.hideModal} selectRecord={state.record}
          canEdit={state.canEdit}/>  
      </div>
        
    );
  }
})