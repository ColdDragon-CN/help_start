const path = require('path');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const moment = require('moment');
const { log } = require('console');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(express.static(path.join(__dirname,'../web/src')))

server.listen(301,function(){
    log(`${getTime()}服务器启动成功`);
})

function getTime(){
    const time = moment().format('HH:mm:ss');
    return `[${time}]`
}