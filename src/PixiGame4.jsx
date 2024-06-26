import {Container, Stage, Text, Graphics } from '@pixi/react';
import './App.css';
import '@pixi/events';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TextStyle } from 'pixi.js';
import Confetti from 'react-confetti'
// import ConfettiComponent from './ConfettiComponent';
// import Confetti from 'canvas-confetti';

function PixiGame4() {
    
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [puzzle, setPuzzle] = useState([]);
    let completedWord = useMemo(()=>['map','pot','tap','pet','tip','pat','top','put','ten','nor','run'], []);
    const [selectedWord, setSelectedWord] = useState("")
    const [drawing, setDrawing] = useState(false)
    const [indices, setIndices] = useState([])
    const [givenWords, setGivenWords] = useState("");
    const [completedWords, setCompletedWords] = useState([])
    const [lineClear, setLineClear] = useState(false)
    const [lines, setLines] = useState([])
    const [StrCompletedWords,setStrCompletedWords] = useState("");
    let [tries, setTries] = useState(0)
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [completedTime, setCompletedTime] = useState(null);
    // const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [mobile, setMobile] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    const handleOrientationChange = useCallback(() => {
        const stageElement = document.querySelector('.stage');
        if (stageElement) {
            stageElement.style.display = 'block';
        }
    }, []);

    useEffect(() => {
        window.addEventListener("orientationchange", handleOrientationChange);
        return () => {
            window.removeEventListener("orientationchange", handleOrientationChange);
        };
    }, [handleOrientationChange]);
    
    
    function readOutLoud(text){
        if ('speechSynthesis' in window) {
            // Speech Synthesis supported 🎉
           }else{
             // Speech Synthesis Not Supported 😣
             alert("Sorry, your browser doesn't support text to speech!");
           }
            var msg = new SpeechSynthesisUtterance();
            msg.text = text;
            window.speechSynthesis.speak(msg);
    }

    useEffect(() => {
        setStartTime(new Date());
    }, []);

    useEffect(() => {
        if (completedWords.length === completedWord.length && startTime) {
            setEndTime(new Date());
        }
    }, [completedWords, completedWord, startTime]);

    useEffect(() => {
        if (startTime && endTime) {
            const elapsed = endTime - startTime;
            setCompletedTime(elapsed);
        }
    }, [startTime, endTime]);

    useEffect(() => {
        if (completedTime !== null) {
            alert(`Congratulations! You completed the game in ${completedTime/1000} seconds.`);
        }
    }, [completedTime]);


    useEffect(()=>{
        setGivenWords(completedWord.join("\t\t"))
    },[completedWord])

    const draw = useCallback((g)=>{
        if(lines.length > 0){
        lines.forEach(line=>{
            if(line.clear === true){
                g.clear;
            }})}

        if(indices.length >=2 && !lineClear){
        g.clear()
        g.lineStyle(2, 15853020);
        if(lines.length > 0){
        lines.forEach(line=>{
            if(line.clear === true){
                g.clear;
            }
            else{
                g.moveTo(line.start_x, line.start_y)
                g.lineTo(line.end_x, line.end_y)
            }
            console.log("Length of line: "+lines.length);
        })
    }
        g.moveTo(puzzle[indices[indices.length - 2]].xPos, puzzle[indices[indices.length-2]].yPos);
        g.lineTo(puzzle[indices[indices.length - 1]].xPos, puzzle[indices[indices.length - 1]].yPos);
        
        console.log("length: "+lines.length)
        g.endFill();
        }
        if(lineClear){
            lines.forEach(line=>{
                if(line.clear === "none"){
                    g.clear;
                }
            })
            setLineClear(false)
        }
    },[indices, puzzle, lineClear, lines])

    
    
    const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        setLines([])
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    useEffect(() => {
        if(window.innerHeight > 630 && window.innerWidth > 830){
        const textArr =  ['m','f','t','s','t','v','t','k','t','a','r','a','o','a','e','i','a','o','u','e','o','u','p','k','p','b','p','r','p','w','n','c','n'];
        let hei;
        let k = 0;
        let newPuzzle = [];
        for (let ind = 0; ind < textArr.length; ind++) {
            if (ind <= 10) {
                hei = 150;
            } else if (ind <= 21) {
                hei = 50;
                if (ind === 11) {
                    k = 0;
                }
            } else {
                hei = -50;
                if (ind === 22) {
                    k = 0;
                }
            }
            let xPos = dimensions.width / 2 - 400 + 90 * (k);
            let yPos = dimensions.height / 2 - hei;
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
    else{
        const textArr =  ['m','f','t','s','t','v','t','k','t','a','r','a','o','a','e','i','a','o','u','e','o','u','p','k','p','b','p','r','p','w','n','c','n'];
        let hei;
        let k = 0;
        let newPuzzle = [];
        setMobile(true)
        for (let ind = 0; ind < textArr.length; ind++) {
            if (ind <= 10) {
                hei = 50;
            } else if (ind <= 21) {
                hei = 0;
                if (ind === 11) {
                    k = 0;
                }
            } else {
                hei = -50;
                if (ind === 22) {
                    k = 0;
                }
            }
            let xPos = dimensions.width / 2 - 300 + 50 * (k);
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
    }, [dimensions]);


    useEffect(() => {
        const handlePointerMove = (e) => {
            let pointerPosition_x, pointerPosition_y
            if(drawing){
            const updatedPuzzle = puzzle.map((word) => {
                if(window.innerHeight > 630 && window.innerWidth > 830){
                pointerPosition_x = e.clientX + window.scrollX;
                pointerPosition_y = e.clientY + window.scrollY;
                }
                else{
                pointerPosition_x = e.clientX;
                pointerPosition_y = e.clientY;
                }
                let color = word.color;
                // console.log("CCColor: "+color)
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                )
                if(distance< 40 && word.selected === false){
                    console.log(word.text)
                    setSelectedWord(prev => prev + word.text)
                    setIndices([...indices, word.index])
                    word.selected = true
                    if(indices.length >= 2){
                    setLines((line)=>[
                        ...line,{start_x: puzzle[indices[indices.length - 2]].xPos, start_y: puzzle[indices[indices.length - 2]].yPos, end_x:puzzle[indices[indices.length - 1]].xPos, end_y:puzzle[indices[indices.length - 1]].yPos, clear: "none"}
                    ])
                }
                    // word.initColor = 'green'
                }
                return {
                    ...word,
                    color: distance <= 40 ? 'green':color,
                };
            });

            setPuzzle(updatedPuzzle);
        }
        else{
            const updatedPuzzle = puzzle.map((word) => {
                const pointerPosition_x = e.clientX + window.scrollX;
                const pointerPosition_y = e.clientY + window.scrollY;
                // let color = word.color;
                // console.log("CCColor: "+color)
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                )
                if(distance< 40 && !mobile){
                    console.log(word.text)
                return {
                    ...word,
                    color: distance <= 40 ? 'green':word.initColor,
                };
            }
            else{
                console.log(word.text)
                return {
                    ...word,
                    color: distance == 0 ? 'green':word.initColor,
                };
            }
            });

            setPuzzle(updatedPuzzle);
        }
        };
        const handlePointerDown = (e) => {
            const updatedPuzzle = puzzle.map((word) => {
                let pointerPosition_x, pointerPosition_y;
                if(window.innerHeight > 630 && window.innerWidth > 830){
                    pointerPosition_x = e.clientX + window.scrollX;
                    pointerPosition_y = e.clientY + window.scrollY;
                    }
                    else{
                    pointerPosition_x = e.clientX;
                    pointerPosition_y = e.clientY;
                    }
                const letterPosition = { x: word.xPos, y: word.yPos };
                const distance = Math.sqrt(
                    Math.pow(pointerPosition_x - letterPosition.x, 2) +
                    Math.pow(pointerPosition_y - letterPosition.y, 2)
                );
                if(distance< 40 && !mobile){
                    console.log(word.text)
                    setDrawing(true)
                        setSelectedWord(prev => prev + word.text)
                        setIndices([...indices, word.index])
                        word.selected = true
                        setTries(tries++);
                        return {
                            ...word,
                            color:'green'
                        };
            }
                else if(distance <40 && mobile){
                    console.log(word.text)
                    setDrawing(true)
                        setSelectedWord(prev => prev + word.text)
                        setIndices([...indices, word.index])
                        word.selected = true
                        setTries(tries++);
                        return {
                            ...word,
                            color:'green'
                        };
            }
            return word;

        });
        setPuzzle(updatedPuzzle)
        };

        const handlePointerUp = () => {
            if(drawing){
                setTries(prev=>prev+1)
            }
            setDrawing(false);
            console.log(indices)
            if (!completedWord.includes(selectedWord)) {
                // setTries(prev=>prev+1)
                for(let l=0;l<indices.length;l++){
                    for(let k=0;k<puzzle.length;k++){
                    if(indices[l] === puzzle[k].index){
                        puzzle[k].color="black"
                        puzzle[k].selected = false
                        setPuzzle(puzzle)
                        lines.forEach(line=>{
                            if(line.clear === "none"){
                                line.clear = true
                            }
                        })
                    }
                }
                }
                setSelectedWord("")
                setDrawing(false);
                setIndices([])
                setLineClear(true)
            } 
            else if(!completedWords.includes(selectedWord)){
                setDrawing(false);
                readOutLoud(selectedWord)
                // setTries(prev=>prev+1)
                // alert("Congrats!! You have found a word");
                setCompletedWords([...completedWords,selectedWord+"\t\t"]);
                setStrCompletedWords(prev => prev + selectedWord + "\t\t");
                console.log("completed:"+completedWords[0])
                if(indices.length >= 2){
                    setLines((line)=>[
                        ...line,{start_x: puzzle[indices[indices.length - 2]].xPos, start_y: puzzle[indices[indices.length - 2]].yPos, end_x:puzzle[indices[indices.length - 1]].xPos, end_y:puzzle[indices[indices.length - 1]].yPos}
                    ])
                }
                setSelectedWord("");
                setIndices([])
                for(let l=0;l<indices.length;l++){
                    for(let k=0;k<puzzle.length;k++){
                    if(indices[l] === puzzle[k].index){
                        puzzle[k].initColor = 'green'
                        setPuzzle(puzzle)
                        lines.forEach(line=>{
                            if(line.clear === "none"){
                                line.clear = false;
                            }
                        })
                    }
                }
                }
            }
            else{
                // setTries(prev=>prev+1)
                alert("Already found the word "+selectedWord+"!!")
                readOutLoud(selectedWord);
                setSelectedWord("")
            }
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp); 
        window.addEventListener('pointermove', handlePointerMove);

        window.addEventListener('touchmove', handlePointerMove);
        window.addEventListener('touchstart', handlePointerDown);
        window.addEventListener('touchend', handlePointerUp);
       
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointermove', handlePointerMove);

            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('touchstart', handlePointerDown);
            window.removeEventListener('touchend', handlePointerUp);
        };
    }, [puzzle, selectedWord, indices, completedWord, completedWords, drawing, lines, tries, mobile]);

    useEffect(()=>{
       if (completedWords.length === completedWord.length) {
            // confetti();
            // alert("Congrats!!You have finished the game.")
            setIsCompleted(true)
    }},[completedWords, completedWord])


if(window.innerHeight > 630 && window.innerWidth > 830){
    return (
    <>
    {isCompleted && <Confetti/>}
            {/* <Voice ReadingText={"Find the words listed below  Click and drag on the letters to select them"}/> */}
            <div className="App">
    {/* {isCompleted && <ConfettiComponent isCompleted={{isCompleted}}/>} */}
      <div className="image-container">
        <img src='./info_pic.png' alt="Descriptive Image" className="hover-image" onClick={()=>readOutLoud("Find the words listed below  Click and drag on the letters to select them")} style={{height: 35}}/>
        <span style={{display: 'flex'}}><div className="description">Find the words listed below  Click and drag on the letters to select them.</div>
        <h4 style={{marginLeft: window.innerWidth/2 + 100}}>Tries: {tries}</h4></span>
      </div>
    </div>

        <Stage x={0} y={0} options={{ backgroundColor: 11505519 }} height={dimensions.height - 250} width={dimensions.width}>
        <Graphics draw={draw} /> 

            <Container name='textArea'>
            {puzzle.map((word) => (
                <Text
                    key={word.index}
                    text={word.text}
                    anchor={0.5}
                    x={word.xPos}
                    y={word.yPos}
                    style={new TextStyle({
                        fill: word.color,
                    })}
                    interactive={true}
                />
            ))}
            {/* <Graphics draw={draw} />  */}
            </Container>
        </Stage>
        {/* <canvas ref={confettiCanvasRef} className="confetti-canvas"></canvas> */}
        
        <br/>
        <br/>
        <h3>Selected Word: {selectedWord}</h3>
        <h1>Given Words: {givenWords}</h1>
        <h3>Completed Words: {StrCompletedWords}</h3>
        <br/>
        <div style={{marginLeft: window.innerWidth/4 + 100}}>
        <a type="button" className="btn btn-secondary btn-lg" href='/game2'>Previous</a>
            <a type="button" className="btn btn-secondary btn-lg" href='/game4' style={{marginLeft: window.innerWidth/4}}>Next</a>
            </div>
            <br/>
            <br/>
            <br/>
        {/* <h3>Time: {elapsedSeconds}</h3>
        {completedTime && (
                <h3>Time taken to complete: {completedTime / 1000} seconds</h3>
            )} */}
        </>
    );
    
}
else{
    return (
        <>
        {isCompleted && <Confetti/>}
        <div className="App1">
      <div className="image-container">
        <img src='./info_pic.png' alt="Descriptive Image" className="hover-image" onClick={()=>readOutLoud("Find the words listed below  Click and drag on the letters to select them")} style={{height: 35}}/>
        <span style={{display: 'flex'}}><div className="description">Find the words listed below  Click and drag on the letters to select them.</div>
        <h4 style={{marginLeft: window.innerWidth/12}}>Tries: {tries}</h4></span>
      </div>
    </div>
        {/* <Voice ReadingText={"Find the words listed below  Click and drag on the letters to select them"}/> */}
            <Stage x={0} y={0} options={{ backgroundColor: 11505519 }} height={dimensions.height} width={dimensions.width - 150} className='stage-container'>
            <Graphics draw={draw} /> 
    
                <Container name='textArea'>
                {puzzle.map((word) => (
                    <Text
                        key={word.index}
                        text={word.text}
                        anchor={0.5}
                        x={word.xPos}
                        y={word.yPos}
                        style={new TextStyle({
                            fill: word.color,
                        })}
                        interactive={true}
                    />
                ))}
                {/* <Graphics draw={draw} />  */}
                </Container>
            </Stage>
            {/* <canvas ref={confettiCanvasRef} className="confetti-canvas"></canvas> */}
            
            <br/>
            <br/>
            <h3>Selected Word: {selectedWord}</h3>
            <h1>Given Words: {givenWords}</h1>
            <h3>Completed Words: {StrCompletedWords}</h3>
            <div style={{marginLeft: window.innerWidth/4}}>
        <a type="button" className="btn btn-secondary" href='/game2'>Previous</a>
            <a type="button" className="btn btn-secondary" href='/game4' style={{marginLeft: window.innerWidth/4}}>Next</a>
            </div>

            {/* <h3>Time: {elapsedSeconds}</h3>
            {completedTime && (
                    <h3>Time taken to complete: {completedTime / 1000} seconds</h3>
                )} */}
            </>
        );
}
}

export default PixiGame4;