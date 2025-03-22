# Hangman Bot

Hangman Bot is a fun word game bot designed to entertain users across various Discord servers. Players can guess words from different categories, compete for wins, and enjoy a friendly challenge.

## Features

- **Categories**: Hangman Bot offers a variety of word categories, including Nature, Anime, Entertainment, Games, Food, General, Music, Sport, Technology, and Pokemon. Players can choose their favorite category to play.
- **Leaderboard**: Utilizing MongoDB, the bot keeps track of player wins and displays them on a leaderboard. This adds a competitive element and encourages players to aim for the top spot.
- **Multi-Server Compatibility**: Hangman Bot seamlessly works across multiple Discord servers. Server-specific data is stored in the database, allowing players to enjoy the game wherever they are.
- **Continuous Improvement**: Regularly seek feedback from players to enhance the bot's features, fix any issues, and keep the game engaging.

## Getting Started

1. **Prerequisites**:
   - Node.js (version 18 or higher)
   - MongoDB (ensure it's running locally or hosted)

2. **Installation**:
   - Clone this repository.
   - Install dependencies using `npm install`.

3. **Configuration**:
   - Create an `.env` file with the following content:
     ```
     BOT_TOKEN=your_discord_bot_token_here
     MONGODB_URI=your_mongodb_connection_string_here
     ```
     Replace placeholders with your actual bot token and MongoDB connection string.

4. **Running the Bot**:
   - Execute `npm start` to launch the Hangman Bot.
   - Invite the bot to your Discord server using the OAuth2 URL generated for your bot.

## Commands

- `/start`: Start a new game.
- `/stop`: Stop the ongoing game.
- `/leaderboard`: View the top players on the leaderboard.

## Contributing

Contributions are welcome! Feel free to submit pull requests or report issues on this GitHub repository.
