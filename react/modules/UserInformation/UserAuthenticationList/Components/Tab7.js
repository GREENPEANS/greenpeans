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
var Tab7 = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.activeKey == '7'){
     
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
      url: '/user/auth/getUserPolicyEmsInfo.htm',
      data: params,
      callback: (result) => {
        if (result.code == 200) {
          let data = result.data.policyEmsInfo;
          this.setState({
            emsNumberImg: data.emsNumberImg,
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
              <h2 className="margin">保单邮递认证状态</h2>
              <Row>
                <Col span="8">
                  <FormItem {...formItemLayout} label="快递单图片：">
                  { this.state.emsNumberImg ? <a href={this.state.emsNumberImg} target="_blank"><img src={this.state.emsNumberImg} style={{ width: 230 }} /></a> : <Input  value = "暂无" disabled/>}
                  </FormItem>
                </Col>
              </Row>
                                        
            </div>
          </Form>
    );
  }
});
Tab7 = createForm()(Tab7);
export default Tab7;