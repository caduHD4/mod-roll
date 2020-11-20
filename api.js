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

	let frame;
	frame = document.createElement("iframe");
	frame.setAttribute("id", "frame"); 
	frame.setAttribute("src", "https://codevinc.github.io/"); 
	frame.setAttribute("width","100%");
	frame.setAttribute("height","100%");
	frame.setAttribute("frameborder","0");
	frame.setAttribute("scrolling","no");
	frame.setAttribute("allowfullscreen","allowfullscreen");
	frame.setAttribute("allow","autoplay; encrypted-media *");


	if(document.body.querySelector("#showmedia_video_box") != null)
	{
		document.body.querySelector("#showmedia_video_box").appendChild(frame);
	} else {
		document.body.querySelector("#showmedia_video_box_wide").appendChild(frame);
	}

	ifrm.onload = function(){
		frame.contentWindow.postMessage({
       		'video_config_media': [JSON.stringify(config_media)]
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