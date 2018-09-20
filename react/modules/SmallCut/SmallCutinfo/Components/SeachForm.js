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
    if(params.Time){
    	if(params.Time[0]){
    		if(params.Time[1]){
            params.startTime = (DateFormat.formatDate(params.Time[0]));
            params.endTime = (DateFormat.formatDate(params.Time[1]));   	
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
          <Input  {...getFieldProps('hzOrder') } />
        </FormItem>
        <FormItem label="用户名：">
          <Input  {...getFieldProps('userName') } />
        </FormItem>
        <FormItem label="审核状态：">
            <Select style={{ width: 150 }} {...getFieldProps('status')} placeholder='请选择...'>
                <Option value="">全部</Option>
                <Option value="0">审核中</Option>
                <Option value="1">审核通过</Option>
                <Option value="2">审核未通过</Option>
            </Select>
        </FormItem>
        <FormItem label="发放时间：">
          <RangePicker showTime format="yyyy/MM/dd HH:mm:ss"  disabledDate={this.disabledDate} {...getFieldProps('Time', { initialValue:'' }) } />
          {/* <RangePicker/> */}
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