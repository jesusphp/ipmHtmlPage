function OnArxSuccess(e){console.log(e)}function OnArxError(e){console.log(e)}var app=angular.module("myApp",[]);app.config(["$locationProvider",function(e){e.html5Mode({enabled:!0,requireBase:!1})}]),app.controller("userCtrl",["$scope","$http","$location",function(e,t,a){function r(a,r,o){e.queryParams.start=e.start,e.queryParams.count=e.count,e.queryParams.keyword=e.keyword,t.get(requestHost+"File/file_list",{params:e.queryParams}).then(function(t){0==t.data.length?l():Array.prototype.push.apply(e.filelist,t.data)},function(e){console.log(e)})}e.queryParams=angular.copy(a.search()),e.from_ipm=e.queryParams.ipm,delete e.queryParams.ipm,e.alert={},e.dataToggle="modal",e.filelist=[],e.start=0,e.count=20,e.keyword,e.getTypeName=function(e){return-1==e.file_type?"答疑文件和底图依据":-2==e.file_type?"变更跟踪单":e.taskgroup_name+"-"+e.task_name};var l=e.$watch("start",r);e.search=function(){l(),e.start=0,e.filelist=[],l=e.$watch("start",r)},e.download=function(e){var t=encodeURI(e.file_name),a=e.download_url,r=e.role_id,l=e.file_state;execAsync(JSON.stringify({functionName:"DownloadFile",functionParams:{args:{file_name:t,url:a,role_id:r,file_state:l}},invokeAsCommand:!1}),OnArxSuccess,OnArxError)},e.deleteData={},e.setDeleteFile=function(t,a){e.deleteData.index=t,e.deleteData.id=a.id,e.dataToggle=""},e.delete=function(){var a={subproject_id:parseInt(e.queryParams.subproject_id),openid:e.queryParams.login_id,fileid:e.deleteData.id};t.post(requestHost+"Deletefile/deletefile",a).then(function(t){t.data.success?(e.alert.title="操作成功",e.filelist.splice(e.deleteData.index,1),e.from_ipm&&execAsync(JSON.stringify({functionName:"AfterAuditFile",functionParams:{args:{state:t.data.state}},invokeAsCommand:!1}),OnArxSuccess,OnArxError)):e.alert.title="操作失败",e.alert.content=t.data.message,$("#alertModal").modal("show")},function(t){e.alert.title="操作失败",e.alert.content=t.toString(),$("#alertModal").modal("show")})},e.state_str=["全部","待审核","待修改","已审核"],e.selectedStateIndex=0,e.showFileState=function(t){e.selectedStateIndex=t,0==t?delete e.queryParams.file_state:e.queryParams.file_state=t,e.search()},e.role_str=["全部","区域经理","底图组","总工室总工","总工室变化层设计组","总工室施工图组","检查组","设计组"],e.selectedRoleIndex=0,e.showFileRole=function(t){e.selectedRoleIndex=t,0==t?delete e.queryParams.role_id:e.queryParams.role_id=t,e.search()},e.file_type_str=[{file_type:0,filetype_name:"全部"}],e.selectedFileType="全部",t.get(requestHost+"File/filetypelist",{params:{subproject_id:a.search().subproject_id}}).then(function(t){Array.prototype.push.apply(e.file_type_str,t.data)},function(e){console.log(e)}),e.showFileType=function(t){e.selectedFileType=e.file_type_str[t].filetype_name,0==t?delete e.queryParams.file_type:e.queryParams.file_type=e.file_type_str[t].file_type,e.search()}}]);