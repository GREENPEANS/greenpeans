import React from 'react';
import antd from 'antd';
var Validation = antd.Validation;
var Validator = Validation.Validator;   
var Select = antd.Select;
var Option = Select.Option;
var Modal = antd.Modal;  
var Reflux = require('reflux'); 
var reqwest = require('reqwest');
var  FormStore = require('../stores/FormStore');
var  Actions = require('../actions/Actions');

function cx(classNames) {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}
export default React.createClass({
  mixins: [ 
      Reflux.connect(FormStore, 'formData'),
      Validation.FieldMixin
    ], 
  getInitialState() {
    return {
        typeList:[],
        status: { 
          type:{},
          source:{}
        }, 
        formData:{} 
      };
  },
  getDefaultProps(){
    return 
    {
      title:this.props.title;
    }
  },  
  changeValue(e) { 
      var newValue = this.state.formData;
      var name = e.target.name;
      newValue[name] = e.target.value;
      this.setState({formData:newValue});
  }, 
  selectChange(name,value) { 
    var newValue = this.state.formData; 
      newValue[name] = value; 
      //console.log(value);
    this.setState({formData:newValue});
  }, 
  handleOk() {
    var status = 'create',
        validation = this.refs.validation;    
        validation.validate((valid) => {
          if (!valid) {
            //console.log('error in form');
            return;
          } else {
             if(this.props.title=="新增")
              { 
                status = 'create';
              }
              else if(this.props.title=="修改")
              {
                status = 'update';
              }
             var postData={};
             var selectRecord= this.props.selectRecord;
             var formData=this.state.formData;
             if(this.props.title=="修改"){
             postData.id=String(formData.id);
             }
             postData.name=formData.name;
             postData.type=formData.type;
             postData.content=formData.content;
               reqwest({
                        url: '/modules/system/action/addSysMsgTemplate.htm',
                        method: 'post', 
                        data:{
                          template:JSON.stringify(postData),
                          status:status
                        },
                        type: 'json',
                        success: (result) => {
                          if(result.code==200)
                          {
                            Modal.success({
                              title: result.msg
                            });
                           Actions.initStore();
                           this.props.hideAddModal();
                          }
                          else if(result.code==500)
                          {
                            Modal.error({
                              title: result.msg
                            }); 
                            this.setState({
                              loading:false
                            });
                          }
                        }
                      }); 
          } 
        }); 
  },
  handleCancel() {
    this.props.hideAddModal();
  },
  handleReset() {
    this.refs.validation.reset();
    this.setState(this.getInitialState()); 
  },
  renderValidateStyle(item, hasFeedback=true) {
    var formData = this.state.formData;
    var status = this.state.status;

    var classes = cx({
      'has-feedback': hasFeedback,
      'has-error': status[item].errors,
      'is-validating': status[item].isValidating,
      'has-success': formData[item] && !status[item].errors && !status[item].isValidating
    });

    return classes;
  },
  componentDidMount() { 
      var me = this ;
      reqwest({
              url: '/modules/manage/system/dict/cache/list.htm?type=MSG_TEMPLATE_TYPE',
              method: 'get', 
              type: 'json',
              success: (result) => {
                var items  = result.MSG_TEMPLATE_TYPE.map((item)=>{
                    return (<Option key={item.value} value={String(item.value)}>{item.text}</Option>);
                  });
                 me.setState({typeList:items});
              }
            });
  },
  render() {  
    var state = this. state; 
    var formData = state.formData;
    var status = state.status;
    var props = this.props;
    var canEdit = !props.canEdit||(props.title=="修改"?true:false);
    return(
    <Modal title={props.title} visible={props.visible} onOk={this.handleOk} onCancel={this.handleCancel} width="600"
      footer={[
          <button key="back" className="ant-btn" onClick={this.handleCancel}>返 回</button>,
          <button key="submit" className="ant-btn ant-btn-primary" loading={this.state.loading} onClick={this.handleOk}>
            提 交
          </button>
        ]} >  
        <form className="ant-form-horizontal" ref="myform">
          <Validation ref="validation" onValidate={this.handleValidate}> 
            
                <div className="ant-form-item">
                      <label className="col-4"  htmlFor="name" required>模板名称：</label>
                      <div className="col-8">
                          <input className="ant-input" type="text" disabled={!props.canEdit}  name="name" value={formData.name} onChange={this.changeValue}/>
                      </div> 
                      <label className="col-4"  htmlFor="type" required>模板类型：</label>
                      <div className="col-8">
                        <div className={this.renderValidateStyle('type', false)}>
                          <Validator rules={[{required: true, message: '必填'}]}>
                            <Select size="large"  disabled={!props.canEdit} style={{width:"100%"}} name="type" value={formData.type} onSelect={this.selectChange.bind(this, 'type')}>
                                {state.typeList}
                            </Select> 
                          </Validator>
                              {status.type.errors ? <div className="ant-form-explain">{status.type.errors.join(',')}</div> : null}
                        </div>
                      </div>
                </div>  

                <div className="ant-form-item">
                      <label  className="col-4"  htmlFor="content" required>内容：</label>
                      <div className="col-20">
                         <textarea className="ant-input" type="text" disabled={!props.canEdit} style={{height:80,resize:"none"}} name="content" value={formData.content} onChange={this.changeValue}/>
                      </div>
                </div>
          </Validation>
        </form> 
    </Modal> 
    )
  }
});