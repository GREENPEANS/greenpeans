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
var Tab6 = React.createClass({
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
        userId: this.props.record.id,
      }
    Utils.ajaxData({
      url: '/user/auth/getUserAuthDetail.htm',
      data: params,
      callback: (result) => {
        if (result.code == 200) {
          let data = result.data.userInfo;
          this.setState({
            idNo: data.idNo,
            idAddr: data.idAddr,
            liveImg: data.liveImg,
            idFrontImg: data.idFrontImg,
            idBackImg: data.idBackImg,
            idBackImg: data.idBackImg,
            recordSoure: result.data.userInfo,
            email: data.email
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
              <h2>身份证认证状态显示</h2>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="身份证号">
                    <Input value = {this.state.idNo} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="身份证地址">
                    <Input  value = {this.state.idAddr} disabled  title={this.state.idAddr}/>
                  </FormItem>
                </Col>        
                <Col span="8">
                  <FormItem {...formItemLayout} label="邮箱">
                    <Input value = {this.state.email} disabled />
                  </FormItem>
                </Col>       
              </Row>
             
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="人脸识别照片">
                  { this.state.liveImg ? <a href={this.state.liveImg} target="_blank"><img src={this.state.liveImg} style={{ width: 150, height: 150 }} /></a> : <Input  value = "暂无" disabled />}
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="身份证头像">
                  { this.state.idFrontImg ? <a href={this.state.idFrontImg} target="_blank"><img src={this.state.idFrontImg} style={{ width: 230 }} /></a> : <Input  value = "暂无"  disabled/>}
                  </FormItem>
                </Col>              
              </Row>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="身份证正面">
                  { this.state.idBackImg ? <a href={this.state.idBackImg} target="_blank"><img src={this.state.idBackImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" disabled/>}
                  </FormItem>
                </Col>
              </Row>
                                        
            </div>
          </Form>
    );
  }
});
Tab6 = createForm()(Tab6);
export default Tab6;