import NavBar from "./NavBar";
import { Link } from "react-router-dom"

function Scores() {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <h1>Scores</h1>
            <Link to='/scorecard'><button>ScoreCard</button></Link>
        </>
    )
}

export default Scores;