import React from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
  message,
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
var confirm = Modal.confirm;
var CarInfo = React.createClass({ 
  getInitialState(nextProps) {
    return {
      status: {},
      formData: {},
    };
  },
  componentWillReceiveProps(nextProps){ 
    this.setState({
      id: nextProps.selectRecord.id,
      leftFontImg :nextProps.selectRecord.leftFontImg, 
      rightFontImg :nextProps.selectRecord.rightFontImg,
      leftBackImg :nextProps.selectRecord.leftBackImg,
      rightBackImg :nextProps.selectRecord.rightBackImg,
    })   
  },
  handleCancel() {
    this.props.form.resetFields();
    this.props.hideModal();
  },
 
  render() {
    const {
      getFieldProps
    } = this.props.form;
    var props = this.props;
    var state = this.state;
    var modalBtns = [
      <button key="back" className="ant-btn" onClick={this.handleCancel}>返 回</button>,

    ];  
    const formItemLayout = {
      labelCol: {
        span: 5 
      },
      wrapperCol: {
        span: 15
      },
    };
    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="900"  footer={modalBtns} >
          <Form horizontal  form={this.props.form}>           
            <Row>
              <Col span="12">
                <FormItem {...formItemLayout} label="车左前照片：">
                { this.state.leftFontImg ? <a href={this.state.leftFontImg} target="_blank"><img src={this.state.leftFontImg} onClick={this.magnifyImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" />}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="车右前照片：">
                { this.state.rightFontImg ? <a href={this.state.rightFontImg} target="_blank"><img src={this.state.rightFontImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" />}
                </FormItem>
              </Col>              
            </Row>      
            <Row>
              <Col span="12">
                <FormItem {...formItemLayout} label="车左后照片：">
                { this.state.leftBackImg ? <a href={this.state.leftBackImg} target="_blank"><img src={this.state.leftBackImg} onClick={this.magnifyImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" />}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="车右后照片：">
                { this.state.rightBackImg ? <a href={this.state.rightBackImg} target="_blank"><img src={this.state.rightBackImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" />}
                </FormItem>
              </Col>              
            </Row>                                  
          </Form>
      </Modal>
    );
  }
});
CarInfo = createForm()(CarInfo);
export default CarInfo;