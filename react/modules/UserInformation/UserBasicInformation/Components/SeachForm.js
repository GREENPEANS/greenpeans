import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Icon,
  Tooltip
} from 'antd';
import AddBtn from './AddBtn';
const createForm = Form.create;
const FormItem = Form.Item;

let SeachForm = React.createClass({
  getInitialState() {
        return {
            
        }
    },
  handleQuery() {
    var params = this.props.form.getFieldsValue();
    if(params.registTime == ""){

      params.registTime = undefined
    }else{
      params.registTime = (DateFormat.formatDate(params.registTime)).substring(0,10);
    }
    if(params.realName){
    	params.realName = params.realName.replace(/\s+/g, "") 
    }
    this.props.passParams({
      searchParams : JSON.stringify(params),
      pageSize: 10,
      current: 1,
    });
  },
  
  handleReset() {
    this.props.form.resetFields();
    this.props.passParams({
    	pageSize: 10,
      current: 1,
    });
  },
  componentDidMount() {
    //this.fetch();
  },
  // fetch(){
  //   Utils.ajaxData({
  //     url: '/modules/manage/promotion/channel/listChannel.htm',
  //     callback: (result) => {
  //       this.setState({
  //         data: result.data,
  //       });
  //     }
  //   });
  // },
 
  render() {
    const {
      getFieldProps
    } = this.props.form;
    return (
      <Form inline >
        <FormItem label="手机号码：">
          <Input  {...getFieldProps('loginName') } />
        </FormItem>
        <FormItem label="用户姓名：">
          <Input  {...getFieldProps('userRealName') } />
        </FormItem>
        <FormItem label="注册时间：">
            <DatePicker allowClear = {false}    {...getFieldProps('registTime', { initialValue: '' }) } style = {{width : 229}} />
        </FormItem>      
        <FormItem>
          <Tooltip placement="bottomLeft" title="查询" >
            <Button type="primary" onClick={this.handleQuery}><i className="icon iconfont icon-monitor"></i></Button>
          </Tooltip>
        </FormItem>
        <FormItem>
          <Tooltip placement="bottomLeft" title="重置菜单" >
          <Button type="reset" onClick={this.handleReset}><i className="icon iconfont icon-sync"></i></Button>
          </Tooltip>
        </FormItem>
        <FormItem>
          <AddBtn name="推送" title="推送信息"></AddBtn>
        </FormItem>
      </Form>
    );
  }
});

SeachForm = createForm()(SeachForm);
export default SeachForm;