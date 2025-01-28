import { useOutletContext } from "react-router-dom";
import CourseCard from "./CourseCard";

function Courses() {

    const { courses } = useOutletContext();

    return (
        <>
            <h1>Courses</h1>
            <div className="courses-list">
            {courses.map((course) => {
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
        </>
    );
};

export default Courses;