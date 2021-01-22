import {request} from '@/network/request'

export function getCarfilesData(page){
  return request({
    url:'/carfiles/selectcarfiles',
    params:{
      page
    }
  })
}
export function getCarInfo(carfileID){
  return request({
    url:'/carfiles/selectcarfilesinfo',
    params:{
      carfileID
    }
  })
}
export function getUseWorkers(carfileID){
  return request({
    url:'/carfiles/selectuseworker',
    params:{
      carfileID
    }
  })
}
export function getUseParts(carfileID){
  return request({
    url:'/carfiles/selectuseparts',
    params:{
      carfileID
    }
  })
}
export function get_info(phoneNumber,carNumber){
  return request({
    url:'/carfiles/getname_carbrand',
    params:{
      phoneNumber,
      carNumber
    }
  })
}
export function getCarNumber(){
  return request({
    url:'/car/getcar',
  })
}
export function getMaxID(){
  return request({
    url:'/carfiles/getmaxid',
  })
}
export function getOldClient(carfileID){
  return request({
    url:'/carfiles/getoldclient',
    params:{
      carfileID
    }
  })
}
export function getWorkerList(page,size){
  return request({
    url:'/worker/showworkers',
    params:{
      page,
      size
    }
  })
}
export function getPartsData(page,size){
  return request({
    url:'/parts/showparts',
    params:{
      page,
      size
    }
  })
}
export function addCarData(car,carfileID){
  return request({
    method:'POST',
    url:'/carfiles/addcar',
    data:car,
    params:{
      carfileID
    }
  })
}
export function addClientData(member,carfileID){
  return request({
    method:'POST',
    url:'/carfiles/addclient',
    data:member,
    params:{
      carfileID
    }
  })
}
export function addInfoData(carfiles,carfileID){
  return request({
    method:'POST',
    url:'/carfiles/addcarinfo',
    data:carfiles,
    params:{
      carfileID
    }
  })
}
export function addWorkerData(ids,carfileID){
  return request({
    method:'POST',
    url:'/carfiles/addworkers',
    params:{
      carfileID,
      ids,
    }
  })
}
export function addPartsData(carfileList,carfileID){
  return request({
    method:'POST',
    url:'/carfiles/addparts',
    data:carfileList,
    params:{
      carfileID
    }
  })
}
export function checkout(carfileID){
  return request({
    method:'PUT',
    url:'/carfiles/checkout',
    params:{
      carfileID
    }
  })
}
export function modifyMemberData(member,carfileID){
  return request({
    method:'PUT',
    url:'/carfiles/modifyclient',
    data:member,
    params:{
      carfileID
    }
  })
}
export function modifyCarData(car,carfileID){
  return request({
    method:'PUT',
    url:'/carfiles/modifycar',
    data:car,
    params:{
      carfileID
    }
  })
}
export function modifyInfoData(carfiles,carfileID){
  return request({
    method:'PUT',
    url:'/carfiles/modifyinfo',
    data:carfiles,
    params:{
      carfileID
    }
  })
}
export function modifyUseNumberData(carfilesList,carfileID){
  return request({
    method:'PUT',
    url:'/carfiles/modifyuseparts',
    data:carfilesList,
    params:{
      carfileID
    }
  })
}
export function deleteWorkerData(id,carfileID){
  return request({
    method:'DELETE',
    url:'/carfiles/deleteworker',
    params:{
      id,
      carfileID,
    }
  })
}
export function deletePartsData(id,carfileID){
  return request({
    method:'DELETE',
    url:'/carfiles/deleteparts',
    params:{
      id,
      carfileID,
    }
  })
}