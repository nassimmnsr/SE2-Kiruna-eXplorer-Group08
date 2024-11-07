// Footer.js
import { Container, Navbar } from 'react-bootstrap';
import dayjs from 'dayjs';

export default function Footer() {
    const currentYear = dayjs().year();

    return (
        <Navbar style={{ backgroundColor: "#2f354b" }} fixed="bottom">
            <Container fluid className="px-3">
                <Navbar.Text className="text-white"> {currentYear} - Kiruna Explorer licensed under CC BY SA.</Navbar.Text>
            </Container>
        </Navbar>
    );
}
