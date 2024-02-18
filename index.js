//new
const { Client, GatewayIntentBits, Partials, ActionRowBuilder, ButtonBuilder, ButtonStyle , AttachmentBuilder, Routes, EmbedBuilder } = require('discord.js')
const cd = 30000
const startingCounter = 20
const seconds = 5
const GuildSettings = require('./models/GuildSettings')


const bank = require('./wordBank')
const wrongArray = ["oops", "rip bozo", "L", "hm", "no", "?", "argh", "stop it, get help", "u suck", "skill issue", "get better", "L bozo", "get good", "ha ha", "noob", "sussy baka", "loser", "bad"]
const repeatArray = ["Already guesssed.", "That's already been guessed that.", "You forgor that that's guessed.", "You have the memory of a goldfish (jk).", "How did you already forget??", "Nah, you gotta be trolling.", "Stopppp itt."]
const correctArray = ["ok", "alright", "oh", "nice", "wow", "I see you", "damn", "sheesh", "whatever", "you got lucky", "stop hacking", "cheater", "you looked it up"]
const prize = ["a 🍪", "a pair of 👟", "a pair of 🩰", "a pair of 👞", "a pair of 🥿", "a pair of 👢", "a pair of 👠", "a pair of 👡", "a 🥐", "a 💵", "absolutely nothing", "💰", "a game of 🏀", "a game of ⚽", "a game of 🏈", "a game of 🎾", "a game of 🏓","a game of 🏏","a game of 🏒","a game of 🏸","a magical 🎱","a game of 🏐","a game of 🎯", "a movie 🎟️", "a 📘","a 📕","a 📗","a 📙","a 🔖","a 📒","a 📓","a 📔", "\'the game\'", "a 🏆","a 🏅","a 🎖️","a 🥇", "a 👑","a 💎 ","a 🔮", "a 🐟","a 🍥","a 🎣","a 🐠","a 🐡","a 🦦","a 🦈, gl","a 🦐", "an 🍎","an 🍊","a 🍋","a 🍌","slice of 🍉","🍑😋","a 🍍","a 🥥","an 🍆","a 🥯","a slice of 🧀","an 🥚","a 🍳","some 🥞","a slice of 99% turkey 🥓","a raw 🥩, 100% halal","a 🌭","a 🍔","some 🍟","a slice of 🍕","bowl of 🍜","a 🍩","a 🍫","a bag of 🍿", "a 🎁","a mysterious 📦", "a Twice 🎟️", "a pet 👻","a 🚗", "a 🚕", "a 🚙", "an beat up 🚌", "a 🚎", "a 🏎️", "a 🚓", "a 🚜", "a 🚛", "an old 🚚", "a 🛴", "a 🛵", "a 🚲", "a 🚀", "your own 🚁", "a private ✈️", "your very own 🕋", "an Amazon 🛹", "a Braille 🛹", "a complete 🛹", "the ⚔️","a pet 🐶", "a pet 🐱", "a pet 🐭", "a pet 🐹", "a pet 🐰", "a pet 🦊", "a pet 🐻", "a pet 🐼", "a pet 🐻", "a pet 🐨", "a pet 🐯", "a pet 🦁", "a pet 🐮", "a pet 🐷", "a pet 🐸", "a personal 🐵", "a 🐤", "a scout 🦅", "a pet 🦆", "a pet🦉", "a wild 🐺", "a wild 🐗", "a pet 🐴", "a pet 🐝", "a wild 🐍", "a pet 🦖", "a wild 🐅", "a pet 🦧", "a pet 🐉", "a rare 🗿","a common 🗿","a uncommon 🗿","a legendary 🗿","a visit from 👮","👩‍❤️‍💋‍👩","COVID-20 🦠", "a staring contest with the 🌞"]
const phrases = ["Your go, ", "It's on you, ", "You got this, ", "Your turn, ", "Make the move, ", "Make a guess, ", "You're up, "]
const empty = ['🔵', '🟤','🟢','🟠','🟣','🔴','🟡','⚪']

let guildId = ""
var fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
    partials: [
        Partials.Message,
        Partials.User,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember,
    ]
})


require('dotenv').config()

