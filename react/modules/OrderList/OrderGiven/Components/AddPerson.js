import React from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Col,
  DatePicker
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
var confirm = Modal.confirm;
var AddUserWin = React.createClass({ 
  getInitialState(nextProps) {
    return {
      status: {},
      formData: {},
    };
  },
  componentWillReceiveProps(nextProps){  
    //console.log(nextProps)
    this.setState({
      userId: nextProps.selectRecord.userId,
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
    let me = this;
    var userId = this.state.userId;
    var quota = this.props.form.getFieldsValue().quota;
    var params = this.props.form.getFieldsValue();
    params.expireTime = (DateFormat.formatDate(params.expireTime));
    params.startTime = (DateFormat.formatDate(params.startTime));
    params['userId']=userId;
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      confirm({
        title: "您确定操作给该用户授予"+quota+"元的额度？",
        content:'',
        onOk: function () {
          Utils.ajaxData({
            url: '/modules/manage/hzorder/quota.htm',
            data: params,
            callback: (result) => {
              if (result.code == 200) {
                Modal.success({
                  title: result.msg,
                  onOk: () => {            
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
        onCancel: function () { }
      })
      
    })      
  },  
  render() {
    const {
      getFieldProps
    } = this.props.form;
    var props = this.props;
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
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="600"  footer={modalBtns} >
          <Form horizontal  form={this.props.form}>      
                <Row>                   
                    <Col span="16">
                    <FormItem {...formItemLayout} label="审核额度：">
                        <Input {...getFieldProps('quota', { rules: [{required:true,message:'必填'}]}) }  disabled={props.canEdit}/>
                    </FormItem>
                    </Col>
                </Row>     
                <Row>                   
                    <Col span="16">
                    <FormItem {...formItemLayout} label="单月保险金额：">
                        <Input {...getFieldProps('monthMoney', { rules: [{required:true,message:'必填'}]}) }  disabled={props.canEdit}/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>                   
                    <Col span="16">
                    <FormItem {...formItemLayout} label="保单总金额：">
                        <Input {...getFieldProps('totleMoney', { rules: [{required:true,message:'必填'}]}) }  disabled={props.canEdit}/>
                    </FormItem>
                    </Col>
                </Row>                            
                <Row>                   
                    <Col span="16">
                    <FormItem {...formItemLayout} label="险种：">
                        <Input {...getFieldProps('insuranceType', { rules: [{required:true,message:'必填'}]}) }  disabled={props.canEdit}/>
                    </FormItem>
                    </Col>
                </Row>     
                <Row>                   
                    <Col span="16">
                    <FormItem {...formItemLayout} label="保单到期时间:">
                        <DatePicker   format="yyyy/MM/dd"   disabledDate={this.disabledDate} {...getFieldProps('expireTime', { initialValue:'' }) } />
                    </FormItem>
                    </Col>
                </Row>   
                <Row>                   
                    <Col span="16">
                    <FormItem {...formItemLayout} label="保单起始时间:">
                        <DatePicker   format="yyyy/MM/dd"  disabledDate={this.disabledDate} {...getFieldProps('startTime', { initialValue:'' }) } />
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