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
    Tooltip,
    Select
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
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
    params['imgPath'] = this.state.imgPath;  
     ;
    Utils.ajaxData({
        url: '/modules/manage/banner/bannerSave.htm',
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
      this.props.form.setFieldsValue(this.props.dataForm);
      
  }

  handleChange =(info) =>{   
    if (info.file.status !== 'uploading') {                
      this.setState({
        imgPath:info.file.response.data
      });
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
      action: '/modules/manage/banner/bannerImgUploadToOss.htm',
      headers: {
        authorization: 'authorization-text',
      },
     
    };
    const deviceImg = this.state.deviceImg
    return (
      <div>
          <FormItem>
            <Tooltip placement="bottomLeft" title={this.props.name} >
              <Button type="primary" onClick={this.showModal}><i className="icon iconfont icon-add"></i></Button>
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
                    <FormItem {...formItemLayout} label="应用场景：">
                      <Select id="select" {...getFieldProps('imgType',{})} >
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
                  <FormItem {...formItemLayout} label="图片链接路径：">
                    <Input {...getFieldProps('imgUrl', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem {...formItemLayout} label="图片标题：">
                      <Input {...getFieldProps('imgTitle', { initialValue: '' }) } disabled={props.canEdit} />
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
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}
AddWin = createForm()(AddWin);
export default AddWin
