import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { Scrollama, Step } from "react-scrollama";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useMediaQuery } from "react-responsive";
import L from "leaflet";
import ChangeView from "./ChangeView.jsx";
import MarkerGeo from "./MarkerGeo.jsx";
import germany from "../../data/germany.json";
import nrw from "../../data/nrw.json";
import muensterland from "../../data/muensterland.json";
import muenster from "../../data/muenster.json";
import geoOneJSON from "../../data/geo1.json";
import mensaCardIcon from "../../img/icons/iconmonstr-mensa-card.svg";
import globeIcon from "../../img/icons/iconmonstr-globe.svg";
import speechBubbleIcon from "../../img/icons/iconmonstr-speech-bubble.svg";
import homeIcon from "../../img/icons/iconmonstr-home.svg";
import dropdownIcon from "../../img/icons/iconmonstr-dropdown.svg";
import mensaCardIconMaster from "../../img/icons/iconmonstr-mensa-card-master.svg";
import courseIconMaster from "../../img/icons/iconmonstr-courses-master.svg";
import globeIconMaster from "../../img/icons/iconmonstr-globe-master.svg";
import homeIconMaster from "../../img/icons/iconmonstr-home-master.svg";
import dropdownIconMaster from "../../img/icons/iconmonstr-dropdown-master.svg";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

//centers for the map at all scrollama steps
const germanyCenter = [51.8, 3.4];
const nrwCenter = [51.5, 5.2];
const muensterCenter = [52.05, 6.3];
const stadtCenter = [51.9583, 7.4];
//mobile centers
const germanyCenterMobile = [51.746079, 10.601846];
const nrwCenterMobile = [51.960667, 7.626135];
const muensterCenterMobile = [51.961869, 7.383207];
const stadtCenterMobile = [51.960667, 7.626135];

