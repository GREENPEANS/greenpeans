import React from 'react';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Tree,
    TreeSelect,
    Row,
    Col,
    textarea
} from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const objectAssign = require('object-assign');

var AddWin = React.createClass({
    getInitialState() {
        return {
            status: {},
            loading: false,
            formData: {},
            tableNameList:"",
            tableCommentList:"",
            data:"",
            dataArray:[],
            tableName:"",
            canEdit:true,
            dataArr:[],
            dataRecord:"",
            dataName:[],
            values:"",
            tableComment:"",
            Msg:""
        };
    },
  handleCancel() {
        //console.log(11111111111)
        this.props.form.resetFields();
        this.props.hideModal();
          this.setState({
            tableName:"",
            canEdit:true,
            dataArr:[],
            dataRecord:"",
            dataName:[]   
        })  
    },
    componentWillReceiveProps(nextProps, nextState) {
  },

  handleOk() {
        var me = this;
        this.props.form.validateFields((errors, values) => {
         var paramsData=this.props.form.getFieldsValue();
         if(this.props.title=="推送消息"){
            var url= '/modules/manage/appPush/PushToApp.htm';
            var params=paramsData;
         }  
            Utils.ajaxData({
              url: url,
              data: {
                  'userId': paramsData.id,
                  'Msg': paramsData.Msg
              },
              loading:true,
              method: 'post',
              callback: (result) => {
                 if(result.code=="200"){
                    Modal.success({
                            title: result.msg,
                            onOk: () => {
                                this.handleCancel();
                            }
                        });
                 }else{
                     Modal.error({
                            title: result.msg,
                            onOk: () => {
                                this.handleCancel();
                            }
                        });
                 }
            }
          });     
        })
    },
      change(value){
          var dataArray=[];
          this.props.form.resetFields();
          this.props.dataTable.forEach((item)=>{
              if(item.tableName==value){
                   this.setState({
                    tableName:item.tableName,
                    tableComment:item.tableComment,
                })
                item.children.forEach((item,i)=>{
                     dataArray.push(<Option key={i} value={item.columnName}>{item.columnComment}</Option>) ;
                  })    
              }
          })

        this.setState({
            dataArray:dataArray,
            canEdit:false,
            values:value
        })
      },
    select(value){    
        
         this.props.dataTable.forEach(item=>{
             if(item.tableName==this.state.values){
                 item.children.forEach(item=>{
                 if(item.columnName==value){
                    this.state.dataArr.push(item);
                 }
             })
             }  
         }) 
      },
    render() {
        const {
            getFieldProps
        } = this.props.form;
        var props = this.props;
        var state = this.state;
        var modalBtns = [
            <Button key="back" className="ant-btn" onClick={this.handleCancel}>返 回</Button>,
            <Button key="button" className="ant-btn ant-btn-primary" loading={state.loading}  onClick={this.handleOk}>
                提 交
            </Button>
        ];
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            },
        };
         const formItemLayoutone = {
            labelCol: {
                span:8
            },
            wrapperCol: {
                span: 16
            },
        };
        let data=this.state.data;
        const tProps={
           data,
        }
        return (
             <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="900" footer={modalBtns} maskClosable={false} >
                <div style={{ position: "relative" }}>
                    <Form horizontal form={this.props.form} style={{ marginTop: "20px" }}>
                       <Input  {...getFieldProps('id', { initialValue: this.state.dataRecord.id }) } type="hidden" />
                            <Row>
                                <Col span="10">
                                    <FormItem  {...formItemLayout} label="推送内容:">
                                    	 <textarea  type="text" disabled={false} style={{textAlign: "left",height:"132px",width:"439px",borderRadius:"3px",border:"1px solid #DCDCDC"}} {...getFieldProps('Msg', {initialValue: ''}) }/>
                                    	</FormItem>
                                </Col>
                                <Input disabled={true}  type="hidden" {...getFieldProps('id', { initialValue: this.props.record.id}) }/>
                            
                            </Row>
                    </Form>
                </div>
            </Modal>
        );
    }
});
AddWin = createForm()(AddWin);
export default AddWin;
