angular.module("providerApp").
controller("contestsController",function($scope, $location, UtilitiesService, UserService){
	$(function(){
		$(".no-login").removeClass("no-login").addClass("login");        	
	})
	$scope.user = UserService.getUserObj();
	if(!$scope.user.id){
		$location.path("/");
	}
	else{
		$scope.username = $scope.user.fullname;
	}
})