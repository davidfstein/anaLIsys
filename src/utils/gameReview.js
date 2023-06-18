
const INITIAL_CP = 15; 

const summarizeMoves = (cps) => {

    let whiteInaccuracies = 0;
    let whiteMistakes = 0;
    let whiteBlunders = 0;

    let blackInaccuracies = 0;
    let blackMistakes = 0;
    let blackBlunders = 0;

    const whiteCPLs = calcCPLs(cps, 'white');
    // console.log(whiteCPLs)
    const blackCPLs = calcCPLs(cps, 'black');
    // console.log(blackCPLs)

    whiteCPLs.forEach(cpl => {
        let moveCategorization = moveCategory(cpl);
        if (moveCategorization === "inaccuracy") {
            whiteInaccuracies = whiteInaccuracies + 1
        } else if (moveCategorization === 'mistake') {
            whiteMistakes = whiteMistakes + 1
        } else if (moveCategorization === 'blunder') {
            whiteBlunders = whiteBlunders + 1
        }
    });

    blackCPLs.forEach(cpl => {
        let moveCategorization = moveCategory(cpl);
        if (moveCategorization === "inaccuracy") {
            blackInaccuracies = blackInaccuracies + 1
        } else if (moveCategorization === 'mistake') {
            blackMistakes = blackMistakes + 1
        } else if (moveCategorization === 'blunder') {
            blackBlunders = blackBlunders + 1
        }
    })

    return [whiteInaccuracies, whiteMistakes, whiteBlunders, blackInaccuracies, blackMistakes, blackBlunders]
}

const calcCPLs = (cps, player) => {
    const playerMove = player === 'white' ? (index) => index % 2 === 0 : (index) => index % 2 !== 0; 
    let cpPrev = INITIAL_CP;
    return cps.map((cp, i) => {
        if (playerMove(i)) {
            return cpPrev - (cp * -1);
        }
        return null;
    }).filter(cpl => cpl !== null);
}

const moveCategory = (cpl) => {
    if (cpl >= 50 && cpl < 100) {
        return "inaccuracy";
    } else if (cpl >= 100 && cpl < 300) {
        return "mistake";
    } else if (cpl >= 300) {
        return "blunder";
    } else {
        return null;
    }
}

export { summarizeMoves };