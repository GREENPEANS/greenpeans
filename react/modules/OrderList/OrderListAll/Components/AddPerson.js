import React from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Col,
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
    var params = this.props.form.getFieldsValue().quota;
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      confirm({
        title: "您确定操作给该用户授予"+params+"元的额度？",
        content:'',
        onOk: function () {
          Utils.ajaxData({
            url: '/modules/manage/hzorder/quota.htm',
            data: {
              'userId':userId,
              'quota':params
            },
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
          </Form>
      </Modal>
    );
  }
});
AddUserWin = createForm()(AddUserWin);
export default AddUserWin;