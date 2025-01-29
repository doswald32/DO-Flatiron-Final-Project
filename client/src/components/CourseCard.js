import { Link, useOutletContext } from "react-router-dom";

function CourseCard({ id, name, address, rating, favorite }) {

    const { courses, setCourses } = useOutletContext();

    function handleCourseDelete() {
        const shouldRemove = window.confirm("Are you sure you want to delete this course?")
        if (shouldRemove) {
            fetch(`http://127.0.0.1:5555/courses/${id}`, {
                method: 'DELETE',
            })
            .then((r) => {
                if (!r.ok) {
                    throw new Error("Error deleting course.")
                } else {
                    r.json();
                }
            })
            .then(() => setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id)))
            .catch((error) => {
                console.error("Error deleting course:", error);
            })
        }

    }

    console.log(courses)

    return (
        <div className="course-card-container">
            <div className="course-card-info-container">
                <p>Course Name: {name}</p>
                <p>Address: {address}</p>
                <p>Rating: {rating}</p>
                <p>Favorite: {favorite ? 'True' : null}</p>
                <Link className="course-detail-button" to={`/course-detail/${id}`}>Course Detail</Link>
                <button className="course-delete-button" onClick={handleCourseDelete}>X</button>
            </div>
        </div>
    );
};

export default CourseCard;