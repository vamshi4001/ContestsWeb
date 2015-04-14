angular.module("providerApp")
    .config(function ($routeProvider) {
        $routeProvider
          .when('/', {
              templateUrl: 'signin/signin.html',
              controller: 'signinController'
          })
          .when('/contests', {
              templateUrl: 'contests/contests.html',
              controller: 'contestsController'
          })
          .when('/history', {
              templateUrl: 'history/history.html',
              controller: 'historyController'
          })
          .when('/questions', {
              templateUrl: 'questions/questions.html',
              controller: 'questionsController'
          })
          .when('/videos', {
              templateUrl: 'videos/videos.html',
              controller: 'videosController'
          })
          .when('/feedback', {
              templateUrl: 'feedback/feedback.html',
              controller: 'feedbackController'
          })
          .when('/socialmedia', {
              templateUrl: 'socialmedia/socialmedia.html',
              controller: 'socialmediaController'
          })
          .when('/refer', {
              templateUrl: 'referfriend/referfriend.html',
              controller: 'referfriendController'
          })
          .otherwise({
              redirectTo: '/'
          });          
    })  