const TelegramBot = require('node-telegram-bot-api')
const fs = require('node:fs')
const  path = require('node:path')
const { Buffer } = require('node:buffer')

const token = process.env.TELEGRAM_TOKEN
let pattern = /\/text|\/hello|\/ping/gi
const bot = new TelegramBot(token,{polling: true})
let fileFlag = 0
/*
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
    console.log(typeof msg)
    
    let file =  fs.writeFileSync('file.txt', data)
    
   bot.sendDocument(chatId, 'file.txt')
})
*/
bot.on('text' ,(message, data) => {
    
    let chatID;
    let msg = ''
    let msgCommand = ''
   if (message.text){
        chatID = message.chat.id
        msg = message.text.split(' ')
        msgCommand = msg[0]
   }
    
    
    switch(msgCommand){
        case '/start':
            bot.sendMessage(chatID, "Hello! Type /help to see the commands!")
            break;
        case '/ping': 
            bot.sendMessage(chatID, "Pong!")
            break;
        case '/help':
            bot.sendMessage(chatID, "Commands: /ping, /solve, /file")
            break;
        case '/solve':
            let ev = eval(msg[1])
            bot.sendMessage(chatID, ev)
            break;
        case '/file':
            fileFlag = 1
            bot.sendMessage(chatID, "Please send a document")
            break;
        default:
            bot.sendMessage(chatID, "Please type a valid command!");
            break;
    }

    
})
bot.on('document', (message,data) => {
    let chatID = message.chat.id
    if (fileFlag === 1){
        let ext = path.extname(message.document.file_name)
        let date = new Date()
        if (ext === '.docx'){
            let file = bot.downloadFile(message.document.file_id, './').then((file) => {
                console.log(file)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else {
            bot.sendMessage(chatID, "The file must be a docx document")
        }
        fileFlag = 0
    }
    else {
        bot.sendMessage(chatID, "You need to type /file to make the bot wait for a file")
    }
})
bot.on('polling_error', (error) => {
  console.log(`[polling_error] ${error.code}: ${error.message}`);
});