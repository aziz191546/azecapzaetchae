
 
// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require('discord.js');
const client = new Client({ disableEveryone: true})
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const botversion = require('./package.json').version;
const simpleytapi = require('simple-youtube-api')
const moment = require("moment");
const fs = require('fs');
const pretty = require("pretty-ms");
const prefix = process.env.PREFIX;
client.login(process.env.BOT_TOKEN);
const queue = new Map();
var table = require('table').table
const Discord = require('discord.js');
const captha = 'Developer :'
const discordv12 = 'Shuruhatik#9386'
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);/////////////shuruhatik
});


/*

- [       All Copy Right Reserved For: Shuruhatik  in YT     ] -

*/



//const fs = require('fs');



const verifyj = JSON.parse(fs.readFileSync("./verify.json", "utf8"))////////////////////shuruhatik

client.on('message', async message => {
    let messageArray = message.content.split(" ");/////////////shuruhatik
   if(message.content === `${prefix}setcaptcha`) {/////////////shuruhatik
        
    let filter = m => m.author.id === message.author.id;
    let ch;/////////////shuruhatik
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You don\'t have permission').then(msg => {/////////////shuruhatik
       msg.delete(4500);
       message.delete(4500);/////////////shuruhatik
    });/////////////shuruhatik
    
    message.channel.send(':pencil: **| الآن اكتب اسم قناة التحقق ... :pencil2: **').then(msg => {/////////////shuruhatik

        message.channel.awaitMessages(filter, {/////////////shuruhatik
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            ch = collected.first().content;
            let chf = message.guild.channels.find('name', `${ch}`)/////////////shuruhatik
            if(!chf) return msg.edit(':x: **| اسم قناة خاطئ (اكتب الأمر مرة أخرى) .**') && console.log('cant find this channel')/////////////shuruhatik
            let rr;/////////////shuruhatik
            msg.edit(':scroll: **| الرجاء كتابة اسم الدور الذي تم التحقق منه .... :pencil2: **').then(msg => {/////////////shuruhatik
      
                message.channel.awaitMessages(filter, {/////////////shuruhatik
                  max: 1,
                  time: 90000,
                  errors: ['time']
                })
                .then(collected => {/////////////shuruhatik
                    collected.first().delete();
                    rr = collected.first().content;
                    let rf = message.guild.roles.find('name', `${rr}`)
                    if(!rf) return msg.edit(':x: **| اسم دور خاطئ (اكتب الأمر مرة أخرى)**') && console.log('cant find this role')
                    msg.edit('✅ **| فعلت بنجاح..  **').then(msg => {
        
                      message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 90000,
                        errors: ['time']/////////////shuruhatik
                      })
                      let embed = new Discord.RichEmbed()/////////////shuruhatik
                      .setTitle('**تم إعداد Captcha بنجاح**')
                      .addField('Captcha Channel:', `${ch}`)/////////////shuruhatik
                      .addField('Verfied Role:', `${rr}`)
                      .setThumbnail(message.author.avatarURL)
                      .setFooter(`${captha} ${discordv12}`)
                      .setColor("GREEN")
                     message.channel.sendEmbed(embed)
    verifyj[message.guild.id] = {
        channel: ch,/////////////shuruhatik
        rolev: rr,
        onoff: 'On'
    }
    fs.writeFile("./verify.json", JSON.stringify(verifyj), (err) => {
    if (err) console.error(err)
  })
   } /////////////shuruhatik
            )
        })
    })
})
    })
}})             

client.on('message', async message => {

if(message.content == `${prefix}captcha off`) {
    if(!verifyj[message.guild.id]) verifyj[message.guild.id] = {
        channel: "Undefined",
        onoff: "Off",
        rolev: "Undefined"
    }
    if(verifyj[message.guild.id].onoff === "Off") return message.channel.send('Already Turned Off !')
verifyj[message.guild.id].onoff = "off"
message.channel.send(':white_check_mark: | Successfully turned off')
fs.writeFile("./verify.json", JSON.stringify(verifyj), (err) => {
    if (err) console.error(err)
  })
}
})


client.on('message', async message => {
    if(message.author.bot) return;
    if(!message.channel.type === 'dm') return;
let rf = message.guild.roles.find('name', `${verifyj[message.guild.id].rolev}`)
 let mem = message.guild.member(message.author)
    if(message.content.startsWith(prefix + 'captcha')) {
        if(!verifyj[message.guild.id]) verifyj[message.guild.id] = {
            channel: "Undefined",
            onoff: "Off",
            rolev: "Undefined"
        }
        if(verifyj[message.guild.id].onoff === "Off") return console.log('the command is turned off')
    if(message.channel.name !== verifyj[message.guild.id].channel) return console.log('wrong channel')
      if(mem.roles.has(rf.id)) return message.channel.send(':x: | You Are Already Verfied !')
  const type = require('./verifycodes.json');
  const item = type[Math.floor(Math.random() * type.length)];
  const filter = response => {
      return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
  };
    const embed = new Discord.RichEmbed()
    .setTitle('**يجب أن تكتب كود الكابتشا في 15 ثانية**')
    .setColor("RANDOM")
    .setImage(`${item.type}`)
     .setFooter('Requested By' + message.author.tag)
    message.channel.sendEmbed(embed).then(() => {
              message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
      .then((collected) => { 
        message.author.send(`**${collected.first().author} لقد حصلت على دور مؤكد بنجاح :white_check_mark:**`);
      message.channel.send(`**${collected.first().author} لقد حصلت على دور مؤكد بنجاح :white_check_mark:**`);
                console.log(`[Typing] ${collected.first().author} verfied himself ! .`);
        message.guild.member(collected.first().author).addRole(rf);
        })
                  .catch(collected => {
                  message.author.send('نفذ الوقت !')
                              console.log('[Typing] Error: لا أحد يكتب كود captcha.');
                  console.log(collected)

                })
    
    fs.writeFile("./verify.json", JSON.stringify(verifyj), (err) => {
        if (err) console.error(err)
      })
    })
}})                           
