const scriptAuthor = ['ColdDragon', '3dragons'];

const color = {
    transparent: '#00000000',
    light_cyan: '#00FFFF7f',
    green: '#00FF00',
    white: '#FFFFFF',
}

function changeMap(index) {
    for (var i = 0; i < mapButtonList.length; i++) {
        const button = mapButtonList[i];
        if (i === index) {
            button.style.backgroundColor = '#00FFFF80';
            button.style.color = '#FFFFFF'
            continue;
        }
        button.style.backgroundColor = '#00FFFF00'
    }
    map = index;
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
    difficulty = index;
}

/**
 * 
 * @param {string} chest 
 * @param {Array<string>} chestList 
 * @param {Array<HTMLElement>} buttonElementList 
 * @param {integer} index 
 * @returns 
 */
function getChest(chest, chestList, buttonElementList, index) {
    if (chestList.indexOf(chest) === index) {
        const button = buttonElementList[index];
        button.style.backgroundColor = color.transparent;
        button.style.color = color.green;
        return null;
    }
    for (var i = 0; i < buttonElementList.length; i++) {
        const button = buttonElementList[i];
        if (i === index) {
            button.style.backgroundColor = color.light_cyan;
            button.style.color = color.white;
            continue;
        }
        button.style.backgroundColor = color.transparent;
    }
    return chestList[index];
}

/**
 * @function chestMouse 箱子鼠标互动
 * @param {Array<HTMLElement>} buttonElementList 按钮元素集合
 * @param {string} choose 选择
 * @param {Array<string>} chooseList 可供的选择
 * @param {integer} index 索引
 * @param {string} color 颜色
 * @returns {void}
 */
function chestMouse(buttonElementList, choose, chooseList, index, color) {
    if (choose === chooseList[index]) {
        return;
    }
    const button = buttonElementList[index];
    button.style.color = color
}

/**
 * @function requireMouseover 必填选项在鼠标悬停时
 * @param {Array<HTMLElement>} buttonElementList 按钮元素集合
 * @param {integer} choose 选择
 * @param {Array<integer>} index 索引
 */
function requireMouseover(buttonElementList, choose, index) {
    if (index === choose) {
        return;
    }
    const button = buttonElementList[index];
    button.style.color = '#00FF00'
}

/**
 * @function requireMouseout 必填选项在鼠标离开时
 * @param {integer} index 索引
 * @param {Array<HTMLElement>} buttonElementList 按钮元素集合
 */
function requireMouseout(index, buttonElementList) {
    const button = buttonElementList[index];
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
 * @param {Array<HTMLElement>} botElementList 操作bot元素的元素组
 * @param {HTMLElement} infoElement bot工作状态的元素
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
            count++;
        }

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