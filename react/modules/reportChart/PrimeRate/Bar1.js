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
            first: true
        }
    },
	fetch(data) {
		var me = this;
		var data1 = [];
		var data2 = [];
		var data3 = [];
		var data4 = [];
		var data5 = [];
		var baixin = data.PrimeRate[0];
		var bailao = data.PrimeRate[1];
		var zixin = data.PrimeRate[2];
		var zilao = data.PrimeRate[3];
		var zonghe = data.PrimeRate[4];
		//白名单新用户
		var a1 = [];
		var a2 = [];
		for (let item1 in baixin) {
			a1.push(item1.substring(5));
			a2.push(item1);
		}
		for (var i = 0; i < a1.length - 1; i++) {
			for (var j = i + 1; j < a1.length; j++) {
				if (a1[i] > a1[j]) {
					var z = a1[i];
					a1[i] = a1[j];
					a1[j] = z;
					var q = a2[i];
					a2[i] = a2[j];
					a2[j] = q;
				}
			}
		}
		for (var i = 0; i < a1.length; i++) {
			data1.push(baixin[a2[i]]);
		}
		
		//白名单老用户
		var b1 = [];
		var b2 = [];
		for (let item2 in bailao) {
			b1.push(item2.substring(5));
			b2.push(item2);
		}
		for (var i = 0; i < b1.length - 1; i++) {
			for (var j = i + 1; j < b1.length; j++) {
				if (b1[i] > b1[j]) {
					var z = b1[i];
					b1[i] = b1[j];
					b1[j] = z;
					var q = b2[i];
					b2[i] = b2[j];
					b2[j] = q;
				}
			}
		}
		for (var i = 0; i < b1.length; i++) {
			data2.push(bailao[b2[i]]);
		}
		
		//自然人新用户
		var c1 = [];
		var c2 = [];
		for (let item3 in zixin) {
			c1.push(item3.substring(5));
			c2.push(item3);
		}
		for (var i = 0; i < c1.length - 1; i++) {
			for (var j = i + 1; j < c1.length; j++) {
				if (c1[i] > c1[j]) {
					var z = c1[i];
					c1[i] = c1[j];
					c1[j] = z;
					var q = c2[i];
					c2[i] = c2[j];
					c2[j] = q;
				}
			}
		}
		for (var i = 0; i < c1.length; i++) {
			data3.push(zixin[c2[i]]);
		}
		
		//自然人老用户
		var d1 = [];
		var d2 = [];
		for (let item4 in zilao) {
			d1.push(item4.substring(5));
			d2.push(item4);
		}
		for (var i = 0; i < d1.length - 1; i++) {
			for (var j = i + 1; j < d1.length; j++) {
				if (d1[i] > d1[j]) {
					var z = d1[i];
					d1[i] = d1[j];
					d1[j] = z;
					var q = d2[i];
					d2[i] = d2[j];
					d2[j] = q;
				}
			}
		}
		for (var i = 0; i < d1.length; i++) {
			data4.push(zilao[d2[i]]);
		}
		
		//综合
		var e1 = [];
		var e2 = [];
		for (let item5 in zonghe) {
			e1.push(item5.substring(5));
			e2.push(item5);
		}
		for (var i = 0; i < e1.length - 1; i++) {
			for (var j = i + 1; j < e1.length; j++) {
				if (e1[i] > e1[j]) {
					var z = e1[i];
					e1[i] = e1[j];
					e1[j] = z;
					var q = e2[i];
					e2[i] = e2[j];
					e2[j] = q;
				}
			}
		}
		for (var i = 0; i < e1.length; i++) {
			data5.push(zonghe[e2[i]]);
		}
		
		me.setState({
			data1: data1,
			data2: data2,
			data3: data3,
			data4: data4,
			data5: data5,
			item: a1,
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
            	text: '{term|首逾率}',
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
                            res += series[0].name + ': ' + series[0].data[i] + '%<br/>' + series[1].name + ': ' + series[1].data[i] + '%<br/>'
                            + series[2].name + ': ' + series[2].data[i] + '%<br/>'+ series[3].name + ': ' + series[3].data[i] + '%<br/>'
                            + series[4].name + ': ' + series[4].data[i] + '%<br/>'
                        }
                    }
                    return res;
                },
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			barWidth: '14',
			legend: {
				orient: 'horizontal',
				x: 'right',
				y: 25,
				itemGap: 20,
				data: ['白名单新用户','白名单老用户','自然人新用户','自然人老用户','综合']
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
					data: me.state.item,
					nameGap: 0
				}
			],
			yAxis: {
				type: 'value',
				name: '比例%',
				splitLine: { show: false },
			},
			series: [
				{
					name: '白名单新用户',
					type: 'bar',
					stack: '广告1',
					data: me.state.data1,
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
            		}
				},
				{
					name: '白名单老用户',
					type: 'bar',
					stack: '广告2',
					data: me.state.data2,
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
            		}
				},
				{
					name: '自然人新用户',
					type: 'bar',
					stack: '广告3',
					data: me.state.data3,
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
            		}
				},
				{
					name: '自然人老用户',
					type: 'bar',
					stack: '广告4',
					data: me.state.data4,
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
            		}
				},
				{
					name: '综合',
					type: 'bar',
					stack: '广告5',
					data: me.state.data5,
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
            		}
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