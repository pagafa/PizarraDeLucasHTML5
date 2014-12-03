var Colors = (function() {
	var colors = [];
	colors.push({
		name : 'black',
		rgb : '#000000'
	});
	colors.push({
		name : 'white',
		rgb : '#ffffff'
	});
	colors.push({
		name : 'red',
		rgb : '#ff0000'
	});
	colors.push({
		name : 'blue',
		rgb : '#0000ff'
	});
	colors.push({
		name : 'gray',
		rgb : '#cccccc'
	});
	colors.push({
		name : 'orange',
		rgb : '#ffa500'
	});
	colors.push({
		name : 'yellow',
		rgb : '#ffff00'
	});
	colors.push({
		name : 'pink',
		rgb : '#ffc0cb'
	});
	colors.push({
		name : 'green',
		rgb : '#008000'
	});
	colors.push({
		name : 'brown',
		rgb : '#a52a2a'
	});
	colors.push({
		name : 'violet',
		rgb : '#ee82ee'
	});
	colors.push({
		name : 'purple',
		rgb : '#a020f0'
	});

	init_();

	function init_() {
		var colorBlocks = $('#containerColors');
		for (var i = 0; i < colors.length; i++) {
			var color = $('<div/>').attr('id', 'color_' + i).attr('color', colors[i].name).on('click', selected_)
					.addClass('block');
			if (i == 0) {
				color.addClass('colorSelected');
			} else {
				color.addClass('colorNotSelected');
			}
			color.css('background-color', colors[i].rgb);
			color.css('backgroundColor', colors[i].rgb);
			colorBlocks.append(color);

			Events.fire(Events.types.COLOR_CHANGED, {
				color : colors[0].rgb
			});
		}
		function selected_(e) {
			var colorRgb = null;
			var colorName = $(this).attr('color');
			for (var i = 0; i < colors.length; i++) {
				var colorElement = $('#color_' + i);
				if (colors[i].name === colorName) {
					colorElement.addClass('colorSelected');
					colorElement.removeClass('colorNotSelected');
					colorRgb = colors[i].rgb;
				} else {
					colorElement.addClass('colorNotSelected');
					colorElement.removeClass('colorSelected');
				}
			}

			if (colorRgb !== null) {
				Events.fire(Events.types.COLOR_CHANGED, {
					color : colorRgb
				});
				Events.fire(Events.types.PLAY, {
					audio : colorName
				});
			}
		}
	}

	return {
		colors : colors
	};
});