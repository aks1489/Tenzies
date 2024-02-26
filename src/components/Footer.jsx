// import { githubImg } from "../assets/github.png"
// import githubImgWhite from "../assets/githubWhite.png"
import gitwhite from "../assets/gitWhite.png"

export default function Footer(){
    return(
        <footer>
            <div className="f-head">
                <p className="f-head-text">made by - </p>
                <a className="f-head-link" href="https://github.com/aks1489/">
                    <div className="f-head-link-container">
                        <img className="f-head-link-img" src={gitwhite} alt="github" />
                        <p className="f-head-link-text"> akash</p>
                    </div>
                </a>
            </div>
        </footer>
    )
}