client.on("ready", async() => {
    
    console.log(`Logged in as ${client.user.tag}`)
    let docs = await GuildSettings.find({})
    // const cmd = [{
    //     name: 'leaderboard',
    //     description: 'Display the server leaderboard and your current place.'
    // }]

    // for (const doc of docs) {
    //     var guild = client.guilds.cache.get(doc.guild_id)
    //     guild.commands?.set(cmd)
    // }

})

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function getNumberWithOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getNum(n){
    let final = ""
    const numMap = {
        '0':'0️⃣',
        '1':'1️⃣',
        '2': '2️⃣',
        '3':'3️⃣',
        '4':'4️⃣',
        '5':'5️⃣',
        '6': '6️⃣',
        '7':'7️⃣',
        '8':'8️⃣',
        '9':'9️⃣'
    }
    for (const num of n.toString()) {
        final += numMap[num] 
    }

    return final
}

async function loopFunction(delay, callback){
    var loop = function(){
        callback();
        setTimeout(loop, delay);
    }; loop();
};

function maj(array){
    let count = 0
    let majority
    for (let i = 0; i < array.length; i++) {
        if (count == 0)
            majority = array[i]
        if (array[i] == majority)
            count++
        else
            count--
    }
    return majority
}

const getData = async(g_id, c_id) => {
    let data = undefined;
    let leaderstats = undefined;
    let doc = await GuildSettings.findOne({guild_id: g_id});
  
    if (doc && doc.game_data && !doc.$isEmpty('leaderstats')) {
      data = doc.game_data
      leaderstats = doc.leaderstats
    } else if (!doc) {
        doc = new GuildSettings({
            guild_id: g_id,
            channel_id: c_id,
            game_data: {
                randWord: "",
                start: false,
                turn: 0,
                wrong: 0,
                guessed: [],
                info: "",
                plrs: [],
                timer: 0,
                currentPlayer: null,
                guessedCorrect: [],
                wrongCount: 0,
                commandCd: true,
                counter: startingCounter,
                topic: []
            },
            leaderstats: {
                wins: new Map(),
                prizes: new Map(),
                place: new Map(),
            }
        })
        doc.save()
        data = doc.game_data
        leaderstats = doc.leaderstats
    } else if (doc.$isEmpty('leaderstats')) {
        console.log('no')
        doc.leaderstats = {
            wins: new Map(),
            prizes: new Map(),
            place: new Map(),
        }
        leaderstats = doc.leaderstats
    }
    
    return [data, doc, leaderstats];
  }


  const restart = async(id) => {
    let doc = await GuildSettings.findOne({guild_id: id});
    guildId = ""
    doc.game_data = {
        randWord: "",
        start: false,
        turn: 0,
        wrong: 0,
        guessed: [],
        info: "",
        plrs: [],
        timer: 0,
        currentPlayer: null,
        guessedCorrect: [],
        wrongCount: 0,
        commandCd: true,
        counter: startingCounter,
        topic: []
    }
    doc.save()
}

async function countdown(msg, counter, g_id){
    let tempData = await getData(g_id)
    let data = tempData[0]
    let db = tempData[1]
    
    msg.edit(`@here Vote to join! : Starting in ${counter}s`) 
    counter -= seconds    

    if (counter <= -5){
        counter = startingCounter
        if (data.plrs.length >= 1){
            msg.edit(`Let's begin!`)
            setTimeout(() => { msg.delete() }, 5000)
            let words = bank.getWordsFromTopic(maj(data.topic))
            data.randWord = words[Math.floor(Math.random()*words.length)]
            data.info = data.randWord.replace(/\w/g,'✪')
            data.currentPlayer = data.plrs[0]
            if (data.plrs.length > 1){ 
                msg.channel.send(`${data.info}\nYou are up, ${data.plrs[0]}.\nThe category with the most votes was ${maj(data.topic)}!`)
                data.timer = Date.now()
                data.start = true
                db.save()
            }else{
                msg.channel.send(`${data.plrs[0]} Start guessing!\n${data.info}\nThe category with the most votes was ${maj(data.topic)}.`)
                data.timer = Date.now()
                data.start = true
                db.save()
            }
            return
        } else if ((data.plrs.length == 0)) { 
            msg.edit(`Not enough players :(`)
            msg.reactions.removeAll()
            setTimeout(() => { msg.delete() }, 2000)
            db.save()
            return
        }
        
    }

    setTimeout(() => {countdown(msg, counter, g_id)}, 1000 * seconds)
}


