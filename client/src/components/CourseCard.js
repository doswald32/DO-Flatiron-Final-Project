function CourseCard({ name, address, rating, favorite }) {

    return (
        <div className="course-card-container">
            <div className="course-card-info-container">
                <p>Course Name: {name}</p>
                <p>Address: {address}</p>
                <p>Rating: {rating}</p>
                <p>Favorite: {favorite}</p>
            </div>
        </div>
    );
};

export default CourseCard;