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
            first: true
        }
    },
	fetch(data) {
        var me = this;
		var data1 = [];
		var item1 = [];
		var item2 = []
		for (let item in data.dayRealTimeLoan) {
			item1.push(item);
			item2.push(item);
		}
		console.log(item1);
		console.log(item2);
		for (var i = 0; i < item1.length - 1; i++) {
			for (var j = i + 1; j < item1.length; j++) {
				if (item1[i] > item1[j]) {
					var z = item1[i];
					item1[i] = item1[j];
					item1[j] = z;
					var q = item2[i];
					item2[i] = item2[j];
					item2[j] = q;
				}
			}
		}
		for (var i = 0; i < item1.length; i++) {
			data1.push(data.dayRealTimeLoan[item2[i]]);
		}
		me.setState({
			data: data1,
			item: item1,
            first: false
		},() => {
            me.drawBar();
        });
    },
	drawBar() {
		var me = this;
		var bar = echarts.init(document.getElementById('bar3'),'macarons');
		var option = {
			title: {
				text: '今日放款维度图',
				x: 'center',
				y: 10,
				textStyle: {
					color: '#666',
					fontWeight: 'normal'
				}
			},
			tooltip: {
				trigger: 'axis',
				formatter: '{a} <br/>{b}: {c}笔',
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			barWidth: '10',
			legend: {
				orient: 'horizontal',
				x: 'right',
				y: 20,
				itemGap: 20,
				data: ['每小时放款量']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: me.state.item
				}
			],
			yAxis: {
				type: 'value',
				splitLine: { show: false },
			},
			series: [
				{
					name: '每小时放款量',
					type: 'bar',
					data: me.state.data
				},
			]
		};
		bar.setOption(option);
	},
	componentWillReceiveProps(nextProps) {
		if(nextProps.data.constructor == Object && this.state.first){
            this.fetch(nextProps.data);
        }
        
    },
	render() {
		return <div id="bar3" style={{ height: '340px', width: '550px', margin: '0 auto'  }}></div>
	}
});