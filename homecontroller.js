(function() {
  
  demo.controller('homecontroller', homecontroller);

	function homecontroller($scope, $timeout, localData){

	console.log('controller loaded');
	var vm = this;
	vm.highlightTag = highlightTag;
	vm.removeElement = removeElement;

	localData.async().then(function(twitterData) { //2. so you can use .then()
	    vm.twitterData = twitterData.data;
	  });
	// console.log(localData.twitterData);
    //vm.twitterData = localData.twitterData.content;

	function highlightTag(e) {
		var btnVal = e.target.getAttribute('data-value');
		console.log(btnVal);
		switch(btnVal){

        case 'total':
          angular.element(document).find('.total').addClass('highlight');        
          angular.element(document).find('.grid-block-mid-box:first-child').removeClass('highlight');
          angular.element(document).find('.grid-block-mid-box:nth-child(2)').removeClass('highlight');
          angular.element(document).find('.grid-block-mid-box:nth-child(3)').removeClass('highlight');
          break;

        case 'friends':
          angular.element(document).find('.total').removeClass('highlight');        
          angular.element(document).find('.grid-block-mid-box:first-child').addClass('highlight');
          angular.element(document).find('.grid-block-mid-box:nth-child(2)').removeClass('highlight');
          angular.element(document).find('.grid-block-mid-box:nth-child(3)').removeClass('highlight');
          break;

        case 'influence':
          angular.element(document).find('.total').removeClass('highlight');        
          angular.element(document).find('.grid-block-mid-box:first-child').removeClass('highlight');
          angular.element(document).find('.grid-block-mid-box:nth-child(2)').addClass('highlight');
          angular.element(document).find('.grid-block-mid-box:nth-child(3)').removeClass('highlight');
          break;

        case 'chirpiness':
          angular.element(document).find('.total').removeClass('highlight');        
          angular.element(document).find('.grid-block-mid-box:first-child').removeClass('highlight');
          angular.element(document).find('.grid-block-mid-box:nth-child(2)').removeClass('highlight');
          angular.element(document).find('.grid-block-mid-box:nth-child(3)').addClass('highlight');
          break;
        }
	}

	function removeElement(e){
		console.log('remove element');
		// var number = e.target.getAttribute('uid');

		if (confirm('Are you sure you want to remove this data')) {
	        if (!Array.prototype.filter) return;
	        var s=angular.element('#isotopeContainer').scope();
	        console.log(s);
			var number = e.target.getAttribute('uid');	        
	        var items = vm.twitterData.filter(function( obj ) {
	          return +obj.uid != +number;
        });
        s.lastNumber = s.lastNumber || [];
        s.lastNumber.unshift(number);
        $scope.$apply(vm.twitterData = items);
      }
	}


    $scope.date = {
        startDate: moment('1970-01-01'),
        endDate: moment('2016-01-01')
    };
    $scope.singleDate = moment();

    $scope.opts = {
        locale: {
            applyClass: 'btn-green',
            applyLabel: "Apply",
            fromLabel: "From",
            format: "YYYY-MM-DD",
            toLabel: "To",
            cancelLabel: 'Cancel',
            customRangeLabel: 'Custom range'
        },
        ranges: {
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()]
        }
    };

    $scope.setStartDate = function () {
        $scope.date.startDate = moment().subtract(4, "days").toDate();
    };

    $scope.setRange = function () {
        $scope.date = {
            startDate: moment().subtract(5, "days"),
            endDate: moment()
        };
    };

    //Watch for date changes
    $scope.$watch('date', function(newDate) {
        console.log('New date set: ', newDate);	 	

 		$timeout(function(){
			$('.grid-container').isotope({ filter: function() {
	          var cDate = Date.parse($(this).find('.date').text());
	          var startdate = Date.parse(newDate.startDate._d);
	          var enddate = Date.parse(newDate.endDate._d);
	          if((cDate <= enddate && cDate >= startdate)) {
	            return true;
	          }
	          return false;
	        } });
		});
		

    }, false);


}


})();
