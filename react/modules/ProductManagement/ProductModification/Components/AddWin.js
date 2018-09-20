import React from 'react';
import { 
    Modal, 
    Upload,
    Form,
    Input,
    Row,
    Col,
    Button,
    message,
    Icon,
    Tooltip
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class AddWin extends React.Component {
    
  state = { 
      visible: false ,
      loading:false,
      okText: "提交",
      cancelText : "关闭",
      deviceName : ''
  }    
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    var params = this.props.form.getFieldsValue();   
     ;
    Utils.ajaxData({
        url: '/modules/manage/deviceBaseInfo/deviceSave.htm',
        data: {
          form : JSON.stringify(params),
          status: 'create',
        },
        callback: (result) => {
          if (result.code == 200) {
            this.props.form.resetFields();
            message.success(result.msg); 
            this.setState({
              loading:true,
              visible: false,
            });           
          }else{
            this.props.form.resetFields();
            message.success(result.msg); 
          }
        }
    });
  }

  handleReset() {
    this.props.form.resetFields();
  }

  handleCancel = (e) => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
      loading:true
    });
  }

  componentDidMount() {
     // console.log(this.props.form.setFieldsValue())
      this.props.form.setFieldsValue(this.props.dataForm);
      
  }

  handleChange =(info) =>{   
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
  }
  render() {
    const { visible, okText , cancelText } = this.state;
    var props = this.props;  
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
    const formItemLayout2 = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
            span: 19
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
    const deviceImg = this.state.deviceImg
    return (
      <div>
          <FormItem>
            <Tooltip placement="bottomLeft" title={this.props.name} >
              <Button onClick={this.showModal}><i className="icon iconfont icon-add"></i></Button>
            </Tooltip>
          </FormItem>
        
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="1200"
          okText = {this.state.okText}
          cancelText = {this.state.cancelText}
        >
          <Form horizontal form={this.props.form} style={{marginTop:'20'}}>
            <div className="navLine-wrap-left">
                <Row>
                    <Col span="8">
                    <FormItem {...formItemLayout} label="设备名称：">
                        <Input {...getFieldProps('deviceName', { initialValue: '' }) }  />
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem {...formItemLayout} label="设备型号：">
                        <Input {...getFieldProps('deviceParams', { initialValue: '' }) }  />
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem {...formItemLayout} label="价格：">
                        <Input {...getFieldProps('devicePrice', { initialValue: '' }) } />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <FormItem {...formItemLayout} label="产品类型：">
                        <Input {...getFieldProps('productType', { initialValue: '' }) } />
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
                    <FormItem {...formItemLayout} label="设备简介">
                        <Input type="textarea" disabled={props.canEdit} style={{height: 150}} {...getFieldProps('deviceProperty') } />
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem {...formItemLayout} label="产品详情">
                        <Input type="textarea" disabled={props.canEdit} style={{height: 150}} {...getFieldProps('deviceInfo') } />
                    </FormItem>
                    </Col>                   
                </Row> 
                <Row>

                <Row>
                    <Col  span="8">
                    <FormItem {...formItemLayout} label="设备图片"> 

                    <img src={this.state.deviceImg} style={{ width: 230 }} />
                    <br />
                        <Upload {...propss}  onChange = {this.handleChange}>
                        <Button>
                            <Icon type="upload"/> 上传图片
                        </Button>
                        </Upload>
                    </FormItem>   
                    </Col>
                </Row> 
                 
                {/* <Col  span="8">
                  <FormItem {...formItemLayout} label="-"><Button type="primary"  onClick={this.handleReset}>重置</Button></FormItem>   
                </Col> */}
              </Row>                
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}
AddWin = createForm()(AddWin);
export default AddWin
