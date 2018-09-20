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
  InputNumber
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
   // console.log(nextProps)
    this.setState({
      recordSoure: nextProps.record,
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
    var me = this;
    var props = me.props;
    var record = props.record;
    var title = props.title;
    var url = "";
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log(errors)
        return ;
      }
      if(title == "新增"){
        var params = this.props.form.getFieldsValue();
        delete params.id;
        var data = params
        var url = '/modules/manage/coupontype/add.htm';
      }
     
      if (title == "编辑") {
        var params = this.props.form.getFieldsValue();  
        var url = '/modules/manage/coupontype/update.htm';
        var data = params   
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
  checkPass(rule, value, callback) {
    let regex = /^100$|^(\d|[1-9]\d)$/;
    if (value) {
      if (regex.test(value)) { 
        callback();
      } else { 
        callback('不能<=100(单位为%)');
      }
    }
  },
  checkDay(rule,value,callback){
    let regex = /^[0-9]*[1-9][0-9]*$/;
    if (value) {
      if (regex.test(value)) { 
        callback();
      } else { 
        callback('天数必须为整数');
      }
    }
  },
  render() {
    const {
      getFieldProps
    } = this.props.form;
    var props = this.props;
    var state = this.state;
    const modalBtns = [
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
        span: 14
      },
    };
    const formItemLayout2 = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 10
      },
    };
    const valueProps = getFieldProps('value', {
      rules: [
        {
          required: true,
          message: '必填',
        }, {
          validator: this.checkPass,
        },
      ],
    });
    const vaildTimeProps = getFieldProps('vaildTime',{
      rules:[
        {
          required:true,
          message:'必填',
        },{
          validator: this.checkDay,
        }
      ]
    })
    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="900"  footer={modalBtns} >
          <Form horizontal  form={this.props.form}>      
                <Input  {...getFieldProps('id',  {initialValue:''})} type="hidden"   />
            <Row>
              <Col span="12">
                <FormItem  {...formItemLayout} label="优惠券类型：">
                    <Select {...getFieldProps('type', { rules: [{required:true,message:'必填',whitespace:true,trigger: 'onBlur'}]}) } >
                          <Option  value="0">免租券</Option>
                    </Select>  
                </FormItem> 
              </Col>
              <Col span="12">
                  <FormItem {...formItemLayout2} label="优惠券面值：" >
                    <Input disabled={props.canEdit} placeholder="" {...valueProps }  />
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem  {...formItemLayout} label="优惠券名称：">
                  <Input {...getFieldProps('name',  { rules: [{required:true,message:'必填',whitespace:true,trigger: 'onBlur'}]})  } disabled={props.canEdit} />
                  
                </FormItem> 
              </Col>
              <Col span="12">
                  <FormItem {...formItemLayout} label="适用范围：">
                    <Input {...getFieldProps('remark',  { })  } disabled={props.canEdit} />
                  </FormItem> 
              </Col>             
            </Row>
            <Row>
              <Col span="12">
                <FormItem {...formItemLayout2} label="有效期：" help="天数必须为整数">
                    <Input {...vaildTimeProps} disabled={props.canEdit} />
                </FormItem> 
               
              </Col>
              <Col>

              </Col>
            </Row>
           
          </Form>
      </Modal>
    );
  }
});
AddUserWin = createForm()(AddUserWin);
export default AddUserWin;