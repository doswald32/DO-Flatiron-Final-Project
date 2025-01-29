import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Modal from "./Modal";

function CourseCard({ id, name, address, rating, favorite }) {

    const { setCourses } = useOutletContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [editedCourse, setEditedCourse] = useState({
        name: "",
        address: "",
        rating: "",
        favorite: false,
    })

    useEffect(() => {
        if (showEditModal) {
            setEditedCourse({ name, address, rating, favorite })
        }
    }, [showEditModal, name, address, rating, favorite])

    function handleCourseUpdate(e) {
        e.preventDefault();
        fetch(`/courses/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedCourse),
        })
        .then((r) => {
            if (!r.ok) {
                throw new Error("Error updating course.");
            }
            return r.json();
        })
        .then((updatedCourse) => {
            setCourses((prevCourses) =>
                prevCourses.map((course) => (course.id === id ? updatedCourse : course))
            );
            setShowEditModal(false);
        })
        .catch((error) => {
            console.error("Error updating course:", error);
        });
    }

    function handleNameChange(e) {
        setEditedCourse((prev) => ({...prev, name: e.target.value}))
    }

    function handleAddressChange(e) {
        setEditedCourse((prev) => ({...prev, address: e.target.value}))
    }

    function handleRatingChange(e) {
        setEditedCourse((prev) => ({...prev, rating: e.target.value}))
    }

    function handleFavoriteChange(e) {
        setEditedCourse((prev) => ({...prev, favorite: e.target.checked}))
    }

    // function handleChange(e) {
    //     const { name, value, type, checked } = e.target;
    //     setEditedCourse((prev) => ({
    //         ...prev,
    //         [name]: type === "checkbox" ? checked : value,
    //     }));
    // }

    return (
        <div className="course-card-container">
            <div className="course-card-info-container">
                <p>Course Name: {name}</p>
                <p>Address: {address}</p>
                <p>Rating: {rating}</p>
                <p>Favorite: {favorite ? 'True' : null}</p>
                <Link className="course-detail-button" to={`/course-detail/${id}`}>Course Detail</Link>
                <button className="course-edit-button" onClick={() => setShowEditModal(true)}>Edit</button>
                <button className="course-delete-button" onClick={() => setShowDeleteModal(true)}>X</button>
            </div>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <p>Are you sure you want to delete this course?</p>
                <button onClick={() => {
                    fetch(`/courses/${id}`, {
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
                        setShowDeleteModal(false);
                    })
                    .catch((error) => {
                        console.error("Error deleting course:", error);
                    });
                }}>Yes</button>
                <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </Modal>
            <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
                <h2>Edit Course</h2>
                    <form onSubmit={handleCourseUpdate}>
                        <label>
                            Name:
                            <input type="text" name="name" value={editedCourse.name} onChange={handleNameChange} />
                        </label>
                        <label>
                            Address:
                            <input type="text" name="address" value={editedCourse.address} onChange={handleAddressChange} />
                        </label>
                        <label>
                            Rating:
                            <input type="number" name="rating" value={editedCourse.rating} onChange={handleRatingChange} />
                        </label>
                        <label>
                            Favorite:
                            <input type="checkbox" name="favorite" checked={editedCourse.favorite} onChange={handleFavoriteChange} />
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
                    </form>
            </Modal>
        </div>
    );
};

export default CourseCard;