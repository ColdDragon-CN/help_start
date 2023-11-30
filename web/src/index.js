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

function onMouseover(index) {
    if(index === mapNameList.indexOf(map)){
        return;
    }
    const button = mapButtonList[index];
    button.style.color = '#00FF00'

}

function onMouseout(index) {
    const button = mapButtonList[index];
    button.style.color = '#FFFFFF'
}