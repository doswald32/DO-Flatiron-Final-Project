import { useOutletContext } from "react-router-dom";
import NavBar from "./NavBar";

function Home() {

    const { user } = useOutletContext();

    return (
        <main>
            <header>
                <NavBar />
            </header>
            <div>
                <h1>Welcome {user.first_name}!</h1>
            </div>
        </main>
    )
}

export default Home;