client.on("interactionCreate", async (interaction) =>{
    
    
    if (!interaction.isCommand()) return

    const{ commandName } = interaction
    if (commandName == 'start'){
       let tempData = await getData(interaction.guild.id, interaction.channel.id)
       let counter = startingCounter
       data = tempData[0]
       db = tempData[1]
       guildId = interaction.guild.id

        if (data.commandCd){
            data.commandCd = false          
            db.save()
            const topics = bank.getTopics(2)
            const row = new ActionRowBuilder()
            for (let i = 0; i < 2; i++) {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(topics[i])
                        .setLabel(topics[i])
                        .setStyle((i == 0) ? (ButtonStyle.Primary) : (ButtonStyle.Success))
                );
            }
            const message = await interaction.reply({content: `@here Vote to join! : Starting in ${startingCounter}s`, fetchReply: true, components: [row]})
            countdown(message, counter, interaction.guild.id)
            
        } else if (!data.commandCd){
            interaction.reply('Game has already started.')
            setTimeout(() => { 
                interaction.deleteReply()
            }, 2000)
        }else if (interaction.channel.id != db.channel_id){
            interaction.reply('Wrong channel.')
            setTimeout(() => { 
                interaction.deleteReply()
            }, 2000)
        }
    } else if (commandName == 'stop'){
        let temp = await getData(interaction.guild.id)
        let datas = temp[0]

        if (!datas.commandCd){
            restart(interaction.guild.id)
            interaction.reply('Game stopped.')
        }else {
            interaction.reply('Game has not started.')
            setTimeout(() => { 
                interaction.deleteReply()
            }, 2000)
        }
            
    } else if (commandName == 'leaderboard'){
        let members = []
        let tempData = await getData(interaction.guild.id, interaction.channel.id)
        let db = tempData[1]
        let leaderstats = tempData[2]
        let tempStats = {
            wins: new Map(),
            prizes: new Map(),
            place: new Map(),
        }
        let winSorted = []
        
        
        await interaction.guild.members.fetch({withPresences: false}).then(cachedMembers => cachedMembers
            .forEach(
                member => (!member.user.bot) ? (members.push(member.user.toString())) : (member)
            ))
            .catch(console.error)
        for (const member of members) {
            tempStats.wins.set(member, leaderstats.wins.get(member) || 0)
            tempStats.prizes.set(member, leaderstats.prizes.get(member) || empty[Math.floor(Math.random()*empty.length)])
            
            leaderstats.wins.set(member, leaderstats.wins.get(member) || 0)
            leaderstats.prizes.set(member, leaderstats.prizes.get(member) || tempStats.prizes.get(member))
        }

        members = members.sort(function (b,a) {
            return tempStats.wins.get(a) - tempStats.wins.get(b)
        })
        members.forEach(m => winSorted.push(tempStats.wins.get(m)))
        leaderstats.wins.forEach((v,k) => {
            leaderstats.place.set(k, winSorted.indexOf(v)+1) 
            tempStats.place.set(k, winSorted.indexOf(v)+1)
        })
        members = members.slice(0,10)

        let leaderEmbed = new EmbedBuilder()
        leaderEmbed.setTitle('Top 10 Players!')
        leaderEmbed.setColor('Gold')
        for (const member of members) {
            leaderEmbed.addFields({name: `\t╔ —— ╗\n   ~${getNumberWithOrdinal(tempStats.place.get(member))}~ \n╚ —— ╝`, value: `${tempStats.prizes.get(member)} ${member} : ${getNum(tempStats.wins.get(member))} ${(tempStats.wins.get(member) != 1) ? ('Wins') : 'Win'}\n⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢⌢`})
        }
        leaderEmbed.setFooter({
            text: `You are ${getNumberWithOrdinal(tempStats.place.get(interaction.user.toString()))}!`
        })
        db.save()
        interaction.reply({embeds: [leaderEmbed]})
    }
})

