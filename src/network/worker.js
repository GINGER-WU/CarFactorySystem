import {request} from '@/network/request'

export function getWorkersData(page){
  return request({
    url:'/worker/showworkers',
    params:{
      page
    }
  })
}
export function modifyWorkersData(worker){
  return request({
    method:'PUT',
    url:'/worker/modifyworker',
    data:worker
  })
}
export function addWorkersData(workers){
  return request({
    method:'POST',
    url:'/worker/addworkers',
    data:workers
  })
}
export function deleteWorkersDate(ids){
  return request({
    method:'DELETE',
    url:'/worker/deleteworker',
    params:{
      ids
    }
  })
}