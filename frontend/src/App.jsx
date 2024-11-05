// App.js
import { Container, Row } from "react-bootstrap";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListDocuments from "./components/ListDocuments";
import SplashPage from "./components/SplashPage";
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
            <Route path="/documents" element={<ListDocuments />} />
            <Route path="/" element={<SplashPage />} />
            <Route
              path="*"
              element={
                <Container className="d-flex justify-content-center align-items-center min-vh-100">
                  <Row className="text-center">
                    <h1>404 Not Found</h1>
                    <p>Try searching for something else</p>
                  </Row>
                </Container>
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