client.on("messageCreate", async(message) =>{
    let tempData = await getData(message.guild.id, message.channel.id)
    let data = tempData[0]
    let db = tempData[1]
    let leaderstats = tempData[2]
   

    if (message.author.bot) return
    if (typeof data == "undefined") return
    if (!data.start) return

    if (message.author.toString() == data.currentPlayer){ 
            if (message.content.length == 1 && /^[a-zA-Z ]+$/.test(message.content)){
                if (data.randWord.match(message.content.toLowerCase())){
                    if (!data.guessedCorrect.includes(message.content.toLowerCase()) && /^[a-zA-Z]+$/.test(message.content)){
                        data.timer = Date.now()
                        data.guessedCorrect.push(message.content.toLowerCase())
                        for (var i = 0; i < data.randWord.length; ++i){
                            if (data.randWord[i] == message.content.toLowerCase()){
                                data.info = data.info.replaceAt(i, (data.randWord[i]).toUpperCase())
                            }
                        }
                        if ((data.info).toLowerCase() == data.randWord){
                            let prizeWon = prize[Math.floor(Math.random()*prize.length)]
                            message.reply(`Congrats, you win ${prizeWon}!`)
                            prizeWon = prizeWon.match(/\p{Emoji}+/gu)
                            leaderstats.wins.set(data.currentPlayer, leaderstats.wins.get(data.currentPlayer) + 1 || 1)
                            leaderstats.prizes.set(data.currentPlayer, prizeWon)
                            restart(message.guild.id)
                        } else if ((data.info).toLowerCase() != data.randWord){
                            data.turn++
                            message.reply(`${correctArray[Math.floor(Math.random()*correctArray.length)]} ✅ ${data.info} ${bank.getEmojiFromTopic(maj(data.topic))}${(data.guessed.length > 0) ? ('\n\nAlready guessed: ' + data.guessed.join(', ')) : ('')}`)
                        }
                    }else{
                        data.wrongCount++
                        if (data.wrongCount != 2){
                            message.reply(repeatArray[Math.floor(Math.random()*repeatArray.length)] + ` Please don't do it again.\nYou already guessed: ${data.guessed.join(', ')}`)
                        } else{
                            data.turn++
                            data.timer = Date.now()
                            data.wrongCount = 0
                            message.reply('Nope.')
                        }
                    }
                } else if (/^[a-zA-Z ]+$/.test(message.content)) {
                    if (!data.guessed.includes(message.content.toLowerCase())){
                        data.wrong++
                        data.turn++
                        data.timer = Date.now()
                        data.guessed.push(message.content.toLowerCase())
                        if (data.wrong != 9){
                            const file = new AttachmentBuilder(`../Hangman/imgs/${data.wrong}.png`);
                            const wrongEmbed = {
                                title: wrongArray[Math.floor(Math.random()*wrongArray.length)],
                                description: `❌ '${message.content.toLowerCase()}' is not in the word.`,
                                image: {
                                    url: `attachment://${data.wrong}.png`,
                                },
                                fields: [
                                    {
                                        name: data.info,
                                        value: `${(data.guessed.length > 1) ? ('\nAlready guessed: ' + data.guessed.join(', ')) : ('Better luck next time!')}`,
                                        inline: true,
                                    },
                                    {
                                        name: 'Category',
                                        value: maj(data.topic),
                                    }
                                ],
                                footer: {
                                    text: `Tries left: ${9 - data.wrong}`
                                }
                            };
                            message.reply({embeds: [wrongEmbed], files: [file]})
                        }
                    }else if (/^[a-zA-Z]+$/.test(message.content)){
                       data.wrongCount++
                        if (data.wrongCount != 2){
                            message.reply(repeatArray[Math.floor(Math.random()*repeatArray.length)] + ` Don't do it again please.\nYou already guessed: ${data.guessed.join(', ')}`)
                        } else{
                            data.turn++
                            data.timer = Date.now()
                            data.wrongCount = 0
                            message.reply('Nope.')
                        }
                    }
                }
            }else if (message.content.length == data.randWord.length && /^[a-zA-Z ]+$/.test(message.content)){
                if (message.content.toLowerCase() == data.randWord){
                    let prizeWon = prize[Math.floor(Math.random()*prize.length)]
                    message.reply(`Congrats, you win ${prizeWon}!`)
                    prizeWon = prizeWon.match(/\p{Emoji}+/gu)
                    leaderstats.wins.set(data.currentPlayer, leaderstats.wins.get(data.currentPlayer) + 1 || 1)
                    leaderstats.prizes.set(data.currentPlayer, prizeWon)
                    restart(message.guild.id)
                } else if (/^[a-zA-Z ]+$/.test(message.content)){
                    data.turn++
                    data.timer = Date.now()
                    if (!data.guessed.includes(message.content.toLowerCase())){
                        data.guessed.push(message.content.toLowerCase())
                        data.wrong++
                        if(data.wrong != 9){
                            const file = new AttachmentBuilder(`../Hangman/imgs/${data.wrong}.png`);
                            const wrongEmbed = {
                                title: wrongArray[Math.floor(Math.random()*wrongArray.length)],
                                description: `❌ '${message.content.toLowerCase()}' is not the word.`,
                                image: {
                                    url: `attachment://${data.wrong}.png`,
                                },
                                fields: [
                                    {
                                        name: data.info,
                                        value: `${(data.guessed.length > 1) ? ('\nAlready guessed: ' + data.guessed.join(', ')) : ('Better luck next time!')}`,
                                        inline: true,
                                    },
                                    {
                                        name: 'Category',
                                        value: maj(data.topic),
                                    }
                                ],
                                footer: {
                                    text: `Tries left: ${9 - data.wrong}`
                                }
                                };
                            message.reply({embeds: [wrongEmbed], files: [file]})
                        }
                    } else{
                       data.wrongCount++
                        if (data.wrongCount != 2){
                            message.reply(repeatArray[Math.floor(Math.random()*repeatArray.length)] + " Don't do it again please.")
                        } else{
                            data.wrongCount = 0
                            data.turn++
                            data.timer = Date.now()
                            message.reply('Nope.')
                        }
                    }
                }
            }else if (!/^[a-zA-Z]+$/.test(message.content)) {
               data.wrongCount++
                if (data.wrongCount != 2){
                    message.reply(`LETTERS! Don't anger me now.`)
                } else{
                    data.turn++
                    data.timer = Date.now()
                    data.wrongCount = 0
                    message.reply('Nope.')
                }
            }else {
               data.wrongCount++
                
                if (data.wrongCount != 2){
                    message.reply(`${data.randWord.length} letters...Don't do it again.`)
                } else{
                    data.turn++
                    data.timer = Date.now()
                    data.wrongCount = 0
                    message.reply('Nope.')
                }
            }


            if (data.wrong == 9){
                const file = new AttachmentBuilder(`../Hangman/imgs/${data.wrong}.png`);
                const wrongEmbed = {
                    title: "Game over! ☠️",
                    image: {
                        url: `attachment://${data.wrong}.png`,
                    },
                    description: "The word was " + data.randWord + "."
                };
                message.channel.send({embeds: [wrongEmbed], files: [file]})
                restart(message.guild.id)
            }

            if (data.turn == data.plrs.length)
                data.turn = 0
            if (data.wrong != 9 && data.plrs.length > 1 && data.start) { 
                if (data.plrs[data.turn] != data.currentPlayer){
                    data.currentPlayer = data.plrs[data.turn]
                    data.wrongCount = 0
                    setTimeout(() => {
                        message.channel.send(`${phrases[Math.floor(Math.random()*phrases.length)]} ${data.plrs[data.turn]}`) 
                    }, 500)
                }   
            }    
    }
    db.save() 
    
})


