import NavBar from "./NavBar";
import { useParams, useOutletContext } from "react-router-dom";

function CourseDetail () {

    const { id } = useParams();
    const { courses } = useOutletContext();

    const course = courses.find((course) => course.id === Number(id))

    return (
        <>
            <header>
                <NavBar />
            </header>
            <h1>Course Detail</h1>
            <h2>{course.name}</h2>
        </>
    )
}

export default CourseDetail;