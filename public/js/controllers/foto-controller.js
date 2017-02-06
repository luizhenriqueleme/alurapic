angular.module('alurapic')
	.controller('FotoController', function($scope, $http, $routeParams, $resource) {

		$scope.foto = {};
		$scope.mensagem = '';

		var recursoFoto = $resource('v1/fotos/:fotoId',null, {
			update : {
				method: 'PUT'
			}
		});

		if($routeParams.fotoId) {
			$http.get('/v1/fotos/' + $routeParams.fotoId)
			.success(function(foto) {
				$scope.foto = foto;
			})
			.error(function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter a foto'
			});
		}

		$scope.submeter = function() {

			if ($scope.formulario.$valid) {

				if($routeParams.fotoId) {

					recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function(){
					
					$scope.mensagem = 'Foto alterada com sucesso';
					}, function(erro) {
						$scope.mensagem = 'Não foi possível alterar';
					});
				} else { 

					$http.post('/v1/fotos', $scope.foto)
					.success(function() {
						$scope.foto = {};
						$scope.mensagem = 'Foto cadastrada com sucesso';
					})
					.error(function(erro) {
						console.log(erro);
						$scope.mensagem = 'Não foi possível cadastrar a foto';
					})
				}
			}
		};
	});