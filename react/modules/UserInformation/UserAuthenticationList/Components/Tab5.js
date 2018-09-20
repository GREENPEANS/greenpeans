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
    if(nextProps.activeKey == '5'){
     
      this.fetch();
    }
  },
  componentDidMount(){
    
    this.fetch();
  },
  fetch(params = {}) {
    this.setState({
      loading: true
    });
    var params = {};
      params = {
        userId: this.props.record.userId,
      }
    Utils.ajaxData({
      url: '/modules/manage/userAuth/userDrivingCardAtteDetail.htm',
      data: params,
      callback: (result) => {
        if (result.code == 200) {
          this.setState({drivingName: result.data.drivingName});
          this.setState({drivingCarType: result.data.drivingCarType});
          this.setState({drivingMan: result.data.drivingMan});
          this.setState({drivingAddr: result.data.drivingAddr});
          this.setState({drivingPurpose: result.data.drivingPurpose});
          this.setState({drivingBrand: result.data.drivingBrand});
          this.setState({drivingCarCode: result.data.drivingCarCode});
          this.setState({drivingEngineCode: result.data.drivingEngineCode});
          this.setState({drivingRegistDate: result.data.drivingRegistDate}); 
          this.setState({drivingLeftImg: result.data.drivingLeftImg});
          this.setState({drivingRightImg: result.data.drivingRightImg}); 

          this.setState({recordSoure: result.data });
          this.setState({drivingSendDate: result.data.drivingSendDate}); 
        }else if(result.code == 400){                   
          this.setState({drivingName: ""});
          this.setState({drivingCarType: ""});
          this.setState({drivingMan: ""});
          this.setState({drivingAddr: ""});
          this.setState({drivingPurpose: ""});
          this.setState({drivingBrand: ""});
          this.setState({drivingCarCode: ""});
          this.setState({drivingEngineCode: ""});
          this.setState({drivingRegistDate: ""});        
          this.setState({drivingSendDate: ""});
          this.setState({recordSoure: ""});
          this.setState({drivingLeftImg: ""})
          this.setState({drivingRightImg: ""})
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