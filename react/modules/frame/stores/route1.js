
var ScenePortManage = require('../../ScenePortManage/index');//场景与接口关系维护
var ThirdPartyInquiry = require('../../ThirdPartyInquiry/index');//第三方征信 
//var RulesMatchResults = require('../../RulesMatchResults/index');//规则匹配结果
var FormFieldsToAdd = require('../../FormFieldsToAdd/index');//表字段维护 

var OrderListAll = require('../../OrderList/OrderListAll/index') // 保单售后回租 订单列表
var OrderGiven = require('../../OrderList/OrderGiven/index') // 保单售后回租 保单授额
var LeasebackOverdue = require('../../OrderList/LeasebackOverdue/index') // 保单售后回租 订单逾期处理
var WLeasebackOverdue = require('../../OrderList/WLeasebackOverdue/index') // 保单售后回租 订单逾期处理（未分期）
var LeasebackBack = require('../../OrderList/LeasebackBack/index') // 保单售后回租 回递申请处理

var PolicyleaseList = require('../../PolicyLease/PolicyleaseList/index') // 保单融租租赁 订单列表
var PolicyleaseOverdue = require('../../PolicyLease/PolicyleaseOverdue/index') // 保单融租租赁 分期逾期订单列表
var PolicyOffer = require('../../PolicyLease/PolicyOffer/index') // 保单融租租赁 分期逾期订单列表
var WPolicyleaseOverdue = require('../../PolicyLease/WPolicyleaseOverdue/index') // 保单融租租赁 分期逾期订单列表

var RecipientsDetails = require('../../LimitActivities/RecipientsDetails/index') // 限时——首期免租 领用详情
var DiscountCoupon = require('../../LimitActivities/DiscountCoupon/index') // 限时——首期免租 优惠券派发
var SmallCutinfo = require('../../SmallCut/SmallCutinfo/index') // 小剐小蹭租减免 审核及发放详情
var DiscountList = require('../../DiscountCoupon/DiscountList/index')  // 优惠券列表
var ProductModification = require('../../ProductManagement/ProductModification/index') // 产品信息 
var BannerAdm = require('../../ProductManagement/BannerAdm/index') // banner管理
var LeasebackAdm = require('../../ProductManagement/LeasebackAdm/index') // banner管理
var LeaseAdmin = require('../../ProductManagement/LeaseAdmin/index') // banner管理
var ChannelManage = require('../../Message/ChannelManage/index');//短信任务列表
var ChannelInformationStatistics = require('../../Message/ChannelInformationStatistics/index');//短信状态列表
module.exports = {
  PolicyleaseOverdue,
  PolicyOffer,
  WPolicyleaseOverdue,
  ChannelInformationStatistics,
  ChannelManage,
  ScenePortManage,
  ThirdPartyInquiry,
 // RulesMatchResults,
  FormFieldsToAdd,
  OrderListAll,
  OrderGiven,
  ProductModification,
  BannerAdm,
  DiscountCoupon,
  LeaseAdmin,
  LeasebackAdm,
  LeasebackOverdue,
  WLeasebackOverdue,
  LeasebackBack,
  PolicyleaseList,
  RecipientsDetails,
  SmallCutinfo,
  DiscountList
}