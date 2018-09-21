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
var Tab3 = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.activeKey == '3'){    
     // this.fetch();
    }
  },
  componentDidMount(){   
    this.fetch();
  },
  fetch(params = {}) {
    var me = this;
    this.setState({
      loading: true
    });
    var params = {};
      params = {
        userId: this.props.record.id,
      }
    Utils.ajaxData({
      url: '/user/auth/getUserCarInsuranceInfo.htm',
      data: params,
      callback: (result) => {
        if (result.code == 200) {
          this.setState({
            driverLeftImg: result.data.carInsuranceInfo.leftFontImg,
            driverRightImg: result.data.carInsuranceInfo.rightFontImg,
            leftBackImg: result.data.carInsuranceInfo.leftBackImg,
            rightBackImg: result.data.carInsuranceInfo.rightBackImg,
            recordSoure: result.data.carInsuranceInfo
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
        <h2  className="margin">车险认证状态显示</h2>
        <Row>
          <Col span="8">
            <FormItem {...formItemLayout} label="驾驶证左面照">
            { this.state.driverLeftImg ? <a href={this.state.driverLeftImg} target="_blank"><img src={this.state.driverLeftImg} onClick={this.magnifyImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" />}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="驾驶证右面照">
            { this.state.driverRightImg ? <a href={this.state.driverRightImg} target="_blank"><img src={this.state.driverRightImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" />}
            </FormItem>
          </Col>              
        </Row>      
        <Row>
          <Col span="8">
            <FormItem {...formItemLayout} label="驾驶证左面照">
            { this.state.leftBackImg ? <a href={this.state.leftBackImg} target="_blank"><img src={this.state.leftBackImg} onClick={this.magnifyImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" />}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="驾驶证右面照">
            { this.state.rightBackImg ? <a href={this.state.rightBackImg} target="_blank"><img src={this.state.rightBackImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" />}
            </FormItem>
          </Col>              
        </Row>                              
      </div>
    </Form>
    );
  }
});
Tab3 = createForm()(Tab3);
export default Tab3;