angular.module('addressApp').filter('envyGreen', function(){
	return function(jealousy) {
		if(jealousy <= 0) {
			return 'rgb(255, 255, 255)';
		}
		var g = 255 - 25*jealousy;
		g = Math.max(0, Math.min(255, g));
		return 'rgb(0,' + g + ',0)';
	}
});
