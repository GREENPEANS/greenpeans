import React from 'react';
import {Icon,Modal,Tooltip } from "antd";
var Reflux = require('reflux');
var reqwest = require('reqwest');
 var AppActions = require('./actions/AppActions');
 var UserMessageStore = require('./stores/UserMessageStore');
import AddWin from '../forgetPwd'
const Top = React.createClass({
   mixins: [
     Reflux.connect(UserMessageStore, "userMessage")
   ],
  getInitialState() {
    return {
      userMessage: {},
      formData: {},
    };
  },
  toggleMenu(){
    this.props.toggleMenu();
  },
   handleClick(e){
     reqwest({
       url: '/system/user/switch/role.htm',
       method: 'get',
       data: {
         role: e
       },
       type: 'json',
       success: (result) => {
         location.reload();
       }
     });
   },
  signOut(e){ 
    let req = new XMLHttpRequest();
    Utils.ajaxData({
      url: '/system/user/logout.htm',
      contentType: 'application/x-www-form-urlencoded',
      callback:(result) =>{
        if (result.code == 200) {
          localStorage.clear();
          location.reload();      
        } else {
          Modal.error({
            title: result.msg
          })
        }
       }
    });
    
  },
  showModal() {
    this.setState({
      visible: true,
      title:"修改密码",
    });
  },
  handleOk() {
    var me = this;
    reqwest({
      url: '/modules/system/modifyPassword.htm',
      method: 'post',
      data: {
        user: JSON.stringify(me.state.formData)
      },
      type: 'json',
      success: (result) => {
        if (result.code == 200) {
          Modal.success({
            title: result.msg,
            onOk: function() {
              me.setState({
                visible: false
              });
              window.location.href = "/j_spring_security_logout";
            }
          });
        }
        else {
          Modal.error({
            title: result.msg
          });
        }
      }
    });
  },
  handleCancel() {
    this.setState({
      visible: false
    });
  },
  changeValue(e) {
    var newValue = this.state.formData;
    var name = e.target.name;
    newValue[name] = e.target.value;
    this.setState({formData: newValue});
  },
   componentDidMount() {
     AppActions.initUserMessageStore();
   },
  hideModal() {
    this.setState({
      visible: false,
      title:"",
    });
  },
  render(){
    var fold = this.props.fold;
    var me = this;
    var formData = this.state.formData;
     this.props.setRoleName(this.state.userMessage.rolename);
    var modalBtns = [
      <button key="back" type="button" className="ant-btn" onClick={this.handleCancel}>返 回</button>,
      <button key="button" type="button" className="ant-btn ant-btn-primary" loading={this.state.loading}
              onClick={this.handleOk}>
        提 交
      </button>
    ];
    
     var userMessage = this.state.userMessage;
    var roleList;
    if (userMessage.roleList) {
       roleList = userMessage.roleList.map((role) => {
         return <a key={role.id} onClick={this.handleClick.bind(this,role.id)}>{role.name}</a>
       });
     }
     var toggleRole = (<div> {roleList} </div>);

    return (
      <div className="main-header">
        <div className="logo">
          <span className="logo-mini"></span>
          <span className="logo-lg"></span>
        </div>
        <div className="navbar navbar-static-top">
          <a href="#" className="sidebar-toggle" onClick={this.toggleMenu}>
            <Icon type={`${ fold ? 'menu-unfold' : 'menu-fold'}`}/>
          </a>
          <div className="navbar-custom-menu">
            <div className="fn-right right-block">
              <a href="#"> 欢迎您，{ userMessage.name }</a>   
              <Tooltip   placement="bottom" title="注销">
                <a className="iconBg" onClick={this.signOut}>
                  <i className="icon iconfont icon-logout"></i> 
                </a>
              </Tooltip>          
             
              <Tooltip  placement="bottom" title="修改密码">
                <a className="iconBg" onClick={this.showModal.bind(this,userMessage.id)}>
                  <i className="icon iconfont icon-xiugaimima01"></i>
                </a>
              </Tooltip>
              
              <Tooltip placement="bottom" title={toggleRole}>
                <a className="iconBg">
                  <i className="icon iconfont icon-qiehuanjiaose"></i>
                </a>
              </Tooltip> 
            </div>

          </div>
        </div>

        <AddWin ref="AddWin"  visible={this.state.visible}    title={this.state.title} hideModal={me.hideModal} /> 
      </div>
    )
  }
});
export default Top;