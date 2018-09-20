import React from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Select
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
var Ticket = React.createClass({ 
  getInitialState(nextProps) {
    return {
      status: {},
      formData: {},
      roleList: [],
      thisType:'',
      id:''
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
    //console.log(nextProps.record);
    this.setState({
     id:nextProps.record.id
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
    var data = this.props.form.getFieldsValue();
    data['id']=this.state.id;
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log(data)
      Utils.ajaxData({
        url: '/modules/manage/activityrub/sendcoupon.htm',
        data: data,
        callback: (result) => {
          if (result.code == 200) {
            Modal.success({
              title: result.msg,
              onOk: () => {            
                this.handleCancel();
              }
            });
          } else {
            Modal.error({
              title: result.msg,
            });
          }
        }
      });
    })      
  },  
  handleChange(value) { 
    var id = {'id':value};
    Utils.ajaxData({
      url: '/modules/manage/coupontype/all.htm',
      method: 'post', 
      data:{  
        search:JSON.stringify(id),
      },
      callback: (result) => {
        var type = result.data[0].type;
        if(type == 0){
          this.setState({thisType:'减租券'});
        }
      }
    });  
  }, 
  checkDay(rule,vaildTime,callback){
    let value = vaildTime;
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
    var modalBtns = [
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
        span: 15
      },
    };
    const vaildTimeProps = getFieldProps('validTime',{
      rules:[
        {
          required:true,
          message:'必填',
          type:'string'
        },{
          validator: this.checkDay,
        }
      ]
    })
    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="900"  footer={modalBtns} >
          <Form horizontal  form={this.props.form}>      
                <Row>                   
                    <Col span="12">
                      <FormItem  {...formItemLayout} label="优惠券名称：">
                          <Select {...getFieldProps('couponTypeId', { rules: [{required:true,message:'必填'}]}) } onBlur={this.handleChange }  autoComplete="off" >
                              {this.state.roleList}
                          </Select>
                      </FormItem> 
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="有效期：">
                          <Input {...vaildTimeProps}  disabled={props.canEdit}/>
                      </FormItem>
                    </Col>
                </Row> 
                <Row>                   
                    <Col span="12">
                      <FormItem {...formItemLayout} label="优惠券类型：">
                       <Input value={this.state.thisType}  disabled/>
                      </FormItem>
                    </Col>
                </Row>                
          </Form>
      </Modal>
    );
  }
});
Ticket = createForm()(Ticket);
export default Ticket;