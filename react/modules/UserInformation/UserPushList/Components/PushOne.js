import React from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Row,
    Col,
    DatePicker,
    textarea
} from 'antd';
const RangePicker = DatePicker.RangePicker;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const objectAssign = require('object-assign');

var PushOne = React.createClass({
    getInitialState() {
        return {
            status: {},
            loading: false,
            formData: {},
            dataRecord:"",
            Msg:"",
        };
    },
  handleCancel() {
    	 this.props.form.resetFields();
         this.props.hideModal();
          this.setState({
            canEdit:true
        })  
    },
    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
          })
  },
  handleOk() {
        var me = this;
        this.props.form.validateFields((errors, values) => {
         var paramsData=this.props.form.getFieldsValue();
         var endTime=(DateFormat.formatDate(paramsData.registTime[1])).substring(0,10);
         var startTime=(DateFormat.formatDate(paramsData.registTime[0])).substring(0,10);
            var url= '/modules/manage/appPush/PushToTime.htm';
            Utils.ajaxData({
              url: url,
              data: {
                  'startTime':startTime,
                  'endTime':endTime,
                  'Msg': paramsData.Msg
              },
              loading:true,
              method: 'post',
              callback: (result) => {
                 if(result.code=="200"){
                    Modal.success({
                            title: result.msg,
                            onOk: () => {
                                this.handleCancel();
                            }
                        });
                 }else{
                     Modal.error({
                            title: result.msg,
                            onOk: () => {
                                this.handleCancel();
                            }
                        });
                 }
            }
          });     
        })
    },
    render() {
        const {
            getFieldProps
        } = this.props.form;
        var props = this.props;
        var state = this.state;
        var modalBtns = [
            <Button key="back" className="ant-btn" onClick={this.handleCancel}>返 回</Button>,
            <Button key="button" className="ant-btn ant-btn-primary" loading={state.loading}  onClick={this.handleOk}>
                提 交
            </Button>
        ];
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            },
        };
         const formItemLayoutone = {
            labelCol: {
                span:8
            },
            wrapperCol: {
                span: 16
            },
        };
        let data=this.state.data;
        const tProps={
           data,
        }
        return (
             <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="900" footer={modalBtns} maskClosable={false} >
                <div style={{ position: "relative" }}>
                    <Form inline horizontal form={this.props.form} style={{ marginTop: "20px" }}>
                            <Row>
                                <Col span="20">
                                    <FormItem label="请输入消息内容:">
                                    	 <textarea  type="text" disabled={false} style={{textAlign: "left",height:"132px",width:"439px",borderRadius:"3px",border:"1px solid #DCDCDC"}} {...getFieldProps('Msg', {initialValue: ''}) }/>
                                    	</FormItem>
                                </Col>
                            </Row>
                            <Row>
	                            <Col span="20">
		                            <FormItem label="请选择注册时间范围:">
		                            	<RangePicker disabledDate={this.disabledDate} style={{width:"310px",options:"relative"}} {...getFieldProps('registTime', { initialValue: '' }) } />
		                            </FormItem>
	                            </Col>
	                        </Row>
                    </Form>
                </div>
            </Modal>
        );
    }
});
PushOne = createForm()(PushOne);
export default PushOne;
