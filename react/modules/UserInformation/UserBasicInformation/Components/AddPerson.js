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
      imgPath :nextProps.record&& nextProps.record.imgPath
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
    e.preventDefault();
    let me = this;
    let props = me.props;
    let userId = this.state.id;
    let url = "/modules/manage/cl/cluser/userSinglePush.htm";
    this.props.form.validateFields((errors, values) => {
      let params = this.props.form.getFieldsValue(); 
      params["userId"] = userId;
      let data = {pushParam: JSON.stringify(params)}
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
    });
  },
  handleChange(info){   
    if (info.file.status !== 'uploading') {             
      this.setState({
        imgPath:info.file.response.data
      });
    }
    if (info.file.status === 'done') {
      if(info.file.response.code == "200"){
        message.success(`${info.file.name} ${info.file.response.msg}`);
      }else {
        message.error(`${info.file.name} ${info.file.response.msg}`);
      }
      
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败！`);
    }
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
    const propss = {
      name: 'imgData',
      action: '/modules/manage/banner/bannerImgUploadToOss.htm',
      headers: {
        authorization: 'authorization-text',
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
               
                {/* <Row>      
                    <Col span="16">
                    <FormItem {...formItemLayout} label="上传图片">
                    <img src={this.state.content} style={{ width: 230 }} />
                    <br />
                        <Upload {...propss}  onChange = {this.handleChange}>
                            <Button>
                                <Icon type="upload"/> 上传图片
                            </Button>
                        </Upload>
                    </FormItem>
                    </Col>
                </Row> */}
          </Form>
      </Modal>
    );
  }
});
AddUserWin = createForm()(AddUserWin);
export default AddUserWin;