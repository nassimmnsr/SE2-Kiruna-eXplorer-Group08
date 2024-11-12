import { Button, Col, Container, Row } from "react-bootstrap";
import "../App.css";

export default function SplashPage() {
  return (
    <div className="splash-background">
      <Container className="d-flex flex-column justify-content-center">
        <Row className="text-center mb-4">
          <Col>
            <h1 className="splash-title">Kiruna eXplorer</h1>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button href="/documents" variant="light">
              Explore Documents
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
