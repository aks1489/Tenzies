import { useState } from "react";
import Die from "./Main_Files/Die";
import { nanoid } from "nanoid";

export default function Main(){
    const [ dies , setDies ] = useState(allNewDies());

    // generating 10 randome number with isheld? and key (nanoid) property
    function allNewDies() {
        let num = []
        for(let i = 0; i< 10 ; i++) {
            num[i] = {value: Math.floor((Math.random() * 6 ) + 1), isHeld: false, key: nanoid()};
            // num.push(Math.ceil(Math.random() * 6 ));
        }
        return num
    }

    // setting new 10 randome number when roll button clicked
    function rollDies() {
        setDies(allNewDies())
    }
    console.log(dies)
    return(
        <main>
            <div className="mainContainer">
                <div className="box-heading">
                    <h1>Tenzies</h1>
                    <h5>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h5>
                </div>
                <div className="box-container">
                    {dies.map(die => <Die key={die.key} value={die.value} />)}
                </div>
                <button className="roll-dies" onClick={rollDies}>Roll</button>
            </div>
        </main>
    )
}