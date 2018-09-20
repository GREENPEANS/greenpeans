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
    DatePicker,
    Tooltip
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class AddBtn extends React.Component {    
  state = { 
      visible: false ,
      okText: "提交",
      cancelText : "关闭",
      closable : false,
      loading: false,
    }    
 
  showModal = (e) => {
    this.setState({
      visible: true,
    });
  }
  onChange =(value, dateString) =>{
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  handleOk = (e) => {
    var params = this.props.form.getFieldsValue();
    let time = this.props.form.getFieldValue('time');
    let startTime = (DateFormat.formatDate(time[0]));
    let endTime = (DateFormat.formatDate(time[1]));
    params["startTime"] = startTime;
    params["endTime"] = endTime;
    // params["content"] = this.state.content;
    delete params.time;
    console.log(params)
    Utils.ajaxData({
        url: 'user/pushMessageToSingle.htm',
        data: params,
        callback: (result) => {
          if (result.code == 200) {
            message.success(result.msg); 
            this.setState({
              visible: false
            });           
          }else{
            message.success(result.msg);
          }
        }
    });
  }

  handleReset() {
    this.props.form.resetFields();
  }
  
  disabledDate(startValue) {
    var today = new Date();
    return startValue.getTime() > today.getTime();
  } 

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  }

  componentDidMount() {
      this.props.form.setFieldsValue(this.props.dataForm);
      
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
            span: 9
        },
        wrapperCol: {
            span: 19
        },
    };
    var modalBtns = [
        <Button key="back" className="ant-btn" onClick={this.handleCancel}>返 回</Button>,
        <Button key="button" className="ant-btn ant-btn-primary" onClick={this.handleOk}>
            提 交
        </Button>
    ];  
    return (
      <div>
        <FormItem>
            <Tooltip placement="bottomLeft" title={this.props.name} >
                <Button onClick={this.showModal}><i className="icon iconfont icon-quanju_duanxintuisong"></i></Button>
             </Tooltip>            
        </FormItem>
        
        <Modal
           title={props.title} visible={this.state.visible} footer={modalBtns} onCancel={this.handleCancel} width="900"  
        >
          <Form horizontal form={this.props.form} style={{marginTop:'20'}}>
            <div className="navLine-wrap-left">
                <Row>
                    <Col span="16">
                        <FormItem {...formItemLayout} label="筛选时间范围：">
                        <RangePicker
                        showTime
                        format="YYYY/MM/DD HH:mm:ss"
                        disabledDate={this.disabledDate}
                        {...getFieldProps('time', { initialValue: '' }) }/>
                        </FormItem>
                    </Col>
                   
                </Row>

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
                        <Input type="textarea" {...getFieldProps('content', { initialValue: '' }) } disabled={props.canEdit} style = {{height : 200}} />
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
AddBtn = createForm()(AddBtn);
export default AddBtn
