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
var Tab4 = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.activeKey == '3'){
     
      this.fetch();
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
              {/* <h2>银行卡认证状态显示</h2> */}
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="驾驶证姓名：">
                    <Input {...getFieldProps('driverName', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="驾驶员性别：">
                    <Input {...getFieldProps('dirverSex', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="所属国籍：">
                    <Input {...getFieldProps('dirverCountry', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="地址：">
                    <Input {...getFieldProps('dirverAddr', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="出生日期：">
                    <Input {...getFieldProps('dirverBorthDate', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="领证日期：">
                    <Input {...getFieldProps('dirverGetCertDate', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>  
              </Row>            
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="有限期效：">
                    <Input {...getFieldProps('dirverLimiteDate', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="准驾车型：">
                    <Input {...getFieldProps('dirverLicensedCarType', { initialValue: '' }) } disabled={props.canEdit} />
                  </FormItem>
                </Col>
               
              </Row>                           
            </div>
          </Form>
    );
  }
});
Tab4 = createForm()(Tab4);
export default Tab4;