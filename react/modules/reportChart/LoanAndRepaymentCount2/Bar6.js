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
		var jiekuan = data.loanBiRepayment[0];
		//累计借款排序
		var b1 = [];
		var b2 = [];
		for (let item1 in jiekuan) {
			b1.push(item1.substring(5));
			b2.push(item1);
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
			data1.push(jiekuan[b2[i]]);
		}
		
		me.setState({
			data1: data1,
			item: b1,
            first: false
		},() => {
            me.drawBar();
        });
    },
	drawBar() {
		var me = this;
		var bar = echarts.init(document.getElementById('bar6'),'macarons');
		var option = {
			title: {
            	text: '{term|当日借/放款比}',
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
                            res += series[0].name + ': ' + series[0].data[i] + '%'
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
				data: ['借放款比例']
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
				name: '比例 %',
				splitLine: { show: false },
			},
			series: [
				{
					name: '借放款比例',
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
				}
			]
		};
		bar.setOption(option);
	},
	componentWillReceiveProps(nextProps) {
            this.fetch(nextProps.data);
    },
	render() {
		return <div id="bar6" style={{ height: '400px', width: '700px', margin: '0 auto'  }}></div>
	}
});