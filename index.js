const {
    WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require('@adiwajshing/baileys');
const qrcode = require("qrcode-terminal") 
const moment = require("moment-timezone") 
const fs = require("fs") 
const util = require('util')
const crypto = require('crypto')
const imageToBase64 = require('image-to-base64')
const axios = require('axios')
const { color, bgcolor } = require('./lib/color')
const { donasi } = require('./lib/donasi')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { exec, spawn } = require("child_process")
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tiktod = require('tiktok-scraper')
const brainly = require('brainly-scraper')
const ffmpeg = require('fluent-ffmpeg')
const ms = require('parse-ms')
const toMs = require('ms')
const fontPath = ('./lib/Zahraaa.ttf')
const path = require('path')
const cd = 4.32e+7
const { ind } = require('./language')

/********** MENU SETTING **********/
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Owner gans\n' 
            + 'ORG: Jangan lupa kenalan;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=628819547416:+62 881-954-7416\n' 
            + 'END:VCARD' 
blocked = []   
prefix = '#'
limitawal = 30
memberlimit = 0
cr = '*『DHIWID』 『BOT』*'
/*************************************/

/******** OWNER NUMBER**********/
const ownerNumber = ["628819547416@s.whatsapp.net","628819547416@s.whatsapp.net"] 
/************************************/

       
/*********** LOAD FILE ***********/
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const welkom = JSON.parse(fs.readFileSync('./database/bot/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/bot/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./database/bot/simi.json'))
const event = JSON.parse(fs.readFileSync('./database/bot/event.json'))
const _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const uang = JSON.parse(fs.readFileSync('./database/user/uang.json'))
const prem = JSON.parse(fs.readFileSync('./database/user/prem.json'))
const antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const bad = JSON.parse(fs.readFileSync('./database/group/bad.json'))
const badword = JSON.parse(fs.readFileSync('./database/group/badword.json'))
/*********** END LOAD ***********/

/********** FUNCTION ***************/
const getLevelingXp = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
            }
        }

        const getLevelingLevel = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getLevelingId = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].id
            }
        }

        const addLevelingXp = (sender, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingLevel = (sender, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (sender) => {
            const obj = {id: sender, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
        }
             
         const getRegisteredRandomId = () => {
            return _registered[Math.floor(Math.random() * _registered.length)].id
        }

        const addRegisteredUser = (userid, sender, age, time, serials) => {
            const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
            _registered.push(obj)
            fs.writeFileSync('./database/bot/registered.json', JSON.stringify(_registered))
        }

        const createSerial = (size) => {
            return crypto.randomBytes(size).toString('hex').slice(0, size)
        }

        const checkRegisteredUser = (sender) => {
            let status = false
            Object.keys(_registered).forEach((i) => {
                if (_registered[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        
        const addATM = (sender) => {
        	const obj = {id: sender, uang : 0}
            uang.push(obj)
            fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
        }
        
        const addKoinUser = (sender, amount) => {
            let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang += amount
                fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
            }
        }
        
        const checkATMuser = (sender) => {
        	let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return uang[position].uang
            }
        }
        
        const bayarLimit = (sender, amount) => {
        	let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit -= amount
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            }
        }
        	
        const confirmATM = (sender, amount) => {
        	let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang -= amount
                fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
            }
        }
        
         const limitAdd = (sender) => {
             let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id == sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit += 1
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            }
        } 
        
        const getPremiumExpired = (sender) => {
		    let position = null
		    Object.keys(prem).forEach((i) => {
		        if (prem[i].id === sender) {
		            position = i
		        }
		    })
		    if (position !== null) {
		        return prem[position].expired
		    }
		} 
		
		const expiredCheck = () => {
		    setInterval(() => {
		        let position = null
		        Object.keys(prem).forEach((i) => {
		            if (Date.now() >= prem[i].expired) {
		                position = i
		            }
		        })
		        if (position !== null) {
		            console.log(`Premium expired: ${prem[position].id}`)
		            prem.splice(position, 1)
		            fs.writeFileSync('./database/bot/prem.json', JSON.stringify(prem))
		        }
		    }, 1000)
		}
		
         
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}
/********** FUNCTION ***************/

const client = new WAConnection()
   client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(color('[','white'),color('∆','red'),color(']','white'),color('qr already scan.subscribe','white'),color('YOU','red'),color('TUBE','white'),color('ampibi gaming','yellow'))
})

client.on('credentials-updated', () => {
	const authInfo = client.base64EncodedAuthInfo()
   console.log(`credentials updated!`)
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})
fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
client.connect();


