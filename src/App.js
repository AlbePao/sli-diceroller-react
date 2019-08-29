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
      reason: '',
      user: '',
      character: '',
      d4: null,
      d6: null,
      d8: null,
      d10: null,
      d12: null,
      d20: null,
      rollResult: {},
      rollData: {},
      rollsList: [],
      rollsListLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitRoll = this.submitRoll.bind(this);
  }

  componentDidMount() {
    this.getRolls();
  }

  getRolls() {
    // TODO: get rolls from Firebase and save them into state, beware of pagination
    this.setState({ rollsList: [] });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  getCurrentDate() {
    const currentDate = new Date();
    const prependZero = value => (value < 10 ? `0${value}` : value);

    const date = prependZero(currentDate.getDate());
    const month = prependZero(currentDate.getMonth() + 1);
    const year = prependZero(currentDate.getFullYear());

    const hour = prependZero(currentDate.getHours());
    const minute = prependZero(currentDate.getMinutes());
    const second = prependZero(currentDate.getSeconds());

    return `${date}/${month}/${year} ${hour}:${minute}:${second}`;
  }

  submitRoll() {
    const dieTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
    const rolls = {};

    dieTypes.forEach(dieType => {
      rolls[dieType] = [];

      for (let i = 0; i < this.state[dieType]; i += 1) {
        const roll =
          Math.floor(
            Math.random() * parseInt(dieType.substr(1), 10),
          ) + 1;
        rolls[dieType].push(roll);
      }
    });

    this.setState(prevState => ({
      rollResult: rolls,
      rollData: {
        date: this.getCurrentDate(),
        reason: prevState.reason,
        user: prevState.user,
        character: prevState.character,
        d4: prevState.d4,
        d6: prevState.d6,
        d8: prevState.d8,
        d10: prevState.d10,
        d12: prevState.d12,
        d20: prevState.d20,
      },
    }));

    /**
     * TODO: make a roll, save result to Firebase, clear form and getRolls()
     * TODO: handle Firebase error and show error alert
     */
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
          <RollForm
            handleChange={this.handleChange}
            handleSubmit={this.submitRoll}
          />

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
