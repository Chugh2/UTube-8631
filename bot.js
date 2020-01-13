let musicUrls = [];
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ">";
const ms = require('ms');

const token = "NjY1NTkyNTY0OTcxMjA4NzA1.XhtkfA.efck3q2lSRBAFgeEXsKN9NgiEQQ";

client.login(token);

client.on('ready', () => {
    console.log('The music bot is ready!');
    client.user.setActivity(`music. Type >commands for a list of commands. In ${client.guilds.size} servers.`)
});

client.on('message', msg => {
    let args = msg.content.substring(prefix.length).trim().split(" ").toString()
    
    if(msg.content.toLowerCase().startsWith(">play"))
    {
        let voicechannel = msg.guild.channels.find(channel => channel.name === "Music");
        if(voicechannel != null)
        {
            //console.log(`${voicechannel.name} was found and is a ${voicechannel.type} channel.`)
            voicechannel.join()
            .then(connection => {
                let stream = ytdl(args, { filter : "audioonly"});
                let dispatcher = connection.playStream(stream, streamOptions);
                const Embed = new Discord.RichEmbed()
                .setColor(0x00BF00)
                .setTitle(msg.author.tag)
                .setThumbnail(msg.author.avatarURL)
                .setDescription("Your song is now playing in music!")
				.setFooter("If your music isn't playing, check if your youtube URL is correct.")

                msg.channel.send(Embed)
            })
            .catch(console.log("Could have been an error."));
        }
    }
});

client.on("message", msg => {
    let args = msg.content.substring(prefix.length).trim().split(" ");
    const command = args.shift();
    let musicUrl = args[1];
    
    if(command === "commands") {
        const Embed = new Discord.RichEmbed()
        .setTitle("Commands")
        .setDescription("Here are the commands that are currently available.")
        .addField('>commands', 'Shows the commands.')
        .addField('>play', 'Plays some music.')
        .addField('Note:', 'The command play should be used like this: >play <YOUTUBE URL HERE>. If you do not use it that way, the bot will not play the music. Keep in mind a queue system has not yet been applied to the bot.')
        .setColor(0x00FFF7);

        msg.channel.send(Embed);
}})