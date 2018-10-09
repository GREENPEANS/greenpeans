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
      imgPath: '',
      fimhPath:'',
    };
  },
  
  componentWillReceiveProps(nextProps){  
    this.setState({
      recordSoure: nextProps.record,
      fimhPath :nextProps.record && nextProps.record.imgPath
    })   
  },
  handleCancel() {
    this.props.form.resetFields();
    this.props.hideModal();
    this.setState({
      imgPath:''
    })
  },
  handleOk(e) {
    e.preventDefault();
    var me = this;
    var props = me.props;
    var record = props.record;
    var title = props.title;
    var url = "/modules/manage/banner/bannerSave.htm";
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      if(title == "新增"){
        var params = this.props.form.getFieldsValue(); 
        params['imgPath'] = this.state.imgPath; 
        delete params.createTime;
        delete params.id;
        var data = {form: JSON.stringify(params),status: 'create'}
      }
     
      if (title == "编辑") {
        var params = this.props.form.getFieldsValue();  
        delete params.createTime;
        params['imgPath'] = this.state.imgPath;
        var data = {form: JSON.stringify(params),status: 'update'}     
      }
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
      this.setState({
        imgPath:info.file.response.data
      });
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
      action: 'http://192.168.16.16:8082/modules/manage/banner/bannerImgUploadToOss.htm',
      headers: {
        authorization: 'authorization-text',
      },    

  };  
    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="900"  footer={modalBtns} >
          <Form horizontal  form={this.props.form}>      
                <Input  {...getFieldProps('id',  {initialValue:''})} type="hidden"   />
            <Row>
              <Col span="12">
                <FormItem  {...formItemLayout} label="应用场景：">
                    <Select {...getFieldProps('imgType')} >
                          <Option  value="1">APP</Option>
                    </Select>  
                </FormItem> 
              </Col>
              <Col span="12">
                <FormItem  {...formItemLayout} label="是否显示：">
                    <Select {...getFieldProps('imgDisplay')} >
                          <Option  value="0">否</Option>
                          <Option  value="1">是</Option>
                    </Select>  
                </FormItem> 
               </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem  {...formItemLayout} label="添加时间：">
                  <Input disabled  {...getFieldProps('imgCreateTime', {})} />
                </FormItem> 
              </Col>
              <Col span="12">
                  <FormItem {...formItemLayout} label="图片链接：">
                    <Input {...getFieldProps('imgUrl', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
              </Col>
            </Row>
           
            <Row>
               
                <Col  span="12">
                  <FormItem {...formItemLayout} label="图片路径：">        
                  {this.state.imgPath == '' ? (<img src={this.state.fimhPath} style={{ width: 230 }} /> ) :
                  (<img src={this.state.imgPath} style={{ width: 230 }} /> )}                                              
                  <br />
                    <Upload {...propss} onChange={this.handleChange}>
                      <Button>
                        <Icon type="upload"  /> 点击上传
                      </Button>
                    </Upload>
                  </FormItem>   
                </Col>
                <Col span="12">
                    <FormItem {...formItemLayout} label="图片标题：">
                      <Input {...getFieldProps('imgTitle', { initialValue: '' }) } disabled={props.canEdit} />
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