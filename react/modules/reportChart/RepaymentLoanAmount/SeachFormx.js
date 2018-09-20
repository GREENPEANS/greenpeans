import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

let SeachFormx = React.createClass({
  getInitialState() {
        return { 
        }
    },
  handleOut() {
        var params = this.props.form.getFieldsValue();
        var time = params.time;
        if(time){
        time = new Date(time.getFullYear(), time.getMonth(), time.getDate() + 14);
        	time = (DateFormat.formatDate(time)).substring(0,10);
        }
		Utils.ajaxData({
            url: '/modules/manage/count/RepaymentLoanAmount.htm?params='+time,
            method: "get",
            callback: (result) => {
                this.props.passParamsx(result.data)
            }
        });
    },
    disabledDate(startValue) {
        var d = new Date();
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 14);
        return d < startValue.getTime();
    },
  render() {
    const {getFieldProps} = this.props.form;
    var date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 14);
    return (
      <Form inline >
      	<FormItem label="日期:">
      	    <DatePicker format="yyyy-MM-dd" disabledDate={this.disabledDate} {...getFieldProps('time', { initialValue: date }) } />
             </FormItem>
        <FormItem>
        	<Button onClick={this.handleOut}>查询</Button>
        </FormItem>
      </Form>
    );
  }
});

SeachFormx = createForm()(SeachFormx);
export default SeachFormx;