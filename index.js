const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const  dotenv  = require('dotenv');
dotenv.config()
const {TOKEN} = process.env
//importação dos comandos

const fs = require('node:fs')

const path = require('node:path')
const commandsPath = path.join(__dirname, 'commands')
const commandFile = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for(const file of commandFile){
    const filePath = path.join(commandsPath,file)
    const command = require(filePath)
    if('data' in command && 'execute' in command){
        client.commands.set(command.data.name,command)
    }else{
        console.log(`esse comando em ${filePath} esta com data ou execute auxente`)
    }
}





// Create a new client instance
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

//listener de interação com o bot

client.on(Events.InteractionCreate, async interection =>{
    if(!interection.isChatInputCommand())return
    const command = interection.client.commands.get(interection.commandName)
    
    if(!command){
        console.error("comando n encontrado")
        return
    }
    try{
        await command.execute(interection)
    }catch(e){
        console.error(e)
        await interection.reply("houve um erro ao executar esse comando")
    }
})

