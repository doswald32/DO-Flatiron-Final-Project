import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import CourseCard from "./CourseCard";
import NavBar from "./NavBar";
import Modal from "./Modal";

function Courses() {
    const { user, setCourses } = useOutletContext();
    const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    const [newCourse, setNewCourse] = useState({
        name: "",
        address: "",
        rating: "",
        favorite: false
    })

    function handleNameChange(e) {
        setNewCourse((prev) => ({...prev, name: e.target.value}))
    }

    function handleAddressChange(e) {
        setNewCourse((prev) => ({...prev, address: e.target.value}))
    }

    function handleRatingChange(e) {
        setNewCourse((prev) => ({...prev, rating: e.target.value}))
    }

    function handleFavoriteChange(e) {
        setNewCourse((prev) => ({...prev, favorite: e.target.checked}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/courses', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({newCourse})
        })
        .then((r) => {
            if (!r.ok) {
                throw new Error("Error creating course.")
            }
            return r.json()
        })
        .then((newCourse) => {
            setCourses((prevCourses) => [...prevCourses, newCourse]);
            setShowAddCourseModal(false);
        })
        .catch((error) => {
            console.error("Error adding course:", error)
        })
    }

    function userCourses() {
        if (user) {
            const user_courses = user.rounds.map(round => round.course);
            return user_courses;
        } else {
            return [];
        }
    }
        

    return (
        <>
            <header>
                <NavBar />
            </header>
            <div className="courses-list">
            {userCourses().map((course) => {
                return (
                    <CourseCard 
                        key={course.id}
                        id={course.id}
                        name={course.name}
                        address={course.address}
                        rating={course.rating}
                        favorite={course.favorite}
                    />
                )
            })}
            </div>
            <button onClick={() => setShowAddCourseModal(true)}>Add a Course</button>

            <Modal isOpen={showAddCourseModal} onClose={() => setShowAddCourseModal(false)}>
                <h2>Add Course</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={newCourse.name} onChange={handleNameChange} />
                    </label>
                    <label>
                        Address:
                        <input type="text" name="address" value={newCourse.address} onChange={handleAddressChange} />
                    </label>
                    <label>
                        Rating:
                        <input type="number" name="rating" value={newCourse.rating} onChange={handleRatingChange} />
                    </label>
                    <label>
                        Favorite:
                        <input type="checkbox" name="favorite" checked={newCourse.favorite} onChange={handleFavoriteChange} />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setShowAddCourseModal(false)}>Cancel</button>
                </form>
            </Modal>
        </>
    );
};

export default Courses;