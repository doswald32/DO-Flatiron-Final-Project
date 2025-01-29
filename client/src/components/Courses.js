import { useOutletContext } from "react-router-dom";
import CourseCard from "./CourseCard";
import NavBar from "./NavBar";

function Courses() {

    const { courses } = useOutletContext();

    return (
        <>
            <header>
                <NavBar />
            </header>
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