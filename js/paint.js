var Paint = (function() {
	var isTouchDevice = true == ("ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch));
	var offset = $('#main')[0];

	var position = [];

	var h = window.innerHeight;
	var w = window.innerWidth;
	var sqrtWH = Math.sqrt(h * w);

	if (h < w) {
		h = w;
	}

	var canvas = $('#canvasZone');
	canvas.attr('width', h);
	canvas.attr('height', h);
	canvas.css('width', h + 'px');
	canvas.css('height', h + 'px');
	var realCtx = canvas[0].getContext('2d');

	var buffer = $('<canvas/>');
	buffer.attr('width', h);
	buffer.attr('height', h);
	buffer.css('width', h + 'px');
	buffer.css('height', h + 'px');
	buffer = buffer[0];
	var ctx = buffer.getContext('2d');

	var x1 = 10000;
	var y1 = 10000;
	var x2 = 0;
	var y2 = 0;

	var radio = getR_();
	var radio2 = radio / 2;

	var selectedPen = 1;
	var selectedColor = '#000000';

	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.fillStyle = selectedColor;
	ctx.strokeStyle = selectedColor;
	ctx.lineWidth = radio;

	var lastOp = 0; // 0=none,1=point,2=rect
	var lastX = 0;
	var lastY = 0;

	if (isTouchDevice) {
		canvas

		.on('touchstart', function(ev) {
			ev.stopImmediatePropagation();
			e = ev.originalEvent;
			for (var i = 0; i < e.touches.length; i++) {
				var t = e.touches[i];
				position[t.identifier] = {
					x : t.clientX - offsetX_(),
					y : t.clientY - offsetY_()
				};

				drawPoint_(position[t.identifier].x, position[t.identifier].y);
			}
			ev.preventDefault();
		})

		.on(
				'touchmove',
				function(ev) {
					ev.stopImmediatePropagation();
					e = ev.originalEvent;
					for (var i = 0; i < e.touches.length; i++) {
						var t = e.touches[i];
						if (position[t.identifier] != null) {
							drawLine_(position[t.identifier].x, position[t.identifier].y, t.clientX - offsetX_(),
									t.clientY - offsetY_());
							position[t.identifier] = {
								x : t.clientX - offsetX_(),
								y : t.clientY - offsetY_()
							};
						}
					}
					ev.preventDefault();
				})

		.on('touchcancel', function(ev) {
			ev.stopImmediatePropagation();
			e = ev.originalEvent;
			for (var i = 0; i < e.touches.length; i++) {
				var t = e.touches[i];
				position[t.identifier] = null;
			}
			ev.preventDefault();
		})

		.on(
				'touchend',
				function(ev) {
					ev.stopImmediatePropagation();
					e = ev.originalEvent;
					for (var i = 0; i < e.changedTouches.length; i++) {
						var t = e.changedTouches[i];
						if (position[t.identifier] != null) {
							drawLine_(position[t.identifier].x, position[t.identifier].y, t.clientX - offsetX_(),
									t.clientY - offsetY_());
						}
						position[t.identifier] = null;
					}
					ev.preventDefault();
				});
	} else {
		canvas.on('mousedown', function(e) {
			e.stopImmediatePropagation();
			position[0] = {
				x : e.clientX - offsetX_(),
				y : e.clientY - offsetY_()
			};

			drawPoint_(position[0].x, position[0].y);
			e.preventDefault();
		}).on('mousemove', function(e) {
			e.stopImmediatePropagation();
			if (position[0] != null) {
				drawLine_(position[0].x, position[0].y, e.clientX - offsetX_(), e.clientY - offsetY_());
				position[0] = {
					x : e.clientX - offsetX_(),
					y : e.clientY - offsetY_()
				};
			}
			e.preventDefault();
		}).on('mouseup', function(e) {
			e.stopImmediatePropagation();
			if (position[0] != null) {
				drawLine_(position[0].x, position[0].y, e.clientX - offsetX_(), e.clientY - offsetY_());
			}
			position[0] = null;
			e.preventDefault();
		});
	}

	drawer();

	function drawPoint_(x, y) {
		if (lastOp == 0) {
		} else if (lastOp == 1) {
			drawPoint2_();
		} else if (lastOp == 2) {
			ctx.stroke();
		}

		lastOp = 1;
		lastX = x;
		lastY = y;
		adjust(x, y, x, y);
	}

	function drawLine_(x1_, y1_, x2_, y2_) {
		if (lastOp == 0) {
			ctx.beginPath();
			ctx.moveTo(x1_, y1_);
		} else if (lastOp == 1) {
			if ((x1_ != lastX) || (y1_ != lastY)) {
				drawPoint2_();
			}
			ctx.beginPath();
		} else if (lastOp == 2) {
			if ((x1_ != lastX) || (y1_ != lastY)) {
				ctx.moveTo(x1_, y1_);
			}
		}
		ctx.lineTo(x2_, y2_);

		lastOp = 2;
		lastX = x2_;
		lastY = y2_;
		adjust(x1_, y1_, x2_, y2_);
	}

	function offsetX_() {
		return offset.offsetLeft;
	}

	function offsetY_() {
		return offset.offsetTop;
	}

	function drawPoint2_() {
		ctx.beginPath();
		ctx.arc(lastX, lastY, radio2, 0, Math.PI * 2, true);
		ctx.fill();
	}

	function drawer() {
		if ((x1 < x2) && (y1 < y2)) {
			if (lastOp == 1) {
				drawPoint2_();
			} else if (lastOp == 2) {
				ctx.stroke();
			}
			realCtx.drawImage(buffer, x1, y1, x2 - x1, y2 - y1, x1, y1, x2 - x1, y2 - y1);
			resetCoords();
		}
		lastOp = 0;
		window.requestAnimationFrame(drawer);
	}

	function resetCoords() {
		x1 = 10000;
		y1 = 10000;
		x2 = 0;
		y2 = 0;
	}

	function adjust(x, y, xx, yy) {
		var lx;
		var hx;
		if (x > xx) {
			lx = Math.round((xx - radio2) - 1);
			hx = Math.round((x + radio2) + 1);
		} else {
			lx = Math.round((x - radio2) - 1);
			hx = Math.round((xx + radio2) + 1);
		}
		var ly;
		var hy;
		if (y > yy) {
			ly = Math.round((yy - radio2) - 1);
			hy = Math.round((y + radio2) + 1);
		} else {
			ly = Math.round((y - radio2) - 1);
			hy = Math.round((yy + radio2) + 1);
		}
		if (lx < x1) {
			x1 = lx;
			if (x1 < 0) {
				x1 = 0;
			}
		}
		if (ly < y1) {
			y1 = ly;
			if (y1 < 0) {
				y1 = 0;
			}
		}
		if (hx > x2) {
			x2 = hx;
		}
		if (hy > y2) {
			y2 = hy;
		}
	}

	function getR_() {
		return Math.round((selectedPen + 1) / 3 * sqrtWH / 20);
	}

	Events.register(Events.types.COLOR_CHANGED, colorChanged);
	function colorChanged(options) {
		selectedColor = options.color;
		ctx.fillStyle = selectedColor;
		ctx.strokeStyle = selectedColor;
	}

	Events.register(Events.types.PEN_CHANGED, penChanged);
	function penChanged(options) {
		selectedPen = options.size;
		radio = getR_();
		radio2 = radio / 2;
		ctx.lineWidth = radio;
	}

	Events.register(Events.types.RESET, reset);
	function reset(options) {
		ctx.clearRect(0, 0, canvas.width(), canvas.height());
		realCtx.clearRect(0, 0, canvas.width(), canvas.height());
	}

	return {};
});