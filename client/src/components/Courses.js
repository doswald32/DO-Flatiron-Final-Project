import { useUser } from "./UserContext"
import CourseCard from "./CourseCard";
import NavBar from "./NavBar";

function Courses() {
    
    const { user } = useUser();

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
            <h2 className="courses-title">Courses</h2>
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