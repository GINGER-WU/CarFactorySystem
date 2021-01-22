import {request} from '@/network/request'

export function getStatisticsData(Year,Month,Day){
  return request({
    url:'/statistics/getprofit',
    params:{
      Year,
      Month,
      Day
    }
  })
}

export function getStatisticsDataInfo(Year,Month,Day){
  return request({
    url:'/statistics/getprofitinfo',
    params:{
      Year,
      Month,
      Day
    }
  })
}