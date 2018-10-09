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
var Tab8 = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.activeKey == '8'){
     
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
      url: '/user/auth/getUserBaseInfo.htm',
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
    return (
          <Form horizontal form={this.props.form} style={{marginTop:'20'}}>           
            <div className="navLine-wrap-left">
              <h2  className="margin">邮箱认证状态显示</h2>
              <Row>               
                <Col span="8">
                  <FormItem {...formItemLayout} label="邮箱">
                    <Input value = {this.state.email} disabled />
                  </FormItem>
                </Col>       
              </Row>
             
               
            </div>
          </Form>
    );
  }
});
Tab8 = createForm()(Tab8);
export default Tab8;