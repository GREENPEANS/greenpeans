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
			data_allScale: [],//全部认证比例
			item_allScale: [],//全部认证比例
			data_zhimaScale: [],//芝麻信用比例
			item_zhimaScale: [],//芝麻信用比例
			data_phoneScale: [],//手机运营商比例
			item_phoneScale: [],//手机运营商比例
			data_bankCardScale: [],//银行卡比例
			item_bankCardScale: [],//银行卡比例
			data_contactScale: [],//紧急联系人比例
			item_contactScale: [],//紧急联系人比例
			data_idScale: [],//实名认证比例
			item_idScale: [],//实名认证比例
            first: true
        }
    },
	fetch(data) {
        var me = this;
		var data1_allScale = [];
		var item1_allScale = [];
		var item2_allScale = [];
		var data1_zhimaScale = [];
		var item1_zhimaScale = [];
		var item2_zhimaScale = [];
		var data1_phoneScale = [];
		var item1_phoneScale = [];
		var item2_phoneScale = [];
		var data1_bankCardScale = [];
		var item1_bankCardScale = [];
		var item2_bankCardScale = [];
		var data1_contactScale = [];
		var item1_contactScale = [];
		var item2_contactScale = [];
		var data1_idScale = [];
		var item1_idScale = [];
		var item2_idScale = [];
		/**
		 * 全部认证比例
		 */
		for (let item in data.allScale) {
			item1_allScale.push(item.substring(5));
			item2_allScale.push(item);
		}
		for (var i = 0; i < item1_allScale.length - 1; i++) {
			for (var j = i + 1; j < item1_allScale.length; j++) {
				if (item1_allScale[i] > item1_allScale[j]) {
					var z = item1_allScale[i];
					item1_allScale[i] = item1_allScale[j];
					item1_allScale[j] = z;
					var q = item2_allScale[i];
					item2_allScale[i] = item2_allScale[j];
					item2_allScale[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_allScale.length; i++) {
			data1_allScale.push(data.allScale[item2_allScale[i]]);
		}
		/**
		 * 芝麻信用比例
		 */
		for (let item in data.zhimaScale) {
			item1_zhimaScale.push(item.substring(5));
			item2_zhimaScale.push(item);
		}
		for (var i = 0; i < item1_zhimaScale.length - 1; i++) {
			for (var j = i + 1; j < item1_zhimaScale.length; j++) {
				if (item1_zhimaScale[i] > item1_zhimaScale[j]) {
					var z = item1_zhimaScale[i];
					item1_zhimaScale[i] = item1_zhimaScale[j];
					item1_zhimaScale[j] = z;
					var q = item2_zhimaScale[i];
					item2_zhimaScale[i] = item2_zhimaScale[j];
					item2_zhimaScale[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_zhimaScale.length; i++) {
			data1_zhimaScale.push(data.zhimaScale[item2_zhimaScale[i]]);
		}
		/**
		 * 手机运营商比例
		 */
		for (let item in data.phoneScale) {
			item1_phoneScale.push(item.substring(5));
			item2_phoneScale.push(item);
		}
		for (var i = 0; i < item1_phoneScale.length - 1; i++) {
			for (var j = i + 1; j < item1_phoneScale.length; j++) {
				if (item1_phoneScale[i] > item1_phoneScale[j]) {
					var z = item1_phoneScale[i];
					item1_phoneScale[i] = item1_phoneScale[j];
					item1_phoneScale[j] = z;
					var q = item2_phoneScale[i];
					item2_phoneScale[i] = item2_phoneScale[j];
					item2_phoneScale[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_phoneScale.length; i++) {
			data1_phoneScale.push(data.phoneScale[item2_phoneScale[i]]);
		}
		/**
		 * 银行卡比例
		 */
		for (let item in data.bankCardScale) {
			item1_bankCardScale.push(item.substring(5));
			item2_bankCardScale.push(item);
		}
		for (var i = 0; i < item1_bankCardScale.length - 1; i++) {
			for (var j = i + 1; j < item1_bankCardScale.length; j++) {
				if (item1_bankCardScale[i] > item1_bankCardScale[j]) {
					var z = item1_bankCardScale[i];
					item1_bankCardScale[i] = item1_bankCardScale[j];
					item1_bankCardScale[j] = z;
					var q = item2_bankCardScale[i];
					item2_bankCardScale[i] = item2_bankCardScale[j];
					item2_bankCardScale[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_bankCardScale.length; i++) {
			data1_bankCardScale.push(data.bankCardScale[item2_bankCardScale[i]]);
		}
		/**
		 * 紧急联系人比例
		 */
		for (let item in data.contactScale) {
			item1_contactScale.push(item.substring(5));
			item2_contactScale.push(item);
		}
		for (var i = 0; i < item1_contactScale.length - 1; i++) {
			for (var j = i + 1; j < item1_contactScale.length; j++) {
				if (item1_contactScale[i] > item1_contactScale[j]) {
					var z = item1_contactScale[i];
					item1_contactScale[i] = item1_contactScale[j];
					item1_contactScale[j] = z;
					var q = item2_contactScale[i];
					item2_contactScale[i] = item2_contactScale[j];
					item2_contactScale[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_contactScale.length; i++) {
			data1_contactScale.push(data.contactScale[item2_contactScale[i]]);
		}
		/**
		 * 实名认证比例
		 */
		for (let item in data.idScale) {
			item1_idScale.push(item.substring(5));
			item2_idScale.push(item);
		}
		for (var i = 0; i < item1_idScale.length - 1; i++) {
			for (var j = i + 1; j < item1_idScale.length; j++) {
				if (item1_idScale[i] > item1_idScale[j]) {
					var z = item1_idScale[i];
					item1_idScale[i] = item1_idScale[j];
					item1_idScale[j] = z;
					var q = item2_idScale[i];
					item2_idScale[i] = item2_idScale[j];
					item2_idScale[j] = q;
				}
			}
		}
		for (var i = 0; i < item1_idScale.length; i++) {
			data1_idScale.push(data.idScale[item2_idScale[i]]);
		}
		
		me.setState({
			data_allScale: data1_allScale,
			item_allScale: item1_allScale,
			data_zhimaScale: data1_zhimaScale,
			item_zhimaScale: item1_zhimaScale,
			data_phoneScale: data1_phoneScale,
			item_phoneScale: item1_phoneScale,
			data_bankCardScale: data1_bankCardScale,
			item_bankCardScale: item1_bankCardScale,
			data_contactScale: data1_contactScale,
			item_contactScale: item1_contactScale,
			data_idScale: data1_idScale,
			item_idScale: item1_idScale,
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
            	text: '{term|当日认证比例}',
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
				formatter: function (params) {
                    var xAxis = option.xAxis;
                    var res = params[0].name + "<br/>"
                    var series = option.series;
                    for (var i = 0; i < xAxis[0].data.length; i++) {
                        if(xAxis[0].data[i] == params[0].name){
                            res += series[0].name + ': ' + series[0].data[i] + '%<br/>' + series[1].name + ': ' + series[1].data[i] + '%<br/>'+series[2].name + ': ' + series[2].data[i] + '%<br/>'+series[3].name + ': ' + series[3].data[i] + '%<br/>'
                                   +series[4].name + ': ' + series[4].data[i] + '%<br/>'+series[5].name + ': ' + series[5].data[i] + '%<br/>'
                        }
                    }
                    return res;
                },
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			barWidth: '13',
			legend: {
				orient: 'horizontal',
				x: 'right',
				y: 25,
				itemGap: 10,
				data: ['全部认证','芝麻信用','手机运营商','银行卡','紧急联系人','实名认证']
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
			xAxis: [
				{
					type: 'category',
					name: '日期',
					data: me.state.item_allScale,
					nameGap:0
				}
			],
			yAxis: {
				type: 'value',
				name: '比例%',
				splitLine: { show: false },
			},
			series: [
				{
					name: '全部认证',
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
					data: me.state.data_allScale
				},
				{
					name: '芝麻信用',
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
					data: me.state.data_zhimaScale
				},
				{
					name: '手机运营商',
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
					data: me.state.data_phoneScale
				},
				{
					name: '银行卡',
					type: 'bar',
					stack: 'bar4',
					label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
					itemStyle: {
							normal:{  
								color: '#efbd98'
	                		},
	    		    },
					data: me.state.data_bankCardScale
				},
				{
					name: '紧急联系人',
					type: 'bar',
					stack: 'bar5',
					label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
					itemStyle: {
						normal:{  
							color: '#ffa5a5'
						},
					},
					data: me.state.data_contactScale
				},
				{
					name: '实名认证',
					type: 'bar',
					stack: 'bar6',
					label: {
		                normal: {
		                    show: true,
		                    position: 'top'
		                }
		            },
					itemStyle: {
						normal:{  
							color: '#bfcfff'
						},
					},
					data: me.state.data_idScale
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