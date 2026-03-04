import Header from "./Header.jsx";
import Sprint0 from "./Sprint0.jsx";
import Team1 from "./Team.jsx";

function App() {
    return (
        <>
            <Header />
            <main className="relative z-10 mt-[100vh]">
                <Team1 />
                <Sprint0 />
            </main>
        </>
    );
}

export default App;