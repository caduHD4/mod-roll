const puppeteer = require('puppeteer-extra')
const TelegramBot = require("node-telegram-bot-api");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const bot = new TelegramBot("1443586170:AAHZOllN8MkJLRYuw8xE3lsk-IBxJ1eR66I", { polling: true });

puppeteer.use(StealthPlugin());

let video_m3u8_array = [];
let rows_number = 0;
let id = -1001483271711;

async function main() 
{
    bot.onText(/(crunchyroll\.com)/, (msg, match) => 
    {
        mastervideo(msg.text)
    });
}

async function mastervideo(url)
{
    console.log(url, id);

    puppeteer.launch({ headless: true, args: ['--no-sandbox']}).then(async browser => {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'load', timeout: 0 });
        await sleep(9000);  

        const body = await page.$eval('body', e => e.outerHTML);
        const video_config_media = JSON.parse(pegaString(body, "vilos.config.media = ", ";"));

        for (var i = 0; i < video_config_media['streams'].length; i++) 
        {
            if (video_config_media['streams'][i].format == 'trailer_hls' && video_config_media['streams'][i].hardsub_lang == "ptBR") 
            {
                video_m3u8_array.push(video_config_media['streams'][i].url.replace("clipTo/120000/", "clipTo/" + video_config_media['metadata']['duration'] + "/").replace(video_config_media['streams'][i].url.split("/")[2], "dl.v.vrv.co"));
            }
        }

        if(video_config_media != null || video_config_media != undefined)
        {
            const duration = Math.ceil( video_config_media.metadata.duration / 60000 );
            bot.sendPhoto(id, video_config_media.thumbnail.url, {
                caption:`Episodio: ${video_config_media.metadata.title} - ${video_config_media.metadata.episode_number}\nDuração: ${duration} Minutos\n<a href="${video_m3u8_array[0]}">Anime FULL HD - Legenda: pt-BR</a>\n<a href="${video_m3u8_array[4]}">Anime 420p - Legenda: pt-BR</a>`,
                parse_mode: 'HTML'
            });
        } else {
            bot.sendMessage(id, 'Anime não encontrado!');
        }
    });
}

function sleep(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
} 

function pegaString(str, first_character, last_character) 
{
    if(str.match(first_character + "(.*)" + last_character) == null)
    {
        return null;
        
    } else {
        new_str = str.match(first_character + "(.*)" + last_character)[1].trim()
        return(new_str)
    }
}

main();
