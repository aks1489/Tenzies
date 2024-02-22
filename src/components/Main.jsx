import Die from "./Main_Files/Die";

export default function Main(){
    function allNewDies() {
        let num = []
        for(let i = 0; i< 10 ; i++) {
            num[i] = Math.floor((Math.random() * 6 ) + 1);
            // num.push(Math.ceil(Math.random() * 6 ));
        }
        return num
    }
    console.log(allNewDies())
    return(
        <main>
            <div className="mainContainer">
                <h3>Tenzies</h3>
                <h5>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h5>
                <div className="box-container">
                    <Die value="1" />
                    <Die value="1" />
                    <Die value="3" />
                    <Die value="4" />
                    <Die value="5" />
                    <Die value="6" />
                    <Die value="7" />
                    <Die value="8" />
                    <Die value="9" />
                    <Die value="10" />
                </div>
                <button className="roll">Roll</button>
            </div>
        </main>
    )
}