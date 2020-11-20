window.addEventListener("message", function (e) 
{
	var video_config_media = JSON.parse(e.data.video_config_media);
	var user_lang = e.data.lang;

	console.log(video_config_media);

	// var video_stream_url = "";
	// var video_id = video_config_media['metadata']['id'];
	// var rows_number = 0;
	// var video_m3u8_array = [];

	// for (var i = 0; i < video_config_media['streams'].length; i++) 
	// {
	// 	console.log(video_config_media['streams'][i].format , video_config_media['streams'][i].hardsub_lang);

	// 	if (video_config_media['streams'][i].format == 'trailer_hls' && video_config_media['streams'][i].hardsub_lang == user_lang)
	// 	{
	// 		if (rows_number <= 4) {
	// 			video_m3u8_array.push(video_config_media['streams'][i].url.replace("clipTo/120000/", "clipTo/" + video_config_media['metadata']['duration'] + "/").replace(video_config_media['streams'][i].url.split("/")[2], "dl.v.vrv.co"));
	// 			rows_number++;
	// 		}
	// 	}

	// 	if (video_config_media['streams'][i].format == 'adaptive_hls' && video_config_media['streams'][i].hardsub_lang == user_lang) {
	// 		video_stream_url = video_config_media['streams'][i].url.replace("pl.crunchyroll.com", "dl.v.vrv.co");
	// 		break;
	// 	}
	// }

	// console.log(video_m3u8_array);

	// const playerInstance = jwplayer("player_div");

	// playerInstance.setup({
	// 	"file": video_m3u8_array[4],
	// 	"image": video_config_media['thumbnail']['url'],
	// 	"width": "100%",
	// 	"height": "100%",
	// 	"autostart": false,
	// 	"displayPlaybackLabel": true,
	// 	"primary": "html5"
	// });

	// //Funções para o player
	// jwplayer().on('ready', function (e) {
	// 	//Seta o tempo do video pro salvo no localStorage		
	// 	if (localStorage.getItem(video_id) != null) {
	// 		document.getElementsByTagName("video")[0].currentTime = localStorage.getItem(video_id);
	// 	}
	// 	document.body.querySelector(".loading_container").style.display = "none";
	// });
	// //Mostra uma tela de erro caso a legenda pedida não exista.
	// jwplayer().on('error', function (e) {
	// 	if (e.code == 232011) {
	// 		jwplayer().load({
	// 			file: "https://i.imgur.com/OufoM33.mp4"
	// 		});
	// 		jwplayer().setControls(false);
	// 		jwplayer().setConfig({
	// 			repeat: true
	// 		});
	// 		jwplayer().play();
	// 	}
	// });
	// //Fica salvando o tempo do video a cada 5 segundos.
	// const save_player_time_interval = setInterval(function () {
	// 	if (jwplayer().getState() == "playing") {
	// 		localStorage.setItem(video_id, jwplayer().getPosition());
	// 	}
	// }, 5000);


});
