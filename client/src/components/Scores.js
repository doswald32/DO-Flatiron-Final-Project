import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";
import ScorecardSummary from "./ScorecardSummary";

function Scores() {

    const { user } = useUser();

    function userScores() {
        if (user) {
            const user_scores = user.rounds.map(round => round);
            return user_scores;
        } else {
            return [];
        }
    }

    return (
        <>
            <header>
                <NavBar />
            </header>
            <div className="scores-list">
            {userScores().map((round) => {
                return (
                    <ScorecardSummary
                        key={round.scorecard.id}
                        id={round.scorecard.id}
                        date={round.date}
                        course={round.course.name}
                        holes={round.full_18 ? 18 : 9}
                        crs_par={round.scorecard.crs_par}
                        strokes={round.scorecard.usr_strokes}
                        score={round.scorecard.usr_scr_to_par}
                        putts={round.scorecard.putts}
                        bogey_worse={round.scorecard.bogey_worse}
                        bogey={round.scorecard.bogey}
                        par={round.scorecard.par}
                        birdie={round.scorecard.birdie}
                        eagle={round.scorecard.eagle}
                        hoi={round.scorecard.hoi}
                    />
                )
            })}
            </div>
            <Link to='/scorecard'><button>Enter New Round</button></Link>
        </>
    )
}

export default Scores;