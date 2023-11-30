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