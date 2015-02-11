var app = angular.module("chess");
app.directive('draggable', [function() {
  	return {
	    scope: {
	    	dragged : "&",
	    	endDrag : "&"
	    },
	    link: function(scope, element) {
		    var el = element[0];
		    
		    el.draggable = true;
		    
		    el.addEventListener(
		      'dragstart',
		      function(e) {
		        e.dataTransfer.effectAllowed = 'move';
	        	scope.dragged();
		      },false);
		    
		    el.addEventListener(
		      'dragend',
		      function(e) {
		        this.classList.remove('drag');
		        scope.endDrag();
		        return false;
		      },
		      false
		    );
		}
	}
}]);

app.directive('droppable', [function() {
	return {
	    scope: {
	      drop:"&",
	      dropEvent: "=",
	      x:"@",
	      y:"@"
	    },
	    link: function(scope, element, attrs) {
	      var el = element[0];
	      
	      el.addEventListener(
	        'dragover',
	        function(e) {
	          e.dataTransfer.dropEffect = 'move';
			if (e.preventDefault) e.preventDefault();
	          scope.dropEvent('dragover');
	          return false;
	        },false);
	      
	      el.addEventListener(
	        'dragenter',
	        function(e) {
	          this.classList.add('over');
	          scope.dropEvent('dragenter');
	          return false;
	        },false);
	      
	      el.addEventListener(
	        'dragleave',
	        function(e) {
	          this.classList.remove('over');
	          scope.dropEvent('dragleave');
	          return false;
	        },false);
	      
	      el.addEventListener(
	        'drop',
	        function(e) {
	         	if (e.stopPropagation) e.stopPropagation();
	          	this.classList.remove('over');
	          	scope.drop();
	         	scope.dropEvent('drop');
	          	return false;
	          },false);
	    }
  	}
}]);
