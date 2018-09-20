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
            roleList: []
        }
    },
  handleQuery() {
    var params = this.props.form.getFieldsValue();
    this.props.passParams({
      user : JSON.stringify(params),
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
       var me = this ;
       Utils.ajaxData({
        url: '/modules/manage/system/role/list.htm',
        method: 'post', 
        type: 'json',
        callback: (result) => {
          var items  = result.data.map((item)=>{
              return (<Option key={item.id} value={String(item.id)}>{item.name}</Option>);
            });
           me.setState({roleList:items});
        }
      });
    },
  render() {
    const {
      getFieldProps
    } = this.props.form;
    return (
      <Form inline >
            <FormItem label="设备名称：">
              <Input  {...getFieldProps('deviceName', { initialValue: ''})} />
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