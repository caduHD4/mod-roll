// ==UserScript==
// @name         Crunchyroll Web Player
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Este script Permite ver todos os vídeos do site crunchyroll.
// @author       Oltiz
// @match        http://www.crunchyroll.com/*
// @match        https://www.crunchyroll.com/*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==


$(document).ready(function()
{	
	const html = document.getElementsByTagName('body')[0].innerHTML;

	if(string(html, "vilos.config.media = ", ";") != null) {
		playerJS(html);
	}
});

const playerJS = (html) => {
	
	const player = document.getElementById('showmedia_video_player');
	player.parentNode.removeChild(player);

	const config_media = JSON.parse(string(html, "vilos.config.media = ", ";"));

	let ifrm;
	ifrm = document.createElement("iframe");
	ifrm.setAttribute("id", "frame"); 
	ifrm.setAttribute("src", "https://codevinc.github.io/video_player_CC/"); 
	ifrm.setAttribute("width","100%");
	ifrm.setAttribute("height","100%");
	ifrm.setAttribute("frameborder","0");
	ifrm.setAttribute("scrolling","no");
	ifrm.setAttribute("allowfullscreen","allowfullscreen");
	ifrm.setAttribute("allow","autoplay; encrypted-media *");


	if(document.body.querySelector("#showmedia_video_box") != null)
	{
		document.body.querySelector("#showmedia_video_box").appendChild(ifrm);
	}else{
		document.body.querySelector("#showmedia_video_box_wide").appendChild(ifrm);
	}

	ifrm.onload = function(){
		ifrm.contentWindow.postMessage({
       		'video_config_media': [JSON.stringify(config_media)],
       		'lang': [string(html, 'LOCALE = "', '",')]
    	},"*");
    };
}

function string(str, first_character, last_character) {
	if(str.match(first_character + "(.*)" + last_character) == null) {
		return null;
	}else{
	    return str.match(first_character + "(.*)" + last_character)[1].trim()
    }
}

// <iframe src="https://static.crunchyroll.com/vilos-v2/web/vilos/player.html" id="vilos-player" allowfullscreen="allowfullscreen" allow="autoplay; encrypted-media *" width="100%" height="100%" frameborder="0"></iframe>