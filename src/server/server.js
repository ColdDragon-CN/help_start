const path = require('path');
const express = require('express');
const cors = require('cors');
const moment = require('moment');
const { log } = require('console');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.use(express.static(path.join(__dirname, '../web')))

const route = require(path.join(__dirname, './route'))
server.use(route)

server.listen(301, function () {
    log(`${getTime()} [Server Core/INFO]服务器启动成功`);
})

/**
 * @function getTime 获取时间
 * @returns {string} 时间
 */
function getTime() {
    const time = moment().format('HH:mm:ss');
    return `[${time}]`
}