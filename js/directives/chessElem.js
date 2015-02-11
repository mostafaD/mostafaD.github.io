var app = angular.module("chess");

app.directive('chessElem', function($timeout,$interval){
	return {
		scope:true,
			controller: function(){
			},
		link: function($scope, iElm, iAttrs, controller) {
				$scope.show = false;
				$scope.setMovement = false;
				this.myElStr= "";
				this.lastPositionX = 0;
				this.lastPositionY = 0;
				this.xx=0;
				this.myLand={};
				this.newLand={};
				$scope.setMove = function(e,x1,x2){
					var accepted = true;
					stepX=0;
					stepY=0;
					if($scope.setMovement && accepted){
						// release
						myElStr = '#id'+iAttrs.chessElem+'x'+iAttrs.chessElemxx
						$scope.goBack(e.x, e.y, lastPositionX, lastPositionY);
						$timeout(function(){
							$scope.show=!$scope.show;
							$scope.setMovement = !$scope.setMovement;
							},400);
						$scope.movement(myLand,newLand)

					}else{
						$scope.show=true;				
						lastPositionX = e.x
						lastPositionY = e.y
						myLand.x1=x1;
						myLand.x2=x2;
					}
					$scope.setMovement = !$scope.setMovement;

				}

				$scope.move = function(e){
				}

				$scope.setOver = function(e,x1,x2){
				}

		}
}});