import React from 'react';
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const objectAssign = require('object-assign');
const userbaseTit = {
  color: '#2db7f5',
  textAlign: 'center',
  fontSize: '14px',
  marginBottom: '10px',
  display: 'block',
  width: '150px',
}
var Tab1 = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.recordSoure){
      this.setState({
        recordSoure: nextProps.recordSoure
      })
    }
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
    const formItemLayout2 = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            },
        };
        var aItem = [];
        if(state.recordSoure && state.recordSoure.workImgArr){
          aItem = [];
          for(var i = 0; i < state.recordSoure.workImgArr.length; i++){
            aItem.push(<a style={{ marginRight: '10px'}} href={state.recordSoure.workImgArr[i]} target="_blank"><img src={state.recordSoure.workImgArr[i]} style={{width:150,height:150}} /></a>);
          }
        }else{
          aItem.push(<span>暂无</span>)
        }
        
    return (
          <Form horizontal form={this.props.form} style={{marginTop:'20'}}>
            <div className="navLine-wrap-left">
              {/* <h2>基本信息</h2> */}
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="	手机号码：">
                    <Input {...getFieldProps('loginName', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="用户真实姓名：">
                    <Input {...getFieldProps('userRealName', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="身份证号码：">
                    <Input {...getFieldProps('idNo', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="登录名：">
                    <Input {...getFieldProps('loginName', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="注册时间：">
                    <Input {...getFieldProps('registTime', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="注册客户端：">
                    <Input {...getFieldProps('registerClient', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="注册地坐标：">
                    <Input {...getFieldProps('registerCoordinate', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="渠道ID：">
                    <Input {...getFieldProps('channelId', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="渠道名称：">
                    <Input {...getFieldProps('channelName', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
              </Row>             
              <Row>
              {/* <Col span="8">
                  <FormItem {...formItemLayout} label="月薪范围：">
                    <Input {...getFieldProps('salary', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
              <Col span="8">
                  <FormItem {...formItemLayout} label="发薪日期：">
                    <Input {...getFieldProps('dd', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>*/}
              </Row>
              {/* <Row>
                <Col span="14">
                  <FormItem {...formItemLayout2} label="单位地址：">
                    <Input {...getFieldProps('companyAddr', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
              </Row>
              <h2>联系人信息</h2> */}
            </div>
          </Form>
    );
  }
});
Tab1 = createForm()(Tab1);
export default Tab1;