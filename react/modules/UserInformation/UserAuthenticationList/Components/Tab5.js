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
var Tab5 = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    this.setState({
      userId:nextProps.record.id
    })
    if(nextProps.activeKey == '5'){
      // this.setState({
      //   userId:nextProps.record.id
      // })
      this.fetch();
    }
  },
  componentDidMount(){
    this.fetch();
  },
  fetch(params = {}) {
    var me = this;
    var params = {};
      params = {
        userId: this.state.id,
    }
    Utils.ajaxData({
      url: '/user/auth/getUserAuthDetail.htm',
      data: params,
      callback: (result) => {
        if (result.code == 200) {
          console.log("12222成功")
          this.setState({
            drivingName: result.data.drivingInfo.drivingName,
            drivingCarType: result.data.drivingInfo.drivingCarType,
            drivingAddr: result.data.drivingInfo.drivingAddr,
            drivingPurpose: result.data.drivingInfo.drivingPurpose,
            drivingBrand: result.data.drivingInfo.drivingBrand,
            drivingRegistDate: result.data.drivingInfo.drivingRegistDate,
            drivingLeftImg: result.data.drivingInfo.drivingLeftImg,
            rivingRightImg: result.data.drivingInfo.rivingRightImg,
          })
         console.log(this.state.drivingLeftImg)
        }
      }
    });
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
              {/* <h2>银行卡认证状态显示</h2> */}
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="行驶证姓名：">
                    <Input value = {this.state.driverName}  />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="车辆类型：">
                    <Input  value = {this.state.driverName} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="车辆持有人：">
                    <Input value = {this.state.drivingMan}   disabled />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="地址：">
                    <Input value = {this.state.drivingAddr} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="	使用性质：">
                    <Input  value = {this.state.drivingPurpose} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="	品牌型号：">
                    <Input value = {this.state.drivingBrand} disabled />
                  </FormItem>
                </Col>
              </Row>            
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="车辆识别码：">
                    <Input  value = {this.state.drivingCarCode} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="	发动机号码：">
                    <Input   value = {this.state.drivingEngineCode} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="	注册日期：">
                    <Input   value = {this.state.drivingRegistDate} disabled />
                  </FormItem>
                </Col>
               
              </Row>        
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="发证日期：">
                    <Input   value = {this.state.drivingSendDate} disabled />
                  </FormItem>
                </Col>
                
              </Row> 
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="行驶证左面照">
                  <img src={this.state.drivingLeftImg} style={{ width: 230 }} />  
                    {this.state.drivingLeftImg ? <a href={this.state.drivingLeftImg} target="_blank"><img src={this.state.drivingLeftImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" disabled />}
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="行驶证右面照">
                    {this.state.rivingRightImg ? <a href={this.state.rivingRightImg} target="_blank"><img src={this.state.rivingRightImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" disabled />}
                  </FormItem>
                </Col>              
              </Row>                          
            </div>
          </Form>
    );
  }
});
Tab5 = createForm()(Tab5);
export default Tab5;