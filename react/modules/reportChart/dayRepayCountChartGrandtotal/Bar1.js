import React from 'react';
var echarts = require('echarts');
require("echarts/theme/macarons.js");
export default React.createClass({
	getInitialState() {
        return {
            menuData: [],
            assetsData: {},
            investmentData: {},
            loading: false,
            data: [],
			item: [],
			data_onTimeRepayMoney: [],//当日按期还款金额
			item_onTimeRepayMoney: [],//当日按期还款金额
			data_repayMoneys1: [],//s1(逾期1-10天)还款金额
			item_repayMoneys1: [],//s1(逾期1-10天)还款金额
			data_repayMoneyLaters1: [],//s1(逾期大于10天)后还款金额
			item_repayMoneyLaters1: [],//s1(逾期大于10天)后还款金额
			data_needRepayMoney: [],//当日到期应还款金额
			item_needRepayMoney: [],//当日到期应还款金额
            first: true
        }
    },
	fetch(data) {
        var me = this;
		var data1_onTimeRepayMoney = [];
		var item1_onTimeRepayMoney = [];
		var item2_onTimeRepayMoney = [];
		var data1_repayMoneys1 = [];
		var item1_repayMoneys1 = [];
		var item2_repayMoneys1 = [];
		var data1_repayMoneyLaters1 = [];
		var item1_repayMoneyLaters1 = [];
		var item2_repayMoneyLaters1 = [];
		var data1_needRepayMoney = [];
		var item1_needRepayMoney = [];
		var item2_needRepayMoney = [];
		/**
		 * 总按期还款金额
		 */
		for (let item in data.fifteenDaysOnTimeRepayMoneyGrandtotal) {
			item1_onTimeRepayMoney.push(item.substring(5));
			item2_onTimeRepayMoney.push(item);
		}
		for (var i = 0; i < item1_onTimeRepayMoney.length - 1; i++) {
			for (var j = i + 1; j < item1_onTimeRepayMoney.length; j++) {
				if (item1_onTimeRepayMoney[i] > item1_onTimeRepayMoney[j]) {
					var z = item1_onTimeRepayMoney[i];
					item1_onTimeRepayMoney[i] = item1_onTimeRepayMoney[j];
					item1_onTimeRepayMoney[j] = z;
					var q = item2_onTimeRepayMoney[i];
					item2_onTimeRepayMoney[i] = item2_onTimeRepayMoney[j];
					item2_onTimeRepayMoney[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_onTimeRepayMoney.length; i++) {
			data1_onTimeRepayMoney.push(data.fifteenDaysOnTimeRepayMoneyGrandtotal[item2_onTimeRepayMoney[i]]);
		}
		/**
		 * 总s1还款金额
		 */
		for (let item in data.fifteenDaysRepayMoneys1Grandtotal) {
			item1_repayMoneys1.push(item.substring(5));
			item2_repayMoneys1.push(item);
		}
		for (var i = 0; i < item1_repayMoneys1.length - 1; i++) {
			for (var j = i + 1; j < item1_repayMoneys1.length; j++) {
				if (item1_repayMoneys1[i] > item1_repayMoneys1[j]) {
					var z = item1_repayMoneys1[i];
					item1_repayMoneys1[i] = item1_repayMoneys1[j];
					item1_repayMoneys1[j] = z;
					var q = item2_repayMoneys1[i];
					item2_repayMoneys1[i] = item2_repayMoneys1[j];
					item2_repayMoneys1[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_repayMoneys1.length; i++) {
			data1_repayMoneys1.push(data.fifteenDaysRepayMoneys1Grandtotal[item2_repayMoneys1[i]]);
		}
		/**
		 * 总s1后还款金额
		 */
		for (let item in data.fifteenDaysRepayMoneyLaters1Grandtotal) {
			item1_repayMoneyLaters1.push(item.substring(5));
			item2_repayMoneyLaters1.push(item);
		}
		for (var i = 0; i < item1_repayMoneyLaters1.length - 1; i++) {
			for (var j = i + 1; j < item1_repayMoneyLaters1.length; j++) {
				if (item1_repayMoneyLaters1[i] > item1_repayMoneyLaters1[j]) {
					var z = item1_repayMoneyLaters1[i];
					item1_repayMoneyLaters1[i] = item1_repayMoneyLaters1[j];
					item1_repayMoneyLaters1[j] = z;
					var q = item2_repayMoneyLaters1[i];
					item2_repayMoneyLaters1[i] = item2_repayMoneyLaters1[j];
					item2_repayMoneyLaters1[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_repayMoneyLaters1.length; i++) {
			data1_repayMoneyLaters1.push(data.fifteenDaysRepayMoneyLaters1Grandtotal[item2_repayMoneyLaters1[i]]);
		}
		/**
		 * 总到期应还款金额
		 */
		for (let item in data.fifteenDaysNeedRepayMoneyGrandtotal) {
			item1_needRepayMoney.push(item.substring(5));
			item2_needRepayMoney.push(item);
		}
		for (var i = 0; i < item1_needRepayMoney.length - 1; i++) {
			for (var j = i + 1; j < item1_needRepayMoney.length; j++) {
				if (item1_needRepayMoney[i] > item1_needRepayMoney[j]) {
					var z = item1_needRepayMoney[i];
					item1_needRepayMoney[i] = item1_needRepayMoney[j];
					item1_needRepayMoney[j] = z;
					var q = item2_needRepayMoney[i];
					item2_needRepayMoney[i] = item2_needRepayMoney[j];
					item2_needRepayMoney[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_needRepayMoney.length; i++) {
			data1_needRepayMoney.push(data.fifteenDaysNeedRepayMoneyGrandtotal[item2_needRepayMoney[i]]);
		}
		
		me.setState({
			data_onTimeRepayMoney: data1_onTimeRepayMoney,//总按期还款金额
			item_onTimeRepayMoney: item1_onTimeRepayMoney,//总按期还款金额
			data_repayMoneys1: data1_repayMoneys1,//总s1还款金额
			item_repayMoneys1: item1_repayMoneys1,//总s1还款金额
			data_repayMoneyLaters1: data1_repayMoneyLaters1,//总s1后还款金额
			item_repayMoneyLaters1: item1_repayMoneyLaters1,//总s1后还款金额
			data_needRepayMoney: data1_needRepayMoney,//总到期应还款金额
			item_needRepayMoney: item1_needRepayMoney,//总到期应还款金额
            first: false
		},() => {
            me.drawBar();
        });
    },
	drawBar() {
		var me = this;
		var bar = echarts.init(document.getElementById('bar'),'macarons');
		var option = {
			title: {
            	text: '{term|总还款金额统计}',
    			y:0,
    			x:'3%',
     			textStyle: {
					color: '#666',
					fontWeight: 'normal',
					border:'1px solid black',
					rich: {
                        term: {
                            backgroundColor: '#ecf0f5',
                            color: '#666',
                            borderRadius: 5,
                            padding: 10, 
                            fontSize:18,     
                        }
					}
				}
            },
			tooltip: {
				trigger: 'axis',
				//formatter: '{b}<br/>{a}:{c}元<br/>{a1}:{c1}元<br/>{a2}:{c2}元<br/>{a3}:{c3}元',
				formatter: function (params) {
                    var xAxis = option.xAxis;
                    var res = params[0].name + "<br/>"
                    var series = option.series;
                    for (var i = 0; i < xAxis[0].data.length; i++) {
                        if(xAxis[0].data[i] == params[0].name){
                            res += series[0].name + ': ' + series[0].data[i] + '元<br/>' + series[1].name + ': ' + series[1].data[i] + '元<br/>'+series[2].name + ': ' + series[2].data[i] + '元<br/>'+series[3].name + ': ' + series[3].data[i] + '元<br/>'
                        }
                    }
                    return res;
                },
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			barWidth: '20',
			legend: {
				orient: 'horizontal',
				x: 'right',
				y: 25,
				itemGap: 10,
				data: ['总按期还款金额','总s1还款金额','总s1后还款金额','总到期应还款金额']
			},
			dataZoom: [{
		        type: 'slider',
		        start: 70,
		        end: 100
		    }],
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '20%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					name: '日期',
					data: me.state.item_onTimeRepayMoney,
					nameGap:0
				}
			],
			yAxis: {
				type: 'value',
				name: '金额（元）',
				splitLine: { show: false },
			},
			toolbox: {
		        show : true,
		        showTitle : false,
		        feature : {
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
			series: [
				{
					name: '总按期还款金额',
					type: 'bar',
					stack: 'bar1',
					itemStyle: {
							normal:{  
	                   			 color: '#a5dee5'
	                		},
            		},
            		label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
					data: me.state.data_onTimeRepayMoney
				},
				{
					name: '总s1还款金额',
					type: 'bar',
					stack: 'bar2',
					itemStyle: {
							normal:{  
	                   			 color: '#d1f09a'
	                		},
	    		    },
	    		    label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
					data: me.state.data_repayMoneys1
				},
				{
					name: '总s1后还款金额',
					type: 'bar',
					stack: 'bar3',
					itemStyle: {
							normal:{  
	                   			 color: '#ffcfdf'
	                		},
	    		    },
	    		    label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
					data: me.state.data_repayMoneyLaters1
				},
				{
					name: '总到期应还款金额',
					type: 'bar',
					stack: 'bar4',
					itemStyle: {
							normal:{  
	                   			 color: '#efbd98'
	                		},
	    		    },
	    		    label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
					data: me.state.data_needRepayMoney
				}
			]
		};
		bar.setOption(option);
	},
	componentWillReceiveProps(nextProps) {
            this.fetch(nextProps.data);
    },
	render() {
		return <div id="bar" style={{ height: '400px', width: '700px', margin: '0 auto'  }}></div>
	}
});