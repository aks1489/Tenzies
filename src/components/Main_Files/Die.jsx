import './die.css'
export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    // console.log(props)
    return(
        // <div className={`box ${isHeld ? "green" : ""}`}>
        // <div className="box" style={styles} onClick={props.holdDies}>
        //     <h2 className="box-num">{props.value}</h2>
        // </div>

        // with Dice 
        <div key={props.id} className="box" style={styles} onClick={props.holdDies}>
            {[...Array(props.value)].map((index) => {
                return <span key={index} className='box-dot'></span>
            })}
        </div>
    )
}