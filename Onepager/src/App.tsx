import Header from "./Header.js";
import Sprint0 from "./Sprint0.jsx";
import Team1 from "./Team.jsx";
import Sprint1 from "./Sprint1.jsx";
import Nav from "./Nav.js";
import { Routes, Route } from "react-router-dom";
import Sprint2 from "./Sprint2";
import Sprint3 from "./Sprint3";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div id="top"></div>
              <Nav />
            </>
          }
        >
          <Route
            index
            element={
              <>
                <Header />
                <main className="relative z-10 mt-[100vh]">
                  <Team1 />
                  <Sprint0 />
                  <Sprint1 />
                  <Sprint2 />
                  <Sprint3 />
                </main>
              </>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
