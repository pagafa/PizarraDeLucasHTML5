var AudioBox = (function() {
	var FORMAT_MP3 = 'mp3';
	var FORMAT_OGG = 'ogg';
	// var FORMAT_MP4 = 'm4a';

	var format = null;
	var audios = {};

	if ('Audio' in window) {
		var a = new Audio();
		if (!!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''))) {
			format = FORMAT_MP3;
		} else if (!!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''))) {
			format = FORMAT_OGG;
			// } else if (!!(a.canPlayType && a.canPlayType('audio/mp4;
			// codecs="mp4a.40.2"').replace(/no/, ''))) {
			// format = FORMAT_MP4;
		} else {
			format = FORMAT_MP3;
		}
		a.autoplay = true;
	}

	Events.register(Events.types.PLAY, play);

	function newAudio(src) {
		if (typeof AndroidAudio != "undefined") {
			return src;
		} else {
			var audio = $('<audio/>').attr('src', src).attr('autobuffer', true);
			audio[0].load();
			audio.attr('muted', true);
			return audio;
		}
	}

	function play(options) {
		if (format !== null && typeof options.audio !== 'undefinded') {
			if (typeof AndroidAudio != "undefined") {
				AndroidAudio.playAudio(audios[options.audio]);
			} else {
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