function Intro() {
  const geoOne = geoOneJSON.features[0];
  const language = useSelector((state) => state.language);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(
    isTabletOrMobile ? germanyCenterMobile : germanyCenter
  );
  const [currentZoom, setCurrentZoom] = useState(3);
  const [geoData, setGeoData] = useState(germany);
  const geoJsonLayer = useRef(null);
  //collapse boxes for the first steps part
  const [openInfo, setOpenInfo] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  useEffect(() => {
    if (geoJsonLayer.current) {
      geoJsonLayer.current.clearLayers().addData(geoData);
    }
  }, [geoData]);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
    if (data === 0 || data === 1) {
      setCurrentCenter(isTabletOrMobile ? germanyCenterMobile : germanyCenter);
      setCurrentZoom(isTabletOrMobile ? 5 : 5.9);
      setGeoData(germany);
    }
    if (data === 2) {
      setCurrentCenter(isTabletOrMobile ? nrwCenterMobile : nrwCenter);
      setCurrentZoom(isTabletOrMobile ? 7 : 7.5);
      setGeoData(nrw);
    }
    if (data === 3) {
      setCurrentCenter(
        isTabletOrMobile ? muensterCenterMobile : muensterCenter
      );
      setCurrentZoom(isTabletOrMobile ? 8 : 8.7);
      setGeoData(muensterland);
    }
    if (data === 4) {
      setCurrentCenter(isTabletOrMobile ? stadtCenterMobile : stadtCenter);
      setCurrentZoom(isTabletOrMobile ? 10.5 : 10.9);
      setGeoData(muenster);
    }
    return null;
  };

  const onEachPolygon = (polygon, layer) => {
    layer.options.fillColor = language === "german" ? "#7ab629" : "#009DD2";
    layer.options.fillOpacity = 0.6;
    layer.options.color = language === "german" ? "#7ab629" : "#009DD2";
  };

  const style = { fillColor: " #4C4C4A", color: "#4C4C4A", fillOpacity: 0.6 };

  return (
    <>
      <div id='Intro'>
        <div id='storymap-container'>
          <MapContainer
            scrollWheelZoom={false}
            zoomControl={false}
            dragging={false}
            tap={false}
            center={germanyCenter}
            zoom={5}
            id='storymap'>
            <ChangeView center={currentCenter} zoom={currentZoom} />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <GeoJSON
              ref={geoJsonLayer}
              key={"theOneGEOJSON"}
              data={geoData}
              //onEachFeature={onEachPolygon}
              style={style}
            />
            <MarkerGeo point={geoOne} key={geoOne.id} />
          </MapContainer>
        </div>
        <Scrollama onStepEnter={onStepEnter}>
          <Step data={1} key={1}>
            <div
              className={
                isTabletOrMobile
                  ? "storymap-description mobile first overflow-x"
                  : "storymap-description first"
              }>
              {language === "german" ? (
                <>
                  {" "}
                  <h2>Willkommen in deinem neuen Zuhause!</h2>
                  <p>
                    Schön, dass du dich entschieden hast, nach Münster zu
                    kommen. SChön aber vor allem, dass du ab sofort
                    Geoinformatik studieren wirst!
                  </p>
                  <p>
                    Damit du einen guten Start in deinem Studierendenleben hast,
                    wollen wir dir auf dieser Seite einerseits hilfreiche Tipps
                    geben und dir die wichtigsten Orte in Münster zeigen. Ganz
                    auf die Geoinformatiker-Art haben, wir dafür diese Website
                    mit interaktiven Karten versehen. Diese erste Karte, welche
                    sich aktuell im Hintergrund befindet, wirst du Schritt für
                    Schritt nach Münster geführt und damit du nie die
                    Orientierung verlierst ist das GEO-Gebäude stehts mit dem
                    ifgi-Logo markiert.
                  </p>
                </>
              ) : language === "englisch" ? (
                <>
                  {" "}
                  <h2>Welcome to Your New Home!</h2>
                  <p>
                    Welcome to Münster and also welcome to the Institute of
                    Geoinformatics.
                  </p>
                  <p>
                    {" "}
                    To help you starting your life in Münster, we want to give
                    you some tips and basic information and show you the most
                    important places in Münster. In true geoinformatics fashion,
                    we provide you this website with interactive maps. On this
                    first map which you can see in the background, you will be
                    guided step by step to the city of Münster. The ifgi-logo
                    marks the GEO-building to not get disorientated on the map.
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          </Step>
          <Step data={2} key={2}>
            <div
              className={
                isTabletOrMobile
                  ? "storymap-description mobile overflow-x"
                  : "storymap-description"
              }>
              {language === "german" ? (
                <>
                  <h2>Ein Teil Nordrhein-Westfalens</h2>
                  <p>
                    Nordrhein-Westfalen (NRW) ist das befölkerungsreichste
                    Bundesland Deutschlands. Und mit über 300.000 Einwohnerinnen
                    und Einwohnern ist Münster unter den Top-Ten Städten NRWs.
                  </p>
                  <p>Deutsche Bahn Ticket</p>
                </>
              ) : language === "englisch" ? (
                <>
                  <h2>Part of Northrhine Westfalia</h2>
                  <p>
                    Northrhein Westfalie (NRW) is the most populated federal
                    state of Germany. With over 300,000 inhabitants Münster is
                    on of the top ten citys in NRW.
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          </Step>
          <Step data={3} key={3}>
            <div
              className={
                isTabletOrMobile
                  ? "storymap-description mobile overflow-x"
                  : "storymap-description"
              }>
              {language === "german" ? (
                <>
                  <h2>Münsterland. Felder, Fahrräder und Schönheit.</h2>
                  <p>
                    Mit 188,7 Metern Höhe ist der Westerberg der höchste Punkt
                    des Münsterlandes und genau aus diesem Grund ist das Fahrrad
                    der absolute Renner in Münster. Jede Strecke lässt sich ohne
                    große Anstrengung bewältigen, macht Spaß und schont
                    Geldbeutel und Umwelt. Außerdem kann sich das Münsterland
                    sehen lassen. Eine Vielzahl von Burgen und Schlössern, sowie
                    viel Natur laden zu entspannten Ausflügen ein.
                  </p>
                </>
              ) : language === "englisch" ? (
                <>
                  <h2>Münsterland. Fields, Bicycles and Beauty.</h2>
                  <p>
                    The Westerberg is the highest point of the Münsterland with
                    188.7 meters. Therefore, it is allways the right decision to
                    take the bike. It is easy to use because of the flat
                    terrain, it is cheap and environmentally friendly and beside
                    that it makes a lot of fun. With a huge number of castles
                    and palaces and a lot of nature it is always worth a tour.
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          </Step>

          <Step data={4} key={4}>
            <div
              className={
                isTabletOrMobile
                  ? "storymap-description mobile overflow-x"
                  : "storymap-description"
              }>
              {language === "german" ? (
                <>
                  <h2>Eine Hansestadt mit bewegter Geschichte</h2>
                  <p>
                    Münster ist seit jeher ein zentraler Handelknotenpunkt und
                    ist auch heute noch ein Zentrum für eine übergeordnete
                    Region.
                  </p>
                  <p>
                    Am Ende der Seite findest du die schönsten Orte in einer
                    Liste
                  </p>
                </>
              ) : language === "englisch" ? (
                <>
                  <h2>Hanseatic City With an Eventful History</h2>
                  <p>
                    Münster has always been an important trading hub and so it
                    is still a central city .{" "}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          </Step>
          <Step data={5} key={5}>
            <div
              style={{
                marginTop: "100vh",
                marginLeft: "5vw",
                marginRight: "5vw",
                border: "1px solid gray",
                backgroundColor: "white",
                opacity: "0.0",
                padding: "30px",
              }}>
              This is the End
            </div>
          </Step>
        </Scrollama>
        <Container
          id='FirstSteps'
          className={
            language === "englisch"
              ? isTabletOrMobile
                ? "master-links mobile overflow-x"
                : "master-links"
              : isTabletOrMobile
              ? "mobile overflow-x"
              : ""
          }>
          <Row>
            <Col>
              {language === "german" ? (
                <h2>Deine ersten Schritte:</h2>
              ) : language === "englisch" ? (
                <h2>Your First Steps:</h2>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row>
            <Col
              xs='12'
              md='6'
              className={
                language === "englisch"
                  ? "firststeps-col englisch"
                  : "firststeps-col"
              }>
              {language === "german" ? (
                <>
                  <img
                    src={speechBubbleIcon}
                    className='firststeps-icon'
                    alt='Icon of speechbubbles'
                  />

                  <h3>Lerne Menschen kennen!</h3>

                  <Collapse in={openInfo[1]}>
                    <div id='example-collapse-text'>
                      <p>
                        Natürlich ist es möglich, das Studium im Alleingang
                        durchzuziehen, aber gemeinsam macht das Ganze doch viel
                        mehr Spaß. Die besten Möglichkeiten, deine
                        Kommilitoninnen und Kommilitonen kennenzulernen, bieten
                        die Angebote der Fachschaften.
                        <br />
                        Informiere dich daher über die Ersti-Woche auf der{" "}
                        <a
                          href='https://geofs.uni-muenster.de/wp/erstsemester/studienstart/'
                          target='_blank'
                          rel='noreferrer'>
                          Homepage deiner Fachschaft
                        </a>
                        .
                      </p>
                      <p>
                        Neben der Einführungswoche gibt es auch ein
                        Ersti-Wochenende und verschiedene andere Veranstaltungen
                        zum Connecten.
                      </p>
                    </div>
                  </Collapse>
                  <div
                    onClick={() =>
                      setOpenInfo({
                        ...openInfo,
                        [1]: !openInfo[1],
                      })
                    }
                    aria-controls='example-collapse-text'
                    aria-expanded={openInfo}>
                    <img
                      src={dropdownIcon}
                      className={
                        openInfo[1]
                          ? "dropdown-opened dropdown-icon"
                          : "dropdown-icon"
                      }
                      alt='dropdownbutton'
                    />
                  </div>
                </>
              ) : language === "englisch" ? (
                <>
                  <img
                    src={courseIconMaster}
                    className='firststeps-icon'
                    alt='Icon for a course'
                  />
                  <h3>Course Enrolment</h3>

                  <Collapse in={openInfo[1]}>
                    <div id='example-collapse-text'>
                      <p>
                        To don't get in trouble by don't having a ID card for
                        the canteen or the library,{" "}
                        <a
                          href='https://www.uni-muenster.de/studium/orga/studienverwaltung/studierendenkarte.html'
                          target='_blank'
                          rel='noreferrer'>
                          check out this page
                        </a>
                        . Here you will get all the information you need for
                        getting your ID card and all the things you can do with
                        it.
                      </p>
                    </div>
                  </Collapse>
                  <div
                    onClick={() =>
                      setOpenInfo({
                        ...openInfo,
                        [1]: !openInfo[1],
                      })
                    }
                    aria-controls='example-collapse-text'
                    aria-expanded={openInfo}>
                    <img
                      src={dropdownIconMaster}
                      className={
                        openInfo[1]
                          ? "dropdown-opened dropdown-icon"
                          : "dropdown-icon"
                      }
                      alt='dropdownbutton'
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </Col>
            <Col
              xs='12'
              md='6'
              className={
                language === "englisch"
                  ? "firststeps-col englisch"
                  : "firststeps-col"
              }>
              {language === "german" ? (
                <>
                  <img
                    src={mensaCardIcon}
                    className='firststeps-icon'
                    alt='Icon of a Card'
                  />
                  <h3>Mensakarte beantragen!</h3>
                  <Collapse in={openInfo[2]}>
                    <div id='example-collapse-text'>
                      <p>
                        Damit du von der ersten Woche an sofort in der Mensa
                        essen gehen kannst, ohne ständig einen Aufpreis zahlen
                        zu müssen, vergiss nicht, deinen Studierendenausweis zu
                        beantragen.
                        <br />
                        <a
                          href='https://www.uni-muenster.de/studium/orga/studienverwaltung/studierendenkarte.html'
                          target='_blank'
                          rel='noreferrer'>
                          Schau dafür auf dieser Seite
                        </a>
                        , was du tun musst und was der Studierendenausweis noch
                        so alles kann.
                      </p>
                    </div>
                  </Collapse>
                  <div
                    onClick={() =>
                      setOpenInfo({
                        ...openInfo,
                        [2]: !openInfo[2],
                      })
                    }
                    aria-controls='example-collapse-text'
                    aria-expanded={openInfo}>
                    <img
                      src={dropdownIcon}
                      className={
                        openInfo[2]
                          ? "dropdown-opened dropdown-icon"
                          : "dropdown-icon"
                      }
                      alt='dropdownbutton'
                    />
                  </div>
                </>
              ) : language === "englisch" ? (
                <>
                  <img
                    src={mensaCardIconMaster}
                    className='firststeps-icon'
                    alt='Icon of a Card'
                  />
                  <h3>Apply for Student ID / Mensacard (Canteen Card)</h3>
                  <Collapse in={openInfo[2]}>
                    <div id='example-collapse-text'>
                      <p>
                        To don't get in trouble by don't having a ID card for
                        the canteen or the library,{" "}
                        <a
                          href='https://www.uni-muenster.de/studium/orga/studienverwaltung/studierendenkarte.html'
                          target='_blank'
                          rel='noreferrer'>
                          check out this page
                        </a>
                        . Here you will get all the information you need for
                        getting your ID card and all the things you can do with
                        it.
                      </p>
                    </div>
                  </Collapse>
                  <div
                    onClick={() =>
                      setOpenInfo({
                        ...openInfo,
                        [2]: !openInfo[2],
                      })
                    }
                    aria-controls='example-collapse-text'
                    aria-expanded={openInfo}>
                    <img
                      src={dropdownIconMaster}
                      className={
                        openInfo[2]
                          ? "dropdown-opened dropdown-icon"
                          : "dropdown-icon"
                      }
                      alt='dropdownbutton'
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </Col>{" "}
            <Col xs='12' md='6' className='firststeps-col'>
              {" "}
              {language === "german" ? (
                <>
                  <img
                    src={globeIcon}
                    className='firststeps-icon'
                    alt='Icon of a LGlobe'
                  />
                  <h3>Informiere dich</h3>
                  <Collapse in={openInfo[3]}>
                    <div id='example-collapse-text'>
                      <p>
                        Damit du von der ersten Woche an sofort in der Mensa
                        essen gehen kannst, ohne ständig einen Aufpreis zahlen
                        zu müssen, vergiss nicht, deinen Studierendenausweis zu
                        beantragen.
                        <br />
                        <a
                          href='https://www.uni-muenster.de/studium/orga/studienverwaltung/studierendenkarte.html'
                          target='_blank'
                          rel='noreferrer'>
                          Schau dafür auf dieser Seite
                        </a>
                        , was du tun musst und was der Studierendenausweis noch
                        so alles kann.
                      </p>
                    </div>
                  </Collapse>
                  <div
                    onClick={() =>
                      setOpenInfo({
                        ...openInfo,
                        [3]: !openInfo[3],
                      })
                    }
                    aria-controls='example-collapse-text'
                    aria-expanded={openInfo}>
                    <img
                      src={dropdownIcon}
                      className={
                        openInfo[3]
                          ? "dropdown-opened dropdown-icon"
                          : "dropdown-icon"
                      }
                      alt='dropdownbutton'
                    />
                  </div>
                </>
              ) : language === "englisch" ? (
                <>
                  <img
                    src={globeIconMaster}
                    className='firststeps-icon'
                    alt='Icon of a LGlobe'
                  />
                  <h3>Get well informed</h3>
                  <Collapse in={openInfo[3]}>
                    <div id='example-collapse-text'>
                      <p>
                        To don't get in trouble by don't having a ID card for
                        the canteen or the library,{" "}
                        <a
                          href='https://www.uni-muenster.de/studium/orga/studienverwaltung/studierendenkarte.html'
                          target='_blank'
                          rel='noreferrer'>
                          check out this page
                        </a>
                        . Here you will get all the information you need for
                        getting your ID card and all the things you can do with
                        it.
                      </p>
                    </div>
                  </Collapse>
                  <div
                    onClick={() =>
                      setOpenInfo({
                        ...openInfo,
                        [3]: !openInfo[3],
                      })
                    }
                    aria-controls='example-collapse-text'
                    aria-expanded={openInfo}>
                    <img
                      src={dropdownIconMaster}
                      className={
                        openInfo[3]
                          ? "dropdown-opened dropdown-icon"
                          : "dropdown-icon"
                      }
                      alt='dropdownbutton'
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </Col>
            <Col xs='12' md='6' className='firststeps-col'>
              {language === "german" ? (
                <>
                  <img
                    src={homeIcon}
                    className='firststeps-icon'
                    alt='Icon of a Card'
                  />
                  <h3>Finde ein neues Zuhause</h3>
                  <Collapse in={openInfo[4]}>
                    <div id='example-collapse-text'>
                      <p>
                        Damit du von der ersten Woche an sofort in der Mensa
                        essen gehen kannst, ohne ständig einen Aufpreis zahlen
                        zu müssen, vergiss nicht, deinen Studierendenausweis zu
                        beantragen.
                        <br />
                        <a
                          href='https://www.uni-muenster.de/studium/orga/studienverwaltung/studierendenkarte.html'
                          target='_blank'
                          rel='noreferrer'>
                          Schau dafür auf dieser Seite
                        </a>
                        , was du tun musst und was der Studierendenausweis noch
                        so alles kann.
                      </p>
                    </div>
                  </Collapse>
                  <div
                    onClick={() =>
                      setOpenInfo({
                        ...openInfo,
                        [4]: !openInfo[4],
                      })
                    }
                    aria-controls='example-collapse-text'
                    aria-expanded={openInfo}>
                    <img
                      src={dropdownIcon}
                      className={
                        openInfo[4]
                          ? "dropdown-opened dropdown-icon"
                          : "dropdown-icon"
                      }
                      alt='dropdownbutton'
                    />
                  </div>
                </>
              ) : language === "englisch" ? (
                <>
                  <img
                    src={homeIconMaster}
                    className='firststeps-icon'
                    alt='Icon of a Card'
                  />
                  <h3>Find a New Home</h3>

                  <Collapse in={openInfo[4]}>
                    <div id='example-collapse-text'>
                      <p>
                        To don't get in trouble by don't having a ID card for
                        the canteen or the library,{" "}
                        <a
                          href='https://www.uni-muenster.de/studium/orga/studienverwaltung/studierendenkarte.html'
                          target='_blank'
                          rel='noreferrer'>
                          check out this page
                        </a>
                        . Here you will get all the information you need for
                        getting your ID card and all the things you can do with
                        it.
                      </p>
                    </div>
                  </Collapse>
                  <div
                    onClick={() =>
                      setOpenInfo({
                        ...openInfo,
                        [4]: !openInfo[4],
                      })
                    }
                    aria-controls='example-collapse-text'
                    aria-expanded={openInfo}>
                    <img
                      src={dropdownIconMaster}
                      className={
                        openInfo[4]
                          ? "dropdown-opened dropdown-icon"
                          : "dropdown-icon"
                      }
                      alt='dropdownbutton'
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Intro;