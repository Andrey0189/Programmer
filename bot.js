//Подключение всех библиотек
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const economy = require('discord-eco');
const forEachTimeout = require('foreach-timeout');
//Секретный токен
/** @namespace process.env.BOT_TOKEN */
//Префикс
let prefix = '=';
//Валюта
let currency = '₽';
//ID Ролей
let moder = `467284420303257621`
let people = '467301169610489866'
let owner = '437291380625113108'
let plus = '468089974320005121'
let premium = '468090066145771521'
let watcher = '468090164523040768'
let epic = '468090270739595266'
let muted = '469135765427847178'
//Другие переменные
const bot_name = 'Айтишник';
let version = 'v1.3.0'
let update = 'Вышла новая ГЛОБАЛЬНАЯ версия ' + version + '. Обновления:\n\n1. Добавлена система экономики =shop =money и др. команды.\n\n2. Доработана команда =help.\n\n3. В будущем планируется добавить музыкальные команды.'
let rules = '1. Оскорбления других людей (Мут на 1 час). НО в случае уместного оскорбления, а не беспричинного человек не будет наказан. Также, вы не будете наказаны назвав кого то "Нуб" или подобными словами.\n\n2. Убийсто соклановца (Варн). НО если убийце получится доказать то что он сдделал это случайно, то он останется безнаказанным. в противном случае убийца получит варн. При наборе трех варнов он получает пожизненный бан.\n\n3. Рассылка порнографического контента без цензуры (Мут на 1 час). НО если на контенте присутствует цензура, то вы останетесь безнаказанным. При слишком частой рассылке с цензурой вы все также будете наказаны мутом на 1 час.\n\n4. Рассылка вредноносного ПО, т. е. вирусов, троянов и т. п. (Мут на 1 час). НО если ПО способно любыми способами удалить данные с жесткого диска (Шифрование, Блокирование, Полное удаление), то вы получите пожизненный бан.\n\n5. Реклама чего либо без разрешения администрации, или в непредназначенных для этого каналах. Для приглашений на другие сервера существует канал #invites. А для пиара других проектов зайдите в #photoshop-projects или #code-projects. Если администрация согласиться рекламировть ваш проект (Не сервер), то у вас появится право писать о его обновлених в #updates.\n\n6. Флуд или спам (Мут на 1 час). Для нашего сервера флуд - это сообщение(ия) в большинстве случаев занимающие большие объемы и не несущие никакого смысла, или содержащее очень малое количесво полезной информации. Спам - это большое количество повторяющихся символов, слов или фраз.\n\n7. Попрошайничество роли (Мут на 1 час). Попрошайничество роли - это когда человек пишет подобное сообщение: "Дайте мне роль ___". А например "Когда голосование за модератора?" в это не входит.'
let rulesMore = '8. Написание большого количество /tts сообщений или одного большого бессмысленного сообщения. (Мут на 1 час). Если вы к многим своим сообщениям будете добавлять /tts, даже не смотря на то что они будут вполне адекватными вы все также получите наказание.\n\n9. Использовать @everyonе или @hеre более одного раза в день (Без наказания, это правило просто желательно выполнять)'
let footer = bot_name + " | " + version + " | Все права защищены"
//Функции
//Функция для генерации случайного числа от min до max
function randomInteger(min, max) {
    max++
    return Math.floor(Math.random() * (max - min)) + min;
}
//Функция для замены окончания слова в заисимости от числительного
function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
//Функции для перемены игр
function game1() {
    client.user.setActivity('на ' + prefix + 'help для справки',{ type: 'WATCHING' })
    setTimeout(game2, 16000);
}
function game2() {
    client.user.setActivity('на ' + prefix + 'info для информации',{ type: 'WATCHING' })
    setTimeout(game1, 16000);
}
//Функция для добавления нескольких реакций под сообщение
async function multipleReact(message, arr) {
    if (arr !== []) {
        await message.react(arr.shift()).catch(console.error).then(function () {multipleReact(message,arr).catch();});
    }
}
//Функция для устнаовки большого таймаута
function setBigTimeout(func, timeout) {
    if (timeout > 0x7FFFFFFF)
        setTimeout(function() {setBigTimeout(func, timeout-0x7FFFFFFF);}, 0x7FFFFFFF);
    else
        setTimeout(func, timeout);
}
client.on('guildMemberAdd', (member) => {
    member.addRole(people);
    const embed = new Discord.RichEmbed()
        .setTitle('Дороу')
        .setDescription('**Приветствую тебя ' + member + ', я - бот этого сервера. У меня есть магазин, экономика, миниигры, большое количесто команд. А на нашем сервере ты сможешь найти хороших друзей, редкие пинги, возможность поделиться своим творчеством, и посмотреть как его оценят другие люди. В скором времени у нас выйдет много обновлений. С уважением ' + bot_name + ' ' + version)
        .setColor('af00ff')
        .setFooter(footer)
        .setTimestamp();
        member.send({embed})
    const embed2 = new Discord.RichEmbed()
        .setTitle('Пополнение!')
        .setColor('af00ff')
        .setDescription('На сервер пришел ' + member + '\n\nТеперь нас **' + member.guild.memberCount + '**')
        .setFooter(footer)
        .setTimestamp()
        client.fetchUser('242975403512168449').then (user => user.send({embed: embed2}));
        client.channels.get('467307902252613652').send(member + ' Прилетел на сервер. Нас стало **' + member.guild.memberCount + '**');
});
//Событие ухода мембера с сервера
client.on('guildMemberRemove', (member) => {
    member.send('Прощай, ' + member + '. Мы будем скучать');
    const embed = new Discord.RichEmbed()
        .setTitle('Он ушел')
        .setColor('af00ff')
        .setDescription(member + ' ушел :(.\n\nТеперь нас **' + member.guild.memberCount + '**')
        .setFooter(footer)
        .setTimestamp()
        client.fetchUser('242975403512168449').then (user => user.send({embed}));
        client.channels.get('467307902252613652').send(member + 'Покинул нас. Остались **' + member.guild.memberCount + '** пользователей');
});
//То что должно произойти после запуска бота
client.on('ready', () => {
    //Запуск цикла перемены игр
    setTimeout(game1, 1000);
    console.log('Бот запущен успешно\n    Экономика работает...\n    Команды работают...\n    Количество гильдий на которых присутствует бот: ' + client.guilds.size);
});
//Кулдаун
let cooldown = new Set();
let cdseconds = 5
client.on('message', message => { //Событие message
    if(message.channel.type !== 'text') return;
    if(message.channel.id === '469504020323631115') return;
    if (message.author.bot) return;
    let arr = [];
    message.guild.fetchInvites().then(invites => {
    invites.forEach(invite => {
        arr.push(invite.code); 
    })
    let matches = message.content.match(/discord(app\.com|\.gg|\.me|\.io)\/?(invite\/)?([_a-zA-Z0-9]{5,32})/gi);
    if (matches)
    matches.forEach((match) => {
    if (!arr.includes(match.match(/discord(app\.com|\.gg|\.me|\.io)\/?(invite\/)?([_a-zA-Z0-9]{5,32})/i)[3])) {
        const embed = new Discord.RichEmbed()
            .setTitle("Информация о предупреждениях")
            .setColor("af00ff")
            .setDescription('Вы были **предупреждены**' + '.\n\nПричина:** Пиар.**\n\nНе ведите себя плохо!')
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
        message.author.send({embed});
        message.channel.send(message.author + ' был предупрежден. Причина: пиар.');
        message.delete();
    }
    })
    });
    if(message.content.indexOf(p) !== 0) return;
    const vote = message.content.slice(p.length).trim().split(/;+/g);
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    function sendMsg (msg) {
        message.channel.send(msg)
    }
    function replMsg (msg) {
        message.reply(msg)
    }
    if ('rainbow'.includes(command)) {
        message.channel.send('Готово :white_check_mark:');
        let colors = ["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#00BFFF", "#0000FF", "#ff00ff"];
        let role = message.guild.roles.find("name", "Rainbow");
        async function color (colors, role) {
            forEachTimeout(colors, (color) => {role.setColor(color)}, 1500).then(() => color(colors, role));
        }
        color(colors, role);
    }
    if (['8ball', 'ball', '8'].includes(command)) {
        let numOfAnswer = randomInteger(1, 11);
        if (!args[0]) {
            message.reply('Ошибка. Причина: **Не указан аргумент**\n\nПравильное использование:\n=8ball `<вопрос>`'); 
            return;
        }
        if (numOfAnswer === 1) message.reply('Без сомннения!');
        else if (numOfAnswer === 2) message.reply('Да, конечно');
        else if (numOfAnswer === 3) message.reply('Да');
        else if (numOfAnswer === 4) message.reply('В принципе да');
        else if (numOfAnswer === 5) message.reply('Возможно');
        else if (numOfAnswer === 6) message.reply('Абсолютно нет!');
        else if (numOfAnswer === 7) message.reply('Никак нет');
        else if (numOfAnswer === 8) message.reply('Нет');
        else if (numOfAnswer === 9) message.reply('Неа');
        else if (numOfAnswer === 10) message.reply('Cомневаюсь');
        else message.reply('Спроси позднее, я не знаю');
    }
    if (['ship', 'love', 'шип'].includes(command)) {
        if (!args[0]) args[0] = message.guild.members.random();
        if (!args[1]) args[1] = message.author
        if (args[0].length > 30 || args[1].length > 30) return message.reply('Ошибка. Причина: **Аргумент не может быть длиннее 30 символов');
        let loveText
        let shkala
        let percents = randomInteger(0, 100)
        let feels
        if (percents <= 99) {loveText = 'Невероятно!!! :heart_eyes:'; shkala = '■■■■■■■■■□'; feels = 'Любят';}
        if (percents <= 89) {loveText = 'Превосходно! :heartpulse:'; shkala = '■■■■■■■■□□'; feels = 'Любят';}
        if (percents <= 79) {loveText = 'Ууу ( ͡° ͜ʖ ͡°)'; shkala = '■■■■■■■□□□'; feels = 'Любят';}
        if (percents <= 69) {loveText = 'Дружески :+1:'; shkala = '■■■■■■□□□□'; feels = 'Дружеские';}
        if (percents <= 59) {loveText = 'Неплохо :confused:'; shkala = '■■■■■□□□□□'; feels = 'Дружеские';}
        if (percents <= 49) {loveText = 'Средне :thinking:'; shkala = '■■■■□□□□□□'; feels = 'Дружеские';}
        if (percents <= 49) {loveText = 'Плохо :frowning2:'; shkala = '■■■□□□□□□□'; feels = 'Ненавидят';}
        if (percents <= 29) {loveText = 'Очень плохо :disappointed_relieved:'; shkala = '■■□□□□□□□□'; feels = 'Ненавидят';}
        if (percents <= 19) {loveText = 'Ужасно :sob:'; shkala = '■□□□□□□□□□'; feels = 'Ненавидят';}
        if (percents <= 9) {loveText = 'Хуже некуда :poop:'; shkala = '□□□□□□□□□□'; feels = 'Ненавидят';}
        if (percents >= 100) {loveText = 'ИДЕАЛЬНО!!! :heart_exclamation:'; shkala = '■■■■■■■■■■'; percents = 100; feels = 'Без ума';}
        const embed = new Discord.RichEmbed()
            .setTitle(":heart:МАТЧМЕЙКИНГ:heart:")
            .setColor("ff00b0")
            .setDescription('▼***' + args[0] + '***\n▲***' + args[1] + '***\n\n:revolving_hearts:Любовь в проценатах: **' + percents + '%** `[' + shkala + ']`\n:revolving_hearts:Отношение друг к другу: ' + feels + '\n\nВердикт: **' + loveText + '**')
            .setFooter(bot_name + " | " + version + " | Все права защищены")
            .setTimestamp();
        message.channel.send({embed});
    }
    if(['poll', 'vote'].includes(command)) {
        let question = args.join(" ");
    }
});
client.login(
    process.env.BOT_TOKEN
    //''
);