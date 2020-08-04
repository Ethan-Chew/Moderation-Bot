# Open Source Moderation Bot
## This is the source code for a discord bot which will help with moderation through commands.
[![Maintenance](https://img.shields.io/badge/Maintained%3F-no-red.svg)](https://bitbucket.org/lbesson/ansi-colors)

### How to install
1. Make sure you’re logged on to the Discord Developer Website.
2. Navigate to the application page
3. Click on the “New Application” button.
4. Give the application a name and click “Create”.
5. Create a Bot User by navigating to the “Bot” tab and clicking “Add Bot”.
6. Make sure that Public Bot is ticked if you want others to invite your bot.
7. You should also make sure that Require OAuth2 Code Grant is unchecked unless you are developing a service that needs it. If you’re unsure, then leave it unchecked.

### Connecting the code to your bot

1. Copy the token using the “Copy” button.
2. Locate the Token Variable in the bot.js code and paste your token in.

### Warning 
It should be worth noting that this token is essentially your bot’s password. You should never share this to someone else. In doing so, someone can log in to your bot and do malicious things, such as leaving servers, ban all members inside a server, or pinging everyone maliciously.
If you accidentally leaked your token, click the “Regenerate” button as soon as possible. This revokes your old token and re-generates a new one. Now you need to use the new token to login.