client.on("interactionCreate", async (interaction) =>{
    let tempData = await getData(interaction.guild.id, interaction.channel.id)
    let data = tempData[0]
    let db = tempData[1]

    if(!interaction.isButton()) return
    if(interaction.user.bot) return
    if (data.start) return

    if (!data.plrs.includes(interaction.user.toString())){
        data.plrs.push(interaction.user)
        data.topic.push(interaction.customId.match(/[a-zA-Z]+/g)[0])
        interaction.reply({content: `You picked ${interaction.customId.match(/[a-zA-Z]+/g)}, your vote has been recorded!`, ephemeral: true})
    } else {
        interaction.reply({content: `You already voted!`, ephemeral: true})
    }

    db.save()
})

loopFunction(2500, async function(){
    if (guildId == "") return

    let tempData = await getData(guildId)
    let data = tempData[0]
    let db = tempData[1]

    if (!data.start) return
    if (data.timer){
        if (Date.now() - data.timer >= cd){
            console.log('time')
            data.timer = Date.now()
            data.turn++
            if (data.turn == data.plrs.length)
                data.turn = 0
            if (data.wrong != 9 && data.plrs.length > 1){
                client.channels.cache.get(db.channel_id).send(`You took too long ${data.currentPlayer}`)
                data.currentPlayer = data.plrs[data.turn]
                setTimeout(() => { 
                    client.channels.cache.get(db.channel_id).send(`${phrases[Math.floor(Math.random()*phrases.length)]} ${data.plrs[data.turn]}`) 
                }, 500)
            }
        }
    }
    db.save()
});

const {connect} = require("mongoose")
connect(process.env.DatabaseURL, {
}).then(() => console.log("Client connected to DB."))

client.login(process.env.TOKEN)