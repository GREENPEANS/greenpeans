import React from 'react';
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Tabs,
} from 'antd';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const objectAssign = require('object-assign');
var ReviewWin = React.createClass({
  getInitialState() {
    return {
      activekey: "1",
    };
  },
  handleCancel() {
    this.refs.Tab1.resetFields();
    this.props.hideModal();
    this.changeTabState()
  },

  changeTabState() {
      this.setState({
          activekey: 1,
      })
  },
  handleTabClick(key) {
      this.setState({
          activekey: key
      })
  },
  
  render() {
    var props = this.props;
    var modalBtns  = [
            <button key="back" className="ant-btn" onClick={this.handleCancel}>关 闭</button>
            ];
    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="1200" footer={modalBtns} >
                <Tabs defaultActiveKey="1" onTabClick={this.handleTabClick} activeKey={this.state.activekey}>
                    <TabPane tab="基本信息" key="1">
                        <Tab1 record={props.record} ref="Tab1" canEdit={props.canEdit}  recordSoure={props.recordSoure} />
                    </TabPane>
                    <TabPane tab="分期详情" key="2">
                        <Tab2 record={props.record} ref="Tab2" canEdit={props.canEdit} activeKey={this.state.activekey}/>
                    </TabPane>
                </Tabs>
            </Modal>
    );
  }
});
export default ReviewWin;