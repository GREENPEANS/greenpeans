import React from 'react'
import {
    Button,
    Form,
    Input,
    Select,
    Checkbox,
    Modal,
    Icon
} from 'antd';
import Config from './utils/Config';
import './login.css';
const FormItem = Form.Item;
const Option = Select.Option;
const IP = Config.ip;
let Login = React.createClass({
    getInitialState() {
        return {
            ischecked: 0,
            height:window.innerHeight,
            codeTitle:'获取验证码'//默认验证码文字
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                //console.log('Errors in form!!!');
                return;
            }
            var params = values;
            this.login(params);
        });
    },  
    login(params) {
        var me = this;
        Utils.aajaxData({
            url: '/system/user/login.htm', 
            contentType: 'application/x-www-form-urlencoded',
            data: params,
            callback: function(result) {
                if (result.code == 200) {               
                    localStorage.isLogin = true;
                    localStorage.sessionId = result.sessionId;
                    location.reload();
                } 
            }
        });
    },
   
    onWindowResize(){
        this.setState({
            height: window.innerHeight
        })
    },
    componentDidMount() {
        var username = Cookies.get("username"); 
        var password = Cookies.get("password"); 
        if (username) {
            this.props.form.setFieldsValue({ username,password });
        }
        window.addEventListener('resize', this.onWindowResize);
    },
    sendMessage(){
    	var username = document.getElementsByName("username")[0].value;
        var password = document.getElementsByName("password")[0].value;
        var countdown=60;
        var btn=document.getElementById("btn");
        if (username!=""&&password!="") {
        	Utils.ajaxData({
        		url: '/system/user/sendMessage/sendViliMessage.htm',
        		contentType: 'application/x-www-form-urlencoded',
        		data: {'username':username,'password':password},
        		callback:(result) =>{
        			 if (result.code == 200) {
        				 Modal.success({
                             title: result.msg,
                             onOk: ()=>{
                                 this.props.form.resetFields(['smscode']);
                             }
                         });
        			
        				this.settime(btn,countdown);
                     } else {
                         Modal.error({
                             title: result.msg,
                             onOk: ()=>{
                                 this.props.form.resetFields(['smscode']);
                             }
                         });
                         
                     }
        		 }
        	});
		}else
			{
			 Modal.error({
                 title: '请输入正确的账号和密码',
             });
		}
    },
    settime(btn,countdown){
    	if (countdown == 0) { 
    		btn.removeAttribute("disabled");
    		// btn.value="获取短信验证码";
            this.setState({
                codeTitle: "获取验证码"
            })
            countdown = 60;
        }
        else {
            if (countdown==60) {
    				btn.setAttribute("disabled", true); 
				}
            // btn.value="重新发送(" + countdown + ")";
            this.setState({
                codeTitle: "重新发送(" + countdown + ")"
            })
            countdown--;
        }
        setTimeout(function (){
    		if (countdown==0) {
    			btn.removeAttribute("disabled"); 
        		// btn.value="获取短信验证码";
                this.setState({
                    codeTitle: "获取验证码"
                })
    		}else
    			{
    			this.settime(btn,countdown) 
    		}
    	}.bind(this),1000);
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    },
    render() {
        const {
            getFieldProps
        } = this.props.form;
       
        return (
            <div>
                <div className="g-loginbox">
                    <div className="g-bd">
                        <div className="m-loginbg" style={{height:this.state.height}}></div>
                        <div className="m-bgwrap" style={{ cursor: "pointer" }}></div>
                        <div className="m-loginboxbg">
                            <div className="m-box">
                                <div className="m-box-left">
                                    <img src="./images/left_03.png" alt=""/>
                                </div>

                                <div className="m-box-right m-loginbox">
                                    <div className="lbinner" id="J_body_bg">
                                    <div className="login-form">
                                        <div className="login-hd"><span className="logo-mini"></span>{Config.name}</div>
                                        <div className="login_input">
                                            <Form inline-block onSubmit={this.handleSubmit} form={this.props.form}>
                                                <FormItem>
                                                    <i className="this_place icon iconfont icon-guanliyuan1"></i>
                                                    <Input type="text" className="ipt ipt-user" name="username" autoComplete="off"
                                                        {...getFieldProps('username', {
                                                            
                                                            rules: [{
                                                                required: true,
                                                                message: '请输入账户名'
                                                            }],
                                                            trigger: 'onBlur'
                                                        })
                                                        }
                                                        placeholder = "请输入管理员姓名" />
                                                </FormItem>
                                                <FormItem >
                                                    <i className="this_place icon iconfont icon-icon-"></i>
                                                    <Input type="password" className="ipt ipt-pwd" name="password" autoComplete="off"
                                                        {...getFieldProps('password', {
                                                            
                                                            rules: [{
                                                                required: true,
                                                                whitespace: false,
                                                                message: '请输入密码'
                                                            }],
                                                            trigger: 'onBlur'
                                                        })
                                                        }
                                                        placeholder="请输入登录密码"/>
                                                </FormItem>
                                                    <FormItem >
                                                        <Input type="text" className="ipt ipt-pwd1" name="code" autoComplete="off"
                                                        {...getFieldProps('smscode', {
                                                            rules: [{
                                                                required: true,
                                                                whitespace: false,
                                                                message: '请输入验证码'
                                                            }],
                                                            trigger: 'onBlur'
                                                        })
                                                        }
                                                        placeholder="验证码"/>
                                                    <input type="button" id="btn" className="imgCode" value={this.state.codeTitle} onClick={this.sendMessage}/>
                                                    </FormItem>
                                                <Button type="primary" size="large" className="ant-input u-loginbtn" htmlType="submit">登录</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="m-loginbox">
                            
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
})

Login = Form.create()(Login);
export default Login;