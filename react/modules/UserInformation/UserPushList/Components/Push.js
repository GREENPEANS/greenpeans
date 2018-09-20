import React from 'react';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Tree,
    TreeSelect,
    Row,
    Col,
    textarea
} from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const objectAssign = require('object-assign');

var Push = React.createClass({
    getInitialState() {
        return {
            status: {},
            loading: false,
            formData: {},
            dataRecord:"",
            Msg:"",
            ids:''
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
            ids: nextProps.ids
          })
  },
  handleOk() {
        var me = this;
        let ids=me.state.ids.toString();
        this.props.form.validateFields((errors, values) => {
         var paramsData=this.props.form.getFieldsValue();
            var url= '/modules/manage/appPush/PushToMany.htm';
            Utils.ajaxData({
              url: url,
              data: {
                  'ids': ids,
                  'Msg': paramsData.Msg
              },
              method: 'post',
              loading:true,
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
                    <Form horizontal form={this.props.form} style={{ marginTop: "20px" }}>
                            <Row>
                                <Col span="10">
                                    <FormItem  {...formItemLayout} label="推送多人:">
                                    	 <textarea  type="text" disabled={false} style={{textAlign: "left",height:"132px",width:"439px",borderRadius:"3px",border:"1px solid #DCDCDC"}} {...getFieldProps('Msg', {initialValue: ''}) }/>
                                    	</FormItem>
                                </Col>
                                <Input disabled={true}  type="hidden" {...getFieldProps('id', { initialValue: ""}) }/>
                            </Row>
                    </Form>
                </div>
            </Modal>
        );
    }
});
Push = createForm()(Push);
export default Push;
