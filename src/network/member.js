import {request} from '@/network/request'

export function getMembersData(page){
  return request({
    url:'/member/showmembers',
    params:{
      page
    }
  })
}
export function modifyMembersData(worker){
  return request({
    method:'PUT',
    url:'/worker/modifyworker',
    data:worker
  })
}
export function deleteMembersDate(ids){
  return request({
    method:'DELETE',
    url:'/member/deletemember',
    params:{
      ids
    }
  })
}