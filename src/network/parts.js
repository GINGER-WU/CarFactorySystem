import {request} from '@/network/request'

export function getPartsData(page,keywords){
  return request({
    url:'/parts/showparts',
    params:{
      page,
      keywords
    }
  })
}
export function modifyPartsData(parts){
  return request({
    method:'PUT',
    url:'/parts/modifyparts',
    data:parts
  })
}
export function addPartsData(parts){
  return request({
    method:'POST',
    url:'/parts/addparts',
    data:parts
  })
}
export function deletePartsDate(ids){
  return request({
    method:'DELETE',
    url:'/parts/deleteparts',
    params:{
      ids
    }
  })
}