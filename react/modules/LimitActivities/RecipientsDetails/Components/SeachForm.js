import React from 'react';
import {Button, Form, Input, Select,DatePicker,Tooltip } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

let SeachForm = React.createClass({
    getInitialState() {
        return {
            roleList: []
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
            search: JSON.stringify(params),
            pageSize: 10,
            current: 1,
        });
    },
    handleReset() {
        this.props.form.resetFields();
        this.props.passParams({
            search: '',
            pageSize: 10,
            current: 1,
        });
    },
    render() {

        const {getFieldProps} = this.props.form;

        return (
            <Form inline>
                <FormItem label="使用状态：">
                    <Select style={{ width: 200 }} {...getFieldProps('status')} placeholder='请选择...'>
                        <Option value="0">未使用</Option>
                        <Option value="1">使用</Option>
                    </Select>
                </FormItem>
                <FormItem label="领取时间：">
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