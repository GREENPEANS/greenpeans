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
    
   // this.fetch();
  },
  fetch(params = {}) {
    var me = this;
    this.setState({
      loading: true
    });
    var params = {};
      params = {
        userId: this.props.record.userId,
      }
    Utils.ajaxData({
      url: '/modules/manage/userAuth/userDriverCardAtteDetail.htm',
      data: params,
      callback: (result) => {
        if (result.code == 200) {
          this.setState({driverName: result.data.driverName});
          this.setState({dirverLimiteDate: result.data.dirverLimiteDate});
          this.setState({dirverLicensedCarType: result.data.dirverLicensedCarType});
          this.setState({dirverGetCertDate: result.data.dirverGetCertDate});
          this.setState({dirverBorthDate: result.data.dirverBorthDate});
          this.setState({dirverAddr: result.data.dirverAddr});
          this.setState({dirverCountry: result.data.dirverCountry});
          this.setState({dirverSex: result.data.dirverSex});
          this.setState({driverName: result.data.driverName}); 
          this.setState({driverLeftImg: result.data.driverLeftImg});
          this.setState({driverRightImg: result.data.driverRightImg}); 
          
          this.setState({recordSoure: result.data })
        }else if(result.code == 400){
          var dataForm = {};                   
          this.setState({driverName: ""});
          this.setState({dirverLimiteDate: ""});
          this.setState({dirverLicensedCarType: ""});
          this.setState({dirverGetCertDate: ""});
          this.setState({dirverBorthDate: ""});
          this.setState({dirverAddr: ""});
          this.setState({dirverCountry: ""});
          this.setState({dirverSex: ""});
          this.setState({driverName: ""});         
          this.setState({recordSoure: ""});
          this.setState({driverLeftImg: ""});         
          this.setState({driverRightImg: ""})
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
              <Input value = {this.state.driverName} disabled />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="驾驶员性别：">
              <Input value = {this.state.dirverSex} disabled />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="所属国籍：">
              <Input value = {this.state.dirverCountry} disabled />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem {...formItemLayout} label="地址：">
              <Input value = {this.state.dirverAddr} disabled />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="	出生日期：">
              <Input value = {this.state.dirverBorthDate} disabled />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="	领证日期：">
              <Input value = {this.state.dirverGetCertDate} disabled />
            </FormItem>
          </Col>
        </Row>            
        <Row>
          <Col span="8">
            <FormItem {...formItemLayout} label="有限期效：">
              <Input  value = {this.state.dirverLimiteDate}  disabled />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem {...formItemLayout} label="	准驾车型：">
              <Input value = {this.state.dirverLicensedCarType} disabled />
            </FormItem>
          </Col>
         
        </Row> 
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
      </div>
    </Form>
    );
  }
});
Tab3 = createForm()(Tab3);
export default Tab3;