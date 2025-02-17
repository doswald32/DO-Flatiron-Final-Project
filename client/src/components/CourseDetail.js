import NavBar from "./NavBar";
import { useParams, useOutletContext } from "react-router-dom";

function CourseDetail () {

    const { id } = useParams();
    const { user } = useOutletContext();

    const round = user.rounds.filter(round => round.course.id === Number(id))[0]
    const course = round.course

    return (
        <>
            <header>
                <NavBar />
            </header>
            <h1 className="course-detail-title">Course Detail</h1>
            <div className="course-detail-info">
                {course ? (
                    <>
                        <h2>{course.name}</h2>
                        <p>
                            Website:{" "}
                            {course.website ? (
                                <a 
                                    href={course.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    {course.website}
                                </a>
                            ) : (
                                "No website available"
                            )}
                        </p>
                    </>
                ) : (
                    <p>Course not found.</p>
                )}
            </div>
        </>
    );
}

export default CourseDetail;