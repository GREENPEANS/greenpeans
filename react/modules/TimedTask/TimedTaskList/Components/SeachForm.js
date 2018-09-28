import React from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    Radio,
    Tooltip
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
//import ComboData from '../../../utils/ComboData';
//var ProductTypeList = ComboData.getCombo('PRODUCT_TYPE');
//var borrowTypeList = ComboData.getCombo('BORROW_TYPE');
let SeachForm = React.createClass({
    getInitialState() {
        return {
            roleList: []
        }
    },
    handleQuery() {
        var params = this.props.form.getFieldsValue();
        this.props.passParams({
            search:JSON.stringify(params),
            pageSize: 10,
            current: 1
        });
    },
    handleReset() {
        this.props.form.resetFields();
        this.props.passParams({
            search:JSON.stringify({name: ''}),
            pageSize: 10,
            current: 1
        });
    },
    render() {
        const {
            getFieldProps
        } = this.props.form;
        return (
            <Form inline>
                <FormItem label="任务名:">
                    <Input type="text" {...getFieldProps('name') } />
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
export default SeachForm;/**
 * Created by WIN10 on 2016/10/12.
 */
