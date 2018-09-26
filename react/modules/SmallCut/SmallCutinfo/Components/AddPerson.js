import React from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Col,
} from 'antd';
const confirm = Modal.confirm;
const createForm = Form.create;
const FormItem = Form.Item;
var AddUserWin = React.createClass({ 
  getInitialState(nextProps) {
    return {
      status: {},
      formData: {},
      imgUrl1:'',
      imgUrl2:'',
      imgUrl3:'',
      imgUrl4:''
    };
  },
  componentWillReceiveProps(nextProps){  
    this.setState({
      nextProps: nextProps.selectRecord,
      imgUrl1: nextProps.selectRecord.imgUrl1,
      imgUrl2: nextProps.selectRecord.imgUrl2,
      imgUrl3: nextProps.selectRecord.imgUrl3,
      imgUrl4: nextProps.selectRecord.imgUrl4,
    })   
  },
  handleCancel() {
    this.props.form.resetFields();
    this.props.hideModal();
  },
  handleNo(){
    let me = this;
    const record = this.state.nextProps;
    confirm({
      title: '您是否拒绝通过审核？',
      content: '请确认',
      onOk() {
        Utils.ajaxData({
          url: '/modules/manage/activityrub/audit.htm',
          data: {
            'status':'nopass',
            'id':record.id
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
      onCancel() {},
    });
  },
  handleOk(e) {
    let me = this;
    const record = this.state.nextProps;
    confirm({
      title: '您是否确认通过审核？',
      content: '请确认',
      onOk() {
        Utils.ajaxData({
          url: '/modules/manage/activityrub/audit.htm',
          data: {
            'status':'pass',
            'id':record.id
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
      onCancel() {},
    });

   
  },  
  render() {
    const {
      getFieldProps
    } = this.props.form;
    var props = this.props;
    var modalBtns = [
      <button key="back" className="ant-btn" onClick={this.handleNo}>未通过</button>,
      <button key="button" className="ant-btn ant-btn-primary"  onClick={this.handleOk}>审核通过</button>
    ];  
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 10
      },
    };
    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="900"  footer={modalBtns} >
          <Form horizontal  form={this.props.form}>      
                <Row>                   
                    <Col span="12">
                      <FormItem {...formItemLayout} label="理赔图片1：">                          
                          {this.state.imgUrl1 == null ? ("暂无照片"):(<a href={this.state.imgUrl1} target='_blank'><img src={this.state.imgUrl1}  style={{width:300}} alt=""/></a>)}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="理赔图片2：">
                          {this.state.imgUrl2 == null ? ("暂无照片"):<a href={this.state.imgUrl2} target='_blank'><img src={this.state.imgUrl2}  style={{width:300}} alt=""/></a>}
                      </FormItem>
                    </Col>
                </Row>  
                <Row>                   
                    <Col span="12">
                      <FormItem {...formItemLayout} label="理赔图片3：">
                          {this.state.imgUrl3 == null ? ("暂无照片"):<a href={this.state.imgUrl3} target='_blank'><img src={this.state.imgUrl3}  style={{width:300}} alt=""/></a>}    
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="理赔图片4：">
                          {this.state.imgUrl4 == null ? ("暂无照片"):<a href={this.state.imgUrl4} target='_blank'><img src={this.state.imgUrl4}  style={{width:300}} alt=""/></a>}
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