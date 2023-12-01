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
    if(deChest.indexOf(de_chest) === index){
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
    if(bbChest.indexOf(bb_chest) === index){
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

function chestMouseoverFD(index) {
    if(de_chest === deChest[index]){
        return;
    }
    const button = deChestButton[index];
    button.style.color = '#00FF00'
}

function chestMouseoutFD(index) {
    if(de_chest === deChest[index]){
        return;
    }
    const button = deChestButton[index];
    button.style.color = '#FFFFFF'
}

function chestMouseoverFB(index) {
    if(bb_chest === bbChest[index]){
        return;
    }
    const button = bbChestButton[index];
    button.style.color = '#00FF00'
}

function chestMouseoutFB(index) {
    if(bb_chest === bbChest[index]){
        return;
    }
    const button = bbChestButton[index];
    button.style.color = '#FFFFFF'
}

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

function onMouseout(string, index) {
    if (string === 'map') {
        const button = mapButtonList[index];
        button.style.color = '#FFFFFF'
    }
    const button = difficultyButtonList[index];
    button.style.color = '#FFFFFF'
}