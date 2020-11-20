window.addEventListener("message", function (e) 
{
	let video_config_media = JSON.parse(e.data.video_config_media);
	let user_lang = 'ptBR';

	console.log(user_lang);

	let video_stream_url = "";
	let video_id = video_config_media['metadata']['id'];
	let rows_number = 0;
	let video_m3u8_array = [];

	for (var i = 0; i < video_config_media['streams'].length; i++) 
	{

		if (video_config_media['streams'][i].format == 'trailer_hls' && video_config_media['streams'][i].hardsub_lang == user_lang)
		{
			if (rows_number <= 4) 
			{
				// console.log(video_config_media['streams'][i].format, video_config_media['streams'][i].hardsub_lang);
				video_m3u8_array.push(video_config_media['streams'][i].url.replace("clipTo/120000/", "clipTo/" + video_config_media['metadata']['duration'] + "/").replace(video_config_media['streams'][i].url.split("/")[2], "dl.v.vrv.co"));
				rows_number++;
			}
		}

		if (video_config_media['streams'][i].format == 'adaptive_hls' && video_config_media['streams'][i].hardsub_lang == user_lang) {
			video_stream_url = video_config_media['streams'][i].url.replace("pl.crunchyroll.com", "dl.v.vrv.co");
			break;
		}
	}

	video_m3u8 = '#EXTM3U' +
	'\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=4112345,RESOLUTION=1280x720,FRAME-RATE=23.974,CODECS="avc1.640028,mp4a.40.2"' +
	'\n' + video_m3u8_array[0] +
	'\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=8098235,RESOLUTION=1920x1080,FRAME-RATE=23.974,CODECS="avc1.640028,mp4a.40.2"' +
	'\n' + video_m3u8_array[1] +
	'\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2087088,RESOLUTION=848x480,FRAME-RATE=23.974,CODECS="avc1.4d401f,mp4a.40.2"' +
	'\n' + video_m3u8_array[2] +
	'\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1090461,RESOLUTION=640x360,FRAME-RATE=23.974,CODECS="avc1.4d401e,mp4a.40.2"' +
	'\n' + video_m3u8_array[3] +
	'\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=559942,RESOLUTION=428x240,FRAME-RATE=23.974,CODECS="avc1.42c015,mp4a.40.2"' +
	'\n' + video_m3u8_array[4];

	if (video_stream_url == "") {
		var blob = new Blob([video_m3u8], {
			type: "text/plain; charset=utf-8"
		});
		video_stream_url = URL.createObjectURL(blob) + "#.m3u8";
	}

	const jw = jwplayer("player_div");

	jw.setup({
		"file": video_stream_url,
		"image": video_config_media['thumbnail']['url'],
		"width": "100%",
		"height": "100%",
		"autostart": false,
		"displayPlaybackLabel": true,
		"primary": "html5"
	});

	jwplayer().on('ready', function (e) {	
		if (localStorage.getItem(video_id) != null) 
		{
			document.getElementsByTagName("video")[0].currentTime = localStorage.getItem(video_id);
		}
		document.body.querySelector(".loading_container").style.display = "none";
	});

	setInterval(function() {
		if (jwplayer().getState() == "playing") 
		{
			localStorage.setItem(video_id, jwplayer().getPosition());
		}
	}, 3000);

});
