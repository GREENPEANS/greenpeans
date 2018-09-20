import React from 'react';
import { Row, Col } from 'antd';
import './style.css';
import SeachForm2 from './SeachForm2';
import SeachFormx from './SeachFormx';
import Bar1 from './Bar1';
import Bar2 from './Bar2';
import Bar3 from './Bar3';
var Reflux = require('reflux');
var AppActions = require('../../frame/actions/AppActions');
var UserMessageStore = require('../../frame/stores/UserMessageStore');
export default React.createClass({
    mixins: [
        Reflux.connect(UserMessageStore, "userMessage")
    ],
    getInitialState() {
        return {
            menuData: [],
            assetsData: {},
            investmentData: {},
            loading: false,
            data: [],
            data3: [],
            userMessage: {},
            change: true
        }
    },
    passParams2(params) {
	    this.setState({
	      data3: params
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
            url: '/modules/manage/count/certificationRatio.htm?params='+params,
            method: "get",
            callback: (result) => {
                //console.log(result.data);
                me.setState({
                    loading: false,
                    data: result.data,
                    data3: result.data3,
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
        var { data,data3,change } = this.state;
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
			        	<SeachForm2 passParams2={this.passParams2}/>
				    </div>
	                <div className='blk-top-change'>
	                	 <div>
	                    	<Bar3 data={data3} />
	                    </div>
	                </div>
		        </div>
            </div>
        )
    }
});