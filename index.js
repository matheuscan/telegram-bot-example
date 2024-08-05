const TelegramBot = require('node-telegram-bot-api')
const fs = require('node:fs')
const  path = require('node:path')
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
bot.onText(/\/txt\s\w/, async (msg, match) => {
    let data = match.input.replace('/txt', '')
    console.log()
    let chatId = msg.chat.id
    
    
    let file =  fs.writeFileSync('file.txt', data)
    
   bot.sendDocument(chatId, 'file.txt')
})