const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./config.json");
const deepai = require('deepai');

deepai.setApiKey('DEEP_AI_APIKEY_BURAYA');




client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
      status: "dnd",
      activity: { name: "m0rsmordre", type: "WATCHING" },
    });
});


client.on("message", async function (message) {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if(message.content.startsWith("!avatarkontrol"))
    {
        
        let a =  await get_data(message.author.avatarURL);
        let puan = a["output"]["nsfw_score"];
        if(puan){
            
            if(puan > 0.87)
            {
                return message.channel.send("Uygunsuz avatar")
            }
            else{
                return message.channel.send("Avatar uygun")
            }
        }
        
        
    }
});  



client.on("guildMemberAdd", async (member) => {
   
        let gld = member.guild;
        let log_ch = gld.channels.cache.get("KANAL_ID");
        let a =  await get_data(message.author.avatarURL);
        let puan = a["output"]["nsfw_score"];
        if(puan){
            
            if(puan > 0.87)//%85in üstünde olanlar kesinlikle pornografik içerik oluyor
            {
                return log_ch.channel.send("Uygunsuz avatar, cinsel içerik!")
            }
            else{
                return log_ch.channel.send("Avatar uygun")
            }
        }
        
});  

client.login(ayarlar.TOKEN);


function get_data(link) {
    return new Promise(async function(resolve, reject) {
        await deepai.callStandardApi("nsfw-detector", {
            image: link,
        }).then((res) => resolve(res));
    })
}

