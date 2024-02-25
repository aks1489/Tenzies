export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        // <div className={`box ${isHeld ? "green" : ""}`}>
        <div className="box" style={styles} onClick={props.holdDies}>
            <h2 className="box-num">{props.value}</h2>
        </div>
    )
}