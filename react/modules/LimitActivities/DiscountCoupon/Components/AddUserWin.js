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
      roleList: []
    };
    
  }, 
  componentDidMount(){
    var me = this ;
    Utils.ajaxData({
      url: '/modules/manage/coupontype/all.htm',
      method: 'post', 
      type: 'json',
      callback: (result) => {
        var items  = result.data.map((item)=>{
            return (<Option key={item.id} value={String(item.id)}>{item.name}</Option>);
          });
        me.setState({roleList:items});
      }
    });
  },
  componentWillReceiveProps(nextProps){  
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
  handleQuery() {
    var params = this.props.form.getFieldsValue();
    if(params.realName){
      params.realName = params.realName.replace(/\s+/g, ""); 
    }
    if(params.Time){
    	if(params.Time[0]){
    		if(params.Time[1]){
            params.startTime = (DateFormat.formatDate(params.Time[0])).substring(0,10);
            params.endTime = (DateFormat.formatDate(params.Time[1])).substring(0,10);   	
    		}
    		}
    }
  },
  handleOk(e) {
   // e.preventDefault();
    var me = this;
    var props = me.props;
    var record = props.record;
    var title = props.title;
    var url = "/modules/manage/activity/addOrUpdate.htm";
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console
        console.log("this is errors");
        return;
      }
      if(title == "新增"){
        var params = this.props.form.getFieldsValue();
        params['couponType'] = this.props.form.getFieldsValue().type;
        delete params.id;
        params['type'] = 'create';
        var data = params
        console.log("111");
      }
     
      if (title == "编辑") {
        var params = this.props.form.getFieldsValue();
        params['couponType'] = this.props.form.getFieldsValue().type;
        delete params.type;
        params['type'] = 'update';
        var data = params
        console.log('222')
      }
      Utils.ajaxData({
        url: url,
        data: data,
        callback: (result) => {
          if (result.code == 200) {
            Modal.success({
              title: result.msg,
              onOk: () => {
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
  checkDay(rule,value,callback){
    let regex = /^[0-9]*[1-9][0-9]*$/;
    if (value) {
      if (regex.test(value)) { 
        callback();
      } else { 
        callback('必须为整数,不能有小数点');
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
    const couponNumProps = getFieldProps('couponNum',{
      rules:[
        {
          required:true,
          message:'必填',
          type:'string'
        },{
          validator: this.checkDay
        }
      ]
    })
    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="900"  footer={modalBtns} >
          <Form horizontal  form={this.props.form}>      
                <Input  {...getFieldProps('id',  { })} type="hidden"   />
                <Input  {...getFieldProps('couponTypeId',  {})} type="hidden"   />
            <Row>
              <Col span="12">
                <FormItem {...formItemLayout} label="活动名称：">
                  <Input {...getFieldProps('name',  { rules: [{required:true,message:'必填'}]})  } disabled={props.canEdit} autoComplete="off" />
                </FormItem> 
              </Col>
              <Col span="12">
                <FormItem  {...formItemLayout} label="适用业务：">
                    <Select {...getFieldProps('businessType', { rules: [{required:true,message:'必填'}]}) }  disabled={props.canEdit} autoComplete="off" >
                           
                          <Option  value="0">融租</Option>
                          <Option  value="1">回租</Option>
                    </Select>  
                </FormItem> 
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem  {...formItemLayout} label="活动类型：">
                    <Select {...getFieldProps('type', { rules: [{required:true,message:'必填'}]}) }  disabled={props.canEdit} autoComplete="off" >
                          
                          <Option  value="0">抽奖</Option>
                    </Select>  
                </FormItem> 
              </Col>
              <Col span="12">
                <FormItem  {...formItemLayout} label="优惠券名称：">
                    <Select {...getFieldProps('couponTypeId', { rules: [{required:true,message:'必填'}]}) }   autoComplete="off" >
                        {this.state.roleList}
                    </Select>
                </FormItem> 
              </Col>
            </Row>
            <Row>
              <Col span="12">
                  <FormItem {...formItemLayout} label="活动时间：" help="填写格式为：11:00-12:00,14:00-16:00,19:00-21:00(请用','隔开)">
                    <Input placeholder="" {...getFieldProps('grantTime', { rules: [{required:true,message:'必填'}]}) } autoComplete="off"  />
                  </FormItem>
              </Col> 
              <Col span="12">
                  <FormItem {...formItemLayout} label="发放总数：" help="发放数量必须为整数">
                    <Input placeholder="" {...couponNumProps} autoComplete="off"  />
                  </FormItem>
              </Col>            
            </Row>
            <Row>
              <Col span="12"> 
                <FormItem {...formItemLayout} label="备注：" >
                  <Input type="textarea" style={{height:200}} placeholder="" {...getFieldProps('remark', { }) } autoComplete="off" />
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