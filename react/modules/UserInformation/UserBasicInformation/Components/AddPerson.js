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
  Upload,
  Icon
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const objectAssign = require('object-assign');

var AddUserWin = React.createClass({
  
  getInitialState(nextProps) {
    return {
      status: {},
      formData: {},
      imgPath: ''
    };
  },
  componentWillReceiveProps(nextProps){  
    this.setState({
      id: nextProps.selectRecord.id,
    })   
  },
  handleCancel() {
    this.props.form.resetFields();
    this.props.hideModal();
  
  },
  handleOk(e) {
   // e.preventDefault();
    let me = this;
    let props = me.props;
    let userId = this.state.id;
    let url = "/user/pushMessageToSingle.htm";
    let params = this.props.form.getFieldsValue(); 
    console.log(params)
    params["userId"] = userId;
    let data = params
    Utils.ajaxData({
      url: url,
      data: data,
      callback: (result) => {
        if (result.code == 200) {
          Modal.success({
            title: result.msg,
            onOk: () => {
              this.setState({
                deviceImg:''
              })
              me.handleCancel();
            }
          });
        } else {
          Modal.error({
            title: result.msg,
          });
        }
      }
    });
  },
  render() {
    const {
      getFieldProps
    } = this.props.form;
    var props = this.props;
    var state = this.state;
    var modalBtns = [
      <button key="back" className="ant-btn" onClick={this.handleCancel}>返 回</button>,
      <button key="button" className="ant-btn ant-btn-primary"  onClick={this.handleOk}>
          提 交
      </button>
    ];
   
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 15
      },
    };
 
    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="900"  footer={modalBtns} >
          <Form horizontal  form={this.props.form}>      
                <Row>      
                    <Col span="16">
                    <FormItem {...formItemLayout} label="推送标题：">
                        <Input {...getFieldProps('title', { initialValue: '' }) } />
                    </FormItem>
                    </Col>
                </Row>

                <Row>      
                    <Col span="16">
                    <FormItem {...formItemLayout} label="推送内容：">
                        <Input type="textarea" {...getFieldProps('titleContent', { initialValue: '' }) } disabled={props.canEdit} />
                    </FormItem>
                    </Col>
                </Row>

                <Row>      
                    <Col span="16">
                    <FormItem {...formItemLayout} label="内容：">
                        <Input type="textarea" {...getFieldProps('content', { initialValue: '' }) } disabled={props.canEdit} style = {{height : 200}}/>
                    </FormItem>
                    </Col>
                </Row>
          </Form>
      </Modal>
    );
  }
});
AddUserWin = createForm()(AddUserWin);
export default AddUserWin;