var Reflux = require('reflux');
import React from 'react';
var AppActions = require('../actions/AppActions');
var Workbench = require('../../Public/Workbench/Index')
export default Reflux.createStore({
	listenables: [AppActions],
	tablist: [{
		'key': 'workbench',
		'tabName': '订单',
		"tabId": 'workbench'
	}],
	activeId: 'workbench',
	onSetTabActiveKey(tabName, tabId) {
		var me = this;
		var tablist = window.tablist || this.tablist;
		var flag = false;
		var activeId = tabId;
		tablist.forEach((v) => {
			if (tabId === v.tabId) {
				flag = true; //当前activeKey 在tablist中已经存在
				return
			}
		});
		var tabContent;
		if (!flag) { // 点击左侧菜单时，没有相应标签页
			var Component = Workbench;
			var routeNames1 = [				
					'ChannelInformationStatistics',				
					'ChannelManage',
					'ScenePortManage',
					'ThirdPartyInquiry',				
					//'RulesMatchResults',
					'FormFieldsToAdd',
					'PolicyleaseOverdue', //保單融租
					'PolicyOffer',
					'WPolicyleaseOverdue',
					'addUser',
                	'OrderListAll',  //保单售后回租
					'ProductModification', //产品信息
					'BannerAdm',
					'LeaseAdmin',
					'LeasebackAdm',
					'LeasebackOverdue',
					'WLeasebackOverdue',
					'LeasebackBack',
					'PolicyleaseList',
					'RecipientsDetails',
					'SmallCutinfo',
					'DiscountList',
					'DiscountCoupon'
				];

			var routeNames2 = [
					'UserBasicInformation',
					'UserAuthenticationList',
					'UserFeedback',
					'UserEducationList',
					'BlackCustomerList',
					'ruleEngine',
					'SystemConfig',
					'sysUserManage',
					'sysRoleManage',
					'AccessCode',
					'Druid',
					'sysMenuManage',
					'sysDicManage',
					'SystemParameterSettings',
					'UserPushList',
					'ManualPay'
			];

			var routeNames3 = [
					'DailyPassRate',
					'PlatformDataDaily',
					'TimedTaskList',
					'TimedTaskLog',

			];

			if (routeNames1.indexOf(tabId)>-1) {
				require.ensure([], function (require) {
					Component = require('./route1')[tabId];
					tabContent = <Component />;
					me.updataTablist(tabId, tabName, tabContent, tablist);
				}, 'route1'); 
			}

			else if (routeNames2.indexOf(tabId)>-1) {
				require.ensure([], function (require) {
					Component = require('./route2')[tabId];
					tabContent = <Component />;
					me.updataTablist(tabId, tabName, tabContent, tablist);
				}, 'route2'); 
			}

			else if (routeNames3.indexOf(tabId)>-1) {
				require.ensure([], function (require) {
					Component = require('./route3')[tabId];
					tabContent = <Component />;
					me.updataTablist(tabId, tabName, tabContent, tablist);
				}, 'route3'); 
			} 
		} else this.update(activeId, tablist);

	},
	updataTablist(tabId, tabName, tabContent, tablist) {
		tablist = tablist.concat({
			key: tabId,
			tabName: tabName,
			tabId: tabId,
			tabContent: tabContent
		})
		this.update(tabId, tablist);
	},
	onRemoveTab(tabId) {
		var tablist = window.tablist || this.tablist;
		var foundIndex = 0;
		tablist = tablist.filter(function(t, index) {
			if (t.tabId !== tabId) {
				return true;
			} else {
				foundIndex = index;
				return false;
			}
		});
		var activeId = window.activeId || this.activeId;
		if (activeId === tabId) {
			if (foundIndex) {
				foundIndex--;
			}
			activeId = tablist[foundIndex].tabId;
		}
		this.update(activeId, tablist);
	},
	update(activeId, tablist) {
		window.tablist = tablist;
		window.activeId = activeId
		this.trigger({
			activeId: activeId,
			tablist: tablist
		});
	}
});
