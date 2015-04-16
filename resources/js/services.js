'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('providerApp')

    .value('version', '0.1')
    .service("MessagingService", function () {
        var messages = [];
        return {
            setMessage: function (message) {
                messages.push(message);
            },
            getMessage: function () {
                return messages;
            },
            resetMessage: function () {
                messages = [];
            }
        }
    })
    .service("UtilitiesService", function ($http) {
        var urlPrefix = "http://localhost:8888/contests/index.php/";
        var erTypes = [];
        return {
            getERType: function (lookUpValue) {
                for (var i = 0; i < erTypes.length; i++) {
                    if (erTypes[i].lookUpValue === lookUpValue) {
                        return erTypes[i].lookUpId
                    }
                }
            },
            getUrlPrefix: function () {
                return urlPrefix;
            },
            showImg: function(status){
              if(status=="1"){
                return "ok green";
              }
              else{
                return "remove red";
              }
            },
            openNewTab: function (name, id, event, parent) {                  
                if ($("#" + id).length == 0) {
                    if(!parent){
                      $("#myTab").append(
                        $("<li>").html('<a href="/#tab' + id + '" id="' + id + '" role="tab" data-toggle="tab" class="customer-tab">' + name + '<i class="close">×</i></a>')
                      );
                    }
                    else{
                      $("#SettledTab").append(
                        $("<li>").html('<a href="/#tab' + id + '" id="' + id + '" role="tab" data-toggle="tab" class="customer-tab">' + name + '<i class="close">×</i></a>')
                      );
                    }
                    $("#"+id).css("width",$("#"+id).width()+50+"px");
                }
                if(!parent){
                  $('#myTab a#' + id).tab('show');
                }
                else{
                  $('#SettledTab a#' + id).tab('show');
                }
            },
            formatCurrency : function (inputCurrency) {
                if(inputCurrency){
                  inputCurrency = inputCurrency.toString();
                  var afterPoint = '';
                  if (inputCurrency.indexOf('.') > 0)
                      afterPoint = inputCurrency.substring(inputCurrency.indexOf('.'), inputCurrency.length);
                  inputCurrency = Math.floor(inputCurrency);
                  inputCurrency = inputCurrency.toString();
                  var lastThree = inputCurrency.substring(inputCurrency.length - 3);
                  var otherNumbers = inputCurrency.substring(0, inputCurrency.length - 3);
                  if (otherNumbers != '')
                      lastThree = ',' + lastThree;
                  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
                  return res;
                }            
                else{
                  return 0;
                }      
            },
            formatDate : function(inputDate){
                var dt = inputDate ? new Date(inputDate) : new Date();
                var now = new Date(Date.now());
                var dtString = dt.getDate() + " " + dt.getMonthName().substring(0,3) + " " + dt.getFullYear();
                var nowString = now.getDate() + " " + now.getMonthName().substring(0,3) + " " + now.getFullYear();
                var dispDate = dtString.split(" ");

                if (dtString == nowString) {
                    return "Today";
                }
                else if (dt.getFullYear() == now.getFullYear()) {
                    return dispDate[1] + " " + dispDate[0];
                }
                else {
                    return dispDate[1] + " " + dispDate[0] + " " + dispDate[2];
                }
            },
            formatTime : function(inputDate){
                var dt = inputDate ? new Date(inputDate) : new Date();
                var now = new Date(Date.now());
                var dtString = dt.getDate() + " " + dt.getMonthName() + " " + dt.getFullYear();
                var nowString = now.getDate() + " " + now.getMonthName() + " " + now.getFullYear();
                var dispDate = dtString.split(" ");
                var mins = dt.getMinutes().length==1?'0'+dt.getMinutes():dt.getMinutes();
                var hrs = dt.getHours()<10?"0"+dt.getHours():dt.getHours();  
                mins = mins<10?"0"+mins:mins;                 
                var time = hrs + ":" + mins;
                time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
                if (time.length > 1) { // If time format correct
                  time = time.slice (1);  // Remove full string match value
                  time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
                  time[0] = +time[0] % 12 || 12; // Adjust hours
                }
                return time.join ('');                  
            },
            getAuditDate : function (inputDate) {                  
                inputDate = new Date(parseInt(inputDate.replace("/Date(", "").replace(")/",""), 10))
                return this.formatDate(inputDate);                  
            },
            getAuditTime: function (inputDate){
                inputDate = new Date(parseInt(inputDate.replace("/Date(", "").replace(")/",""), 10))
                var dt = inputDate ? new Date(inputDate) : new Date();
                var now = new Date(Date.now());
                var dtString = dt.getDate() + " " + dt.getMonthName() + " " + dt.getFullYear();
                var nowString = now.getDate() + " " + now.getMonthName() + " " + now.getFullYear();
                var dispDate = dtString.split(" ");
                var mins = dt.getMinutes().length==1?'0'+dt.getMinutes():dt.getMinutes();
                var hrs = dt.getHours()<10?"0"+dt.getHours():dt.getHours();  
                mins = mins<10?"0"+mins:mins;                 
                var time = hrs + ":" + mins;
                time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
                if (time.length > 1) { // If time format correct
                  time = time.slice (1);  // Remove full string match value
                  time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
                  time[0] = +time[0] % 12 || 12; // Adjust hours
                }
                return time.join ('');                  
            },
            compareDate : function (inputDate) {                  
                inputDate = new Date(parseInt(inputDate.replace("/Date(", "").replace(")/",""), 10))
                var dt = inputDate ? new Date(inputDate) : new Date();
                var now = new Date(Date.now());
                var dtString = dt.getDate() + " " + dt.getMonthName() + " " + dt.getFullYear();
                var nowString = now.getDate() + " " + now.getMonthName() + " " + now.getFullYear();
                var dispDate = dtString.split(" ");

                if (dtString == nowString) {
                    var mins = dt.getMinutes()=='0'?'00':dt.getMinutes();
                    var time = dt.getHours() + ":" + mins;
                    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

                    if (time.length > 1) { // If time format correct
                      time = time.slice (1);  // Remove full string match value
                      time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
                      time[0] = +time[0] % 12 || 12; // Adjust hours
                    }
                    // var x = time.join ('');
                    // return "Today"+x;
                    return "Today";
                }
                else if (dt.getFullYear() == now.getFullYear()) {
                    return dispDate[1] + " " + dispDate[0];
                }
                else {
                    return dispDate[1] + " " + dispDate[0] + " " + dispDate[2];
                }
            },
            makeAjaxCalls: function(url, data, method, accessToken){
              if(method.toLowerCase()=="get"){
                // $httpProvider.defaults.headers.get = { 'AccessToken' : accessToken }
                var promise = $http.get(url);  
              }
              else{
                var promise = $http({
                    method: method,
                    url: url,
                    data: data,
                    headers:{
                      "AccessToken":accessToken
                    }
                });
              }              
              return promise;
            },
            fetchERTypes: function () {
                var self = this;
                $http.get(urlPrefix + "/masterdata/lookup/EntityRelation.json").
                  success(function (data) {
                      if (data.isSuccess) {
                          erTypes = data.lookUpData;
                      }
                  })
                  .error(function () {
                      console.log("Error");
                  })
            },
            addFileInput: function(id){
                var suffix = Math.floor((Math.random() * 100) + 1);
                $("#"+id).append('<br><input type="file" name="files'+suffix+'" id="">');
            } 
        }
    })
    .service("MasterDataService", function ($http, $cookieStore, UtilitiesService){
      var requestMaster = {}, tagsMaster = {}, statusMaster = {};
      return {
        getRequestMaster: function(){ 
          if(requestMaster.RequestType){
            return requestMaster.RequestType;
          }         
          else{
            UtilitiesService.makeAjaxCalls(UtilitiesService.getUrlPrefix()+"requestlookup",{"lookUpTypes":["requestType"]},"POST").then(function(response){
              requestMaster = response.data.lookUp;
              return requestMaster.RequestType;
            })
          }          
        },
        getTagsMaster: function(){
          if(tagsMaster.Appointment){
            return tagsMaster.Appointment;
          }
          else{
            UtilitiesService.makeAjaxCalls(UtilitiesService.getUrlPrefix()+"requestlookup",{"lookUpTypes":["appointment"]},"POST").then(function(response){
              tagsMaster = response.data.lookUp;
              return tagsMaster.Appointment;
            })
          }
        },
        getStatusMaster: function(){
          if(statusMaster.Appointment){
            return statusMaster.Appointment;
          }
          else{
            UtilitiesService.makeAjaxCalls("http://192.168.70.169:2468/requeststatuslookup",{"statusTypes":["appointment"]},"POST").then(function(response){
              statusMaster = response.data.status;
              return statusMaster.Appointment;
            })
          }
        }
      }
    })
    .service("UserService", function ($http, $cookieStore) {
        var userObj = {};
        var adminId = 0;
        var roles = [];
        var hospitalObj = {};
        return {
            getUserRoles: function(){
              return $cookieStore.get('user').rolesFeatures.roles; 
            },
            getUserFeatures: function(){
              return $cookieStore.get('user').rolesFeatures.features;
            },
            getAccessToken: function(){
              return $cookieStore.get('user').accessTokenObj.access_token;
            },
            setUserObj: function (obj) {                  
              $cookieStore.put('user', obj);
              $cookieStore.put('loggedin', 'true');
            },
            getUserObj: function () {
              if($cookieStore.get('loggedin')=='true'){
                return $cookieStore.get('user');
              }
              else{
                return null;
              }
            },
            destroyUserObj: function () {
              $cookieStore.put('user', null);
              $cookieStore.put('loggedin', 'false');                    
            },
            getAdminId: function () {
              return adminId;
            },
            setAdminId: function (id) {
              adminId = id;
            },
            isAdmin: function () {
              var user = this.getUserObj();
              if (user && user.roleId == this.getAdminId()) {
                  return true;
              }
              else {
                  return false;
              }
            },
            setRoles: function (roleArray) {
                roles = roleArray;
            },
            getRoles: function () {
                return roles;
            },
            isRemedinetAssociated: function(){
              return getHospitalObj().isRemedinetAssociated;
            },
            getHospitalObj: function(){                  
                if($cookieStore.get('loggedin')=='true'){                    
                  return $cookieStore.get('hospital');
                }
                else{
                  return null;
                }
            },
            setHospitalObj: function(obj){                  
                $cookieStore.put('hospital', obj);                  
            },
            fetchHospDetails: function (hospId) {                
                var self = this;
                $.ajax({
                    type: "GET",
                    async: false,
                    url: "http://demoapi.medibuddy.in/hosp/details.json?hospId=" + hospId,
                    success: function(hospData) {
                        if (hospData.isSuccess) {
                            self.setHospitalObj(hospData.hospDetails); 
                            //Setting guest role if the user isRemedinetAssociated
                            if(self.getHospitalObj().isRemedinetAssociated){
                              var obj = self.getUserObj();
                              obj.role = "guest";
                              self.setUserObj(obj);
                            }
                            $("#changeHospitalBtn").text(self.getHospitalObj().hospName+" - Change Hospital");                           
                        }
                        else {
                            return null;
                        }
                    },
                    error: function(){
                      return null;
                    }
                });
            },
            displayThis: function(feature, _role){
              if(_role){
                var role = _role.toLowerCase();
                //role can be cms, guest, operations, finance, admin
                switch(feature){
                  case "switchHosp":
                    if(role=="cms")
                      return true;
                    else
                      return false;
                    break;
                  case "newadmission":
                    if(role=="guest" || role=="cms" || role=="cms")
                      return false;
                    else
                      return true;
                    break;
                  case "claimaction":
                    if(role=="guest" || role=="cms" || role=="hr" )
                      return false;
                    else
                      return true;
                    break;
                  case "operations":
                    if(role=="operations" || role=="admin" || role=="cms" || role=="hr")
                      return true;
                    else
                      return false;
                    break;
                  case "finance":
                    if(role=="finance" || role=="admin" || role=="cms" || role=="hr")
                      return true;
                    else
                      return false;
                    break;
                  default:
                    return false;
                    break;
                }
              }
              else{
                return false;
              }
            },
            fetchRoles: function () {
                var self = this;
                $http.get("http://demoapi.medibuddy.in/hosp/master/roles.json").
                  success(function (roleData) {
                      if (roleData.isSuccess) {
                          roles = roleData.lookUpData;
                          for (var i = 0; i < roles.length; i++) {
                              if (roles[i].lookUpValue == "Admin") {
                                  self.setAdminId(roles[i].lookUpId);
                              }
                          };
                          self.setRoles(roles);
                      }
                  })
                  .error(function () {
                      console.log("Error");
                  })
            },
            isActive: function () {
                var user = this.getUserObj();
                if (user) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    })
  .service("ProductMasterService", function ($http){
      var ProfileMaster = {};
      return {
        getInvestigationByGroup: function(investigation){
          var groupObj = {};
          $(investigation).each(function(i,v){
            if(groupObj[v.groupName]){
              groupObj[v.groupName].push(v);
            }
            else{
              groupObj[v.groupName] = new Array();
              groupObj[v.groupName].push(v);
            }
          })
          return groupObj;
        }
      }
    })