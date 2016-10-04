angular.module('addressApp').factory('Gift', function(){
	var entries = [];
	const entryKeys = ['getNbGifts', 'receiveGift', 'resetGifts', 'covet'];

	function register(entry) {
		if(entryKeys.every(k => entry.hasOwnProperty(k))) {
			entries.push(entry);
			return entries.length - 1;
		}
		else {
			throw new Error(entry + ' does not provide a valid interface to Gift');
		}
	}

	function clear() {
		entries.map(e => e.resetGifts());
	}
	
	function countGifts () {
		return entries.reduce((n, e) => n+e.getNbGifts(), 0);
	}
	
	function sendGiftTo(entryIndex) {
		entries[entryIndex].receiveGift();
		for (var ii = 0 ; ii < entries.length ; ii++) {
			if(ii != entryIndex) {
				entries[ii].covet();
			}
		}
	}

	return {
		register: register,
		clear: clear,
		countGifts: countGifts,
		sendGiftTo: sendGiftTo
	};
});
