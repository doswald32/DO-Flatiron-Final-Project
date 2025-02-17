import { useUser } from "./UserContext";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    const { user, loading } = useUser();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login", { replace: true });
        }
    }, [user, loading, navigate]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null; 
    }

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
            <h1 className="welcome-message">Welcome, {user.first_name ? user.first_name : user.email}!</h1>
            <div className="main-container">
                <div className="career-totals">
                    <h2>Career Totals</h2>
                    <p className="total-rounds">{totalRounds}</p>
                    <p className="rounds-label">Rounds Played</p>
                    <div className="stats-grid">
                        <div>
                            <p className="stat-number">{totals.par}</p>
                            <p className="stat-label">Pars</p>
                        </div>
                        <div>
                            <p className="stat-number">{totals.birdie}</p>
                            <p className="stat-label">Birdies</p>
                        </div>
                        <div>
                            <p className="stat-number">{totals.eagle}</p>
                            <p className="stat-label">Eagles</p>
                        </div>
                        <div>
                            <p className="stat-number">{totals.hoi}</p>
                            <p className="stat-label">Holes-in-One</p>
                        </div>
                    </div>
                </div>
                <div className="best-rounds">
                <h2>Best Rounds</h2>
                    <div className="rounds-list">
                        {bestRounds.map((round) => (
                            <div key={round.id} className="round-card">
                                <div className="round-info">
                                    <p className="round-date">Date: {new Date(round.date).toLocaleDateString()}</p>
                                    <p className="round-course"><strong>{round.course.name}</strong></p>
                                    <p>Course Par: {round.scorecard.crs_par} &nbsp; | &nbsp; Score: {round.scorecard.usr_strokes} &nbsp; | &nbsp; Putts: {round.scorecard.putts}</p>
                                </div>
                                <div className="round-score">
                                    <p>Score</p>
                                    <span className="score-value">{round.scorecard.usr_scr_to_par === 0 ? "E" : round.scorecard.usr_scr_to_par > 0 ? `+${round.scorecard.usr_scr_to_par}` : round.scorecard.usr_scr_to_par}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;