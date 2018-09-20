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
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="订单号：">
                    <Input {...getFieldProps('orderNo', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="手机号：">
                    <Input {...getFieldProps('phone', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
        
              </Row>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="用户名：">
                    <Input {...getFieldProps('orderNo', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="订单状态：">
                    <Input {...getFieldProps('userName', { initialValue: '' }) } disabled={props.canEdit} />
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