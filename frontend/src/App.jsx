// App.js
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import ListDocuments from './components/ListDocuments';

const App = () => (
  <Container fluid className="d-flex flex-column min-vh-100 p-0">
    <Header />
    <ListDocuments/>
    <Footer />
  </Container>
);

export default App;
