import React from 'react';
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const objectAssign = require('object-assign');
const userbaseTit = {
  color: '#2db7f5',
  textAlign: 'center',
  fontSize: '14px',
  marginBottom: '10px',
  display: 'block',
  width: '150px',
}
var Tab1 = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.recordSoure){
      this.setState({
        recordSoure: nextProps.recordSoure
      })
    }
  },
  
  render() {
    var props = this.props;
    var state = this.state;
    const {
        getFieldProps
    } = this.props.form;
    const formItemLayout = {
            labelCol: {
                span: 9
            },
            wrapperCol: {
                span: 14
            },
        };

    return (
          <Form horizontal form={this.props.form} style={{marginTop:'20'}}>
            <div className="navLine-wrap-left">
              <h2>银行卡认证状态显示</h2>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="开户姓名：">
                    <Input {...getFieldProps('bankUserName', { initialValue: '' }) } disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="银行卡号：">
                    <Input {...getFieldProps('bankCardNo', { initialValue: '' }) } disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="所属行名称：">
                    <Input {...getFieldProps('bankName', { initialValue: '' }) } disabled />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="所属银行代码">
                    <Input {...getFieldProps('bankCode', { initialValue: '' }) } disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="开户时间">
                    <Input {...getFieldProps('createTime', { initialValue: '' }) } disabled />
                  </FormItem>
                </Col>
              </Row>                           
            </div>
          </Form>
    );
  }
});
Tab1 = createForm()(Tab1);
export default Tab1;