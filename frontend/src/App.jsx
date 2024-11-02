// App.js
import { Container } from "react-bootstrap";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListDocuments from "./components/ListDocuments";

function App() {
  return (
    <Routes>
      <Route
        element={
          <>
            <Header />
            <Container fluid className="d-flex flex-column min-vh-100 p-0">
              <Outlet />
            </Container>
            <Footer />
          </>
        }
      >
        <Route path="/" element={<ListDocuments />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
