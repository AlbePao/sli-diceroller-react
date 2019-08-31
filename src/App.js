import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RollForm from './components/RollForm';
import RollResult from './components/RollResult';
import RollsTable from './components/RollsTable';

class App extends Component {
  constructor() {
    super();

    this.state = {
      rollData: {},
      rollResult: {},
      rollsList: [],
      rollsListLoading: false,
    };

    this.submitRoll = this.submitRoll.bind(this);
  }

  componentDidMount() {
    this.getRolls();
  }

  getRolls() {
    // TODO: get rolls from Firebase and save them into state, beware of pagination
    this.setState({ rollsList: [] });
  }


  submitRoll(rollData) {
    const dieTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
    const rollResult = {};

    this.setState({
      rollData: {},
      rollResult: {},
    });

    dieTypes.forEach(dieType => {
      rollResult[dieType] = [];

      for (let i = 0; i < rollData[dieType]; i += 1) {
        const roll =
          Math.floor(
            Math.random() * parseInt(dieType.substr(1), 10),
          ) + 1;
        rollResult[dieType].push(roll);
      }
    });


    /**
     * TODO: make a roll, save result to Firebase, clear form and getRolls()
     * TODO: handle Firebase error and show error alert
     */
    this.setState({
      rollData,
      rollResult,
    });
  }

  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <img
              src="/logo.png"
              height="30"
              className="d-inline-block align-top"
              alt="Sonic Legacy Italia Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="https://www.soniclegacy.it/">
              Blog
            </Nav.Link>
            <Nav.Link href="https://www.soniclegacy.it/forum/">
              Forum
            </Nav.Link>
            <Nav.Link href="https://www.facebook.com/SonicLegacyItalia/">
              Facebook
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <Container className="mt-4">
          <h1 className="text-center">Lancio dadi GdR</h1>
          <hr />
          <Row>
            <Col>
              <p>Lorem ipsum dolor sit amet, dice roller overview</p>
            </Col>
          </Row>
          <RollForm submitRoll={this.submitRoll} />

          <RollResult
            rollData={this.state.rollData}
            rollResult={this.state.rollResult}
          />

          <RollsTable
            rollsList={this.state.rollsList}
            rollsListLoading={this.state.rollsListLoading}
          />
        </Container>
      </>
    );
  }
}

export default App;
