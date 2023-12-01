const express = require('express');
const route = express.Router();

let helpStartLine = [];

// 现在暂时没有bot
const bot_info = []

route.get('/getInfo', function (request, response) {
    response.send([bot_info, helpStartLine])
})

function middleware_readHelpStartData(request, response, next) {
    if (bot_info.length === 0) {
        return response.send('There are not more bot can help start')
    }
    const body = request.body;
    const players = body.players;
    let playerList = [];
    for (var i = 0; i < players.length; i++) {
        const player = players[i];
        if (!player || !isRightPlayer(player)) {
            continue;
        }
        const thePlayer = getPlayer(player);
        if (player === thePlayer) {
            playerList.push(thePlayer);
            continue;
        }
        for (var j = 0; j < thePlayer.length; j++) {
            const simplePlayer = thePlayer[j];
            if (!simplePlayer || !isRightPlayer(simplePlayer))
                playerList.push(simplePlayer);
        }
    }
    if (playerList.length === 0) {
        return response.send('please input more player');
    }
    if (playerList.length > 3) {
        playerList = playerList.slice(0, 3);
    }
    if (playerList.length === 2 && bot_info.length == 1 || playerList.length === 1 && bot_info.length < 3) {
        return response.send('There are not more bot can help start')
    }
    request.body.players = playerList;
    next();
}

route.use(middleware_readHelpStartData);

route.post('/helpStart', function (request, response) {
    const body = request.body;
    const players = body.players;
    const firstPlayer = players[0];
    const message = `${players.length} by ${firstPlayer}`
    helpStartLine.push(message)
    console.log(players);
    response.send(`please wait ${bot_info[0]} invite ${players.length === 1 ? 'you' : 'your are  '}`)
})

module.exports = route;

function getPlayer(players) {
    if (/\s/.test(players)) {
        return players.split(' ');
    }
    return players
}

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