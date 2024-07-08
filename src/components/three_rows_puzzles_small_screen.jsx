function three_rows_puzzles_small_screen({dimensions, setPuzzle, textArr, setMobile}){
    let hei;
        let k = 0;
        let newPuzzle = [];
        setMobile(true)
        for (let ind = 0; ind < 27; ind++) {
            if (ind <= 8) {
                hei = 50;
            } else if (ind <= 17) {
                hei = 0;
                if (ind === 9) {
                    k = 0;
                }
            } else {
                hei = -50;
                if (ind === 18) {
                    k = 0;
                }
            }
            let xPos = dimensions.width / 2 - 300 + 70 * (k);
            let yPos = dimensions.height / 2 - hei*2;
            k++;

            newPuzzle.push({
                text: textArr[ind],
                xPos,
                yPos,
                color: 'black',
                index: ind,
                selected: false,
                initColor: 'black'
            });
        }
        setPuzzle(newPuzzle);
}

export default three_rows_puzzles_small_screen