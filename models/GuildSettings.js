const mongoose = require('mongoose')
const GuildSettingsSchema = new mongoose.Schema({
    guild_id: String,
    channel_id: String,
    game_data: {
        randWord: String,
        start: Boolean,
        turn: Number,
        wrong: Number,
        guessed: [String],
        info: String,
        plrs: [String],
        timer: Number,
        currentPlayer: String,
        guessedCorrect: [String],
        wrongCount: Number,
        commandCd: Boolean,
        counter: Number,
        topic: [String]
    },
    leaderstats: {
        wins: Map,
        prizes: Map,
        place: Map,
    }
})

module.exports = mongoose.model("GuildSettings", GuildSettingsSchema)