client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Hai beban keluarga🥳 @${num.split('@')[0]}\ Selamat datang di group *${mdata.subject}* Jangan lupa baca deskripsi!\nintro jangan lupa!\nnama :\numur : \nDaftar bot ya kak!`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Sayonara, jangan lupa sempaknya ketinggalan🤪🤣@${num.split('@')[0]} 👋 `
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})


	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
            global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const timi = moment.tz('Asia/Jakarta').add(30, 'days').calendar();
			const timu = moment.tz('Asia/Jakarta').add(20, 'days').calendar();
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const q = args.join(' ')
			const botNumber = client.user.jid
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            
            /************** SCURITY FEATURE ************/
            const isEventon = isGroup ? event.includes(from) : false
            const isRegistered = checkRegisteredUser(sender)
            const isBadWord = isGroup ? badword.includes(from) : false
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isLevelingOn = isGroup ? _leveling.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isPrem = prem.includes(sender) || isOwner
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isImage = type === 'imageMessage'
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const sendImage = (teks) => {
		    client.sendMessage(from, teks, image, {quoted:mek})
		    }
		    const costum = (pesan, tipe, target, target2) => {
			client.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
	        /*****************END SCURITY FEATURE ********/
			
			expiredCheck()
			
			//function rank 
			const levelRole = getLevelingLevel(sender, _level)
   	     var role = 'Trainee'
   	     if (levelRole <= 3) {
   	         role = 'senior trainee'
   	     } else if (levelRole <= 5) {
   	         role = 'private'
   	     } else if (levelRole <= 7) {
   	         role = 'corporal'
   	     } else if (levelRole <= 8) {
   	         role = 'Sergeant'
   	     } else if (levelRole <= 9) {
   	         role = 'staff sgt I'
   	     } else if (levelRole <= 10) {
   	         role = 'staff sgt II'
   	     } else if (levelRole <= 11) {
   	         role = 'staff sgt II'
   	     } else if (levelRole <= 12) {
   	         role = 'Sgt 1st class I'
   	     } else if (levelRole <= 13) {
   	         role = 'Sgt 1st class II'
   	     } else if (levelRole <= 14) {
   	         role = 'Sgt 1st class III'
   	     } else if (levelRole <= 14) {
   	         role = 'Ggt 1st class IV'
   	     } else if (levelRole <= 15) {
   	         role = 'Master sgt I'
   	     } else if (levelRole <= 16) {
   	         role = 'Master sgt II'
   	     } else if (levelRole <= 17) {
   	         role = 'Master sgt III'
   	     } else if (levelRole <= 18) {
   	         role = 'Master sgt IV'
   	     } else if (levelRole <= 19) {
   	         role = 'Master sgt V'
   	     } else if (levelRole <= 20) {
   	         role = '2nd Lt I'
   	     } else if (levelRole <= 21) {
   	         role = '2nd Lt II'
   	     } else if (levelRole <= 22) {
   	         role = '2nd Lt III'
   	     } else if (levelRole <= 23) {
   	         role = '2nd Lt IV'
   	     }
   
			var premi = '*X*'
			if (isPrem) {
				premi = '*✓*'
			} 
			if (isOwner) {
				premi = '*owner*'
			}
				
				
	        //function leveling
            if (isGroup && isRegistered && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    bayarLimit(sender, 3)
                    await reply(ind.levelup(pushname, sender, getLevelingXp,  getLevel, getLevelingLevel, role))
                }
            } catch (err) {
                console.error(err)
            }
        }
          //function check limit
          const checkLimit = (sender) => {
          	let found = false
                    for (let lmt of _limit) {
                        if (lmt.id === sender) {
                            let limitCounts = limitawal - lmt.limit
                            if (limitCounts <= 0) return client.sendMessage(from,`Limit request anda sudah habis\n\n_Note : limit bisa di dapatkan dengan cara ${prefix}buylimit dan dengan naik level_`, text,{ quoted: mek})
                            client.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                            found = true
                        }
                    }
                    if (found === false) {
                        let obj = { id: sender, limit: 0 }
                        _limit.push(obj)
                        fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
                        client.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                    }
				} 
		
			//funtion limited
            const isLimit = (sender) =>{ 
          	if (isOwner && isPrem) {return false;}
		      let position = false
              for (let i of _limit) {
              if (i.id === sender) {
              	let limits = i.limit
              if (limits >= limitawal ) {
              	  position = true
                    client.sendMessage(from, ind.limitend(pushname), text, {quoted: mek})
                    return true
              } else {
              	_limit
                  position = true
                  return false
               }
             }
           }
           if (position === false) {
           	const obj = { id: sender, limit: 0 }
                _limit.push(obj)
                fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit))
           return false
     	  }
     	}
     	   
     	       if (isGroup) {
					try {
						const getmemex = groupMembers.length	
					    if (getmemex <= memberlimit) {
						reply(`maaf member group belum memenuhi syarat. minimal member group adalah ${memberlimit}`)
						setTimeout( () => {
 	                           client.groupLeave(from) 
 					   	}, 5000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("1detik")
							}, 4000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("2detik")
							}, 3000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("3detik")
							}, 2000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("4detik")
							}, 1000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("5detik")
							}, 0)
					    }
		       } catch (err) { console.error(err)  }
 	       }
 
 	   	if (isGroup && isBadWord) {
            if (bad.includes(messagesC)) {
                if (!isGroupAdmins) {
                    return reply("Astaghfirullah")
                        .then(() => client.groupRemove(from, sender))
                        .then(() => {
                            client.sendMessage(from, `*「 ANTI BADWORD 」*\nKamu dikick karena berkata kasar!`, text ,{quoted: mek})
                        }).catch(() => client.sendMessage(from, `Untung cya bukan admin, kalo admin udah cya kick!`, text , {quoted : mek}))
                } else {
                    return reply( "Tolong Jaga Ucapan Min 😇")
                }
            }
        }
 
				//function antilink 
				if (messagesC.includes("://chat.whatsapp.com/")){
					if (!isGroup) return
					if (!isAntiLink) return
					if (isGroupAdmins) return reply('karena kamu adalah admin group, bot tidak akan kick kamu')
					client.updatePresence(from, Presence.composing)
					if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
					var kic = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Link Group Terdeteksi maaf ${sender.split("@")[0]} anda akan di kick dari group 5detik lagi`)
						setTimeout( () => {
						client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}, 5000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("1detik")
					}, 4000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("2detik")
					}, 3000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("3detik")
					}, 2000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("4detik")
					}, 1000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("5detik")
					}, 0)
				}
 	       
 	     
 	           //function balance
 	           if (isRegistered ) {
 	           const checkATM = checkATMuser(sender)
 	           try {
 	               if (checkATM === undefined) addATM(sender)
 	               const uangsaku = Math.floor(Math.random() * 10) + 90
	                addKoinUser(sender, uangsaku)
  	          } catch (err) {
   	             console.error(err)
   	         }
	        }
           
            
             //kolor
			colors = ['red','white','black','blue','yellow','green']
			
			//detector media
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedMsg = type === 'extendedTextMessage' && content.includes('extendedTextMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
			//private chat message
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			
			//group message
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			switch(command) { 
				//premiom
				case 'checkprem':
				const cekExp = ms(getPremiumExpired(sender) - Date.now())
				reply(`*「 PREMIUM EXPIRED 」*\n\n➸ *ID*: ${sender.split('@')[0]}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`)
				break
				
				//qr 
				case 'qrcode':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					const tex = encodeURIComponent(body.slice(8))
					if (!tex) return client.sendMessage(from, 'MASUKAN URL/TEKS UNTUK DI JADIKAN QR', text, {quoted: mek})
					const buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${tex}`)
					client.sendMessage(from, buff, image, {quoted: mek})
					await limitAdd(sender)
					break
				//tobz 
				case 'lirik':
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/lirik?q=${body.slice(7)}&apikey=BotWeA`)
				thum = await getBuffer(anu.result.thumb)
				teks = `*「 LAGU DI TEMUKAN 」*\n\n*Judul* : ${anu.result.judul}\n*Album* : ${anu.result.album}\n*public in* : ${anu.result.dipublikasi}\n*Lyrics* : ${anu.result.lirik}`
				client.sendMessage(from, thum, image, { quoted : mek, caption: teks })
				break
				case 'ttp':
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/ttp?text=${body.slice(5)}&apikey=BotWeA`)
				res = await getBase64(anu.base64)
				client.sendMessage(from, res, sticker, {quoted:mek})
				break
                case 'chord':
                anu = await fetchJson(`https://tobz-api.herokuapp.com/api/chord?q=${body.slice(7)}&apikey=BotWeA`)
                client.sendMessage(from, anu.result, text, {quoted:mek})
                break
				case 'moddroid':
				if (!isRegistered) return reply(ind.noregis())
				if (!isPrem) return reply(ind.premon(pushname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/moddroid?q=${body.slice(10)}&apikey=BotWeA`)
			hepi = data.result[0] 
			teks = `*Nama*: ${data.result[0].title}\n*publisher*: ${hepi.publisher}\n*mod info:* ${hepi.mod_info}\n*size*: ${hepi.size}\n*latest version*: ${hepi.latest_version}\n*genre*: ${hepi.genre}\n*link:* ${hepi.link}\n*download*: ${hepi.download}`
			buffer = await getBuffer(hepi.image)
			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
			await limitAdd(sender)
			break
			case 'happymod':
				if (!isRegistered) return reply(ind.noregis())
				if (!isPrem) return reply(ind.premon(pushname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(10)}&apikey=BotWeA`)
			hupo = data.result[0] 
			teks = `*Nama*: ${data.result[0].title}\n*version*: ${hupo.version}\n*size:* ${hupo.size}\n*root*: ${hupo.root}\n*purchase*: ${hupo.price}\n*link*: ${hupo.link}\n*download*: ${hupo.download}`
			buffer = await getBuffer(hupo.image)
			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
			await limitAdd(sender)
			break
            case 'bitly':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
               client.updatePresence(from, Presence.composing) 
                data = await fetchJson(`https://tobz-api.herokuapp.com/api/bitly?url=${args[0]}&apikey=BotWeA`)
                hasil = `link : ${args[0]}\n\nOutput : ${data.result}`
                reply(hasil)
                await limitAdd(sender)
                break
                case 'nangis':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/cry?apikey=BotWeA', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
                case 'blowjob':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isNsfw) return reply(ind.nsfwoff())
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=BotWeA', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
					case 'cium':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isNsfw) return reply(ind.nsfwoff())
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/kiss?apikey=BotWeA', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
					case 'peluk':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isNsfw) return reply(ind.nsfwoff())
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/hug?apikey=BotWeA', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
				case 'husbu':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isNsfw) return reply(ind.nsfwoff())
				    try {
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/husbu?apikey=BotWeA`)
						buffer = await getBuffer(res.image)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! Cintai husbumu'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					await limitAdd(sender)
					break
                case 'ranime':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isNsfw) return reply(ind.nsfwoff())
					gatauda = body.slice(8)
					reply(ind.wait())
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender)
					break
                case 'joox':
				if (!isRegistered) return reply(ind.noregis())
				if (!isPrem) return reply(ind.premon(pushname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
                data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${body.slice(6)}&apikey=BotWeA`, {method: 'get'})
               if (data.error) return reply(data.error)
                 infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${data.result.judul}\nAlbum : ${data.result.album}\nDipublikasi : ${data.result.dipublikasi}`
                buffer = await getBuffer(data.result.thumb)
                lagu = await getBuffer(data.result.mp3)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${data.result.title}.mp3`, quoted: mek})
                await limitAdd(sender)
                break
				//freerestapi 
				case 'igstalk':
                   if (!isRegistered) return reply(ind.noregis())
                   if (isLimit(sender)) return reply(ind.limitend(pusname))
                     hmm = await fetchJson(`https://freerestapi.herokuapp.com/api/v1/igs?u=${body.slice(9)}`)
                     buffer = await getBuffer(hmm.data.profilehd)
                     hasil = `Fullname : ${hmm.data.fullname}\npengikut : ${hmm.data.follower}\nMengikuti : ${hmm.data.following}\nPrivate : ${hmm.data.private}\nVerified : ${hmm.data.verified}\nbio : ${hmm.data.bio}`
                    client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
                    await limitAdd(sender)
					break 
				//daftar 
				case 'daftar':
                if (isRegistered) return  reply(ind.rediregis())
                if (!q.includes('|')) return  reply(ind.wrongf())
                const namaUser = q.substring(0, q.indexOf('|') - 0)
                const umurUser = q.substring(q.lastIndexOf('|') + 1)
                const serialUser = createSerial(20)
                if(isNaN(umurUser)) return await reply('Umur harus berupa angka!!')
                if (namaUser.length >= 30) return reply(`why is your name so long it's a name or a train`)
                if (umurUser > 40) return reply(`your age is too  old maximum 40 years`)
                if (umurUser < 12) return reply(`your age is too young minimum 12 years`)
                try {
					ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
                veri = sender
                if (isGroup) {
                    addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
                    await client.sendMessage(from, ppimg, image, {quoted: mek, caption: ind.registered(namaUser, umurUser, serialUser, time, sender)})
                    addATM(sender)
                    addLevelingId(sender)
                    checkLimit(sender)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
                } else {
                    addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
                    await client.sendMessage(from, ppimg, image, {quoted: mek, caption: ind.registered(namaUser, umurUser, serialUser, time, sender)})
                    addATM(sender)
                    addLevelingId(sender)
                    checkLimit(sender)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
                }
				break
				//terhambar 
				case 'quotemaker':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
                var gh = body.slice(12)
					var quote = gh.split("|")[0];
					var wm = gh.split("|")[1];
					const pref = `Usage: \n${prefix}quotemaker teks|watermark\n\nEx :\n${prefix}quotemaker ini contoh|bicit`
					if (args.length < 1) return reply(pref)
					reply(ind.wait())
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=random`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {caption: 'Nih anjim', quoted: mek})
					await limitAdd(sender)
					break
				//fadli 
				case 'pinterest':
					if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
					reply(ind.wait())
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓*`})
					await limitAdd(sender)
					break 
				case 'pokemon':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
                   if (!isGroup) return reply(ind.groupo())
                   if (!isNsfw) return reply(ind.nsfwoff())
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
					reply(ind.wait())
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					await limitAdd(sender)
					break
                case 'anjing':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
                   if (!isGroup) return reply(ind.groupo())
                   if (!isNsfw) return reply(ind.nsfwoff())
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
					reply(ind.wait())
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					await limitAdd(sender)
					break
				//jojo 
				case 'stickerhide':
				    ranp = getRandom('.gif')
					rano = getRandom('.webp')
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/screed?text=${args[0]}`,{method: 'get'})
				exec(`wget ${anu} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
				case 'emoji':
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=${args[0]}&type=aple`, {method: 'get'})
				jes = await getBuffer(anu)
				client.sendMessage(from, jes, image,{quoted : mek, caption : 'DONE'})
				break
				case 'tiktok':
				if (!isPrem) return reply(ind.premon(pushname))
				anu = await fetchJson (`https://docs-jojo.herokuapp.com/api/tiktok_nowm?url=${args[0]}`, {method : 'get' })
				if (anu.error) return reply(anu.error)
					teks = `*From* : ${anu.result.from}\n*Judul* : ${anu.result.title}\n*Upload* : ${anu.result.uploaded}`
					thumb = await getBuffer(anu.result.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result.url)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break
				case 'quotes':
					if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/quotesnime/random`, {method: 'get'})
					reply(anu.data.quote)
					await limitAdd(sender)
					break		
					case 'infonomor':
					if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
                    if (args.length < 1) return reply(`Masukan Nomor\nContoh : ${prefix}infonomor 0812345678`)
                data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infonomor?no=${body.slice(11)}`)
                if (data.error) return reply(data.error)
                if (data.result) return reply(data.result)
                hasil = `╠➥ internasional : ${data.international}\n╠➥ nomor : ${data.nomor}\n╠➥ operator : ${data.op}`
                reply(hasil)
                await limitAdd(sender)
				break 
				case 'beritahoax':
                     if (!isRegistered) return reply(ind.noregis())
                     if (isLimit(sender)) return reply(ind.limitend(pusname))
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infohoax`, {method: 'get'})
					teks = '=================\n'
					for (let i of data.result) {
						teks += `*Gambar* : ${i.image}\n*Title* : ${i.title}\n*link* : ${i.link}\n*tag* : ${i.tag}\n=================\n`
					}
					reply(teks.trim())
					await limitAdd(sender)
					break 
				case 'ytmp4':
				if (!isRegistered) return reply(ind.noregis())
				if (!isPrem) return reply(ind.premon(pushname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.stikga())
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/ytmp4?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Size* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					await limitAdd(sender)
				break 
				case 'ytmp3':
                    if (!isRegistered) return reply(ind.noregis())
                    if (!isPrem) return reply(ind.premon(pushname))
                    if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.wrogf())
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/ytmp3?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Size* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					await limitAdd(sender)
					break
                case 'text3d':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
              	    if (args.length < 1) return reply('teksnya mana kak?')
                    teks = `${body.slice(8)}`
                    if (teks.length > 10) return client.sendMessage(from, 'Teksnya kepanjangan, Maksimal 10 kalimat', text, {quoted: mek})
                    buff = await getBuffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${teks}`, {method: 'get'})
                    client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	await limitAdd(sender)
				break
			    case 'fototiktok':
				if (!isRegistered) return reply(ind.noregis())
				if (!isPrem) return reply(ind.premon(pushname))
				if (isLimit(sender)) return reply(ind.limitend(pusname))
                    gatauda = body.slice(12)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${gatauda}` , {method: 'get'})
			        buff = await getBuffer(anu.result)
                    reply(buff)
			        await limitAdd(sender)
				break
				//mhazria 
				case 'resepmasakan':
					if (!isRegistered) return reply(ind.noregis())
                   anu = await fetchJson(`https://mnazria.herokuapp.com/api/resep?key=${body.slice(14)}`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   buff = await getBuffer(anu.thumb_item)
                   hasil = `*title* \n ${anu.title} *item_name* \n ${anu.item_name} *ingredient* \n${anu.ingredient} *step* \n${anu.step}`
                   client.sendMessage(from, buff, image, {quoted: mek, caption: hasil})
                   await limitAdd(sender)
					break 
				case 'ssweb':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Urlnya mana om')
					teks = body.slice(7)
					reply(ind.wait())
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/screenshotweb?url=${teks}`)
					buff = await getBuffer(anu.gambar)
					client.sendMessage(from, buff, image, {quoted: mek})
					await limitAdd(sender)
					break
				case 'map':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
               	 anu = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`, {method: 'get'})
               	 buffer = await getBuffer(anu.gambar)
              	  client.sendMessage(from, buffer, image, {quoted: mek, caption: `${body.slice(5)}`})
				await limitAdd(sender)
				break
                case 'kbbi':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Apa yang mau dicari um?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/kbbi?search=${body.slice(6)}`, {method: 'get'})
					reply('Menurut Kbbi:\n\n'+anu.result)
					await limitAdd(sender)
				break
                case 'artinama':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Apa yang mau dicari um?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/arti?nama=${body.slice(10)}`, {method: 'get'})
					reply('Menurut nama:\n\n'+anu.result)
					await limitAdd(sender)
				break
				//auto respond 
				case 'ping':
          		if (!isRegistered) return reply(ind.noregis())
           		 await client.sendMessage(from, `Pong!!!!\nSpeed: ${processTime(time, moment())} _Second_`)
					break
               case 'help': 
				case 'menu':
				if (!isRegistered) return reply(ind.noregis())
				    const reqXp  = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
				    const uangku = checkATMuser(sender)
					await costum(ind.menu(pushname, prefix, getLevelingLevel, getLevelingXp, sender, reqXp, _registered, uangku, role, premi), text, tescuk, cr)
					break
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nama bot* : ${me.name}\n*OWNER* : *Arasyaaa*\n*AUTHOR* : TEUCHI\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*IG : @call.me_rasyabot*\n*IG (own) : @_lemonilo._*\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'blocklist': 
					teks = '𝗕𝗟𝗢𝗖𝗞 𝗟𝗜𝗦𝗧 :\n'
					for (let block of blocked) {
						teks += `┣➢ @${block.split('@')[0]}\n`
					}
					teks += `𝗧𝗼𝘁𝗮𝗹 : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break 
				case 'donasi':
				case 'donate':
				if (!isRegistered) return reply(ind.noregis())
					client.sendMessage(from, donasi(), text)
					break
				case 'admin':
         	   case 'owner':
         	   case 'creator':
                  client.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: mek})
                  client.sendMessage(from, 'Tuh beban keluarga',MessageType.text, { quoted: mek} )
					break    
				case 'leaderboard':
				case 'lb':
				bo = args[0]
				_level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
				uang.sort((a, b) => (a.uang < b.uang) ? 1 : -1)
                let leaderboardlvl = '-----[ *LEADERBOARD LEVEL* ]----\n\n'
                let leaderboarduang = '-----[ *LEADERBOARD UANG* ]----\n\n'
                let nom = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nom++
                        leaderboardlvl += `*[${nom}]* wa.me/${_level[i].id.replace('@s.whatsapp.net', '')}\n┗⊱ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n`
                        leaderboarduang += `*[${nom}]* wa.me/${uang[i].id.replace('@s.whatsapp.net', '')}\n┣⊱ *Uang*: _Rp${uang[i].uang}_\n┗⊱ *Limit*: ${limitawal - _limit[i].limit}\n`
                    }
                    await reply(leaderboardlvl)
                    await reply(leaderboarduang)
                } catch (err) {
                    console.error(err)
                    await reply(`minimal ${len} user untuk bisa mengakses database`)
                }
				break
				case 'limit':
				   if (!isRegistered) return reply(ind.noregis())
				   checkLimit(sender)
					break 
				case 'giftlimit': 
				if (!isOwner,!isPrem) return reply(ind.premon(pushname))
				const nomerr = args[0].replace('@','')
                const jmla = args[1]
                if (jmla <= 1) return reply(`minimal gift limit adalah 1`)
                if (isNaN(jmla)) return reply(`limit harus berupa angka`)
                if (!nomerr) return reply(`maaf format salah\nmasukan parameter yang benar\ncontoh : ${prefix}giftlimit @62895710074883 20`)
                const cysz = nomerr + '@s.whatsapp.net'
                var found = false
                        Object.keys(_limit).forEach((i) => {
                            if(_limit[i].id === cysz){
                                found = i
                            }
                        })
                        if (found !== false) {
                            _limit[found].limit -= jmla
                            const updated = _limit[found]
                            const result = `Gift kuota limit sukses dengan SN: ${createSerial(8)} pada ${moment().format('DD/MM/YY HH:mm:ss')}
