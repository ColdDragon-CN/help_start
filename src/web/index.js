function changeMap(string, index) {
    for (var i = 0; i < mapButtonList.length; i++) {
        const button = mapButtonList[i];
        if (i === index) {
            button.style.backgroundColor = '#00FFFF80';
            button.style.color = '#FFFFFF'
            continue;
        }
        button.style.backgroundColor = '#00FFFF00'
    }
    map = string;
}

function changeDifficulty(index) {
    for (var i = 0; i < difficultyButtonList.length; i++) {
        const button = difficultyButtonList[i];
        if (i === index) {
            button.style.backgroundColor = '#00FFFF80';
            button.style.color = '#FFFFFF'
            continue;
        }
        button.style.backgroundColor = '#00FFFF00'
    }
    theDifficulty = index;
}

function changeChestFD(string, index) {
    if (deChest.indexOf(de_chest) === index) {
        de_chest = null;
        const button = deChestButton[index];
        button.style.backgroundColor = '#00FFFF00';
        button.style.color = '#00FF00'
        return;
    }
    for (var i = 0; i < deChestButton.length; i++) {
        const button = deChestButton[i];
        if (i === index) {
            button.style.backgroundColor = '#00FFFF80';
            button.style.color = '#FFFFFF'
            continue;
        }
        button.style.backgroundColor = '#00FFFF00';
    }
    de_chest = string;
}

function changeChestFB(string, index) {
    if (bbChest.indexOf(bb_chest) === index) {
        bb_chest = null;
        const button = bbChestButton[index];
        button.style.backgroundColor = '#00FFFF00';
        button.style.color = '#00FF00'
        return;
    }
    for (var i = 0; i < bbChestButton.length; i++) {
        const button = bbChestButton[i];
        if (i === index) {
            button.style.backgroundColor = '#00FFFF80';
            button.style.color = '#FFFFFF'
            continue;
        }
        button.style.backgroundColor = '#00FFFF00';
    }
    bb_chest = string;
}

/**
 * @function chestMouseoverFD 在鼠标悬停坏血箱子选项时
 * @param {integer} index 索引
 * @returns {void}
 */
function chestMouseoverFD(index) {
    if (de_chest === deChest[index]) {
        return;
    }
    const button = deChestButton[index];
    button.style.color = '#00FF00'
}

/**
 * @function chestMouseoutFD 在鼠标离开潜艇箱子选项时
 * @param {integer} index 索引
 * @returns {void}
 */
function chestMouseoutFD(index) {
    if (de_chest === deChest[index]) {
        return;
    }
    const button = deChestButton[index];
    button.style.color = '#FFFFFF'
}

/**
 * @function chestMouseoverFB 在鼠标悬停坏血箱子选项时
 * @param {integer} index 索引
 * @returns {void}
 */
function chestMouseoverFB(index) {
    if (bb_chest === bbChest[index]) {
        return;
    }
    const button = bbChestButton[index];
    button.style.color = '#00FF00'
}

/**
 * @function chestMouseoutFB 在鼠标离开坏血箱子选项时
 * @param {integer} index 索引
 * @returns {void}
 */
function chestMouseoutFB(index) {
    if (bb_chest === bbChest[index]) {
        return;
    }
    const button = bbChestButton[index];
    button.style.color = '#FFFFFF'
}

/**
 * @function onMouseover 在鼠标悬停时
 * @param {string} string 字符串
 * @param {integer} index 索引
 * @returns {void}
 */
function onMouseover(string, index) {
    if (string === 'map') {
        if (index === mapNameList.indexOf(map)) {
            return;
        }
        const button = mapButtonList[index];
        button.style.color = '#00FF00'
        return;
    }
    if (index === theDifficulty) {
        return;
    }
    const button = difficultyButtonList[index];
    button.style.color = '#00FF00'
}

/**
 * @function onMouseout 在鼠标离开时
 * @param {string} string 字符串 
 * @param {integer} index 索引
 */
function onMouseout(string, index) {
    if (string === 'map') {
        const button = mapButtonList[index];
        button.style.color = '#FFFFFF'
    }
    const button = difficultyButtonList[index];
    button.style.color = '#FFFFFF'
}

/**@type {string} 这是请求的主url*/
const url = 'http://127.0.0.1:301/'
/**
 * @function sendHelpStart 发送帮开请求
 * @param {object} data 数据
 * @param {Function} callback 回调函数
 */
function sendHelpStart(data, callback) {
    const application = 'application/json';
    const Content_Type = 'Content-Type'

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${url}helpStart`);
    xhr.setRequestHeader(Content_Type, application);
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        const status = xhr.status;
        const readyState = xhr.readyState;
        if (readyState === 4) {
            if (status > 199 && status < 300) {
                const response = xhr.response;
                return callback(response);
            }
            return callback('connect error' + status);
        }
    }
}

/**
 * @function getBotInfo 请求BotInfo
 * @param {Function} callback 回调函数
 */
function getBotInfo(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}getInfo`)
    xhr.send();
    xhr.onreadystatechange = function () {
        const status = xhr.status;
        const readyState = xhr.readyState;
        if (readyState === 4) {
            if (status > 199 && status < 300) {
                return callback(JSON.parse(xhr.response));
            }
            return callback(`connect error ${status}`)
        }
    }
}

/**
 * @function spawnInfo 生成bot详细信息
 * @param {Array<HTMLElement>} botElementList 
 * @param {HTMLElement} infoElement 
 */
function spawnInfo(botElementList, infoElement) {
    getBotInfo(function (result) {

        const bots = result.bot;

        let count = 0;
        for (var ket in bots) {
            const bot = bots[ket];
            /**@type {string} bot的状态*/
            const status = bot.online ? 'online' : 'offline';
            botElementList[count].innerHTML = `bot#${count - 0 + 1} ${bot.name} ${status}`;
            count ++;
        }
        // const bot1 = bots.bot1;
        // const bot2 = bots.bot2;
        // const bot3 = bots.bot3;
        // bot1Element.innerText = `bot#1 ${bot1.name} ${bot1.online ? 'online' : 'offline'}`;
        // bot2Element.innerText = `bot#2 ${bot2.name} ${bot2.online ? 'online' : 'offline'}`;
        // bot3Element.innerText = `bot#3 ${bot3.name} ${bot3.online ? 'online' : 'offline'}`;

        let info = result.line;
        let textList = '';
        const length = info.length
        const isMore = length > 5;
        for (var i = 0; i < length; i++) {
            const message = info[i];
            if (i == 4 && isMore) {
                textList = `${textList}<p class='player_line'>${length - 4} more message</p>`
                break
            }
            textList = `${textList}<p class='player_line'>${message}</p>`;
        }
        infoElement.innerHTML = textList
    })
}