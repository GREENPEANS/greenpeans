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
            tableComment:""
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

      if(nextProps.title=="编辑"){
          //console.log("999999",this.state.data);
       var dataArray=[];
           nextProps.dataTable.forEach(item=>{
              if(item.tableName==nextProps.dataRecord.tbNid){
                item.children.forEach((item1,i)=>{
                     //console.log("88888888888",item1.columnName);
                     dataArray.push(<Option key={i} value={item1.columnComment} >{item1.columnComment}</Option>) ;
                  })    
              }
          })
        this.setState({
            dataRecord:nextProps.dataRecord,
            dataName:nextProps.dataName,
            dataArray:dataArray,
        })
      }
       
  },

  handleOk() {
        var me = this;
        var columndata=this.state.dataArr;
        var validation = this.props.form.validateFields;
        this.props.form.validateFields((errors, values) => {
         var paramsData=this.props.form.getFieldsValue();
         if(this.props.title=="修改姓名"){
            var url= '/modules/manage/user/updateUserName.htm';
            var params=paramsData;
         }  
            Utils.ajaxData({
              url: url,
              data: {
                  'userId': paramsData.id,
                  'userName': paramsData.realName
              },
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
                                    <FormItem  {...formItemLayout} label="姓名:">
                                    	<Input type="text" disabled={false} {...getFieldProps('realName', {initialValue:this.props.record.realName})} />
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
