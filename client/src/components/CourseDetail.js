import NavBar from "./NavBar";
import { useParams, useOutletContext } from "react-router-dom";

function CourseDetail () {

    const { id } = useParams();
    const { user } = useOutletContext();

    const round = user.rounds.filter(round => round.course.id === Number(id))[0]
    const course = round.course

    console.log("Rounds: ", round)
    console.log("Course: ", round.course)

    return (
        <>
            <header>
                <NavBar />
            </header>
            <h1>Course Detail</h1>
            {course ? (
                <>
                    <h2>Name: {course.name}</h2>
                    <p>Address: {course.address}</p>
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
        </>
    );
}

export default CourseDetail;