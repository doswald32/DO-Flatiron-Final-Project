import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

function CourseCard({ id, name, address, rating, favorite }) {

    const { setCourses } = useOutletContext();
    const [showModal, setShowModal] = useState(false);

    function handleDeleteConfirmation() {
        setShowModal(true)
    }

    function handleCourseDelete() {
        fetch(`http://127.0.0.1:5555/courses/${id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if (!r.ok) {
                throw new Error("Error deleting course.");
            }
            return r.json();
        })
        .then(() => {
            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
            setShowModal(false);
        })
        .catch((error) => {
            console.error("Error deleting course:", error);
        });
    }

    return (
        <div className="course-card-container">
            <div className="course-card-info-container">
                <p>Course Name: {name}</p>
                <p>Address: {address}</p>
                <p>Rating: {rating}</p>
                <p>Favorite: {favorite ? 'True' : null}</p>
                <Link className="course-detail-button" to={`/course-detail/${id}`}>Course Detail</Link>
                <button className="course-delete-button" onClick={handleDeleteConfirmation}>X</button>
            </div>

            {showModal && (
                <div className="modal">
                    <p>Are you sure you want to delete this course?</p>
                    <button onClick={handleCourseDelete}>Yes</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default CourseCard;