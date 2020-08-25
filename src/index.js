require("dotenv").config();
const Telegraf = require('telegraf');

const { BOT_TOKEN, URL } = process.env;
const PORT = process.env.PORT || 5000;
const covidService = require('./services/covid.js')
const formatCountryMsg = require('./messages/country.js')
const bot = new Telegraf(BOT_TOKEN);

//commands
//start,help
bot.start(ctx => ctx.reply(`
Welcome to Covid Bot!
You need to send a name of your Country
	`));
bot.help(ctx => ctx.reply(`
Example:
Ukraine
Russia
China
Kyrgyzstan
	`));

	//handlers
	bot.hears(/.*/, async ctx => {
		const {data} = await covidService.getByCountry(ctx.message.text)

		if(data && data.results === 0){
			return ctx.reply('Country not found. Try another');
		}
		return ctx.replyWithMarkdown(formatCountryMsg(data.response[0]));
	});


bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
console.log('Started with webhook');

	bot.launch()
	.then(res =>{
		const date = new Date();
		console.log('Bot launched at ${date}');
	}).catch(err=> console.log(err));
	//launch