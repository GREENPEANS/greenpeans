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

let SeachForm2 = React.createClass({
  getInitialState() {
        return { 
        data3: [],
        }
    },
  handleOut() {
        var params = this.props.form.getFieldsValue();
        if(params.time){
        	params.time = (DateFormat.formatDate(params.time)).substring(0,10);
        }
        var json = JSON.stringify(params);
		Utils.ajaxData({
            url: '/modules/manage/count/loanAndRepaymentLeijiVariety.htm?params='+json,
            method: "get",
            callback: (result) => {
                this.props.passParams2(result.data3)
            }
        });
    },
    disabledDate(startValue) {
        return startValue.getTime() > Date.now();
    },
  render() {
    const {getFieldProps} = this.props.form;
    var date = new Date();
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

SeachForm2 = createForm()(SeachForm2);
export default SeachForm2;