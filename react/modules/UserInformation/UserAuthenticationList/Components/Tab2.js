import React from 'react';
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const objectAssign = require('object-assign');
const userbaseTit = {
  color: '#2db7f5',
  textAlign: 'center',
  fontSize: '14px',
  marginBottom: '10px',
  display: 'block',
  width: '150px',
}
var Tab2 = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.activeKey == '2'){   
      console.log("thiskey2");
    //  this.fetch();
    }
  },
  componentDidMount(){
    console.log("fetch");
    this.fetch();
  },
  fetch(params = {}) {
    console.log("data");
    var me = this;
    this.setState({
      loading: true
    });
    var params = {};
      params = {
        userId: this.props.record.id,
      }
    Utils.ajaxData({
      url: '/user/auth/getUserPolicyInfo.htm',
      data: params,
      callback: (result) => {
        if (result.code == 200) {
          console.log(result);
          let data = result.data.policyInfo;
          this.setState({
            drivingBrand: data.drivingBrand,
            policyMan: data.policyMan,
            insuranceImg: data.insuranceImg,
            drivingBrand:data.drivingBrand,
            insuranceCompany:data.insuranceCompany,
            drivingCarType:data.drivingCarType,
            policyLimit:data.policyLimit,
            insuranceType:data.insuranceType,
            policyTerm:data.policyTerm,
            
          })
        }else if(result.code == 400){

        }
      }
    });
  },
  magnifyImg(){
      console.log(111);
  },
  render() {
    var props = this.props;
    var state = this.state;
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
  
    return (
      <Form horizontal form={this.props.form} style={{marginTop:'20'}}>           
      <div className="navLine-wrap-left">
        <h2  className="margin">保单认证状态显示</h2>
        <Row>
          <Col span="8">
            <FormItem {...formItemLayout} label="被保人姓名：">
              <Input value = {this.state.policyMan} disabled />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="厂牌型号：">
              <Input value = {this.state.drivingBrand} disabled />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="保险期限：">
              <Input value = {this.state.policyTerm} disabled />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem {...formItemLayout} label="保单编号：">
              <Input value = {this.state.policyNumber} disabled />
            </FormItem>
          </Col>        
          <Col span="8">
            <FormItem {...formItemLayout} label="保险公司：">
              <Input value = {this.state.insuranceCompany} disabled />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="险种：">
              <Input  value = {this.state.insuranceType}  disabled />
            </FormItem>
          </Col>
        </Row>            
        <Row>
         
          <Col span="8">
            <FormItem {...formItemLayout} label="保单额度：">
              <Input value = {this.state.policyLimit} disabled />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="车辆种类：">
              <Input value = {this.state.drivingCarType} disabled />
            </FormItem>
          </Col>
         
        </Row> 
        <Row>
          <Col span="8">
            <FormItem {...formItemLayout} label="保单照片：">
            { this.state.insuranceImg ? <a href={this.state.insuranceImg} target="_blank"><img src={this.state.insuranceImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" />}
            </FormItem>
          </Col>              
        </Row>                 
      </div>
    </Form>
    );
  }
});
Tab2 = createForm()(Tab2);
export default Tab2;