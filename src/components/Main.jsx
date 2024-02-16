export default function Main(){
    return(
        <main>
            <div className="mainContainer">
                <h3>Tenzies</h3>
                <h5>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h5>
                <div className="box-container">
                    <button className="box">1</button>
                    <button className="box">2</button>
                    <button className="box">3</button>
                    <button className="box">4</button>
                    <button className="box">5</button>
                    <button className="box">6</button>
                    <button className="box">7</button>
                    <button className="box">8</button>
                    <button className="box">9</button>
                    <button className="box">10</button>
                </div>
                <button className="roll">Roll</button>
            </div>
        </main>
    )
}