import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Modal from "./Modal";

function CourseCard({ id, name, address, rating, favorite }) {

    const navigate = useNavigate()

    const { setUser, user } = useOutletContext();
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
        .then(() => {
            return fetch(`/users/${user.id}`);
        })
        .then((r) => r.json())
        .then((updatedUser) => {
            setUser(updatedUser); 
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


    return (
        <div className="course-card" onClick={() => navigate(`/course-detail/${id}`)}>
            <div className="card-header">
            <span className="favorite-star">{favorite ? "⭐" : "\u00A0"}</span>
                <h3>{name}</h3>
                <button className="delete-button" onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(true);
                }}>X</button>
            </div>
            <div>
                <p>{address}</p>
                <p>Rating: {rating}</p>

                <button className="course-edit-button" onClick={(e) => {
                    e.stopPropagation();
                    setShowEditModal(true);
                }}>Edit</button>
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
                        return fetch(`/users/${user.id}`);
                    })
                    .then((r) => r.json())
                    .then((updatedUser) => {
                        setUser(updatedUser);
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
                    <form className="edit-form" onSubmit={handleCourseUpdate}>
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