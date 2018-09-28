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
          params.startTime = (DateFormat.formatDate(params.Time[0])).substring(0,10);
          params.endTime = (DateFormat.formatDate(params.Time[1])).substring(0,10);         
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
        <FormItem label="订单号码：">
          <Input  {...getFieldProps('orderNo') } />
        </FormItem>
        <FormItem label="手机号码：">
          <Input  {...getFieldProps('phone') } />
        </FormItem>
        <FormItem label="订单状态:">
          <Select style={{ width: 150 }} {...getFieldProps('orderStatus')} placeholder='请选择...'>
          <Option value="">全部</Option>
                <Option value="0">待支付</Option>
                <Option value="1">已支付</Option>
                <Option value="2">还款中</Option>
                <Option value="3">支付失败</Option>
                <Option value="4">保单受理中</Option>
                <Option value="7">退保已处理</Option>
          </Select>
        </FormItem>
        <FormItem label="逾期状态:">
          <Select style={{ width: 100 }} {...getFieldProps('isOverdue')} placeholder='请选择...'>
              <Option value="0">未逾期</Option>
              <Option value="1">逾期</Option>
          </Select>
        </FormItem>
        <FormItem label="还款日期：">
          <RangePicker showTime format="yyyy/MM/dd HH:mm:ss"  disabledDate={this.disabledDate} {...getFieldProps('Time', { initialValue:'' }) } />
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