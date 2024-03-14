import { useEffect, useState } from "react"
import WrongImg from "../../assets/wrong.gif"

export default function Modal(props) {
    const [ modalDisplay, setModalDispay ] = useState("none")


    function closeModal() {
        props.setModal(false)
    }

    // setting modal display property
    useEffect(() => {
        setModalDispay(() => props.modal ? "flex" : "none")
    }, [props.modal])

    return(
        <div className="modal" style={{display : modalDisplay}}>
            <h2 className="modal-top-text">All number are not matched</h2>
            <img className="modal-img" src={WrongImg} alt="Number not Matched" />
            <h2 className="modal-bottom-text"> Try to match all the numbers correctly</h2>
            <button className="modal-close" onClick={closeModal}>Close</button>
        </div>
    )
}