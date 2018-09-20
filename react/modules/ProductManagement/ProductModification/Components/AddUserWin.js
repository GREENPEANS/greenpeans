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
      deviceImg: '',
      disabeld:true,
    };
  },
  componentWillReceiveProps(nextProps){  
    
    if(nextProps.title == "编辑"){
      this.setState({
        disabeld:false,
        recordSoure: nextProps.record,
        recordData: nextProps.recordSoure,
        deviceImg :nextProps.recordSoure && nextProps.recordSoure.deviceImg
      })
    }else if(nextProps.title == "新增"){
      this.setState({
        recordSoure: nextProps.record,
        recordData: nextProps.recordSoure,
        deviceImg :""
      })   
    }
  },
  handleCancel() {
    this.props.form.resetFields();
    this.props.hideModal();
    this.setState({
      deviceImg:'',
    })
  },
  handleOk(e) {
    e.preventDefault();
    var me = this;
    var props = me.props;
    var record = props.record;
    var title = props.title;
    var url = "/modules/manage/deviceBaseInfo/deviceSave.htm";
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      if(title == "新增"){
        var params = this.props.form.getFieldsValue(); 
        params['deviceImg'] = this.state.deviceImg; 
        delete params.createTime;
        delete params.id;
        var data = {form: JSON.stringify(params),status: 'create'}
      }
     
      if (title == "编辑") {
        var params = this.props.form.getFieldsValue();  
        var time = new Date();  
        var m = time.getMonth() + 1;  
        var updateTime = time.getFullYear() + "-" + m + "-"     
        + time.getDate() + " " + time.getHours() + ":"     
        + time.getMinutes() + ":" + time.getSeconds();
        delete params.createTime;
        params['deviceImg'] = this.state.deviceImg;
        var data = {form: JSON.stringify(params),status: 'update',updateTime:updateTime}     
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
            this.setState({
              deviceImg:''
            })
            Modal.error({
              title: result.msg,
            });
          }
        }
      });
    });
  },
  infoChange(nextProps){
    let deviceName = this.props.form.getFieldsValue().deviceName;
    if(!(deviceName == "" || deviceName == null)){
      this.setState({
        disabeld:false
      })
    }else{
      this.setState({
        disabeld:true
      })
    }            
  },
  handleChange(info){   
    if (info.file.status !== 'uploading') {           
      this.setState({
        deviceImg:info.file.response.data
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
      action: '/modules/manage/deviceBaseInfo/deviceImgUploadToOss.htm',
      headers: {
        authorization: 'authorization-text',
      },    
     
  };  
    return (
      <Modal title={props.title} visible={props.visible} width="900"  footer={modalBtns} >
          <Form horizontal  form={this.props.form}>      
                <Input  {...getFieldProps('id',  {initialValue:''})} type="hidden"   />
            <Row>
              <Col span="12">
                <FormItem  {...formItemLayout} label="设备名称：">
                    <Input disabled={props.canEdit}  {...getFieldProps('deviceName', {})} onBlur={this.infoChange} />
                </FormItem> 
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="创建时间：">
                  <Input {...getFieldProps('createTime', { initialValue: '' }) } disabled />
                </FormItem>
                
               </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem  {...formItemLayout} label="设备型号：">
                  <Input disabled={props.canEdit}  {...getFieldProps('deviceParams', {})} />
                </FormItem> 
              </Col>
              <Col span="12">
                  <FormItem {...formItemLayout} label="保障金：">
                    <Input {...getFieldProps('safeGuards', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem  {...formItemLayout} label="价格：">
                  <Input disabled={props.canEdit}  {...getFieldProps('devicePrice', {})} />
                </FormItem> 
              </Col>
              <Col span="12">
                  <FormItem {...formItemLayout} label="产品类型：">
                    <Input {...getFieldProps('productType', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem  {...formItemLayout} label="产品详情：">
                  <Input type="textarea" disabled={props.canEdit} style={{height: 150}} {...getFieldProps('deviceInfo',  { initialValue: '' })} />
                </FormItem> 
              </Col>
              <Col span="12">
                <FormItem  {...formItemLayout} label="设备简介：">
                    <Input type="textarea" disabled={props.canEdit} style={{height: 150}}  {...getFieldProps('deviceProperty',  { initialValue: '' })} />
                </FormItem> 
              </Col>
            </Row>
            <Row>
                <Col  span="12">
                  <FormItem {...formItemLayout} label="更改图片路径：">                    
                  <img src={this.state.deviceImg} style={{ width: 230 }} /> 
                  <br />
                    <Upload {...propss} onChange={this.handleChange}>
                      <Button disabled={this.state.disabeld}>
                        <Icon type="upload"  /> 点击上传
                      </Button>
                    </Upload>
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