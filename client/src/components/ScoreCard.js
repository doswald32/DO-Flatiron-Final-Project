import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import NavBar from "./NavBar";

function ScoreCard() {
    const [setDate] = useState(null);
    const [isPar3, setIsPar3] = useState(false);
    const { courses } = useOutletContext();
    const [holeCount, setHoleCount] = useState(9);
    const [scorecard, setScorecard] = useState([]);
    const [setCourse] = useState(null);
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
        let bogeyPlus = 0;

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

    // function handleSubmit(e) {
    //     const roundData = {

    //     }
    // };

    console.log(scorecard)


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
                                    <td>
                                        <input
                                            type="number"
                                            value={hole.yardage}
                                            onChange={(e) => handleScoreChange(index, "yardage", parseInt(e.target.value))}
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
        </>
    );
};

export default ScoreCard;