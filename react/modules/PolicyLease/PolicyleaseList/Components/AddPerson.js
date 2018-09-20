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
var AddUserWin = React.createClass({ 
  getInitialState(nextProps) {
    return {
      status: {},
      formData: {},
    };
  },
  componentWillReceiveProps(nextProps){  
    this.setState({
      userId: nextProps.selectRecord.userId,
      orderNo: nextProps.selectRecord.orderNo,
    })   
  },
  handleCancel() {
    this.props.form.resetFields();
    this.props.hideModal();
    this.setState({
      deviceImg:''
    })
  },
  handleOk(e) {
    var userId = this.state.userId;
    var orderNo =  this.state.orderNo;
    var params = this.props.form.getFieldsValue().creditAmount;
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      confirm({
        title: "您的报价为"+params+"元，是否继续进行操作？",
        content:'为了避免您的损失，请您谨慎操作！！',
        onOk: function () {
          Utils.ajaxData({
            url: '/modules/manage/rzorder/offer.htm',
            data: {
              'type':'update',
              'orderNo':orderNo,
              'userId':userId,
              'qoate':params
            },
            callback: (result) => {
              if (result.code == 200) {
                Modal.success({
                  title: result.msg,
                  onOk: () => {            
                    this.handleCancel();
                  }
                });
              } else {
                Modal.error({
                  title: result.msg,
                });
              }
            }
          })
        },
        onCancel: function () { }
      })
      
    })     
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
        span: 9 
      },
      wrapperCol: {
        span: 15
      },
    };
    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="600"  footer={modalBtns} >
          <Form horizontal  form={this.props.form}>      
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="车牌号：">
                <Input {...getFieldProps('carNumber', { initialValue: '' }) } disabled />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="发动机号：">
                <Input {...getFieldProps('carEngineNumber', { initialValue: '' }) } disabled />
              </FormItem>
            </Col>           
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="车架号：">
                <Input {...getFieldProps('carSelfNumber', { initialValue: '' }) } disabled />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="保险公司：">
                <Input {...getFieldProps('11', { initialValue: '' }) } disabled />
              </FormItem>
            </Col>
          </Row>
          <Row>           
            <Col span="12">
              <FormItem {...formItemLayout} label="险种：">
                <Input {...getFieldProps('insuranceMain', { initialValue: '' }) } disabled />
              </FormItem>
            </Col>  
            <Col span="12">
              <FormItem {...formItemLayout} label="保险金额：">
                <Input {...getFieldProps('creditAmount',{ rules: [{required:true,message:'必填'}]}) } disabled={props.canEdit} />
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