*「 GIFT KUOTA LIMIT 」*

• User : @${updated.id.replace('@s.whatsapp.net','')}
• Limit: ${limitawal-updated.limit}`
                            console.log(_limit[found])
                            fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit));
                            reply(result)
                        } else {
                                reply(`Maaf, nomor ${nomerr} tidak terdaftar di database!`)
                        }
                break
				case 'listprem':
				if (!isRegistered) return reply( ind.noregis()) 
				const krem = JSON.parse(fs.readFileSync('./database/user/prem.json'))
				teks = '*==[ LIST PREM ]==*\n'
				for (let premau of krem){
					teks += `┣➢ @${premau.replace('@s.whatsapp.net','')}\n`
				}
				teks += `𝗧𝗼𝘁𝗮𝗹 : ${krem.length}`
				client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": prem}})
                break
				case 'mutual':
                if (!isRegistered) return reply( ind.noregis())
                if (isGroup) return  reply( 'Command ini tidak bisa digunakan di dalam grup!')
                anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net','')
                await reply('Looking for a partner...')
                await reply(`wa.me/${anug}`)
                await reply( `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
            case 'next':
                if (!isRegistered) return reply( ind.noregis())
                if (isGroup) return  reply( 'Command ini tidak bisa digunakan di dalam grup!')
                anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net','')
                await reply('Looking for a partner...')
                await reply(`wa.me/${anug}`)
                await reply( `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
				case 'transfer':
				if (!isRegistered) return reply(ind.noregis())
				if (!q.includes('|')) return  reply(ind.wrongf())
                const tujuan = q.substring(0, q.indexOf('|') - 1)
                const jumblah = q.substring(q.lastIndexOf('|') + 1)
                if(isNaN(jumblah)) return await reply('jumlah harus berupa angka!!')
                if (jumblah < 100 ) return reply(`minimal transfer 100`)
                if (checkATMuser(sender) < jumblah) return reply(`uang mu tidak mencukupi untuk melakukan transfer`)
                const tujuantf = `${tujuan.replace("@", '')}@s.whatsapp.net`
                fee = 0.005 *  jumblah
                hasiltf = jumblah - fee
                addKoinUser(tujuantf, hasiltf)
                confirmATM(sender, jumblah)
                addKoinUser('62895710073737@s.whatsapp.net', fee)
                reply(`*「 SUKSES 」*\n\npengiriman uang telah sukses\ndari : +${sender.split("@")[0]}\nke : +${tujuan}\njumblah transfer : ${jumblah}\npajak : ${fee}`)
                break
				case 'dompet':
				if (!isRegistered) return reply(ind.noregis())
				const kantong = checkATMuser(sender)
				reply(ind.uangkau(pushname, sender, kantong))
				break
				case 'buylimit':
				if (!isRegistered) return reply(ind.noregis())
				payout = body.slice(10)
				if(isNaN(payout)) return await reply('limit harus berupa angka!!')
				const koinPerlimit = 300
				const total = koinPerlimit * payout
				if ( checkATMuser(sender) <= total) return reply(`maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`)
				if ( checkATMuser(sender) >= total ) {
					confirmATM(sender, total)
					bayarLimit(sender, payout)
					await reply(`*「 PEMBAYARAN BERHASIL 」*\n\n*pengirim* : Admin\n*penerima* : ${pushname}\n*nominal pembelian* : ${payout} \n*harga limit* : ${koinPerlimit}/limit\n*sisa uang mu* : ${checkATMuser(sender)}\n\nproses berhasil dengan nomer pembayaran\n${createSerial(15)}`)
				} 
				break
				//no rest api 
				case 'slap':
                    kapankah = body.slice(1)
                    if (isLimit(sender)) return reply(ind.limitend(pusname))
					const slap =['anjing','babi lu','anak anjing','udah tolol nub Lagi','muka lo kek monyet','udah jomblo sendirian lagi dirumah tolol','so so an mau punya pacar muka aja kek monyet lepass dari kandang','ganteng doang di toxic aja dibilang baperan','pantek kau','bangsat kau','ku entod kalian nangis kau','memek lu semua','lihat anak anjing lagi baca','ganteng doang jemput cewe dipanggang','kamu cantik beb bullshit anjing cowo buaya','anak dajjal','puki lu','anjing ngajak gelud','sama hantu takut cupu ngentod','cupu cupu aja gausah bacot','kontol lu semua','bocah lu semua kontol','3 Hari Lagi']
					const ple = slap[Math.floor(Math.random() * slap.length)]
					pod = await getBuffer(`https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif`)
					client.sendMessage(from, pod, image, { quoted: mek, caption: '*Toxic*\n\n'+ ple })
					await limitAdd(sender)
					break
					case 'tampar':
					if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					buffer = await getBuffer('https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif', {method: 'get'})
					exec(`wget ${buffer.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
				case 'brainly':
					if (!isRegistered) return reply(ind.noregis())
					if (!isPrem) return reply(ind.premon(pushname))
					if (isLimit(sender)) return reply(ind.limitend(pusname))
                    brien = body.slice(9)
					brainly(`${brien}`).then(res => {
					teks = '❉───────────❉\n'
					for (let Y of res.data) {
						teks += `\n*「 _BRAINLY_ 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n❉───────────❉\n`
					}
					client.sendMessage(from, teks, text, {quoted: mek, detectLinks: false})
                        console.log(res)
                    })
					await limitAdd(sender)
					break 
				case 'bisakah':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					bisakah = body.slice(1)
					const bisa =['Bisa','Tidak Bisa','Coba Ulangi']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: mek })
					await limitAdd(sender)
					break
				case 'kapankah':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					kapankah = body.slice(1)
					const kapan =['Besok','Lusa','Tadi','4 Hari Lagi','5 Hari Lagi','6 Hari Lagi','1 Minggu Lagi','2 Minggu Lagi','3 Minggu Lagi','1 Bulan Lagi','2 Bulan Lagi','3 Bulan Lagi','4 Bulan Lagi','5 Bulan Lagi','6 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','6 Tahun Lagi','1 Abad lagi','3 Hari Lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					client.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: mek })
					await limitAdd(sender)
					break
           case 'apakah':
           if (!isRegistered) return reply(ind.noregis())
           if (isLimit(sender)) return reply(ind.limitend(pusname))
					apakah = body.slice(1)
					const apa =['Iya','Tidak','Bisa Jadi','Coba Ulangi']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, { quoted: mek })
					await limitAdd(sender)
					break
				case 'rate':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					rate = body.slice(1)
					const ra =['4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					client.sendMessage(from, 'Pertanyaan : *'+rate+'*\n\nJawaban : '+ te+'%', text, { quoted: mek })
					await limitAdd(sender)
					break
				case 'truth':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
                const trut =['Pernah suka sama siapa aja? berapa lama?','Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)','apa ketakutan terbesar kamu?','pernah suka sama orang dan merasa orang itu suka sama kamu juga?','Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?','pernah gak nyuri uang nyokap atau bokap? Alesanya?','hal yang bikin seneng pas lu lagi sedih apa','pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?','pernah jadi selingkuhan orang?','hal yang paling ditakutin','siapa orang yang paling berpengaruh kepada kehidupanmu','hal membanggakan apa yang kamu dapatkan di tahun ini','siapa orang yang bisa membuatmu sange','siapa orang yang pernah buatmu sange','(bgi yg muslim) pernah ga solat seharian?','Siapa yang paling mendekati tipe pasangan idealmu di sini','suka mabar(main bareng)sama siapa?','pernah nolak orang? alasannya kenapa?','Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget','pencapaian yang udah didapet apa aja ditahun ini?','kebiasaan terburuk lo pas di sekolah apa?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					client.sendMessage(from, truteh, image, { caption: '*Truth*\n\n'+ ttrth, quoted: mek })
					await limitAdd(sender)
					break
				case 'dare':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				const dare =['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu','telfon crush/pacar sekarang dan ss ke pemain','pap ke salah satu anggota grup','Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo','ss recent call whatsapp','drop emot "🦄💨" setiap ngetik di gc/pc selama 1 hari','kirim voice note bilang can i call u baby?','drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu','pake foto sule sampe 3 hari','ketik pake bahasa daerah 24 jam','ganti nama menjadi "gue anak lucinta luna" selama 5 jam','chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you','prank chat mantan dan bilang " i love u, pgn balikan','record voice baca surah al-kautsar','bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini','sebutkan tipe pacar mu!','snap/post foto pacar/crush','teriak gajelas lalu kirim pake vn kesini','pap mukamu lalu kirim ke salah satu temanmu','kirim fotomu dengan caption, aku anak pungut','teriak pake kata kasar sambil vn trus kirim kesini','teriak " anjimm gabutt anjimmm " di depan rumah mu','ganti nama jadi " BOWO " selama 24 jam','Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
					const der = dare[Math.floor(Math.random() * dare.length)]
					tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					client.sendMessage(from, tod, image, { quoted: mek, caption: '*Dare*\n\n'+ der })
					await limitAdd(sender)
					break				
				case 'ocr': 
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(ind.wait())
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
						