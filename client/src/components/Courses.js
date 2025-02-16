import { useOutletContext } from "react-router-dom";
import CourseCard from "./CourseCard";
import NavBar from "./NavBar";

function Courses() {
    
    const { user } = useOutletContext();

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
                        website={course.website}
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