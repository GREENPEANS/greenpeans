
var DailyPassRate = require('../../WindControlData/DailyPassRate/index');//每日通过率
var PlatformDataDaily = require('../../WindControlData/PlatformDataDaily/index');//平台数据日报


var TimedTaskList = require('../../TimedTask/TimedTaskList/index');//定时任务
var TimedTaskLog = require('../../TimedTask/TimedTaskLog/index');//定时任务
// var LoanAndRepaymentCount = require('../../reportChart/LoanAndRepaymentCount/Index');//报表管理-每日借放款统计
// var DayRepayCountChart = require('../../reportChart/dayRepayCountChart/Index');//日还款统计汇总图
// var DayRepayCountChartGrandtotal = require('../../reportChart/dayRepayCountChartGrandtotal/Index');//总还款统计汇总图
// var CertificationRatio = require('../../reportChart/certificationRatio/Index');//认证比例图
// var LoanAndRepaymentCount2 = require('../../reportChart/LoanAndRepaymentCount2/Index');//报表管理-每日借放款统计2
// var RepaymentLoanAmount = require('../../reportChart/RepaymentLoanAmount/Index');//回款放款总金额
// var LoanRate = require('../../reportChart/LoanRate/Index');//复借率
// var PrimeRate = require('../../reportChart/PrimeRate/Index');//首逾率
module.exports = {
  DailyPassRate,
  PlatformDataDaily,

  // DailyRepaymentAnalysis,
  // MonthlyRepaymentAnalysis,
  // Monthly,

  TimedTaskList,
  TimedTaskLog,  
  //DayRepayCountChart,
  //DayRepayCountChartGrandtotal,
  //CertificationRatio,
  //LoanAndRepaymentCount2,
  //RepaymentLoanAmount,
  //LoanRate,
  // PrimeRate
  // LoanAndRepaymentCount2,
  //LoanAndRepaymentCount,
  //ArtificiallyBlack,
}