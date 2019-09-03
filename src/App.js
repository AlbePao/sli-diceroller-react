import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import RollForm from './components/RollForm';
import RollResult from './components/RollResult';
import RollsTable from './components/RollsTable';
import firebase from './firebase';

class App extends Component {
  constructor() {
    super();

    this.state = {
      rollResult: {},
      rollsList: [],
      rollsListLoading: true,
      rollsListLastPage: false,
      rollsListLastId: '__firstPage__',
    };

    this.getRolls = this.getRolls.bind(this);
    this.submitRoll = this.submitRoll.bind(this);
  }

  componentDidMount() {
    this.getRolls();
  }

  getRolls() {
    const pageSize = 11;

    firebase.database()
    .ref('rollsList')
    .orderByKey()
    .endAt(this.state.rollsListLastId)
    .limitToLast(pageSize)
    .on('value', snapshot => {
      const rolls = snapshot.val();
      const rollsArray = [];

      for (const roll in rolls) {
        if (roll) {
          rollsArray.push({
            id: roll,
            ...rolls[roll],
          });
        }
      }

      const rollsListLastPage = rollsArray.length < pageSize;
      const rollsListLastId = rollsListLastPage === false ? rollsArray.splice(0, 1)[0].id : '__lastPage__';

      this.setState(prevState => ({
        rollsList: [
          ...prevState.rollsList,
          ...rollsArray.reverse(),
        ],
        rollsListLoading: false,
        rollsListLastPage,
        rollsListLastId,
      }));
    });
  }

  submitRoll(rollData) {
    const dieTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
    const rollResults = {};

    this.setState({
      rollResult: {},
    });

    dieTypes.forEach(dieType => {
      rollResults[dieType] = [];

      for (let i = 0; i < rollData[dieType]; i += 1) {
        const roll =
          Math.floor(
            Math.random() * parseInt(dieType.substr(1), 10),
          ) + 1;
        rollResults[dieType].push(roll);
      }
    });

    this.setState({
      rollResult: {
        rollData,
        rollResults,
      },
    }, () => {
      firebase.database()
      .ref('rollsList')
      .push(this.state.rollResult, () => {
        this.setState({
          rollsList: [],
          rollsListLoading: true,
          rollsListLastPage: false,
          rollsListLastId: '__firstPage__',
        }, () => {
          this.getRolls();
        });
      });
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

          <RollResult rollResult={this.state.rollResult} />

          <RollsTable
            rollsList={this.state.rollsList}
            rollsListLoading={this.state.rollsListLoading}
          />

          {this.state.rollsListLastPage === false ? (
            <Row>
              <Col className="text-center mt-3 mb-5">
                <Button
                  variant="primary"
                  disabled={this.state.rollsListLoading}
                  onClick={this.getRolls}
                >
                  {this.state.rollsListLoading ? 'Caricamento...' : 'Carica altri lanci'}
                </Button>
              </Col>
            </Row>
          ) : null}
        </Container>
      </>
    );
  }
}

export default App;
