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
var Tab5 = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.activeKey == '5'){   
     // this.fetch();
    }
  },
  componentDidMount(){    
    this.fetch();
  },
  fetch(params = {}) {
    var params = {};
    params = {
      userId: this.props.record.id,
    }
    Utils.ajaxData({
      url: '/user/auth/getUserDrivingInfo.htm',
      data: params,
      callback: (result) => {
        if (result.code == 200) {
          let data = result.data.drivingInfo;
          this.setState({
            drivingName: data.drivingName,
            drivingCarType: data.drivingCarType,
            drivingMan: data.drivingMan,
            drivingAddr: data.drivingAddr,
            drivingPurpose: data.drivingPurpose,
            drivingBrand: data.drivingBrand,
            drivingCarCode: data.drivingCarCode,
            drivingEngineCode: data.drivingEngineCode,
            drivingRegistDate: data.drivingRegistDate,
            drivingLeftImg: data.drivingLeftImg,
            drivingRightImg: data.drivingRightImg,
            recordSoure: result.data.drivingInfo,
            drivingSendDate: result.data.drivingSendDate
          })
        }else if(result.code == 400){                   

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
              <h2  className="margin">行驶证认证状态显示</h2>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="行驶证姓名：">
                    <Input value = {this.state.drivingName} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="车辆类型：">
                    <Input  value = {this.state.drivingCarType} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="车辆持有人：">
                    <Input value = {this.state.drivingMan}  disabled />
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
                    <Input value = {this.state.drivingPurpose} disabled />
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
                    <Input value = {this.state.drivingCarCode} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="	发动机号码：">
                    <Input value = {this.state.drivingEngineCode} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="	注册日期：">
                    <Input value = {this.state.drivingRegistDate} disabled />
                  </FormItem>
                </Col>
               
              </Row>        
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="发证日期：">
                    <Input value = {this.state.drivingSendDate} disabled />
                  </FormItem>
                </Col>
                
              </Row> 
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="行驶证左面照">
                  { this.state.drivingLeftImg ? <a href={this.state.drivingLeftImg} target="_blank"><img src={this.state.drivingLeftImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" disabled />}
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="行驶证右面照">
                  { this.state.drivingRightImg ? <a href={this.state.drivingRightImg} target="_blank"><img src={this.state.drivingRightImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" disabled />}
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