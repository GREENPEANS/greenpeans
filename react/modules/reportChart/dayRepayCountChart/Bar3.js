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
		var s1qian = data.loanAndRepaymentGairiBili[0];
		var s1zhong = data.loanAndRepaymentGairiBili[1];
		var s1hou = data.loanAndRepaymentGairiBili[2];
		//累计按期排序
		var a1 = [];
		var a2 = [];
		var a3 = [];
		for (let item1 in s1qian) {
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
		for (var i = 0; i <a1.length; i++) {
			data1.push(s1qian[a2[i]]);
		}
		
		//s1排序
		var b1 = [];
		var b2 = [];
		var b3 = [];
		for (let item2 in s1zhong) {
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
			data2.push(s1zhong[b2[i]]);
		}
		
		//s1后排序
		var c1 = [];
		var c2 = [];
		for (let item3 in s1hou) {
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
			data3.push(s1hou[c2[i]]);
		}
		
		me.setState({
			data1: data1,
			data2: data2,
			data3: data3,
			item: a1,
            first: false
		},() => {
            me.drawBar();
        });
    },
	drawBar() {
		var me = this;
		var bar = echarts.init(document.getElementById('bar5'),'macarons');
		var option = {
			title: {
            	text: '{term|当日还款比例变化}',
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
                            res += series[0].name + ': ' + series[0].data[i] + '%<br/>' + series[1].name + ': ' + series[1].data[i] + '%<br/>'+ series[2].name + ': ' + series[2].data[i] + '%<br/>'
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
				itemGap: 20,
				data: ['按期还款比例','截止s1还款比例','s1后还款比例']
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
					data: me.state.item,
					nameGap: 0
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
					stack: '广告1',
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
					data: me.state.data1,
					
				},{
					name: '截止s1还款比例',
					type: 'bar',
					stack: '广告2',
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
					data: me.state.data2,
					
				},{
					name: 's1后还款比例',
					type: 'bar',
					stack: '广告3',
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
					data: me.state.data3,
				}
			]
		};
		bar.setOption(option);
	},
	componentWillReceiveProps(nextProps) {
            this.fetch(nextProps.data);
    },
	render() {
		return <div id="bar5" style={{ height: '400px', width: '700px', margin: '0 auto'  }}></div>
	}
});