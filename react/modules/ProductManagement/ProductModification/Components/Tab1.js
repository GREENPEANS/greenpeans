import React from 'react';
import {
  Upload,
  Form,
  Input,
  Row,
  Col,
  Button,
  message,
  Icon,
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const objectAssign = require('object-assign');

var Tab1 = React.createClass({
  getInitialState(nextProps) {
    return {
     
    };
  },
  componentWillReceiveProps(nextProps){  
    this.setState({
      recordSoure: nextProps.recordSoure,
      id : nextProps.record.id,
      deviceName : nextProps.record.deviceName,
      deviceImg :nextProps.recordSoure && nextProps.recordSoure.deviceImg
    })   
  },
  handleQuery(nextProps){

    var params = this.props.form.getFieldsValue();   
    var id = this.state.id;  
    var time = new Date();  
    var m = time.getMonth() + 1;  
    var updateTime = time.getFullYear() + "-" + m + "-"     
    + time.getDate() + " " + time.getHours() + ":"     
    + time.getMinutes() + ":" + time.getSeconds();
    params['updateTime']=updateTime;
    params['id']=id;
    params['deviceImg'] = this.state.deviceImg;
    delete params.createTime;
    Utils.ajaxData({
      url: '/modules/manage/deviceBaseInfo/deviceSave.htm',
      data: {
        form : JSON.stringify(params),
        status: 'update',
      },
      callback: (result) => {
        if (result.code == 200) {
          message.success(result.msg);   
          setTimeout(() => {
            this.setState({
              visible: false,                 
            });
          }, 1000);      
        }else{
          message.error(result.msg);   
        }
      }
    });
  },
  handleChange(info){   
    if (info.file.status !== 'uploading') {
      console.log(info.file);                
      this.setState({
        deviceImg:info.file.response.data
      });
      console.log(this.state.deviceImg);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功！`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败！`);
    }
  },
  render() {
    var props = this.props;
    var state = this.state;
    const deviceImg = this.state.deviceImg;
    var recordSoure = this.state.recordSoure;
    const id = state.record && state.record.id;
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
    const propss = {
          name: 'imgData',
          action: '/modules/manage/deviceBaseInfo/deviceImgUploadToOss.htm',
          headers: {
            authorization: 'authorization-text',
          },
          data:{
            deviceName:this.props.form.getFieldValue('deviceName')
          },

      };  
    return (
          <Form horizontal form={this.props.form} style={{marginTop:'20'}}>          
            <div className="navLine-wrap-left">
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="设备名称：">
                    <Input {...getFieldProps('deviceName', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="设备型号：">
                    <Input {...getFieldProps('deviceParams', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="价格：">
                    <Input {...getFieldProps('devicePrice', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="产品类型：">
                    <Input {...getFieldProps('productType', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="创建时间：">
                    <Input {...getFieldProps('createTime', { initialValue: '' }) } disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="保障金：">
                    <Input {...getFieldProps('safeGuards', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>               
              </Row> 
              <Row>
                <Col span="8">
                    <FormItem {...formItemLayout} label="设备简介:">
                        <Input type="textarea" disabled={props.canEdit} style={{height: 150}} {...getFieldProps('deviceProperty') } />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem {...formItemLayout} label="产品详情:">
                        <Input type="textarea" disabled={props.canEdit} style={{height: 150}} {...getFieldProps('deviceInfo') } />
                    </FormItem>
                </Col>
                                 
              </Row>
              <Row>
                <Col  span="8">
                  <FormItem {...formItemLayout} label="设备图片"> 
                   
                  <img src={this.state.deviceImg} style={{ width: 230 }} /> 
                  <br />
                    <Upload {...propss} onChange={this.handleChange}>
                      <Button>
                        <Icon type="upload"  /> 点击上传
                      </Button>
                    </Upload>
                  </FormItem>   
                </Col>
              </Row> 
              
              <Row>
                <Col  span="8">
                  <FormItem {...formItemLayout} label="-"><Button type="primary"  onClick={this.handleQuery}>提交</Button></FormItem>   
                </Col>
              </Row> 
              
                          
            </div>
          </Form>
    );
  }
});
Tab1 = createForm()(Tab1);
export default Tab1;