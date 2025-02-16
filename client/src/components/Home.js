import { useOutletContext } from "react-router-dom";
import NavBar from "./NavBar";

function Home() {

    const { user } = useOutletContext();
    const rounds = user.rounds
    const bestRounds = [...rounds]
        .sort((a, b) => a.scorecard.usr_scr_to_par - b.scorecard.user_scr_to_par)
        .slice(0, 3);

    const totalRounds = rounds.length

    const totals = rounds.reduce(
        (acc, round) => {
            acc.par += round.scorecard.par;
            acc.birdie += round.scorecard.birdie;
            acc.eagle += round.scorecard.eagle;
            acc.hoi += round.scorecard.hoi;
            return acc;
        },
        { par: 0, birdie: 0, eagle: 0, hoi: 0 }
    );
    

    return (
        <main>
            <header>
                <NavBar />
            </header>
            <div>
                <h1>Welcome {user.username}!</h1>
            </div>
            <div className="career-stats">
                <h2>Career Totals:</h2>
                <p>Rounds Played: {totalRounds}</p>
                <p>Pars: {totals.par}</p>
                <p>Birdies: {totals.birdie}</p>
                <p>Eagles: {totals.eagle}</p>
                <p>Holes-in-One: {totals.hoi}</p>
            </div>
            <div className="top-rounds-container">
                <div className="top-rounds-scroll">
                {bestRounds.map((round) => (
                        <div key={round.id} className="round-card">
                            <p>Date: {round.date}</p>
                            <p>{round.course.name}</p>
                            <p>Course Par: {round.scorecard.crs_par}</p>                           
                            <p>Score: {round.scorecard.usr_strokes}</p>
                            <p>Putts: {round.scorecard.putts}</p>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    )
}

export default Home;