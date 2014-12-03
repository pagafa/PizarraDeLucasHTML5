var Reset = (function(spaces) {
	init_();

	function init_() {
		var flagsBlocks = $('#containerOthers');
		for (var i = 0; i < spaces; i++) {
			flagsBlocks.append($('<div/>').addClass('block'));
		}

		var reset = $('<div/>').addClass('block').addClass('reset').on('click', function() {
			Events.fire(Events.types.RESET, {});
		});

		flagsBlocks.append(reset);
	}
	return {};
});