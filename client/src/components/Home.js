import { useOutletContext } from 'react-router-dom';
import NavBar from "./NavBar";

function Home() {

    const { user } = useOutletContext();

    console.log(user)

    return (
        <main>
            <header>
                <NavBar />
            </header>
            <div>
                <h1>Welcome!</h1>
            </div>
        </main>
    )
}

export default Home;