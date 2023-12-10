const express = require('express');
const route = express.Router();
const moment = require('moment')

let helpStartLineInfo = [0, 1, 2, 3, 4, 5];

let bot_info = {
    bot1: { name: 'null', online: false },
    bot2: { name: 'null', online: false },
    bot3: { name: 'null', online: false },
}

let onlineBot = [];

/**@type {Array<Array>} 存储hs命令的数组*/
let helpStartCommLine = [];

route.get('/getInfo', function (request, response) {
    response.json({ 'bot': bot_info, 'line': helpStartLineInfo })
})

function middleware_helpStart_readPlayers(request, response, next) {

    // 先判断下能不能hs
    if (onlineBot.length === 0) {
        return response.send('There are not more bot can help start')
    }

    // 获取请求数据
    const body = request.body;

    // 获取请求的玩家数据
    const players = body.players;

    /**@type {Array<string>} 储存解析后的玩家数据*/
    let playerList = [];

    for (var index = 0; index < players.length; index++) {

        // 获取单独的玩家
        const player = players[index];

        // 如果这个玩家格式不对就跳过
        if (!player || !isRightPlayer(player)) {
            continue;
        }

        // 获取解析后的玩家数据
        const thePlayer = getPlayer(player);

        // 如果解析后还是原数据则直接存储并跳出循环
        if (player === thePlayer) {
            playerList.push(thePlayer);
            continue;
        }

        // 否则就把解析后的数据分别存储进playerList中
        for (var count = 0; count < thePlayer.length; count++) {
            const simplePlayer = thePlayer[count];
            if (!simplePlayer || !isRightPlayer(simplePlayer))
                playerList.push(simplePlayer);
        }
    }

    // 如果最终存储的玩家数量为0 则抛出响应
    if (playerList.length === 0) {
        return response.send('please input more player');
    }

    // 如果玩家数量太庞大 则仅取出前三的玩家
    if (playerList.length > 3) {
        playerList = playerList.slice(0, 3);
    }

    // 如果bot不够用 则抛出响应
    if (playerList.length === 2 && onlineBot.length == 1 || playerList.length === 1 && onlineBot.length < 3) {
        return response.send('There are not more bot can help start')
    }

    // 把解析后的数据存储到body的players中 给下一个中间件使用
    request.body.players = playerList;
    next();
}

// 使用解析玩家数据的中间件 解析的url为帮开的路由
route.use('/helpStart', middleware_helpStart_readPlayers);

function middleware_helpStart_readChest(request,response,next){
    const body = request.body;
    const chest = body.chest;

    // 如果箱子为空 则下一个中间件
    if(chest === null){
        return next();
    }
    const map = body.map;
    const chestDeadEndList = ['Office', 'Hotel', 'Apartments', 'Power Station', 'Gallery'];
    const chestBadBloodList = ['Mansion', 'Library', 'Dungeon', 'Balcony', 'Crypts'];

    // 如果地图为de 并且数据没有错误 则下一个中间件
    if(map === 0 && chestDeadEndList.includes(chest)){
        return next();
    }

    // 如果地图为bb 并且数据没有错误 则下一个中间件
    if(map === 1 && chestBadBloodList.includes(chest)){
        return next()
    }
    
    // 如果都没检测到正确的数据则chest的数据设为空
    request.body.chest = null;
    next();
}

// 使用解析箱子数据在中间件 解析的url为帮开的路由
route.use('/helpStart',middleware_helpStart_readChest);

// 请求发送帮开请求的api
route.post('/helpStart', function (request, response) {
    const body = request.body;

    const players = body.players;
    const firstPlayer = players[0];
    const message = `${players.length} by ${firstPlayer}`
    helpStartLineInfo.push(message)

    const map = body.map;
    const difficulty = body.difficulty;
    const chest = body.chest;

    // const comm = `${players}-${map}-${difficulty}-${chest}`;
    helpStartCommLine.push([players,map,difficulty,chest]);

    log('helpStart', [players, map, difficulty, chest])

    response.send(`please wait ${bot_info.bot1.name} invite ${players.length === 1 ? 'you' : 'your are  '}`)
})

// 请求获取需要帮开数据的api
route.get('/helpStartData', function (request, response) {
    response.send(helpStartCommLine)
})

// hs完成请求删除帮开数据的api
route.get('/deleteHelpStartData',function(request,response){
    helpStartCommLine.shift();
    response.send('OK')
})

module.exports = route;

/**
 * @function getPlayer 用于解析玩家的字符串
 * @param {string} players 玩家
 * @returns {string|Array<string>} 解析后的玩家
 */
function getPlayer(players) {
    if (/\s/.test(players)) {
        return players.split(' ');
    }
    return players
}

function getTime() {
    const time = moment().format('HH:mm:ss');
    return `[${time}]`
}

/**
 * @function isRightPlayer 用于判断这个玩家名称的格式是否正确
 * @param {string|Array<string>} player 玩家
 * @returns {boolean} 这个玩家名称的格式是否正确
 */
function isRightPlayer(player) {
    if (player instanceof Array) {
        return true;
    }
    const reg = /[0-9a-z_]/i;
    for (var i = 0; i < player.length; i++) {
        const char = player[i];
        if (!reg.test(char)) {
            return false
        }
    }
    return true;
}


function log(key, values) {
    if (key === 'helpStart') {
        const maps = ['Dead End', 'Bad Blood', 'Alien Arcadium'];
        const difficultys = ['Normal', 'Hard', 'Rip'];

        const players = values[0]
        const map = values[1];
        const difficulty = map === 2 ? difficultys[0] : difficultys[values[2]];
        const chest = values[3] ? `|${values[3]}` : '';

        const playerMessage = `${players} helpStart `;
        const gameMessage = `/${maps[map]}|${difficulty}${chest}/`;
        return console.log(`${getTime()} [HelpStart/INFO] ${playerMessage}${gameMessage}`);
    }
}