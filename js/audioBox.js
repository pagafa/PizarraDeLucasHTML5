var AudioBox = (function() {
	var format = 'mp3';
	var audios = {};

	Events.register(Events.types.PLAY, play);

	function newAudio(src) {
		var audio = $('<audio/>').attr('src', src).attr('autobuffer', true);
		audio[0].load();
		audio.attr('muted', true);
		return audio;
	}

	function play(options) {
		if (format !== null && typeof options.audio !== 'undefinded') {
			var audio = audios[options.audio];
			audio.attr('muted', false);
			audio[0].pause();
			audio.attr('currentTime', 0);
			audio.attr('volume', 1);
			audio[0].play();

			audios[options.audio] = newAudio('lang/' + Config.language + '/audio/' + format + '/' + options.audio
					+ '.' + format);
		}
	}

	function setAudios(audioNames) {
		if (format != null) {
			for (var i = 0; i < audioNames.length; i++) {
				audios[audioNames[i]] = newAudio('lang/' + Config.language + '/audio/' + format + '/' + audioNames[i]
						+ '.' + format);
			}
		}
	}

	return {
		setAudios : setAudios
	};
});
