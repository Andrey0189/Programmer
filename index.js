const Discord = require("discord.js"); //Подключение библиотеки discord.js
const bot = new Discord.Client(); //Подключение клиента
/** @namespace process.env.BOT_TOKEN */ //Токен
let p = '.' //Префикс
let bot_name = 'Macintosh';
let version = 'v1.0.0';
let dateOfupdate = '30.07.2018'
let update = bot_name + ' ' + version + ' ' + dateOfupdate + '\n\n1. Релиз бота';
let footer = bot_name + ' | ' + version + ' | Все права защищены'
module.exports = {
    0: '0⃣', 1: '1⃣',
    2: '2⃣', 3: '3⃣', 4: '4⃣', 5: '5⃣',
    6: '6⃣', 7: '7⃣', 8: '8⃣', 9: '9⃣',
    10: '🔟',
};
//Функции
function randomInteger(min, max) { //Функция для генерации случайного числа от минимального до максимального
    return Math.floor(Math.random() * (max - min)) + min;
}
async function multipleReact(message, arr) { //Функция для добаления нескольких реакций под сообщение
    if (arr !== []) {
        await message.react(arr.shift()).catch(console.error).then(function () {multipleReact(message,arr).catch();});
    }
}
function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
bot.on('ready', () => { //Событие запуска бота
    bot.user.setActivity(p + 'help | servers ' + bot.guilds.size,{ type: 'PLAYING' }); //То во что бот будет играть
    console.log('Успешный запуск\nКраткая информация:\nГильдий: ' + bot.guilds.size); //Краткая информация выходящая в консоли после запуска
});
bot.on('guildCreate', (guild) => { //Событие когда бот приходит на сервер
    let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(bot.user.id)).has('SEND_MESSAGES')); //Проверка на то есть ли каналы на сервере в которые можно отправить сообщение 
    if (channels.size > 0) channels.first().send('Приветствую вас **' + guild.name + '** . Спасибо за то что пригласили меня на свой сервер. Приятного использования! (' + p + 'help'); // Отправка сообщения после приглашения
});
bot.on('message', (message) => { //Событие "Отправка сообщения"
    function error (reason) {
        return message.reply('Ошибка. Причина: **' + reason + '**');
    }
    function actMSg (actType, actioner, time, reason) {
        let act = ''
        let desc = ''
        if (actType === 'mute') {act = 'замучены'; desc = '**Время: **' + time + '**\n';}
        if (actType === 'warn') {act = 'предупреждены';} 
        if (actType === 'ban') {act = 'забанены';}
        if (actType === 'kick') {act = 'выгнаны';}
        if (actType === 'unmute') {act = 'размучены'}
        if (reason === 'autoUnmt') {actioner = bot_name; reason = 'Автоматический размут'}
        const embed = new Discord.RichEmbed()
            .setTitle("Вы были **" + act + '** на **' + message.guild.name + '**')
            .setColor("0097f6")
            .setDescription('Пользователем: **' + actioner + '**\n' + desc + + 'Причина: **' + reason + '**\nНе ведите себя плохо!')
            .setFooter(footer)
            .setTimestamp();
        return embed;
    }
    if (message.channel.type !== 'text') return;
    if (message.author.bot) return;
    if(message.content.indexOf(p) !== 0) return;
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const poll = message.content.slice(p.length).trim().split(/;+/g);
    const command = args.shift().toLowerCase();
    if (['437290658458501143', '457541720494571533'].includes(message.guild.id)) {
    let arr = [];
    message.guild.fetchInvites().then(invites => {
        invites.forEach(invite => {
            arr.push(invite.code); 
    })
    let matches = message.content.match(/https:\/\/discord(app\.com|\.gg|\.me|\.io)\/?(invite\/)?([_a-zA-Z0-9]{5,32})/gi);
    if (matches) 
        matches.forEach((match) => {
            if (!arr.includes(match.match(/https:\/\/discord(app\.com|\.gg|\.me|\.io)\/?(invite\/)?([_a-zA-Z0-9]{5,32})/i)[3])) {
                message.delete();
                message.channel.send(message.author + ' был предупрежден. Причина: Реклама');
            }
        })
    });
    if ('guilds'.includes(command)) message.channel.send('Я присутствую на **' + bot.guilds.size + '** серверах');
    if (['unmute', 'гтьгеу'].includes(command)) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
        let user = message.mentions.members.first(); 
        if (!user) return error('Вы забыли упомянуть пользователя или хотите размутить того, кто не является пользователем');
            let reason = args.join(" ").replace(user, '');
                user.removeRole(muted);
                message.channel.send(user + ' был размучен');
                if (!reason || reason === ' ') reason = ' Не указана';
                user.send(actMSg('unmute', message.author, 0, reason));
        }
        else return error('У вас должно быть право `Администратор` для использования этой команды');
    }
    if (['ьгеу', 'mute', 'мут'].includes(command) && message.member.roles.some(r=>[moder, owner].includes(r.id))) {
        let user = message.mentions.members.first(); 
        if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!user) return message.channel.send(message.author + ', Ошибка. Причина: **Вы забыли упомянуть пользователя или вы хотите замутить того, кто не является пользователем**');
        if (user.id == message.author.id) return message.channel.send('Зачем ты пытаешься замутить самого себя?');
        function getSeconds(str) {
            let seconds = 0;
            let years = str.match(/(\d+)\s*y/);
            let months = str.match(/(\d+)\s*M/);
            let weeks = str.match(/(\d+)\s*w/);
            let days = str.match(/(\d+)\s*d/);
            let hours = str.match(/(\d+)\s*h/);
            let minutes = str.match(/(\d+)\s*m/);
            let secs = str.match(/(\d+)\s*s/);
            if (years) { seconds += parseInt(years[1])*31556926; }
            if (months) { seconds += parseInt(months[1])*2592000; }
            if (weeks) { seconds += parseInt(weeks[1])*604800; }
            if (days) { seconds += parseInt(days[1])*86400; }
            if (hours) { seconds += parseInt(hours[1])*3600; }
            if (minutes) { seconds += parseInt(minutes[1])*60; }
            if (secs) { seconds += parseInt(secs[1]); }
            return seconds;
        }
        user.addRole(muted);
        message.channel.send(user + ' был успешно замучен');
        let reason = args.join(" ").replace(user, '');
        reason = reason.replace(args[1], '');
        reason = reason.replace(' ', '');
        if (!reason) reason = ' Не указана'
        user.send(actMSg('mute', message.author, args[1], reason));
        if (args[1] && getSeconds(args[1]) !== 0 )
        setBigTimeout(() => {
            if (message.member.roles.some(r=> [muted].includes(r.id))) {
            const embedAutoUnmute = new Discord.RichEmbed()
            .setTitle("Информация о муте")
            .setColor("af00ff")
            .setDescription('Вы были автоматически **размучены**.\n\nПричина: **Автоматический размут.**')
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
            user.send({embed: embedAutoUnmute});
            user.removeRole(muted);
            message.author.send(user + ' был размучен');
            } else return
            }, getSeconds(args[1])*1000);
            } else return error('Вы должны иметь право `Администратор` для использования этой команды');
        }
    }
    if(['update'].includes(command)) {
        message.delete();
        const embed = new Discord.RichEmbed()
            .setTitle("Обновления")
            .setColor("0097f6")
            .setDescription(update)
            .setFooter(footer)
            .setTimestamp();
        message.channel.send({embed});
    }
    if (['8ball', 'ball', '8'].includes(command)) {
        let answers = ['Без сомнения', 'Да, конечно', 'Да', 'В принципе да', '¯\\_(ツ)_/¯', 'Абсолютно нет!', 'Никак нет', 'Нет', 'Неа', 'Сомневаюсь', 'Спроси позднее, я не знаю']
        let numOfAnswer = randomInteger(0, answers.length);
        if (!args[0]) return error('Не указан аргумент')
        message.reply(answers[numOfAnswer]);
    }
    if (['ship', 'love', 'шип'].includes(command)) {
        if (!args[0]) args[0] = message.guild.members.random();
        if (!args[1]) args[1] = message.author
        let loveText
        let shkala
        let percents = randomInteger(0, 100)
        if (percents <= 99) {loveText = 'Невероятно!!! :heart_eyes:'; shkala = '■■■■■■■■■□'; }
        if (percents <= 89) {loveText = 'Превосходно! :heartpulse:'; shkala = '■■■■■■■■□□';}
        if (percents <= 79) {loveText = 'Ууу ( ͡° ͜ʖ ͡°)'; shkala = '■■■■■■■□□□';}
        if (percents <= 69) {loveText = 'Дружески :+1:'; shkala = '■■■■■■□□□□';}
        if (percents <= 59) {loveText = 'Неплохо :confused:'; shkala = '■■■■■□□□□□';}
        if (percents <= 49) {loveText = 'Средне :thinking:'; shkala = '■■■■□□□□□□';}
        if (percents <= 49) {loveText = 'Плохо :frowning2:'; shkala = '■■■□□□□□□□';}
        if (percents <= 29) {loveText = 'Очень плохо :disappointed_relieved:'; shkala = '■■□□□□□□□□';}
        if (percents <= 19) {loveText = 'Ужасно :sob:'; shkala = '■□□□□□□□□□';}
        if (percents <= 9) {loveText = 'Хуже некуда :poop:'; shkala = '□□□□□□□□□□';}
        if (percents >= 100) {loveText = 'ИДЕАЛЬНО!!! :heart_exclamation:'; shkala = '■■■■■■■■■■'; percents = 100;}
        const embed = new Discord.RichEmbed()
            .setTitle(":heart:МАТЧМЕЙКИНГ:heart:")
            .setColor("ff00b0")
            .setDescription('▼***' + args[0] + '***\n▲***' + args[1] + '***\n\n:revolving_hearts:Любовь в проценатах: **' + percents + '%** `[' + shkala + ']`' + '\n\nВердикт: **' + loveText + '**')
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
        message.channel.send({embed});
    }
    if (['скажи', 'say', 's'].includes(command)) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            const sayMessage = args.join(" ");
            message.delete().catch(O_o=>{});
            let msg = message.channel.send(sayMessage).catch(()=>{message.reply('Ошибка. **Причина: не указан текст сообщения**');
        });
        } else return error('У вас должно быть право `Управление сообщениями` для использования этой команды')
    }
    if(['poll', 'vote'].includes(command)) {
        let question = args.join(' ').match(/(.*?);/g)[0].slice(0, -1);      
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
        if (poll[6]) return replMsg('Ошибка. Причина: **Голосование нельзя делать более чем с 5-ти вариантами**')
        let msg = message.channel.send(':bar_chart: **' + question + '**').catch(()=>{message.reply('Ошибка. **Причина: не указан текст сообщения**')});
            let variants = ''
            for (let i = 1;i < poll.length;i++) {
                let emoji
                if (i === 1) emoji = module.exports[i]
                if (i === 2) emoji = module.exports[i]
                if (i === 3) emoji = module.exports[i]
                if (i === 4) emoji = module.exports[i]
                if (i === 5) emoji = module.exports[i]
                variants += emoji + ' — ' + poll[i] + '\n'
            }
            const embed = new Discord.RichEmbed()
            .setDescription(variants)
            .setColor("0097f6")
            .setFooter(footer)
            .setTimestamp();
            message.channel.send({embed}).then(msg => {
                for (let i = 1;i < poll.length;i++) {
                    let emoji
                    if (i === 1) emoji = module.exports[i]
                    if (i === 2) emoji = module.exports[i]
                    if (i === 3) emoji = module.exports[i]
                    if (i === 4) emoji = module.exports[i]
                    if (i === 5) emoji = module.exports[i]
                    setTimeout(() => {msg.react(emoji);}, 1000);
                }
            });
        } else return error('У вас должно быть право `Управление сообщениями` для использования этой команды');
    }
    if ('idea'.includes(command)) {
        let idea = args.join(" ");
        message.guild.owner.send('Пользователь ' + message.author + ' отправил вам идею: ' + idea);
        message.channel.send('Идея была успешно отправлена :white_check_mark:');
    }
    if ('bug'.includes(command)) {
        let bug = args.join(" ");
        message.guild.owner.send('Пользователь ' + message.author + ' отправил вам баг: **' + bug + '**');
        message.channel.send('Баг был успешно отправлен :white_check_mark:');
    }
    if (['clear', 'delete', 'del', 'clr', 'сдк', 'вуд', 'сдуфк', 'вудуеу'].includes(command)) {
        async function clear () {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                if (isNaN(args[0]) || args[0] < 2) return error('Аргумент должен являться числом, но не может яляться нулем или единицей');
                else if (args[0] >= 100) args[0] = 99
                args[0] = args[0]++;
                const fetched = await message.channel.fetchMessages({limit: args[0] + 1});
                message.channel.bulkDelete(fetched);
                let messagesForm = declOfNum(args[0], ['сообщение', 'сообщения', 'сообщений']);
                message.channel.send("Было успешно удалено **" + args[0] + "** " + messagesForm).then (() => {message.delete();}, 5000)
            } else return error('У вас должно быть право `Управление сообщениями` для использования этой команды');
        }
        clear();
    }
    if (['warn', 'варн', 'цфкт'].includes(command)) {
        let user = message.mentions.members.first(); 
        if (!user) return error('Вы забыли упомянуть пользователя')
        if (user.id == message.author.id) return message.channel.send('Зачем ты пытаешься сделать предупреждение самому себе? :joy:');
        if (message.member.hasPermission("ADMINISTRATOR")) {
        let reason = args.join(" ").replace(user, '');
        if (!reason || reason === ' ') return error('Warn должен иметь причину')
        user.send(actMSg('warn', message.author, 0, reason));
        } else return error('У вас должно быть право `Администратор` для использования этой команды');        
    }
    if ('mute'.includes(command)) {
        message.channel.send('Эта команда в разработке, она доступна только для сервера [IT]');
    }
    if (['kick', 'кик', 'лшсл'].includes(command)) {            
        if (message.member.hasPermission("ADMINISTRATOR")) {
            let user = message.mentions.members.first(); 
            if (!user) return error('Вы забыли упомянуть пользователя или вы хотите кикнуть того, кто не является пользователем')
            if (user === message.author) return message.reply('**КИКАТЬ САМОГО СЕБЯ ЭТО ТУПО!**');
            if(user.hasPermission("ADMINISTRATOR")) return message.reply('Ошибка. Причина: **Вы не можете кикнуть этого пользователя, т. к. у него есть право `Администратор`**');
            let reason = args.join(" ").replace(user, '');
            if (!reason || reason === ' ') return message.reply('Ошибка. Причина: **Кикать без причины нельзя**')
            reason = reason.replace(args[1], '');
            reason = reason.replace(' ', '');
            user.send(actMSg('ban', message.author, 0, reason))
            message.channel.send(user + 'Был успешно кикнут. Жалко пацана');
            message.guild.member(user).kick(reason);
        } else return error('У вас должно быть право `Администратор` для использоания этой команды')
    }
    if (['ban', 'бан', 'ифт'].includes(command)) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            let user = message.mentions.members.first(); 
            if (!user) return error('Вы забыли упомянуть пользователя или вы хотите забанить того, кто не является пользователем')
            if (user === message.author) return message.reply('**БАНИТЬ САМОГО СЕБЯ ЭТО ТУПО!**');
            if(user.hasPermission("ADMINISTRATOR")) return message.reply('Ошибка. Причина: **Вы не можете забанить этого пользователя, т. к. у него есть право `Администратор`**');
            let reason = args.join(" ").replace(user, '');
            if (!reason || reason === ' ') return message.reply('Ошибка. Причина: **Банить без причины нельзя**')
            reason = reason.replace(args[1], '');
            reason = reason.replace(' ', '');
            user.send(actMSg('ban', message.author, 0, reason))
            message.channel.send(user + 'Был успешно забанен. Жалко пацана');
            message.guild.member(user).ban(reason);
        } else return error('У вас должно быть право `Администратор` для использоания этой команды')
    }
    if(['send'].includes(command)) {
        let user = message.mentions.members.first();
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            if (!user) {
                message.delete
                message.reply('Ошибка. Причина: **Не указан получатель сообщения**');
                return
            }
            const sendMessage = args.join(" ");
            let msg = user.send(sendMessage.replace(user, '')).catch(()=>{message.reply('Ошибка. Причина: **Не указано сообщение**');
            })
            message.delete().catch(O_o=>{});
        } else {
            message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду send, вы должны иметь право `Управлять сообщениями`**');
        }
    }

    if(['sms'].includes(command)) {
        let user = message.mentions.members.first();
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            if (!user) {
                message.delete
                message.reply('Ошибка. Причина: **Не указан получатель сообщения**');
                return
            }
            const sendMessage = args.join(" ");
            let msg = user.send('**Вам пришло сообщение от ' + message.author + '. Он сказал:**' + sendMessage.replace(user, '')).catch(()=>{message.reply('Ошибка. Причина: **Не указано сообщение**');
            })
            message.delete().catch(O_o=>{});
        } else {
            message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду send, вы должны иметь право `Управлять сообщениями`**');
        }
    }
    if (['скажи', 'say', 's'].includes(command)) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{});
        let msg = message.channel.send(sayMessage).catch(()=>{message.reply('Ошибка. **Причина: не указан текст сообщения**');
        });
        } else return message.channel.send(message.author + ', Ошибка. Причина: **Вы не можете использовать команду say, вы должны иметь право `Управлять сообщениями`**');
    }
    if(['av', 'avatar', 'ав', 'аватар', 'ava', 'a', 'ава', 'а'].includes(command)) {
        let user = message.mentions.members.first();
        if (!user) user = message.member;
        let av = new Discord.RichEmbed()
            .setImage(user.user.avatarURL)
            .setDescription("**Аватар пользователя **" + user + "\n" + "Представлено по запросу " + message.author)
            .setColor("af00ff")
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
    if (['random', 'r'].includes(command)) {
        message.channel.send({embed: av});
        message.delete();
    }
    
        if (!args[0]) message.reply('Ошибка. Причина: **Вы забыли указать первый аргумент**'); return;

        if (!args[1]) args[1] = 1;

        let rand = randomInteger(args[0], args[1]);
        const embed = new Discord.RichEmbed()
            .setTitle("Информация")
            .setColor("af00ff")
            .setDescription('Вам выпало число ' + rand)
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
        message.channel.send({embed});
    }
        if(['sms'].includes(command)) {
            let user = message.mentions.members.first();
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                if (!user) return error('Не указан получатель сообщения');
                const sendMessage = args.join(" ");
                let msg = user.send(sendMessage.replace(user, '')).catch(()=>{message.reply('Ошибка. Причина: **Не указано сообщение**')});
                message.delete().catch(O_o=>{});
            } else return error('У вас должно быть право `Управление сообщениями` для использования этой команды');
        }
        if(['sms'].includes(command)) {
            let user = message.mentions.members.first();
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                if (!user) return error('Не указан получатель сообщения');
                const sendMessage = args.join(" ");
                let msg = user.send('**Вам пришло сообщение от ' + message.author + '. Он сказал:**' + sendMessage.replace(user, '')).catch(()=>{message.reply('Ошибка. Причина: **Не указано сообщение**')});
                message.delete().catch(O_o=>{});
            } else return error('У вас должно быть право `Управление сообщениями` для использования этой команды');
        }
        if (['скажи', 'say', 's'].includes(command)) {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
            const sayMessage = args.join(" ");
            message.delete().catch(O_o=>{});
            let msg = message.channel.send(sayMessage).catch(()=>{message.reply('Ошибка. **Причина: не указан текст сообщения**');
            });
            } else return error('У вас должно быть право `Управление сообщениями` для использования этой команды')
        }
        if(['av', 'avatar', 'ав', 'аватар', 'ava', 'a', 'ава', 'а'].includes(command)) {
            let user = message.mentions.members.first();
            if (!user) user = message.member;
            let av = new Discord.RichEmbed()
                .setImage(user.user.avatarURL)
                .setDescription("**Аватар пользователя **" + user + "\n" + "Представлено по запросу " + message.author)
                .setColor("af00ff")
                .setFooter(bot_name + " | " + version + " | Все права защищены")
                .setTimestamp();
                message.channel.send({embed: av});
                message.delete();
            }
        if (['random', 'r'].includes(command)) {
            if (!args[0]) message.reply('Ошибка. Причина: **Вы забыли указать первый аргумент**'); return;
            if (!args[1]) args[1] = 1;
            let rand = randomInteger(args[0], args[1]);
            const embed = new Discord.RichEmbed()
                .setTitle("Информация")
                .setColor("af00ff")
                .setDescription('Вам выпало число ' + rand)
                .setFooter(bot_name + " | " + version + " | Все права защищены")
                .setTimestamp();
            message.channel.send({embed});
        }
        
