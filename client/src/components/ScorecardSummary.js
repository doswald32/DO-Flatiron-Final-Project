import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Modal from "./Modal";

function ScorecardSummary({ id, date, course, holes, crs_par, strokes, score, putts, bogey_worse, bogey, par, birdie, eagle, hoi }) {
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { setUser, user } = useOutletContext();
    
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
                <button className="scorecard-delete-button" onClick={() => setShowDeleteModal(true)}>Delete</button>
            </div>
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <p>Are you sure you want to delete this scorecard?</p>
                <button onClick={() => {
                    fetch(`/scorecards/${id}`, {
                        method: "DELETE",
                    })
                    .then((r) => {
                        if (!r.ok) {
                            throw new Error("Error deleting scorecard.");
                        }
                        return fetch(`/users/${user.id}`);
                    })
                    .then((r) => r.json())
                    .then((updatedUser) => {
                        setUser(updatedUser);
                        setShowDeleteModal(false);
                    })
                    .catch((error) => {
                        console.error("Error deleting scorecard:", error);
                    });
                }}>Yes</button>
                <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </Modal>
        </div>
    )
}

export default ScorecardSummary;