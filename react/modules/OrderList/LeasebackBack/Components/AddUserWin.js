import React from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
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
    this.setState({
      recordSoure: nextProps.selectRecord,
      Btn:''
    })   
  },

  //关闭窗口
  handleCancel() {
    this.props.form.resetFields();
    this.props.hideModal();
  },

  //提交
  handleOk(e) {
   // e.preventDefault();
    var me = this;
    var props = me.props;
    var title = props.title;
    var url = "/modules/manage/billback/detail.htm";
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }    
      if (title == "操作") {  
        var data = {
          type:'update',
          id:this.props.form.getFieldsValue().id,
          logisticsCompany:this.props.form.getFieldsValue().logisticsCompany,
          logisticsId:this.props.form.getFieldsValue().logisticsId,
          remark:this.props.form.getFieldsValue().remark
        }        
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
  render() {
    const {
      getFieldProps
    } = this.props.form;
    var props = this.props;
    var modalBtns = [
      <button key="back" className="ant-btn" onClick={this.handleCancel}>返 回</button>,
      <button key="button" className="ant-btn ant-btn-primary"  onClick={this.handleOk}>
          提 交
      </button>
    ];
    if(this.props.title == '查看详情'){
      modalBtns = [
        <button key="back" className="ant-btn" onClick={this.handleCancel}>关 闭</button>,      
      ];  
    } 
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 15
      },
    };

    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="900" footer={modalBtns} >
          <Form horizontal  form={this.props.form}>      
              <Input  {...getFieldProps('id',  {initialValue:''})} type="hidden"   />
            <Row>
              <Col span="12">
                  <FormItem  {...formItemLayout} label="回租订单号：">
                    <Input disabled  {...getFieldProps('orderNo', {})} />
                  </FormItem> 
              </Col>
              <Col span="12">
                  <FormItem  {...formItemLayout} label="手机号：">
                    <Input disabled  {...getFieldProps('phone', {})} /> 
                  </FormItem> 
              </Col>              
            </Row>
            <Row>
              <Col span="12">
                  <FormItem  {...formItemLayout} label="用户名：">
                    <Input disabled  {...getFieldProps('userName', {})} />
                  </FormItem> 
              </Col>
              <Col span="12">
                  <FormItem {...formItemLayout} label="地址：">
                    <Input {...getFieldProps('addressAetail', { initialValue: '' }) } disabled />
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                  <FormItem  {...formItemLayout} label="申请时间：">
                    <Input disabled  {...getFieldProps('createTime', {})} />
                  </FormItem> 
              </Col>
            </Row>
            <Row>                            
              <Col span="12">
                  <FormItem  {...formItemLayout} label="回递状态：">
                    <Input disabled  {...getFieldProps('status', {})} />
                  </FormItem> 
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem {...formItemLayout} label="物流公司：">
                  <Input {...getFieldProps('logisticsCompany', { rules: [{required:true,message:'必填'}]})  } disabled={props.canEdit} />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="物流单号：">
                  <Input {...getFieldProps('logisticsId', { rules: [{required:true,message:'必填'}]}) } disabled={props.canEdit} />
                </FormItem>
              </Col>             
            </Row>
            <Row>
              <Col span="12">
                <FormItem {...formItemLayout} label="处理时间：">
                  <Input {...getFieldProps('dealTime', { rules: [{required:true,message:'必填'}]})  } disabled/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem  {...formItemLayout} label="备注：">
                  <Input type="textarea" disabled={props.canEdit} style={{height: 100}} {...getFieldProps('remark',   { rules: [{required:true,message:'必填'}]})} />
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