/*
bot.on('message', (message) => {

    if(message.content.indexOf(p) !== 0) return;

    let arr = [];
    message.guild.fetchInvites().then(invites => {
        invites.forEach(invite => {
            arr.push(invite.code); 
        })
    let matches = message.content.match(/https:\/\/discord(app\.com|\.gg|\.me|\.io)\/?(invite\/)?([_a-zA-Z0-9]{5,32})/gi);
    if (matches) 
        matches.forEach((match) => {
            if (!arr.includes(match.match(/https:\/\/discord(app\.com|\.gg|\.me|\.io)\/?(invite\/)?([_a-zA-Z0-9]{5,32})/i)[3])) {
                message.delete();
                message.channel.send(message.author + ', пиарит сервер. Дайте ему мут на 24 ч.');
            }
        })
    });

    if (message.channel.type !== 'text') return;
    if (message.author.bot) return;
	if(message.content.indexOf(p) !== 0) return;
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const vote = message.content.slice(p.length).trim().split(/\|+/g);
    const command = args.shift().toLowerCase();
    
    function setBigTimeout(func, timeout) {
        if (timeout > 0x7FFFFFFF)
            setTimeout(function() {setBigTimeout(func, timeout-0x7FFFFFFF);}, 0x7FFFFFFF);
        else
            setTimeout(func, timeout);
    }

    function sendMsg (msg) {
        message.channel.send(msg);
    }
    
    if (['say', 's'].includes(command)) {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{});
        let msg = message.channel.send(sayMessage).catch(()=>{message.reply(' не пиши просто =say. Надо писать =say \'Текст\'');
        });
}

if (['help'].includes(command)) {
    let embed = new Discord.RichEmbed()
            .setTitle('Помощь')
            .setDescription(p + "say - Сказать фразу\n" + p + "rsp камень | ноницы | бумага - Игра в \"Камень, ножницы, бумага\" с ботом\n ")
            .setColor("0097f6")
            .setFooter("Apple corp")
            .setTimestamp();
    sendMsg('Добро пожаловать в Mac OS! Я бот по имени Macintosh, видимо, ты использовал команду  ' + p + 'help для того чтобы узнать мои команды. Вот они');
    sendMsg({embed});
}

    if(['av', 'avatar', 'ав', 'аватар', 'ava', 'a', 'ава', 'а'].includes(command)) {
        let user = message.mentions.members.first();
        if (!user) user = message.member;
        let av = new Discord.RichEmbed()
            .setImage(user.user.avatarURL)
            .setDescription("**Аватар пользователя **" + user + "\n" + "Представлено по запросу " + message.author)
            .setColor("0097f6")
            .setFooter("Apple corp")
            .setTimestamp();
        message.channel.send({embed: av}); 
        message.delete();
}

if (['random', 'r'].includes(command)) {
 
    if (!args[0]) args[0] = 0;
    
    if (!args[1]) args[1] = 10;

    let rand = randomInteger(parseInt(args[0]), parseInt(args[1]));
    const embed = new Discord.RichEmbed()
        .setTitle("Генератор случайных чисел")
        .setColor("0097f6")
        .setDescription('Вам выпало число ' + rand)
        .setFooter("Apple corp")
        .setTimestamp();
    message.channel.send({embed});
}

 if (['rsp', 'кнб', 'кыз'].includes(command)) {
        let userChoice;
                if (['камень', 'rock', 'r', 'к'].includes(args[0].toLowerCase())) {
                    userChoice = 'камень';
                }
                else if (['бумагу', 'бумага', 'paper', 'p', 'б'].includes(args[0].toLowerCase())) {
                    userChoice = 'бумагу';
                }
                else if (['scissors', 'ножницы', 's', 'н'].includes(args[0].toLowerCase())) {
                    userChoice = 'ножницы';
                }
                else if (!args[0]) {
                    sendMsg('Вы забыли указать что вы выбираете, камень, ножницы или бумагу');
                    return;
                }
                else {
                    userChoice = 'Incorrect';
                }
                let computerChoice = Math.random();
                if (computerChoice < 0.34) {
                    computerChoice = "камень";
                } else if(computerChoice <= 0.67) {
                    computerChoice = "бумагу";
                } else {
                    computerChoice = "ножницы";
                } message.channel.send("Я выбрал " + computerChoice);
                function rspCW(userChoice, computerChoice) {
                    if (userChoice === computerChoice) {
                        return "ничья!";
                    }
                    else if(userChoice === "камень") {
                        if(computerChoice === "ножницы") {
                            return "ты выиграл!";
                        }
                        else if (computerChoice === "бумагу") {
                            return "ты проиграл";
                        }
                    }
                    else if(userChoice === "бумагу") {
                        if(computerChoice === "камень") {
                            return "ты выиграл!";
                        } else if (computerChoice === "ножницы") {
                            return "ты проиграл";
                        }
                    }
                    else if(userChoice === "ножницы") {
                        if(computerChoice === "бумагу") {
                            return "ты выиграл!";
                        } else if (computerChoice === "камень") {
                            return "ты проиграл.";
                        }
                    }
                    else if (userChoice === 'Incorrect') {
                        return "ты не выбрал ни камень, ни ножницы, ни бумагу";
                    }
                }
                if (userChoice === 'Incorrect') {
                    message.channel.send(message.author + ", " + rspCW(userChoice, computerChoice))
                }
                else {
                message.channel.send(message.author + ", " + rspCW(userChoice, computerChoice) + ' Ты выбрал\(а\) ' + userChoice + ' Я выбрал ' + computerChoice);
             }};

         if (['poll', 'vote'].includes(command)) {
            let question
            if (!vote[0]) {
                message.channel.send('Вы забыли указать вопрос');
                return
            } else {
                question = vote[0].replace('poll ', '')
            }
     
            if (!vote[1]) {
                message.channel.send('Вы забыли указать за что голосовать');
                return
            } else {
                message.delete();
                    message.channel.send(':bar_chart:**' + question + '**');
                
                    if (!vote[2]) {
                    message.channel.send(one + ' - ' + vote[1]).then((msg) => {
                    multipleReact(msg, [bot.emojis.get('451337518915387402'), ])});
                        
                } else if (!vote[3]) {
                    message.channel.send(one + ' - ' + vote[1] + '\n' + two + ' - ' + vote[2]).then((msg) => {
                    multipleReact(msg, [bot.emojis.get('451337518915387402'), bot.emojis.get('451337620589379586'),])});
                    return;
                } else if (!vote[4]) {
                    message.channel.send(one + ' - ' + vote[1] + '\n' + two + ' - ' + vote[2] + '\n' + three + ' - ' + vote[3]).then((msg) => {
                    multipleReact(msg, [bot.emojis.get('451337518915387402'), bot.emojis.get('451337620589379586'), bot.emojis.get('451337648296951813') ])});
                    return;
                } else if (!vote[5]) {
                    message.channel.send(one + ' - ' + vote[1] + '\n' + two + ' - ' + vote[2] + '\n' + three + ' - ' + vote[3] + '\n' + four + ' - ' + vote[4]).then((msg) => {
                    multipleReact(msg, [bot.emojis.get('451337518915387402'), bot.emojis.get('451337620589379586'), bot.emojis.get('451337648296951813'), bot.emojis.get('451337671818739713')])});
                }
                else if (!vote[6]) {
                    message.channel.send(one + ' - ' + vote[1] + '\n' + two + ' - ' + vote[2] + '\n' + three + ' - ' + vote[3] + '\n' + four + ' - ' + vote[4] + '\n' + five + ' - ' + vote[5]).then((msg) => {
                        multipleReact(msg, [bot.emojis.get('451337518915387402'), bot.emojis.get('451337620589379586'), bot.emojis.get('451337648296951813'), bot.emojis.get('451337671818739713'), bot.emojis.get('451337693973053452')])});
                }
                else if (vote[6]) {
                    message.channel.send('Вы превысили максимальный лимит выборов для голосования');
                }
            }
        }
})
} else {
    return
}
/*
const Discord = require('discord.js');
const robot = new Discord.Client();

robot.login("NDUyODEzMjMxNzgyNjI1Mjgx.DfVy4w.U6MyW4EW9GlTEjT6Dzm_On1MIf4")

let p = '='
robot.on('message',(message)=> {

if (message.channel.type !== 'text') return;
if (message.author.bot) return;
if(message.content.indexOf(p) !== 0) return;
const args = message.content.slice(p.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

function sendMsg (msg) {
message.channel.send(msg);
}

if(["любишь торты?"].includes(command)) {
sendMsg("Да,я люблю торты!");
}
if(["привет"].includes(command)) {
sendMsg("Здравствуй");
}
if(["как дела?"].includes(command)) {
sendMsg("Отлично)");
}
if (['ты тут?'].includes(command)) {
    sendMsg('Конечно)е');
}
if (['че пацаны, мани?'].includes(command)) {
    sendMsg('MONEYYY')
}
});*/
})
bot.login(process.env.BOT_TOKEN);
