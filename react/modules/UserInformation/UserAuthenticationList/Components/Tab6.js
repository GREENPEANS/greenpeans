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
        userId: this.props.record.userId,
      }
    Utils.ajaxData({
      url: '/modules/manage/userAuth/userIdCardDetail.htm',
      data: params,
      callback: (result) => {
        if (result.code == 200) {
          this.setState({idNo: result.data.idNo});
          this.setState({idAddr: result.data.idAddr});
          this.setState({liveImg: result.data.liveImg});
          this.setState({idFrontImg: result.data.idFrontImg});
          this.setState({idBackImg: result.data.idBackImg});

          this.setState({recordSoure: result.data })
        }else if(result.code == 400){                   
          this.setState({idNo: ""});
          this.setState({idAddr: ""});
         
          this.setState({recordSoure: ""});
          this.setState({idBackImg: ""});
          this.setState({idFrontImg: ""});
          this.setState({liveImg: ""});
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
                  <FormItem {...formItemLayout} label="身份证号">
                    <Input value = {this.state.idNo} disabled />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem {...formItemLayout} label="身份证地址">
                    <Input  value = {this.state.idAddr} disabled  title={this.state.idAddr}/>
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