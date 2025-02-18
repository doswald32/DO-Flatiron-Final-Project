import { useState } from "react";
import { useUser } from "./UserContext";
import Modal from "./Modal";

function ScorecardSummary({ id, date, course, holes, crs_par, strokes, score, putts, bogey_worse, bogey, par, birdie, eagle, hoi }) {
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { setUser, user } = useUser();

    function handleDelete() {
        fetch(`/scorecards/${id}`, { method: "DELETE" })
            .then((r) => {
                if (!r.ok) throw new Error("Error deleting scorecard.");
                return fetch(`/users/${user.id}`);
            })
            .then((r) => r.json())
            .then((updatedUser) => {
                setUser(updatedUser);
                setShowDeleteModal(false);
            })
            .catch((error) => console.error("Error deleting scorecard:", error));
    }

    return (
        <div className="scorecard-summary">
            <div className="scorecard-header">
                <span className="scorecard-date">{new Date(date).toLocaleDateString()}</span>
                <button className="delete-scorecard" onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(true);
                }}>X</button>
            </div>
            <h3 className="scorecard-course">{course}</h3>
            <p className="scorecard-holes">{holes} holes</p>
            <div className="scorecard-stats-1">
                <p>
                    Par {crs_par} &nbsp; | 
                    &nbsp; Strokes {strokes} &nbsp; | 
                    &nbsp; Score {score > 0 ? `+${score}` : score < 0 ? `-${score}` : "E"} &nbsp; | 
                    &nbsp; Putts {putts}
                </p>
            </div>
            <div className="scorecard-stats-2">
                <div>HOI: {hoi}</div>
                <div>Eagles: {eagle}</div>
                <div>Birdies: {birdie}</div>
                <div>Pars: {par}</div>
                <div>Bogeys: {bogey}</div>
                <div>Bogey+: {bogey_worse}</div>
            </div>
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this scorecard?</p>
                <div className="modal-buttons">
                    <button className="delete-confirm" onClick={handleDelete}>Yes, Delete</button>
                    <button className="cancel-button" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                </div>
            </Modal>
        </div>
    );
}

export default ScorecardSummary;