var Pdl = (function() {
	function loadAudios_(colors) {
		var audioBox = new AudioBox();
		var audios = [];
		for (var j = 0; j < colors.length; j++) {
			audios.push(colors[j].name);
		}
		audioBox.setAudios(audios);
	}

	function screenResize_() {
		if ($(window).height() >= $(window).width()) {
			$('body').removeClass('landScapeS');
			$('body').addClass('portraitS');
		} else {
			$('body').removeClass('portraitS');
			$('body').addClass('landScapeS');
		}
	}

	function start() {
		$(window).on('resize', screenResize_);
		screenResize_();

		var t = new Date().getTime();

		$('#title').html(Config.title);
		try {
			document.title = Config.title;
		} catch (e) {
		}
		$('#showLanguages').html(Config.languageName);

		new Paint();
		new Pens(0);
		var colors = new Colors();
		new Reset(6);

		loadAudios_(colors.colors);

		t = (new Date().getTime()) - t;

		if (t > 2500) {
			go_();
		} else {
			setTimeout(go_, 2500 - t);
		}
	}

	function go_() {
		$('#page1').hide();
		$('#page2').show();
	}

	return {
		start : start
	};
});