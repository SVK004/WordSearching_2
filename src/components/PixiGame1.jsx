import {Container, Stage, Text, Graphics } from '@pixi/react';
import '../App.css';
import '@pixi/events';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TextStyle } from 'pixi.js';
import Confetti from 'react-confetti'
import words from '../assets/words.json'
import info_pic from '../assets/images/info_pic.png'
function PixiGame1() {
    
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [puzzle, setPuzzle] = useState([]);
    let completedWord = useMemo(()=>words[0].words, []);
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
    const [ongoingElapsedTime, setOngoingElapsedTime] = useState(0);
    
    const [mobile, setMobile] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isStarted, setisStarted] = useState(false);
    const textArr = useMemo(()=>words[0].grid, []);


    const handleOrientationChange = useCallback(() => {
        const stageElement = document.querySelector('.stage');
        if (stageElement) {
            stageElement.style.display = 'block';
        }
    }, []);
    const toggleScroll = (disable) => {
        if (disable) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        window.addEventListener("orientationchange", handleOrientationChange);
        return () => {
            window.removeEventListener("orientationchange", handleOrientationChange);
        };
    }, [handleOrientationChange]);
    
    
    function readOutLoud(text){
        if (!('speechSynthesis' in window)) {
             alert("Sorry, your browser doesn't support text to speech!");
           }
            var msg = new SpeechSynthesisUtterance();
            msg.text = text;
            window.speechSynthesis.speak(msg);
    }

    useEffect(() => {
        if(isStarted){
            setStartTime(new Date());
        }
    }, [isStarted]);

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
        let interval = null;
    
        if (startTime && !endTime) {
            interval = setInterval(() => {
                setOngoingElapsedTime((new Date() - startTime) / 1000); 
            }, 1000);
        } else if (endTime) {
            clearInterval(interval);
        }
    
        return () => clearInterval(interval);
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
            let hei;
        let k = 0;
        let newPuzzle = [];
        for (let ind = 0; ind < 27; ind++) {
            if (ind <= 8) {
                hei = 150;
            } else if (ind <= 17) {
                hei = 50;
                if (ind === 9) {
                    k = 0;
                }
            } else {
                hei = -50;
                if (ind === 18) {
                    k = 0;
                }
            }
            let xPos = dimensions.width / 2 - 400 + 100 * (k);
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
    }, [dimensions,textArr]);


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
                setisStarted(true)
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
                setisStarted(true)
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
            for(let i=0;i<indices.length;i++){
                puzzle[indices[i]].selected = false
            }
            if(drawing){
                setTries(prev=>prev+1)
            }
            setDrawing(false);
            console.log(indices)
            if (!completedWord.includes(selectedWord)) {
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
            setIsCompleted(true)
    }},[completedWords, completedWord])


if(window.innerHeight > 630 && window.innerWidth > 830){
    toggleScroll(true)
    return (
    <>
    {isCompleted && <Confetti/>}
            <div className="App">
      <div className="image-container">
        <img src={info_pic} alt="Descriptive Image" className="hover-image" onClick={()=>readOutLoud("Find the words listed below  Click and drag on the letters to select them")} style={{height: 35}}/>
        <span style={{display: 'flex'}}><div className="description">Find the words listed below  Click and drag on the letters to select them.</div>
        {<h4 style={{marginLeft: window.innerWidth/2 + 80}}>Time: {ongoingElapsedTime.toFixed(0)}</h4>}</span>
      </div>
        {<div style={{marginLeft: window.innerWidth - 150}}><h4>Tries: {tries}</h4> </div>}
    </div>

        <Stage x={0} y={0} options={{ backgroundColor: 11644879 }} height={dimensions.height - 250} width={dimensions.width}>
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
            </Container>
        </Stage>
        
        <br/>
        <br/>
        <h3>Selected Word: {selectedWord}</h3>
        <h1>Given Words: {givenWords}</h1>
        <h3>Completed Words: {StrCompletedWords}</h3>
        <br/>
        <div style={{marginLeft: window.innerWidth/4 + 100}}>
        <a type="button" className="btn btn-secondary btn-lg" href='/'>Previous</a>
            <a type="button" className="btn btn-secondary btn-lg" href='/games/wordsearching/game2' style={{marginLeft: window.innerWidth/4}}>Next</a>
            </div>
            <br/>
            <br/>
            <br/>
        </>
    );
    
}
else{
    return (
        <>
        {isCompleted && <Confetti/>}
        <div className="A">
      <div className="image-container">
        <img src={info_pic} alt="Descriptive Image" className="hover-image" onClick={()=>readOutLoud("Find the words listed below  Click and drag on the letters to select them")} style={{height: 35}}/>
        <span style={{display: 'flex'}}><div className="description">Find the words listed below  Click and drag on the letters to select them.</div>
        <h5 style={{marginLeft: window.innerWidth/15, padding: 0, width: 100}}>Time: {ongoingElapsedTime.toFixed(0)}</h5><h4 style={{marginLeft: window.innerWidth/12, padding: 0, width: 100}}>Tries: {tries}</h4></span>
      </div>
    </div>
            <Stage x={0} y={0} options={{ backgroundColor:" #B1AFCF"}} height={dimensions.height} width={dimensions.width - 100} className='stage-container'>
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
                </Container>
            </Stage>
            
            <br/>
            <br/>
            <h3>Selected Word: {selectedWord}</h3>
            <h1>Given Words: {givenWords}</h1>
            <h3>Completed Words: {StrCompletedWords}</h3>
            <div style={{marginLeft: window.innerWidth/4}}>
        <a type="button" className="btn btn-secondary" href='/'>Previous</a>
            <a type="button" className="btn btn-secondary" href='/games/wordsearching/game2' style={{marginLeft: window.innerWidth/4}}>Next</a>
            </div>
            </>
        );
}
}

export default PixiGame1;