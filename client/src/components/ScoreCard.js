import React, { useState, useEffect } from "react";

function ScoreCard() {
    const [isPar3, setIsPar3] = useState(false);
    const [holeCount, setHoleCount] = useState(9);
    const [scorecard, setScorecard] = useState([]);
    const [stats, setStats] = useState({
        holeInOnes: 0,
        eagles: 0,
        birdies: 0,
        pars: 0,
        bogeys: 0,
        bogeyPlus: 0,
    });

    useEffect(() => {
        setScorecard(
            Array(holeCount).fill().map((_, index) => ({
                hole: index + 1,
                par: "",
                strokes: "",
                putts: "",
                yardage: "",
            }))
        );
    }, [holeCount, isPar3]);

    const handleScoreChange = (index, field, value) => {
        const updatedScorecard = [...scorecard];
        updatedScorecard[index][field] = value;
        setScorecard(updatedScorecard);
        calculateStats(updatedScorecard);
    };

    const calculateStats = (updatedScorecard) => {
        let holeInOnes = 0, eagles = 0, birdies = 0, pars = 0, bogeys = 0, bogeyPlus = 0;

        updatedScorecard.forEach(({ par, strokes }) => {
            if (par && strokes) {
                const scoreDiff = strokes - par;

                if (scoreDiff === -2) eagles++;
                else if (scoreDiff === -1) birdies++;
                else if (scoreDiff === 0) pars++;
                else if (scoreDiff === 1) bogeys++;
                else if (scoreDiff > 1) bogeyPlus++;
                if (strokes === 1) holeInOnes++;
            }
        });

        setStats({ holeInOnes, eagles, birdies, pars, bogeys, bogeyPlus });
    };

    return (
        <div className="scorecard">
            <h2>Golf Scorecard</h2>
            <div>
                <button onClick={() => {
                        setIsPar3(!isPar3);
                        setHoleCount(9);
                    }}
                >
                    {isPar3 ? "Par 3: ON" : "Par 3: OFF"}
                </button>

                <button onClick={() => {
                        if (!isPar3) setHoleCount(holeCount === 9 ? 18 : 9);
                    }}
                    disabled={isPar3}
                >
                   {holeCount} Holes
                </button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Hole</th>
                            <th>Par</th>
                            <th>Strokes</th>
                            <th>Putts</th>
                            <th>Yardage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scorecard.map((hole, index) => (
                            <tr key={index}>
                                <td>{hole.hole}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={hole.par}
                                        onChange={(e) => handleScoreChange(index, "par", parseInt(e.target.value) || "")}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={hole.strokes}
                                        onChange={(e) => handleScoreChange(index, "strokes", parseInt(e.target.value) || "")}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={hole.putts}
                                        onChange={(e) => handleScoreChange(index, "putts", parseInt(e.target.value) || "")}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={hole.yardage}
                                        onChange={(e) => handleScoreChange(index, "yardage", parseInt(e.target.value) || "")}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h3>Round Summary</h3>
                <p>Hole-in-Ones: {stats.holeInOnes}</p>
                <p>Eagles: {stats.eagles}</p>
                <p>Birdies: {stats.birdies}</p>
                <p>Pars: {stats.pars}</p>
                <p>Bogeys: {stats.bogeys}</p>
                <p>Bogey+: {stats.bogeyPlus}</p>
            </div>

            <button>
                Submit Scorecard
            </button>
        </div>
    );
};

export default ScoreCard;