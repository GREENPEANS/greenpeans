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
const RangePicker = DatePicker.RangePicker;

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
    if(params.Time){
    	if(params.Time[0]){
    		if(params.Time[1]){
          params.oveStartTime = (DateFormat.formatDate(params.Time[0]));
          params.oveEndTime = (DateFormat.formatDate(params.Time[1]));   	
    		}
    		}
      }
    delete params.Time;  
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
  render() {
    const {
      getFieldProps
    } = this.props.form;
    return (
      <Form inline >
        <FormItem label="订单号码：">
          <Input  {...getFieldProps('orderNo') } />
        </FormItem>
        <FormItem label="手机号码：">
          <Input  {...getFieldProps('phone') } />
        </FormItem>
        <FormItem label="订单状态:">
          <Select style={{ width: 150 }} {...getFieldProps('orderStatus')} placeholder='请选择...'>
              <Option value="">全部</Option>
              <Option value="0">待放款</Option>
              <Option value="1">放款中</Option>
              <Option value="2">待还款</Option>
              <Option value="3">还款失败</Option>
              <Option value="4">还款中</Option>
              <Option value="5">还款成功</Option>
              <Option value="6">还款失败</Option>
          </Select>
        </FormItem>
        <FormItem label="还款日期：">
          <RangePicker showTime format="yyyy/MM/dd HH:mm:ss"  {...getFieldProps('Time', { initialValue:'' }) } />
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