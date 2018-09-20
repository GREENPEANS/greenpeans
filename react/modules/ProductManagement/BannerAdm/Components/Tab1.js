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
  Select
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const objectAssign = require('object-assign');
const Option = Select.Option;
var Tab1 = React.createClass({
  getInitialState(nextProps) {
    return {
     
    };
  },
  componentWillReceiveProps(nextProps){  
    this.setState({
      recordSoure: nextProps.recordSoure,
      id : nextProps.record.id,
      imgType : nextProps.record.deviceName,
      imgPath :nextProps.recordSoure && nextProps.recordSoure.imgPath
    })   
  },
  handleQuery(nextProps){
    var id = this.state.id; 
    var params = this.props.form.getFieldsValue();    
    params['imgPath'] = this.state.imgPath;
    params['id']=id;
    delete params.createTime;
    Utils.ajaxData({
      url: '/modules/manage/banner/bannerSave.htm',
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
        imgPath:info.file.response.data
      });
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
    const imgType = this.state.imgType;
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
          action: '/modules/manage/banner/bannerImgUploadToOss.htm',
          headers: {
            authorization: 'authorization-text',
          },
         

      };  
    return (
          <Form horizontal form={this.props.form} style={{marginTop:'20'}}>          
            <div className="navLine-wrap-left">
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="应用场景：">
                    <Select {...getFieldProps('imgType',{ initialValue: ''})} >
                          <Option  value="1">APP</Option>
                    </Select>  
                  </FormItem>
                </Col>
               
                <Col span="8">
                  <FormItem  {...formItemLayout} label="是否显示"> 
                    <Select id="select" {...getFieldProps('imgDisplay',{ rules: [{required:true,message:'必填',type:'number'}]})} >
                          <Option  value="0">否</Option>
                          <Option  value="1">是</Option>
                    </Select>  
                  </FormItem>     
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="图片添加时间：">
                    <Input {...getFieldProps('imgCreateTime', { initialValue: '' }) } disabled />
                  </FormItem>
                </Col>  
              </Row>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="图片链接地址：">
                    <Input {...getFieldProps('imgUrl', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                
                               
              </Row>            
              <Row>
                <Col  span="8">
                  <FormItem {...formItemLayout} label="更改图片路径：">                    
                  <img src={this.state.imgPath} style={{ width: 230 }} /> 
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