import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ifgiLogo from "../../img/ifgiLogoWhite.svg";
import { useSelector } from "react-redux";
function Footer() {
  const language = useSelector((state) => state.language);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const openModal = () => {
    handleShow();
  };

  return (
    <>
      <Container
        id='Footer'
        className={language === "englisch" ? "master-links" : ""}>
        <Row>
          <Col xs='12' md='6'>
            {" "}
            <a
              href='https://www.uni-muenster.de/Geoinformatics/'
              target='_blank'
              rel='noreferrer'>
              <img
                src={ifgiLogo}
                className='logo'
                id='white-logo'
                alt='Logo of ifgi'
              />
            </a>
          </Col>
          <Col xs='12' md='6' id='links-col-footer'>
            {" "}
            {language === "german" ? (
              <div className='footer-links'>
                <Button
                  variant='link'
                  onClick={() => {
                    openModal();
                  }}>
                  Impressum
                </Button>
                <br />
                <a href='https://www.uni-muenster.de/de/datenschutzerklaerung.html'>
                  Datenschutzerkl√§rung
                </a>
              </div>
            ) : language === "englisch" ? (
              <div className='footer-links'>
                <Button
                  variant='link'
                  onClick={() => {
                    openModal();
                  }}
                  className='master-color englisch-imprint'>
                  Contact / Legal Notice
                </Button>
                <br />
                <a href='https://www.uni-muenster.de/de/datenschutzerklaerung.html'>
                  Privacy Statement
                </a>
              </div>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {language === "german" ? (
            <>
              <h2>Kontakt</h2>
              <p>
                Institut f√ľr Geoinformatik
                <br />
                Heisenbergstra√üe 2<br />
                48149 M√ľnster
              </p>
              <p>
                Tel: +49 251 ‚Äď 83 33 08 3<br />
                Fax: +49 251 ‚Äď 83 39 76 3<br />
                geoinformatik@uni-muenster.de
              </p>

              <h2>Impressum</h2>
              <p>Westf√§lischen Wilhelms-Universit√§t M√ľnster</p>
              <p>
                Fachbereich 14 Geowissenschaften
                <br />
                Heisenbergstr. 2, 48149 M√ľnster
                <br />
                Tel.: +49 251 83-30001
                <br />
                E-Mail: gfgeo@uni-muenster.de
              </p>
              <p>
                Der Fachbereich 14 Geowissenschaften ist eine Einrichtung der
                Westf√§lischen Wilhelms-Universit√§t M√ľnster, WWU. Die WWU ist
                eine K√∂rperschaft des √∂ffentlichen Rechts und zugleich eine
                Einrichtung des Landes Nordrhein-Westfalen. Sie wird vertreten
                durch Rektor Prof. Dr. Johannes Wessels.
              </p>
              <h2>Zust√§ndige Aufsichtsbeh√∂rde</h2>
              <p>
                Ministerium f√ľr Innovation, Wissenschaft und Forschung des
                Landes Nordrhein-Westfalen
                <br />
                V√∂lklinger Stra√üe 49
                <br />
                40221 D√ľsseldorf
                <br />
                <br />
                Umsatzsteuer-ID-Nummer: DE 126118759
              </p>
              <h2>Redaktionell verantwortlich gem√§√ü ¬ß 55 Abs. 2 (RStV):</h2>
              <p>
                Gesch√§ftsf√ľhrender Direktor
                <br />
                Prof. Dr. Christian Kray
                <br />
                Heisenbergstra√üe 2
                <br />
                D-48149 M√ľnster
                <br />
                <br />
                E-Mail: c.kray@uni-muenster.de
              </p>
              <h2>Sekretariat</h2>
              <p>
                Karsten H√∂welhans, Heike Wiefel, Christina Versmold
                <br />
                Telefon: +49 (251) 83-33 083
                <br />
                E-Mail: geoinformatik@uni-muenster.de
              </p>
              <h2>Haftungshinweis</h2>
              <p>
                Trotz sorgf√§ltiger inhaltlicher Kontrolle √ľbernehmen wir keine
                Haftung f√ľr die Inhalte externer Links. F√ľr den Inhalt der
                verlinkten Seiten sind ausschlie√ülich deren Betreiber
                verantwortlich.
              </p>
            </>
          ) : (
            <>
              <>
                <h2>Contact</h2>
                <p>
                  Institut f√ľr Geoinformatik
                  <br />
                  Heisenbergstra√üe 2<br />
                  48149 M√ľnster
                </p>
                <p>
                  Tel: +49 251 ‚Äď 83 33 08 3<br />
                  Fax: +49 251 ‚Äď 83 39 76 3<br />
                  geoinformatik@uni-muenster.de
                </p>
                <>
                  <h2>Legal Notice</h2>
                  <p>University of Muenster</p>
                  <p>
                    Institute for Geoinformatics
                    <br />
                    Heisenbergstr. 2
                    <br />
                    D-48149 M√ľnster
                    <br />
                    <br />
                    Phone: +49 (251) 83-33 083
                  </p>

                  <h2>Responsible for this Website:</h2>
                  <p>
                    Director
                    <br />
                    Prof. Dr. Christian Kray
                    <br />
                    Heisenbergstra√üe 2
                    <br />
                    D-48149 M√ľnster
                    <br />
                    <br />
                    E-Mail: c.kray@uni-muenster.de
                  </p>
                  <h2>Office</h2>
                  <p>
                    Karsten H√∂welhans,
                    <br />
                    Heike Wiefel,
                    <br />
                    Christina Versmold
                    <br />
                    <br />
                    Phone: +49 (251) 83-33 083
                    <br />
                    E-Mail: geoinformatik@uni-muenster.de
                  </p>
                  <h2>Notice of Liability</h2>
                  <p>
                    Although we check the content carefully, we cannot accept
                    responsibility for the content of external links. The linked
                    sites‚Äô carriers are responsible for their sites‚Äô content.
                  </p>
                </>
              </>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Footer;
