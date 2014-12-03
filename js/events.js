;
var Events = (function() {
	var registers = [];

	function register(event, manager) {
		if (typeof event === 'undefined' || event === '') {
			return;
		}

		if (typeof registers[event] === 'undefined') {
			registers[event] = [];
		}
		registers[event].push(manager);
	}

	function unregister(event, manager) {
		if (typeof event === 'undefined' || event === '') {
			return;
		}

		if (typeof registers[event] !== 'undefined') {
			var index = registers[event].indexOf(manager);
			if (index > 0) {
				registers[event].remove(index);
			}
		}
	}

	function fire(event, options) {
		if (registers[event] === undefined) {
		} else {
			for (var i = 0; i < registers[event].length; i++) {
				registers[event][i](options);
			}
		}
	}

	return {
		register : register,
		unregister : unregister,
		fire : fire
	};
})();

Events.types = {
	COLOR_CHANGED : 'COLOR_CHANGED',
	PEN_CHANGED : 'PEN_CHANGED',
	PLAY : 'PLAY',
	RESET : 'RESET'
};
