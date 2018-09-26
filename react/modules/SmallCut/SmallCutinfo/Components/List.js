import React from 'react'
import {
  Table,
  Modal,
  Button,
  Tooltip
} from 'antd';
import Ticket from './Ticket';
import AddPerson from './AddPerson';
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
    })
  },
  rowKey(record) {
    return record.id;
  },
  //打开分配弹窗
  showAssignModal(title,record,canEdit) {
    this.setState({
      personVisible: true,
      title: title,
      record: record,
      canEdit:canEdit
    });
    //console.log(canEdit)
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
      url: '/modules/manage/activityrub/page.htm',
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
      dataIndex: 'hzOrder',
    }, {
        title: '用户名',
        dataIndex: "userName",
    }, {
        title: '理赔照片',
        dataIndex: "imgUrl1",
        render: (text,record) =>{
          return(
            <img src={record.imgUrl1} alt={record.imgUrl1} width="50"/>
          )
          
        }
    }, {
      title: '发放时间',
      dataIndex: "CouponCreateTime",
    } , {
      title: '审核状态',
      dataIndex: 'status',
      render: (text, record)=>{ 
        if (record.status == 0){
          return <span className="nbtn wrz">待审核</span>
        }else if (record.status == 1){
          return <span className="nbtn normal">审核通过</span>
        }else if(record.status == 2){
          return <span className="nbtn blacklist">审核不通过</span>
        }else{
          return "-"
        }
       
      }
    },{
      title: '发券状态',
      dataIndex: "isSend",
      render: (text,record) =>{
        if(record.isSend == "1"){
          return <span className="nbtn normal">已发券</span>
        }else if(record.isSend == "0"){
          return <span className="nbtn wrz">未发券</span>
        }else{
          return "-"
        }
      }
    },{
      title: '操作',
      render: (text, record,orderNo) => {
        return <div>
          {record.status == "0"  ? 
            (<a href="javascript:;">
            <Tooltip placement="bottomLeft" title="审核" >
              <Button  className="audit" onClick={me.showAssignModal.bind(me, '审核',record, false)}><i className="icon iconfont icon-audit"></i></Button>        
            </Tooltip><span className="ant-divider"></span></a>  )  
            : 
            (<a href="javascript:;"></a>)
          }
          {record.isSend == "0" || record.status == "0"?
            (<a href="javascript:;"><Tooltip placement="bottomLeft" title="发放券" >
              <Button className="zibtnone" onClick={me.showModal.bind(me, '发放券', record, false,orderNo)}><i className="icon iconfont icon-wodeyouhuiquan1"></i></Button>        
            </Tooltip></a>)
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
        <Ticket ref="Ticket" visible={state.visible} recordSoure={state.recordSoure} title={state.title} hideModal={me.hideModal} record={state.record}
          canEdit={state.canEdit}/>  
      </div>
        
    );
  }
})