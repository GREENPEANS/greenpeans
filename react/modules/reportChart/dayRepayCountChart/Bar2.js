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
			data_onTimeRepayMoneyScale: [],//按期还款比例
			item_onTimeRepayMoneyScale: [],//按期还款比例
			data_repayMoneys1Scale: [],//s1收回比例
			item_repayMoneys1Scale: [],//s1收回比例
			data_repayMoneyLaters1Scale: [],//s1后收回比例
			item_repayMoneyLaters1Scale: [],//s1后收回比例
            first: true
        }
    },
	fetch(data) {
        var me = this;
		var data1_onTimeRepayMoneyScale = [];
		var item1_onTimeRepayMoneyScale = [];
		var item2_onTimeRepayMoneyScale = [];
		
		var data1_repayMoneys1Scale = [];
		var item1_repayMoneys1Scale = [];
		var item2_repayMoneys1Scale = [];
		
		var data1_repayMoneyLaters1Scale = [];
		var item1_repayMoneyLaters1Scale = [];
		var item2_repayMoneyLaters1Scale = [];
		/**
		 * 按期还款比例
		 */
		for (let item in data.fifteenDaysOnTimeRepayMoneyScale) {
			item1_onTimeRepayMoneyScale.push(item.substring(5));
			item2_onTimeRepayMoneyScale.push(item);
		}
		for (var i = 0; i < item1_onTimeRepayMoneyScale.length - 1; i++) {
			for (var j = i + 1; j < item1_onTimeRepayMoneyScale.length; j++) {
				if (item1_onTimeRepayMoneyScale[i] > item1_onTimeRepayMoneyScale[j]) {
					var z = item1_onTimeRepayMoneyScale[i];
					item1_onTimeRepayMoneyScale[i] = item1_onTimeRepayMoneyScale[j];
					item1_onTimeRepayMoneyScale[j] = z;
					var q = item2_onTimeRepayMoneyScale[i];
					item2_onTimeRepayMoneyScale[i] = item2_onTimeRepayMoneyScale[j];
					item2_onTimeRepayMoneyScale[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_onTimeRepayMoneyScale.length; i++) {
			data1_onTimeRepayMoneyScale.push(data.fifteenDaysOnTimeRepayMoneyScale[item2_onTimeRepayMoneyScale[i]]);
		}
		/**
		 * s1收回比例
		 */
		for (let item in data.fifteenDaysRepayMoneys1Scale) {
			item1_repayMoneys1Scale.push(item.substring(5));
			item2_repayMoneys1Scale.push(item);
		}
		for (var i = 0; i < item1_repayMoneys1Scale.length - 1; i++) {
			for (var j = i + 1; j < item1_repayMoneys1Scale.length; j++) {
				if (item1_repayMoneys1Scale[i] > item1_repayMoneys1Scale[j]) {
					var z = item1_repayMoneys1Scale[i];
					item1_repayMoneys1Scale[i] = item1_repayMoneys1Scale[j];
					item1_repayMoneys1Scale[j] = z;
					var q = item2_repayMoneys1Scale[i];
					item2_repayMoneys1Scale[i] = item2_repayMoneys1Scale[j];
					item2_repayMoneys1Scale[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_repayMoneys1Scale.length; i++) {
			data1_repayMoneys1Scale.push(data.fifteenDaysRepayMoneys1Scale[item2_repayMoneys1Scale[i]]);
		}
		/**
		 * s1后收回比例
		 */
		for (let item in data.fifteenDaysRepayMoneyLaters1Scale) {
			item1_repayMoneyLaters1Scale.push(item.substring(5));
			item2_repayMoneyLaters1Scale.push(item);
		}
		for (var i = 0; i < item1_repayMoneyLaters1Scale.length - 1; i++) {
			for (var j = i + 1; j < item1_repayMoneyLaters1Scale.length; j++) {
				if (item1_repayMoneyLaters1Scale[i] > item1_repayMoneyLaters1Scale[j]) {
					var z = item1_repayMoneyLaters1Scale[i];
					item1_repayMoneyLaters1Scale[i] = item1_repayMoneyLaters1Scale[j];
					item1_repayMoneyLaters1Scale[j] = z;
					var q = item2_repayMoneyLaters1Scale[i];
					item2_repayMoneyLaters1Scale[i] = item2_repayMoneyLaters1Scale[j];
					item2_repayMoneyLaters1Scale[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_repayMoneyLaters1Scale.length; i++) {
			data1_repayMoneyLaters1Scale.push(data.fifteenDaysRepayMoneyLaters1Scale[item2_repayMoneyLaters1Scale[i]]);
		}
		
		me.setState({
			data_onTimeRepayMoneyScale: data1_onTimeRepayMoneyScale,
			item_onTimeRepayMoneyScale: item1_onTimeRepayMoneyScale,
			data_repayMoneys1Scale: data1_repayMoneys1Scale,
			item_repayMoneys1Scale: item1_repayMoneys1Scale,
			data_repayMoneyLaters1Scale: data1_repayMoneyLaters1Scale,
			item_repayMoneyLaters1Scale: item1_repayMoneyLaters1Scale,
			
            first: false
		},() => {
            me.drawBar();
        });
    },
	drawBar() {
		var me = this;
		var bar = echarts.init(document.getElementById('bar1'),'macarons');
		var option = {
			title: {
            	text: '{term|还款比例统计}',
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
				//formatter: '{b}<br/>{a}:{c}%<br/>{a1}:{c1}%<br/>{a2}:{c2}%',
				formatter: function (params) {
                    var xAxis = option.xAxis;
                    var res = params[0].name + "<br/>"
                    var series = option.series;
                    for (var i = 0; i < xAxis[0].data.length; i++) {
                        if(xAxis[0].data[i] == params[0].name){
                            res += series[0].name + ': ' + series[0].data[i] + '%<br/>' + series[1].name + ': ' + series[1].data[i] + '%<br/>'+series[2].name + ': ' + series[2].data[i]
                        }
                    }
                    return res;
                },
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			barWidth: '25',
			legend: {
				orient: 'horizontal',
				x: 'right',
				y: 25,
				itemGap: 10,
				data: ['按期还款比例','s1收回比例','s1后收回比例']
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
					data: me.state.item_onTimeRepayMoneyScale,
					nameGap:0
				}
			],
			yAxis: {
				type: 'value',
				name: '比例%',
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
					name: '按期还款比例',
					type: 'bar',
					stack: 'bar1',
					label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
					itemStyle: {
							normal:{  
	                   			 color: '#a5dee5'
	                		},
	        		},
					data: me.state.data_onTimeRepayMoneyScale
				},
				{
					name: 's1收回比例',
					type: 'bar',
					stack: 'bar2',
					label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
					itemStyle: {
							normal:{  
	                   			 color: '#d1f09a'
	                		},
	    		    },
					data: me.state.data_repayMoneys1Scale
				},
				{
					name: 's1后收回比例',
					type: 'bar',
					stack: 'bar3',
					label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
					itemStyle: {
							normal:{  
	                   			 color: '#ffcfdf'
	                		},
	    		    },
					data: me.state.data_repayMoneyLaters1Scale
				}
			]
		};
		bar.setOption(option);
	},
	componentWillReceiveProps(nextProps) {
            this.fetch(nextProps.data);
    },
	render() {
		return <div id="bar1" style={{ height: '400px', width: '700px', margin: '0 auto'  }}></div>
	}
});