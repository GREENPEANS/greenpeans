import React from 'react';
import { Row, Col } from 'antd';
import './style.css';
import Bar1 from './Bar1';
import Bar2 from './Bar2';
import Bar3 from './Bar3';
import SeachForm from './SeachForm';
import SeachFormx from './SeachFormx';
var Reflux = require('reflux');
var AppActions = require('../../frame/actions/AppActions');
var UserMessageStore = require('../../frame/stores/UserMessageStore');
export default React.createClass({
    mixins: [
        Reflux.connect(UserMessageStore, "userMessage")
    ],
    getInitialState() {
    	 var change = true;
         if (window.innerWidth < 1600) {
             change = false;
         }
        return {
        	menuData: [],
            assetsData: {},
            investmentData: {},
            loading: false,
            data: [],
            data2: [],
            userMessage: {},
            change: change,
            params: {}
        }
    },
    passParams(params) {
	    this.setState({
	      data2: params
	    });
	},
	passParamsx(params) {
	    this.setState({
	      data: params
	    });
	},
    fetch() {
        var me = this;
        this.setState({
            loading: true
        });   
        var time = new Date();  
        var params = (DateFormat.formatDate(time)).substring(0,10);      
        Utils.ajaxData({
            url: '/modules/manage/count/dayRepay.htm?params='+params,
            method: "get",
            callback: (result) => {
                //console.log(result.data);
                me.setState({
                    loading: false,
                    data: result.data,
                    data2: result.data2,
                });
            }
        });
    },
    onWindowResize(){
        if(document.getElementById('box').offsetWidth < 1376){
            this.setState({
                change: false
            })
        }else{
            this.setState({
                change: true
            })
        }
        this.forceUpdate();
    },
    componentDidMount() {
        AppActions.initUserMessageStore();
        this.fetch();
        window.addEventListener('resize', this.onWindowResize);
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    },
    render() {
        var { data,data2,change } = this.state;
        var userMessage = this.state.userMessage;
        return (
            <div id='box' style={{ minWidth: 820, display: userMessage.name&&userMessage.name!='代理商' ? 'block' : 'none' }}>
	            <div className="block-chart">
	            	<div className="block-panel seach-form">
				        <SeachFormx passParamsx={this.passParamsx}/>
				    </div>
		            <div className='blk-top-change'>
		                    <div>
		                        <Bar1 data={data} />
		                    </div>
		            </div>
		            <div className="dotted-line">	</div>
		            <div className='blk-top-change'>
			            <div>
			            	<Bar2 data={data} />
			            </div>
		            </div>
		            <div className="solid-line">	</div>
                    <div className="block-panel seach-form">
				        <SeachForm passParams={this.passParams}/>
				    </div>
                    <div className='blk-top-change'>
                    	 <div>
                        	<Bar3 data={data2} />
                        </div>
                    </div>
		        </div>
            </div>
        )
    }
});