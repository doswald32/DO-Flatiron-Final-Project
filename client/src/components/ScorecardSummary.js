function ScorecardSummary({ date, course, holes, crs_par, strokes, score, putts, bogey_worse, bogey, par, birdie, eagle, hoi }) {
    return (
        <div className="scorecard-summary-container">
            <div className="scorecard-summary-info-container">
                <p>Date: {date}</p>
                <p>Course: {course}</p>
                <p>Holes: {holes}</p>
                <p>Par: {crs_par}</p>
                <p>Strokes: {strokes}</p>
                <p>Score to Par: {score > 0 ? ` +${score}` : score < 0 ? ` -${score}` : " E"}</p>
                <p>Putts: {putts}</p>
                <p>Bogey+: {bogey_worse}</p>
                <p>Bogeys: {bogey}</p>
                <p>Pars: {par}</p>
                <p>Birdies: {birdie}</p>
                <p>Ealges: {eagle}</p>
                <p>HOI: {hoi}</p>
            </div>
        </div>
    )
}

export default ScorecardSummary;