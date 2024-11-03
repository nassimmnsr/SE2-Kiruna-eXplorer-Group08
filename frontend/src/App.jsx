// App.js
import { Container } from "react-bootstrap";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListDocuments from "./components/ListDocuments";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Container fluid className="d-flex flex-column min-vh-100 p-0 mt-5">
        <Routes>
          <Route
            element={
              <>
                <Outlet />
              </>
            }
          >
            <Route path="/" element={<ListDocuments />} />
            <Route
              path="*"
              element={
                <>
                  <h1>404 Not Found</h1> <p>Try searching for something else</p>
                </>
              }
            />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
