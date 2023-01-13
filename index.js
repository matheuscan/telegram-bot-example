const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const token = process.env.TELEGRAM_TOKEN

const bot = new TelegramBot(token,{polling: true})

bot.onText(/\/echo (.+)/, (msg,match) =>{
    let chatId = msg.chat.id
    bot.sendMessage(chatId, match[1])
    console.log('mensaje enviado!')
    console.log(match)
})

bot.onText(/\/start/, (msg,match) => {
    let chatId = msg.chat.id
    let  res = "Muy buenas! ¿En qué te puedo ayudar?"
    bot.sendMessage(chatId, res)
})