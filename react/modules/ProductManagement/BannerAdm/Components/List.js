import React from 'react'
import {
  Table,
  Modal,
  Tooltip,
  Button
} from 'antd';
import AddUserWin from './AddUserWin'
import Reset from './Reset'
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
      Utils.ajaxData({
        url: '/modules/manage/banner/bannerDetail.htm',
        data: {
            id: record.id
        },
        callback: (result) => {
          if (result.code == 200) {
            var dataForm = {};
            var update = update;
            console.log(result)
            let imgType = result.data.imgType.toString();
            let imgDisplay = result.data.imgDisplay.toString();
            dataForm.id = result.data.id;
            dataForm.imgType = imgType;
            dataForm.imgPath = result.data.imgPath;
            dataForm.imgDisplay = imgDisplay;
            dataForm.imgUrl = result.data.imgUrl;
            dataForm.imgCreateTime = result.data.imgCreateTime;           
            
            this.refs.AddUserWin.setFieldsValue(dataForm);
            this.setState({
              recordSoure: result.data,
              dataForm:dataForm,
              id: record.id
            })
          }
        }
      });
      
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
      url: '/modules/manage/banner/bannerList.htm',
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
  onSelectAll(selected, selectedRows, changeRows) {
    //console.log(selectedRows);
    var selectedRowKeys = this.state.selectedRowKeys;
    if (selected) {
      for (var i = 0; i < selectedRows.length; i++) {
        selectedRowKeys.push(selectedRows[i].id);
      }
    } else {
      selectedRowKeys = [];
    }
    //console.log(selectedRowKeys);
    this.setState({
      selectedRows: selectedRows,
      selectedRowKeys: selectedRowKeys,
    })
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
    const {
      loading,
      selectedRowKeys
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onSelectAll: me.onSelectAll,
    }; 
    const hasSelected = selectedRowKeys.length > 0;
    var columns = [{
      title: '应用场景',
      dataIndex: 'imgType',
      render: (text, record) =>{
        if(record.imgType == 1){
          return "APP"
        }else{
          return "-"
        }
      }
    }, {
      title: '图片路径',
      dataIndex: "imgPath",
      render: (text,record) =>{
        return(
          <img src={record.imgPath} alt={record.imgPath} width="50"/>
        )
        
      }
    }, {
      title: '图片标题',
      dataIndex: "imgTitle",
    }, {
      title: '图片显示状态',
      dataIndex: 'imgDisplay',
      render: (text,record) =>{
        if (record.imgDisplay == "1"){
         return "是"
        }else if (record.imgDisplay == "0"){
         return "否"
        }else{
         return "-"
        }
      }
    }, {
      title: '图片链接地址',
      dataIndex: "imgUrl"
    }, {
      title: '操作',
      dataIndex: "",
      render(text, record) {
        return <div style={{textAlign: "left"}}>
        <Tooltip placement="bottomLeft" title="编辑" >
          <Button className="audit"  onClick={me.showModal.bind(me,'编辑',record,false)}><i className="icon iconfont icon-wendangxiugai"></i></Button>
        </Tooltip>  
              
        </div>
      }
    }];
    var state = this.state;
    return (
      <div className="block-panel">
           <div className="actionBtns" style={{ marginBottom: 16 }}>
              <Tooltip placement="bottomLeft" title="新增" > 
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