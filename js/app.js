(function (angular) {
	'use strict';

	var myapp = angular.module('MyTodoMvc',[]);

	myapp.controller('MainController',['$scope','$location',function($scope,$location){
		$scope.text = '';
		$scope.todos = [
			{id: 1,text:'学习',completed: false},
			{id: 2,text:'睡觉',completed: false},
			{id: 3,text:'打豆豆',completed: true},
		];

		//添加
		$scope.add = function(){
			$scope.todos.push({id: $scope.todos.length + 1,text:$scope.text,completed: false});
			$scope.text = '';
		}
		//删除
		$scope.remove = function(id){
			var resulte = [];
			for(var i = 0, len =$scope.todos.length; i<len; i++ ){
				if($scope.todos[i].id != id){
					resulte.push($scope.todos[i])
				}
			}
			$scope.todos = resulte;
		}

		$scope.clear= function(){
			var resulte = [];
			for(var i = 0, len =$scope.todos.length; i<len; i++ ){
				if($scope.todos[i].completed === false){
					resulte.push($scope.todos[i])
				}
			}
			$scope.todos = resulte;
		}

		$scope.existCompleated = function(){
			for(var i = 0, len =$scope.todos.length; i<len; i++ ){
				if($scope.todos[i].completed === true){
					return true;
				}
			}

			return false;

		}

		$scope.currentEdting = -1;

		$scope.edting = function (id) {
			$scope.currentEdting = id;
		}
		$scope.save = function(){
			$scope.currentEdting = -1;
		}

		var now = true;
		$scope.toggleAll = function(){
			for(var i = 0, len =$scope.todos.length; i<len; i++ ){
				$scope.todos[i].completed = now;
			}
			now = !now;
		}
		$scope.$location = $location;
		//状态筛选

		$scope.$watch('$location.path()',function(now, old){
				switch (now){
					case '/active': $scope.selector = {completed:false};break;
					case '/completed': $scope.selector = {completed:true};break;
					default: $scope.selector = {};break;

				}
		})


		function getId(){
			var id = Math.random();
			for(var i = 0, len =$scope.todos.length; i<len; i++ ){
				if($scope.todos[i].id === id){
					id = getId();
					break;
				}
			}
			return id;
		}

	}])
})(angular);
