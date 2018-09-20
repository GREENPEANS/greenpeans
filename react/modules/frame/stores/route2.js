var UserBasicInformation = require('../../UserInformation/UserBasicInformation/index');//客户管理-用户基本信息
var UserAuthenticationList = require('../../UserInformation/UserAuthenticationList/index');//客户管理-用户认证信息
var UserFeedback = require('../../UserInformation/UserFeedback/index');//客户管理-用户反馈
var UserEducationList = require('../../UserInformation/UserEducationList/index');//客户管理-用户教育信息列表
var BlackCustomerList = require('../../UserInformation/BlackCustomerList/index');//客户管理-黑名单
var ruleEngine = require('../../ruleEngine/index');//规则配置
var SystemConfig = require('../../SystemMng/SystemConfig/index');//系统配置
var sysUserManage = require('../../SystemMng/UserMang/index');//用户管理
var sysRoleManage = require('../../SystemMng/RoleMang/index');//角色管理
var AccessCode = require('../../SystemMng/AccessCode/index');//访问码管理
var Druid = require('../../SystemMng/Druid/index');//Druid
var sysMenuManage = require('../../SystemMng/MenuMang/index');//菜单管理
var sysDicManage = require('../../SystemMng/DictionaryMang/index');//字典管理
var SystemParameterSettings = require('../../SystemMng/SystemParameterSettings/index');//系统参数设置
var UserPushList = require('../../UserInformation/UserPushList/index');//系统管理-推送
module.exports = {
  UserBasicInformation,
  UserAuthenticationList,
  UserFeedback,
  UserEducationList,
  BlackCustomerList,
  ruleEngine,
  SystemConfig,
  sysUserManage,
  sysRoleManage,
  AccessCode,
  Druid,
  sysMenuManage,
  sysDicManage,
  SystemParameterSettings,
  UserPushList,
}