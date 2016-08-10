var app = angular.module('communityBoard', ['ui.router']);

  app.service('posts', function(){
	  var o = {
		posts: [
			{title:'Post 1', 
			 content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet lacus tellus. Nulla nec vehicula turpis, nec posuere leo.", 
			 upvotes:5,
			 comments: [	
				{author: 'Joe', body: 'Lorem ipsum dolor sit amet.', upvotes: 1},
				{author: 'Jane', body: 'Lorem ipsum dolor sit amet.', upvotes: 4}
			 ]},
			{title:'Post 2', link:"http://www.google.com", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet lacus tellus. Nulla nec vehicula turpis, nec posuere leo.", upvotes:2},
			{title:'Post 3', 
			 content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet lacus tellus. Nulla nec vehicula turpis, nec posuere leo.",
			 upvotes:15,
			 comments: [	
				{author: 'Joe', body: 'Lorem ipsum dolor sit amet.', upvotes: 2},
				{author: 'Jane', body: 'Lorem ipsum dolor sit amet.', upvotes: 0},
				{author: 'Jack', body: 'Lorem ipsum dolor sit amet.', upvotes: 0},
			 ]},
			{title:'Post 4', content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet lacus tellus. Nulla nec vehicula turpis, nec posuere leo.", upvotes:9},
		]
	  };
	  return o;
  });

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'MainCtrl'
    })
	
	.state('posts', {
	  url: '/posts/{id}',
	  templateUrl: 'posts.html',
	  controller: 'PostsCtrl'
	});
	
  $urlRouterProvider.otherwise('home');
}]);


app.controller('MainCtrl', [
	'$scope', 'posts',
	function($scope, posts){
		
	  $scope.posts = posts.posts;

	  $scope.test = 'Hello world!';

		$scope.addPost = function(){
		  if(!$scope.title || $scope.title === '') { return; }
		  
		  $scope.posts.push({
			  title: $scope.title,
			  link: $scope.link,
			  content: $scope.content,
			  upvotes: 0,
			});
		  
		  $scope.title = '';
		  $scope.link = '';
		  $scope.content = '';
		};

	$scope.incrementUpvotes = function(post) {
	  post.upvotes += 1;
	};

}]);

app.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){
		$scope.post = posts.posts[$stateParams.id];
		$scope.incrementUpvotes = function(comment) {
		  comment.upvotes += 1;
		};
}]);


