angular.module('addressApp').factory('IsBirthday', function(){
	return function(birthday) {
		if(birthday && birthday.month && birthday.day) {
			var today = new Date();
			var monthMatch = birthday.month == (today.getMonth()+1); // JS months 0-indexed
			var dayMatch = birthday.day == today.getDate();
			return (monthMatch && dayMatch);
		}
		else {
			return false;
		}
	}
});
