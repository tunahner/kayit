const Discord = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['783839815337508914'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
const erkek = message.guild.roles.cache.find(r => r.id === '783844486659702844')
const erkek2 = message.guild.roles.cache.find(r => r.id === '783844486992232449')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '783846167691395082')
const savelogs = message.guild.channels.cache.find(c => c.id === '784093776523690014')
if(!erkek) return message.channel.send('1.ci Erkek rolü ayarlanmamış.')
if(!erkek2) return message.channel.send('2.ci Erkek rolü ayarlanmamış.')
if(!kayıtsız) return message.channel.send('Kayıtsız rolü ayarlanmamış')
if(!savelogs) return message.channel.send('Save log ayarlanmamış.')




let member = message.guild.member(message.mentions.user.first() || message.guild.members.cache.get(args[0]))
if(!member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('Kendinden üst/aynı pozisyonda birisini kayıt edemezsin.')
if(!member) return message.channel.send(`Bir kullanıcı belirt.`)
if(member.id === message.author.id) return message.channel.send('Kendini kayıt edemezsin.')
if(member.id === client.user.id) return message.channel.send('Botu kayıt edemezsin.')
if(member.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibini kayıt edemezsin.')


let tag = 'tag' 
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send('Bir isim belirt.')
if(!age) return message.channel.send('Bir yaş belirt.')
  
datab.add(`yetkili.${message.author.id}.erkek`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)


member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkek)
member.roles.add(erkek2)
member.roles.remove(kayıtsız)


const embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
${member}, ${message.author} Tarafından Kayıt Edildi.
${erkek}, ${erkek2} Rolleri Verildi.
İsmi \`${tag} ${name} | ${age}\` Olarak Güncellendi.`) 
.setFooter(`${message.author.username} Toplam ${alldata} Kayıta Sahip.`)
.setColor("0x2f3136")
message.channel.send(embed)


const saveall = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.addField(`Kayıt Eden`, `${message.author}`)
.addField(`Kullanıcı`, `${member}`)
.addField(`Roller`, `${erkek}, ${erkek2}`)
.addField(`İsim`, `\`${tag} ${name} | ${age}\``)
.addField(`Kanal`, `\`${message.channel.name}\``)
.addField(`Kayıtları`, `\`${alldata}\``)
.addField(`Kayıt Saat`, `\`\``)
.setFooter('Striga Code')
savelogs.send(saveall)

datab.push(`isim.${message.guild.id}`, {
  userID: member.id, 
  isim: name,
  yas: age,
  tag: tag
})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['erkek', 'e', 'boy', 'man'],
    permLevel: 0
  }

  exports.help = {
    name: 'erkek',
    description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.",
    usage: '.erkek @etiket/id İsim Yaş'
  }