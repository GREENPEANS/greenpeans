import React from 'react'
import {
  Table,
  Modal,
  Tooltip,
  Button
} from 'antd';
import AddUserWin from './AddUserWin'
var confirm = Modal.confirm;
const objectAssign = require('object-assign');
export default React.createClass({
  getInitialState() {
    return {
      selectedRows: [],
      selectedRowKeys: [], // 这里配置默认勾选列
      loading: false,
      data: [],
      pagination: {
        pageSize: 10,
      },
      canEdit: true,
      visible: false,   
      visible1: false
    };
  },
  componentWillReceiveProps(nextProps, nextState) {
    this.clearSelectedList();
    this.fetch(nextProps.params);
  },
  hideModal() {
    this.setState({
      visible: false,
      visible1: false
    });
    this.refreshList();
  },
  //新增跟编辑弹窗
  showModal(title, record, canEdit) {
    var record = record;
    if (title == '编辑') {
      var record = record;
      if(record.type == 0){
          record.type = record.type.toString();          
      }
      this.refs.AddUserWin.setFieldsValue(record);
      
    } else if (title == '新增') {
      record = null
    }
    this.setState({
      canEdit: canEdit,
      visible: true,
      title: title,
      record: record
    });
  },
  rowKey(record) {
    return record.id;
  },

  //分页
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
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
        pageSize: this.state.pagination.pageSize,
        current: 1
      }
    }
    Utils.ajaxData({
      url: '/modules/manage/coupontype/page.htm',
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
      selectedRows: [],
      selectedRowKeys: [],
    });
  },
  refreshList() {
    var pagination = this.state.pagination;
    var params = objectAssign({}, this.props.params, {
      current: pagination.current,
      pageSize: pagination.pageSize
    });
    this.fetch(params);
  },
 
  componentDidMount() {
    this.fetch();
  },
  onRowClick(record) {
    var id = record.id;
    var selectedRows = this.state.selectedRows;
    var selectedRowKeys = this.state.selectedRowKeys;
    if (selectedRowKeys.indexOf(id) < 0) {
      selectedRowKeys.push(id);
      selectedRows.push(record);
    } else {
      selectedRowKeys.remove(id);
      selectedRows.remove(record);
    }
    //console.log(selectedRowKeys);
    this.setState({
      selectedRows: selectedRows,
      selectedRowKeys: selectedRowKeys,
    });
  },
  reset(title,record){
    this.setState({
      record:record,
      title:title,
      visible1: true
    })
  },
  render() {
    var me = this;
    var columns = [{
      title: '优惠券类型',
      dataIndex: 'type',
      render: (text, record) =>{
        if(record.type == 0){
          return "免租券"
        }else{
          return record.type
        }
      }
    }, {
      title: '优惠券名称',
      dataIndex: "name",
    }, {
      title: '面值（单位：%）',
      dataIndex: "value",
      render:(text,record) =>{
        return record.value +'%';
      }
    }, {
      title: '适用范围',
      dataIndex: 'remark',
    }, {
      title: '创建时间',
      dataIndex: "createTime"
    }, {
      title: '有效期(天)',
      dataIndex: "vaildTime"
    }, {
      title: '操作',
      dataIndex: "",
      render(text, record) {
        return <div style={{textAlign: "left"}}>
        <Tooltip placement="bottomLeft" title="编辑优惠券" >
          <Button className="audit"  onClick={me.showModal.bind(me,'编辑',record,false)}><i className="icon iconfont icon-wendangxiugai"></i></Button>
        </Tooltip>  
              
        </div>
      }
    }];
    var state = this.state;
    return (
      <div className="block-panel">
           <div className="actionBtns" style={{ marginBottom: 16 }}>
              <Tooltip placement="bottomLeft" title="新增活动" > 
                <Button onClick={this.showModal.bind(this,'新增',null,false)}><i className="icon iconfont icon-add"></i></Button>
              </Tooltip>           
           </div>
           <Table columns={columns} rowKey={this.rowKey}  size="middle" 
             onRowClick={this.onRowClick}
             dataSource={this.state.data}
             pagination={this.state.pagination}
             loading={this.state.loading}
             onChange={this.handleTableChange}  />
            <AddUserWin ref="AddUserWin"  visible={state.visible}    title={state.title} hideModal={me.hideModal} record={state.record}
             canEdit={state.canEdit}/> 
            
         </div>
    );
  }
})