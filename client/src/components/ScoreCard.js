import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import NavBar from "./NavBar";

function ScoreCard() {
    const [date, setDate] = useState(null);
    const [isPar3, setIsPar3] = useState(false);
    const [userId, setUserId] = useState(null);
    const { courses } = useOutletContext();
    const [holeCount, setHoleCount] = useState(9);
    const [scorecard, setScorecard] = useState([]);
    const [course, setCourse] = useState(null);
    const [stats, setStats] = useState({
        holeInOnes: 0,
        eagles: 0,
        pars: 0,
        bogeys: 0,
        bogey_worse: 0,
    });

    useEffect(() => {
        setScorecard(
            Array(holeCount).fill().map((_, index) => ({
                hole: index + 1,
                par: "",
                strokes: "",
                putts: "",
            }))
        );
    }, [holeCount, isPar3]);

    useEffect(() => {
        fetch("/check_session")
        .then(r => r.json())
        .then(data => {
            if (data.id) {
                setUserId(data.id);
            } else {
                console.error("User not authenticated.");
            }
        })
        .catch(err => console.error("Error fetching session:", err))
    })

    const total_par = scorecard.reduce((sum, hole) => sum + hole.par, 0)
    const total_strokes = scorecard.reduce((sum, hole) => sum + hole.strokes, 0)
    const total_putts = scorecard.reduce((sum, hole) => sum + hole.putts, 0)

    function handleCourseChange(e) {
        setCourse(e.target.value)
    };

    function handleDateChange(e) {
        setDate(e.target.value)
    };

    function handleScoreChange(index, field, value) {
        const updatedScorecard = [...scorecard];
        updatedScorecard[index][field] = value;
        setScorecard(updatedScorecard);
        calculateStats(updatedScorecard);
    };

    function calculateStats(updatedScorecard) {
        let holeInOnes = 0;
        let eagles = 0;
        let birdies = 0;
        let pars = 0;
        let bogeys = 0; 
        let bogey_worse = 0;

        updatedScorecard.forEach(({ par, strokes }) => {
            if (par && strokes) {
                const scoreDiff = strokes - par;

                if (scoreDiff === -2) eagles++;
                else if (scoreDiff === -1) birdies++;
                else if (scoreDiff === 0) pars++;
                else if (scoreDiff === 1) bogeys++;
                else if (scoreDiff > 1) bogey_worse++;
                if (strokes === 1) holeInOnes++;
            }
        });

        setStats({ holeInOnes, eagles, birdies, pars, bogeys, bogey_worse });
    };

    function handleSubmit() {
        if (!userId || !course) {
            console.error("Error: User ID or Course ID missing.")
        }
        const scoreCardData = {
            stats,
            total_par,
            total_strokes,
            total_putts,
        };

        fetch("/scorecards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(scoreCardData),
        })
        .then(response => response.json())
        .then(scoreCardResponse => {
            console.log("Scorecard submitted:", scoreCardResponse)
            console.log("Scorecard ID:", scoreCardResponse.id);

            if (scoreCardResponse.id) {
                const roundData = {
                    user_id: userId,
                    course_id: course,
                    scorecard_id: scoreCardResponse.id,
                    date: date,
                    is_par3: isPar3,
                    full_18: holeCount === 18,
                };

                return fetch("/rounds", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(roundData),
                });
            } else {
                throw new Error ("Failed to retrieve scorecard ID");
            }
        })
        .then(r => r.json())
        .then(roundResponse => console.log("Round submitted:", roundResponse))
        .catch(error => console.error("Error submitting round:", error));
    };

    return (
        <>
            <header>
                <NavBar />
            </header>
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
                    <select id="course-dropdown" onChange={handleCourseChange}>
                        <option value="">Select a Course</option>
                        {courses.map((course) => {
                            return <option key={course.id} value={course.id}>{course.name}</option>
                        })}
                    </select>
                    <input type="date" onChange={handleDateChange}></input>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Hole</th>
                                <th>Par</th>
                                <th>Strokes</th>
                                <th>Putts</th>
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
                                            onChange={(e) => handleScoreChange(index, "par", parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={hole.strokes}
                                            onChange={(e) => handleScoreChange(index, "strokes", parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={hole.putts}
                                            onChange={(e) => handleScoreChange(index, "putts", parseInt(e.target.value))}
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
                    <p>Bogey+: {stats.bogey_worse}</p>
                </div>

                <button onClick={handleSubmit}>
                    Submit Scorecard
                </button>
            </div>
        </>
    );
};

export default ScoreCard;