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
  
  //新增姓名编辑弹窗
  updateName(title, record, canEdit) {
      this.setState({
          canEdit: canEdit,
          visibleaw: true,
          title: title,
          record: record
      });
  },
  //打开分配弹窗
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
      url: '/modules/manage/policy/page.htm',
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
      title: "您是否同意回租打款"+record.merPayAmount+"元？",
      onOk: function () {
        Utils.ajaxData({
          url: "/modules/manage/hzorder/merPayMoney.htm",
          data: {
            userId: record.userId,
            orderNo: record.orderNo,
          },
          method: 'post',
          callback: (result) => {
            if (result.code == 200) {
              Modal.success({
                title: "回租打款已成功",
              });
            }else{
              Modal.error({
                title: result.msg,
              });
            }

            me.refreshList();
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
    var columns = [ {
        title: '用户名',
        dataIndex: "userName",
    },{
        title:'保单编号',
        dataIndex:"policyNumber",
    }, {
        title: '手机号',
        dataIndex: "phone",
    }, {
      title: '保险公司',
      dataIndex: "insuranceCompany",
    } , {
      title: '审核状态',
      dataIndex: 'policyStatus',
      render: (text, record)=>{ 
        if(record.policyStatus==0){
          return <span className="nbtn wrz">审核中</span>
        }else if (record.policyStatus==1) {
          return <span className="nbtn HZbtn">通过</span>
        }else if (record.policyStatus==2) {
          return <span className="nbtn wrz">未通过</span>
        }else{
            return "-"
        }
      }
    }, {
      title: '保单图片',
      dataIndex: 'insuranceImg',
      render:(text,record) =>{
        return <a href={text} target="_blank"><img src={text} style={{width:50}} alt=""/></a>
      }
    },{
        title: '创建时间',
        dataIndex: "createTime",      
    },{
      title: '保单额度',
      dataIndex: 'policyLimit',   
    },{
      title: '险种',
      dataIndex: 'insuranceType',
    }, {
      title: '保单到期时间',
      dataIndex: "policyTerm",
    }, {
      title: '操作',
      render: (text, record,orderNo) => {
        return <div>   
           {record.policyStatus == "0"  ? 
            (<a href="javascript:;">
            <Tooltip placement="bottomLeft" title="授额" >
              <Button  className="zibtnone" onClick={me.showAssignModal.bind(me, '授额',record, false)}><i className="icon iconfont icon-icon4"></i></Button>        
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