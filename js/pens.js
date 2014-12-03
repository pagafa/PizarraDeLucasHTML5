var Pens = (function(spaces) {
	var sizes = [ 's', 'n', 'b' ];

	init_();

	function init_() {
		Events.register(Events.types.COLOR_CHANGED, colorChanged);

		var selectedPen = Math.ceil(sizes.length / 2) - 1;
		var flagsBlocks = $('#containerOthers');
		for (var i = 0; i < spaces; i++) {
			var spacer = Utils.ele.crt('div');
			spacer.addClass('block');
			flagsBlocks.append(spacer);
		}
		for (var i = 0; i < sizes.length; i++) {
			var pen = $('<div/>').attr('pen', i).on('click', selected_).addClass('block').addClass('pen').addClass(
					'pen_' + sizes[i]);
			flagsBlocks.append(pen);
			if (selectedPen == i) {
				pen.addClass('selected');
			} else {
				pen.addClass('notSelected');
			}
		}
		Events.fire(Events.types.PEN_CHANGED, {
			size : selectedPen
		});
	}

	function selected_(e) {
		selectedPen = parseInt($(this).attr('pen'), 10);
		for (var i = 0; i < sizes.length; i++) {
			var pen = $('.pen_' + sizes[i]);
			if (i == selectedPen) {
				pen.addClass('selected');
				pen.removeClass("notSelected");
			} else {
				pen.addClass('notSelected');
				pen.removeClass("selected");
			}
		}
		Events.fire(Events.types.PEN_CHANGED, {
			size : selectedPen
		});
	}

	function colorChanged(options) {
		$('.pen').css('background-color', options.color).css('backgroundColor', options.color);
	}

	return {};
});