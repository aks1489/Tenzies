import { useEffect, useState } from "react";
import Die from "./Main_Files/Die";
import { nanoid } from "nanoid";

export default function Main(){
    const [ dies , setDies ] = useState(allNewDies());
    const [ game, setGame ] = useState(false);


    // generating isheld? and key (nanoid) property
    function generateDie() {
        return {
            value: Math.floor((Math.random() * 6 ) + 1), 
            isHeld: false, 
            key: nanoid()
        }
    }
    
    // generating 10 random numbers with 'generateDie()' function
    function allNewDies() {
        let num = []
        for(let i = 0; i< 10 ; i++) {
            num[i] = generateDie();
            // num.push(Math.ceil(Math.random() * 6 ));
        }
        return num
    }

    // setting new randome number when roll button clicked except previously clicked dice
    function rollDies() {
        setDies(prvDie => prvDie.map(die => {
            return die.isHeld ?
                die :
                generateDie()
        }))
    }

    // holding the dice values 
    function holdDies(id) {
        console.log(id)
        setDies(oldDie => oldDie.map(die => {
            return die.key === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    useEffect(() => {
        //  {{  -------------------> check every dice {if all the value of "isHeld" is 'true'} and 
        //  {"value" property values are similer to zero(0) index are similer
        //  if all condition are tru then set the 'game' to true -----------< }}
        //
        //      ------>Code<-------
        // for( let i = 0; i < 10; i++ ) {
        //     if(dies[i].isHeld && dies[0].value === dies[i].value){
        //         setGame(true)
        //     }else{
        //         setGame(false)
        //         break;
        //     }
        // }

        const allHeld = dies.every(die => die.isHeld)
        const allSameValue = dies.every(die => die.value === dies[0].value)

        if (allHeld && !allSameValue){
            console.log("All numbers are not matched!")
        } else if (allHeld && allSameValue) {
            console.log("game completed")
            setGame(true)
        }

    }, [dies])

    // mapping over dies for getting 10 dies with prop
    const diesElements = dies.map(die => (
        <Die 
            key={die.key} 
            value={die.value} 
            isHeld={die.isHeld} 
            id={die.key} 
            holdDies={()=>holdDies(die.key)} 
        />)
    )

    return(
        <main>
            <div className="mainContainer">
                <div className="box-heading">
                    <h1>Tenzies</h1>
                    <h5>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h5>
                </div>
                <div className="box-container">
                    {/* {dies.map(die => <Die key={die.key} value={die.value} isHeld={die.isHeld} id={die.key} holdDies={()=>holdDies(die.key)} />)} */}
                    {diesElements}
                </div>
                <button className="roll-dies" onClick={rollDies}>Roll</button>
            </div>
        </main>
    )
}