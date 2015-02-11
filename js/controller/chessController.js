var app = angular.module("chess",[]);
app.controller("chessController",function($scope,$interval,$timeout,$sce){
	$scope.show = false;
	$scope.x=0;
	$scope.y=0;
	$scope.offsetX=0;
	$scope.offsetY=0;
	$scope.hello = "hello world !"
	$scope.land=[];
	$scope.myLand = {};
	$scope.newLand = {};
	$scope.kingLand = [];
	$scope.turn =1;
	$scope.time = [];
	for(var i=0;i<2;i++){
		$scope.time[i] = {
			seconds:0,
			minutes:0,
			hours:0
		};
	}

	$interval(function(){
		$scope.increaeTime($scope.turn-1);
	},1000)

	$scope.increaeTime = function(team){
		$scope.time[team].seconds ++;
		if($scope.time[team].seconds === 60){
			$scope.time[team].seconds = 0;
			$scope.time[team].minutes ++
			if($scope.time[team].minutes === 60){
				$scope.time[team].minutes = 0;
				$scope.time[team].hours ++;
			}
		}
	}

	$scope.getTime = function(type,team){
		if($scope.time[team][type] >9){
			return $scope.time[team][type];
		}else{
			return '0' + $scope.time[team][type];
		}
	}

	$scope.creatOpject= function(team,type){
		return{
			team:team,
			type:type,
			color:"",
			getType:function(){
				var x = ""
				if(this.type==""){
					x= "&nbsp"
				}else{
					x="<b >&#"+Number(this.type+((parseInt(this.team)-1)*6))+";</b>"
				}
				return $sce.trustAsHtml(x);
			},
			setTeam:function(x){
				if(x ===1){
					this.team=1
				}else{
					this.team=2
				}
			}
		}
	}

	$scope.inite = function(){
		t=[0,7]
		t2=[1,6]
		for(var i = 0 ; i < 8; i++){
			$scope.land[i]=[]
		for(var j = 0 ; j < 8; j++){
			$scope.land[i][j]=$scope.creatOpject(0,"");
		}
	}
	for(var i = 0 ; i < 8; i++){
		for(var j = 1 ; j < 3; j++){
			if(i==0 || i==7){
				$scope.land[t[j-1]][i]=$scope.creatOpject(j,9814)
			}else if(i==1 || i==6){
				$scope.land[t[j-1]][i]=$scope.creatOpject(j,9816)
			}else if(i==2 || i==5){
				$scope.land[t[j-1]][i]=$scope.creatOpject(j,9815)
			}else if(i==3){
				$scope.land[t[j-1]][i]=$scope.creatOpject(j,9813)
			}else if(i==4){
				$scope.kingLand[j-1]={};
				$scope.kingLand[j-1].x=i;
				$scope.kingLand[j-1].y=t[j-1];
				$scope.land[t[j-1]][i]=$scope.creatOpject(j,9812)
			}
		}
	}
	for(var i = 0 ; i < 8; i++){
		for(var j = 1 ; j < 3; j++){
			$scope.land[t2[j-1]][i]=$scope.creatOpject(j,9817)
		}
	}
	}
	$scope.inite();

	$scope.movement = function(myLand,newLand){
		switch($scope.land[myLand.y][myLand.x].type){
			case 9812:
				$scope.kingLand[$scope.land[myLand.y][myLand.x].team - 1].x = newLand.x;
				$scope.kingLand[$scope.land[myLand.y][myLand.x].team - 1].y = newLand.y;
				if(Math.abs(myLand.x-newLand.x)<2 
					&& Math.abs(myLand.y-newLand.y)<2 ){
				return (true);
				}
				return (false);
			break;
			case 9813:
				if( (((myLand.x-newLand.x)==0 || (myLand.y-newLand.y)==0) 
					&&(Math.abs(myLand.x-newLand.x)>0
						|| Math.abs(myLand.y-newLand.y)>0)) 
						|| ((myLand.x-myLand.y)
							==(newLand.x-newLand.y)) 
						|| ((myLand.x+myLand.y)==(newLand.x+newLand.y)) ){
					return (true);
				}
				return (false);
			break;
			case 9814:
				if( (((myLand.x-newLand.x)==0 || (myLand.y-newLand.y)==0) 
					&&(Math.abs(myLand.x-newLand.x)>0
						|| Math.abs(myLand.y-newLand.y)>0)) ){
					return (true);
				}
				return (false);
			break;
			case 9815:
				if( ((myLand.x-myLand.y)
						==(newLand.x-newLand.y)) 
						||((myLand.x+myLand.y)
						==(newLand.x+newLand.y)) ){
					return (true);
				}
				return (false);
			break;
			case 9816:
				if((Math.abs(myLand.x-newLand.x)==2
					&& Math.abs(myLand.y-newLand.y)==1 )
					|| (Math.abs(myLand.x-newLand.x)==1
					&& Math.abs(myLand.y-newLand.y)==2 )){

				return (true); 
				}
				return (false);
			break;
			case 9817:
				if(((myLand.y-newLand.y == -1 && myLand.x==newLand.x) 
					&& $scope.land[myLand.y][myLand.x].team == 1) 
					|| ((myLand.y-newLand.y == 1 && myLand.x==newLand.x) 
					&& $scope.land[myLand.y][myLand.x].team == 2)){
					return (true);
				}else if((myLand.y === 1
					&& ((myLand.y-newLand.y == -2 && myLand.x==newLand.x) 
					&& $scope.land[myLand.y][myLand.x].team == 1)) 
					|| (myLand.y === 6
					&&((myLand.y-newLand.y == 2 && myLand.x==newLand.x) 
					&& $scope.land[myLand.y][myLand.x].team == 2))){
					
					return (true);
				}else if(((($scope.land[newLand.y][newLand.x].team === 2))
					&&((myLand.y-newLand.y == -1 && Math.abs(myLand.x-newLand.x)===1) 
					&& $scope.land[myLand.y][myLand.x].team == 1))
					|| ((($scope.land[newLand.y][newLand.x].team === 1))
					&&((myLand.y-newLand.y == 1 && Math.abs(myLand.x-newLand.x)===1) 
					&& $scope.land[myLand.y][myLand.x].team == 2)) ){
					return (true);
				}

				return (false);
			
			break;
		}
	}	


	$scope.move = function(myLand,newLand){
		$scope.land[newLand.y][newLand.x].type =
		 $scope.land[myLand.y][myLand.x].type;
		 $scope.land[newLand.y][newLand.x].team =
		 $scope.land[myLand.y][myLand.x].team;
		 $scope.land[myLand.y][myLand.x].type = "";
		 $scope.land[myLand.y][myLand.x].team = 0;
		 $scope.$apply();
	}

	$scope.dragged = function(x,y){
		
	}
	
	$scope.clearRoad = function(myLand,newLand){
		if($scope.land[myLand.y][myLand.x].type == 9816){
			return true;
		}
		if((myLand.x==newLand.x)){
			if(newLand.y>myLand.y){
				var begin = myLand.y+1;
				var limit = newLand.y-1;
			}else{
				var limit = myLand.y-1;
				var begin = newLand.y+1;
			}
			for(var i=begin; i < limit+1; i++){
				if($scope.land[i][myLand.x].type != ""){
					console.log("cant pass x= "+myLand.x+" , y= " +i);
					return false;
				}
			}
			return true;
		}else if((myLand.y==newLand.y)){
			if(newLand.x>myLand.x){
				var begin = myLand.x+1;
				var limit = newLand.x-1;
			}else{
				var limit = myLand.x-1;
				var begin = newLand.x+1;
			}
			for(var i=begin; i < limit+1; i++){
				if($scope.land[myLand.y][i].type != ""){
					return false;
				}
			}
			return true;
		}else if(myLand.x-myLand.y == newLand.x-newLand.y ){
			var diff = myLand.x-myLand.y
			if(newLand.x>myLand.x){
				var begin = myLand.x+1;
				var limit = newLand.x-1;
			}else{
				var limit = myLand.x-1;
				var begin = newLand.x+1;
			}
			for(var i=begin; i < limit+1; i++){
				if($scope.land[i-diff][i].type != ""){
					return false;
				}

			}
			return true;
		}else if(myLand.x+myLand.y == newLand.x+newLand.y){
			var sum = myLand.x+myLand.y
			if(newLand.x>myLand.x){
				var begin = myLand.x+1;
				var limit = newLand.x-1;
			}else{
				var limit = myLand.x-1;
				var begin = newLand.x+1;
			}
			for(var i=begin; i < limit+1; i++){
				if($scope.land[sum-i][i].type != ""){
					return false;
				}
			}
			return true;
		}
	}

	$scope.isEnemy = function(myLand,newLand){
		if($scope.land[newLand.y][newLand.x].team == 0){
			return true;	
		}
		if( $scope.land[newLand.y][newLand.x].team ==
			$scope.land[myLand.y][myLand.x].team){
			return false
		}
		return true;
	}

	$scope.changeTurn = function(){
		if($scope.turn === 1){
			$scope.turn = 2;
		}else{
			$scope.turn = 1;
		}
	} 

	$scope.isMyTurn = function(myLand){
		if($scope.land[myLand.y][myLand.x].team === $scope.turn){
			return true;
		}
		return false;
	};

	$scope.isKingUnderAttack = function(team){
		var otherTeam = (team ===1)?2:1;
		var isSafe = true;
		for(var i = 0; i<8; i ++){
			for(var j = 0; j<8; j ++){
				if($scope.land[i][j].team === otherTeam 
					&& $scope.clearRoad({'x':j , 'y':i},$scope.kingLand[team-1])){
					if($scope.movement({'x':j , 'y':i},$scope.kingLand[team-1])
						&& $scope.clearRoad($scope.myLand,$scope.newLand)){
						console.log('kingLand .. x='+$scope.kingLand[team-1].x+"  y="+$scope.kingLand[team-1].y);
						console.log('team='+team);
						console.log('otherTeam='+otherTeam);
						console.log("i = "+i+"  * * j="+j)
						isSafe = false;
						break;
					}
				}
			}
			if(!isSafe){
				break;
			}
		}
		console.log('king is safe? ====> ' + isSafe  )
		return isSafe;
	}

	$scope.endDrag = function(x,y){
		$scope.myLand.x=x;
		$scope.myLand.y=y;
		if($scope.isMyTurn($scope.myLand)
			&& $scope.movement($scope.myLand,$scope.newLand)
			&& $scope.clearRoad($scope.myLand,$scope.newLand)
			&& $scope.isEnemy($scope.myLand,$scope.newLand)){
			$scope.move($scope.myLand,$scope.newLand);
			$scope.isKingUnderAttack($scope.turn);
			$scope.changeTurn();
		}
	}

	$scope.drop = function(x,y){
		$scope.newLand.x=x;
		$scope.newLand.y=y;
	}

	$scope.dropEvent = function(type){
		switch(type){
			case "dragover":
				// console.log("dragover")
			break;
				///////////
			case "dragenter":
				// console.log("dragenter")
			break;
				///////////
			case "dragleave":
				// console.log("dragleave")
			break;
				///////////
			case "drop":
				console.log("drop")
				
			break;
				///////////
		}
	}
})