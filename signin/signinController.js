angular.module("providerApp").
controller("signinController",function($scope, $location, UtilitiesService, UserService){
	$(function(){
		$(".login").removeClass("login").addClass("no-login");        	
	})
	$scope.user = UserService.getUserObj();
	if($scope.user && $scope.user.id){
		$location.path("/contests");
	}
	$scope.signin = function(){
		var url = UtilitiesService.getUrlPrefix()+"user/userLogin.json?uname="+$scope.username+"&password="+$.md5($scope.password);
		UtilitiesService.makeAjaxCalls(url, "", "GET").then(function(response){
			if(response.data.isSuccess){
				UserService.setUserObj(response.data.result[0]);
				$location.path("/contests");
			}
		})
	}
})