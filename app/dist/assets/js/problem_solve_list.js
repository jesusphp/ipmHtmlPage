var app=angular.module("myApp",[]),requestProblem=requestHost+"Problem/",requestProject=requestHost+"Project/";app.config(["$locationProvider",function(e){e.html5Mode({enabled:!0,requireBase:!1})}]),app.controller("userCtrl",["$scope","$http","$location",function(e,t,a){function r(a,r,s){e.queryParams.start=e.start,e.queryParams.count=e.count,e.queryParams.keyword=e.keyword,t.get(requestProblem+"ProblemInfo_list",{params:e.queryParams}).then(function(t){0==t.data.length?o():Array.prototype.push.apply(e.users,t.data)},function(e){console.log(e)})}if(e.queryParams=angular.copy(a.search()),e.from_ipm=a.search().ipm,e.queryParams.company_id)if(e.queryParams.project_id)if(e.queryParams.subproject_id)if(e.queryParams.changer_id){t.get(requestProject+"project_name",{params:{project_id:e.queryParams.project_id}}).then(function(t){0!=t.data.length?e.showProjectName=t.data[0].name:alert("总项目不存在！")},function(e){console.log(e)}),t.get(requestProject+"subproject_name",{params:{subproject_id:e.queryParams.subproject_id}}).then(function(t){0!=t.data.length?e.showSubprojectName=t.data[0].name:alert("子项目不存在！")},function(e){console.log(e)}),e.problemCreatorList=[],e.creator_name="全部",t.get(requestProblem+"problemuser_list",{params:{company_id:e.queryParams.company_id,subproject_id:e.queryParams.subproject_id}}).then(function(t){Array.prototype.push.apply(e.problemCreatorList,t.data.creator)},function(e){console.log(e)}),t.get("/design_institute/public/admin/user/selectUser",{params:{openid:e.queryParams.changer_id}}).then(function(t){e.showChangerName=t.data.nickname},function(e){console.log(e)}),e.showCreator=function(t){0==t?(e.creator_name="全部",delete e.queryParams.creator_id):(e.queryParams.creator_id=t.creator_id,e.creator_name=t.creator_nickname),e.search()},e.alert={},e.dataToggle="modal",e.users=[],e.start=0,e.count=20,e.keyword;var o=e.$watch("start",r);e.search=function(){o(),e.start=0,e.users=[],o=e.$watch("start",r)},e.exportExcel=function(){var t=angular.copy(e.queryParams);delete t.start,delete t.count,delete t.keyword;var a="";for(var r in t)void 0!=t[r]&&(a+=r+"="+t[r]+"&");""!=a&&(a=(a="?"+a).substring(0,a.length-1)),execAsync(JSON.stringify({functionName:"ExpoerExcel",functionParams:{args:{url:"http://120.25.74.178"+requestProblem+"ProblemInfo_list"+a}},invokeAsCommand:!1}),function(e){console.log(e)},function(e){console.log(e)})},e.detailUser={},e.detailIndex,e.setDetailUser=function(t,a){e.detailUser=angular.copy(a),e.detailIndex=t},e.deleteData={},e.setDeleteUser=function(t,a){e.deleteData.index=t,e.deleteData.openid=a.changer_id,e.deleteData.problemid=a.id,e.dataToggle=""},e.delete=function(){var a={openid:e.deleteData.openid,state:2,problemid:e.deleteData.problemid};t.post(requestProblem+"Solveproblem",a).then(function(t){if(t.data.success){e.users[e.deleteData.index].state=t.data.state,e.users[e.deleteData.index].update_time=t.data.update_time,e.users[e.deleteData.index].state_name=["全部","待解决","待审核","已解决"][t.data.state],e.alert.title="操作成功"}else e.alert.title="操作失败";e.alert.content=t.data.message,$("#alertModal").modal("show")},function(t){e.alert.title="操作失败",e.alert.content=t.toString(),$("#alertModal").modal("show")})};var s=["全部","待解决","待审核","已解决"];e.selectedState="全部",e.showProblemState=function(t){e.selectedState=s[t],0==t?delete e.queryParams.state:e.queryParams.state=t,e.search()},e.prjState_str=["全部","底图深化","配模阶段","制图阶段","预拼装","现场施工"],e.selectedPrjState="全部",e.showProblemPrjState=function(t){e.selectedPrjState=e.prjState_str[t],0==t?delete e.queryParams.prjState:e.queryParams.prjState=t,e.search()},e.subtype_str=["全部","楼板","梁板","墙板","飘台","楼梯","背楞","其他"],e.selectedSubtype="全部",e.showProblemType=function(t){e.selectedSubtype=e.subtype_str[t],0==t?delete e.queryParams.subtype_id:e.queryParams.subtype_id=t,e.search()},e.problemGrade_str=["全部","一级","二级","三级","四级","五级"],e.selectedProblemGrade="全部",e.showProblemGrade=function(t){e.selectedProblemGrade=e.problemGrade_str[t],0==t?delete e.queryParams.problemGrade:e.queryParams.problemGrade=e.problemGrade_str[t],e.search()},e.showImg=function(e){execAsync(JSON.stringify({functionName:"ShowImage",functionParams:{args:{url:e}},invokeAsCommand:!1}),function(e){console.log(e)},function(e){console.log(e)})}}else alert("喂，负责人id呢？");else alert("喂，子项目id呢？");else alert("喂，总项目id呢？");else alert("喂，你是哪个公司的？")}]);