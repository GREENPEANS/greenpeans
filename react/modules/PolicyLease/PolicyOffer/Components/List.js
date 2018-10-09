import React from 'react'
import {
  Table,
  Modal,
  Button,
  Tooltip
} from 'antd';
import AddPerson from './AddPerson';
import CarInfo from './CarInfo';
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
   // this.clearSelectedList();
    this.fetch(nextProps.params);
  },
  hideModal() {
    this.setState({
      visible: false,
      visibleaw: false,
      personVisible:false
    });
  },
  //新增跟编辑弹窗
  showModal(title, record, canEdit,orderNo) {
    var record = record;
    this.setState({
      canEdit: canEdit,
      visible: true,
      title: title,
      record: record,
    }, () => {     
     // this.refs.ReviewWin.refs.Tab1.setFieldsValue(record);
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
      title: '用户姓名',
      dataIndex: 'userName',
    },{
      title: '用户手机号',
      dataIndex: 'phone',
    },{
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
          return <span className="nbtn wrz">待审核</span>
        }else if (record.status == "1"){
          return <span className="nbtn normal">审核通过</span>
        }else if(record,status == "3"){
          return <span className="nbtn blacklist">未通过</span>
        }else{
          return "-"
        }
      }
    },{
      title: '申请时间',
      dataIndex: "createTime",
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
                <Button  className="zibtntwo" onClick={me.showAssignModal.bind(me, '报价',record, false)}><i className="icon iconfont icon-wogoumaidexinxi"></i></Button>        
              </Tooltip><span className="ant-divider"></span></a>  )  
            : 
            (<a href="javascript:;"></a>)
          }
          <Tooltip placement="bottomLeft" title="查看车样" >
            <Button  className="audit" onClick={me.showModal.bind(me, '查看车样',record, false)}><i className="icon iconfont icon-cheliang"></i></Button>        
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
        <AddPerson ref="AddPerson" visible={state.personVisible} title={state.title} hideModal={me.hideModal} selectRecord={state.record}
          canEdit={state.canEdit}/> 
        <CarInfo ref="CarInfo" visible={state.visible} title={state.title} hideModal={me.hideModal} selectRecord={state.record}
          canEdit={state.canEdit}/>  
      </div>
        
    );
  }
})