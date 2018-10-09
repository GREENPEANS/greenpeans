import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Tooltip
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
let SeachForm = React.createClass({
  getInitialState() {
        return {
            
        }
    },
  handleQuery() {
    var params = this.props.form.getFieldsValue();
    if(params.realName){
      params.realName = params.realName.replace(/\s+/g, ""); 
    }
    if(params.registTimeComplete){
    	if(params.registTimeComplete[0]){
    		if(params.registTimeComplete[1]){
    	params.startTime = (DateFormat.formatDate(params.registTimeComplete[0])).substring(0,10);
    	params.endTime = (DateFormat.formatDate(params.registTimeComplete[1])).substring(0,10);
    	
    		}
    		}
      }
    this.props.passParams({
      search : JSON.stringify(params),
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
  disabledDate(startValue) {
      var today = new Date();
      return startValue.getTime() > today.getTime();
  },
  render() {
    const {
      getFieldProps
    } = this.props.form;
    return (
      <Form inline >
        <FormItem label="回租订单号码：">
          <Input  {...getFieldProps('orderNo') } />
        </FormItem>
        <FormItem label="手机号码：">
          <Input  {...getFieldProps('phone') } />
        </FormItem>
        <FormItem label="处理状态:">
          <Select style={{ width: 150 }} {...getFieldProps('status')} placeholder='请选择...'>
              <Option value="">全部</Option>
              {/* <Option value="0">待处理</Option> */}
              <Option value="1">已处理</Option>
              <Option value="2">已拒绝</Option>
              <Option value="3">待处理</Option>
              <Option value="4">未回递</Option>
          </Select>
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
      </Form>
    );
  }
});

SeachForm = createForm()(SeachForm);
export default SeachForm;