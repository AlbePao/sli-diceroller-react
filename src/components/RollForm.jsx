import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import RollFormSelect from './RollFormSelect';

const defaultState = {
  reason: '',
  user: '',
  character: '',
  d4: '',
  d6: '',
  d8: '',
  d10: '',
  d12: '',
  d20: '',
  isValidated: false,
  isSubmitting: false,
};

const getCurrentDate = () => {
  const currentDate = new Date();
  const prependZero = (value) => (value < 10 ? `0${value}` : value);

  const date = prependZero(currentDate.getDate());
  const month = prependZero(currentDate.getMonth() + 1);
  const year = prependZero(currentDate.getFullYear());

  const hour = prependZero(currentDate.getHours());
  const minute = prependZero(currentDate.getMinutes());
  const second = prependZero(currentDate.getSeconds());

  return `${date}/${month}/${year} ${hour}:${minute}:${second}`;
};

class RollForm extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ isValidated: true });

    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      const { submitRoll } = this.props;
      const {
        reason,
        user,
        character,
        d4,
        d6,
        d8,
        d10,
        d12,
        d20,
      } = this.state;

      submitRoll({
        date: getCurrentDate(),
        reason,
        user,
        character,
        d4,
        d6,
        d8,
        d10,
        d12,
        d20,
      });

      this.setState(defaultState);
    }
  }

  render() {
    const {
      isValidated,
      reason,
      user,
      character,
      d4,
      d6,
      d8,
      d10,
      d12,
      d20,
      isSubmitting,
    } = this.state;

    return (
      <Form
        noValidate
        validated={isValidated}
        onSubmit={this.handleSubmit}
        className="mb-3"
      >
        <Row>
          <Col>
            <Form.Group controlId="reason">
              <Form.Label>Motivo lancio</Form.Label>
              <Form.Control
                required
                value={reason}
                onChange={this.handleChange}
                placeholder="Inserire il motivo indicato dal GdR Master"
              />
              <Form.Control.Feedback type="invalid">
                Specificare il motivo del lancio dadi.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm="12" md="6">
            <Form.Group controlId="user">
              <Form.Label>Nome utente</Form.Label>
              <Form.Control
                required
                value={user}
                onChange={this.handleChange}
                placeholder="Inserire il tuo nome utente"
              />
              <Form.Control.Feedback type="invalid">
                Inserire il proprio nome utente sul forum.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm="12" md="6">
            <Form.Group controlId="character">
              <Form.Label>Nome personaggio</Form.Label>
              <Form.Control
                required
                value={character}
                onChange={this.handleChange}
                placeholder="Inserire il nome del tuo personaggio"
              />
              <Form.Control.Feedback type="invalid">
                Inserire il nome del proprio personaggio nel GdR.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <RollFormSelect
            dieType="d4"
            value={d4}
            handleChange={this.handleChange}
          />
          <RollFormSelect
            dieType="d6"
            value={d6}
            handleChange={this.handleChange}
          />
        </Row>

        <Row>
          <RollFormSelect
            dieType="d8"
            value={d8}
            handleChange={this.handleChange}
          />
          <RollFormSelect
            dieType="d10"
            value={d10}
            handleChange={this.handleChange}
          />
        </Row>

        <Row>
          <RollFormSelect
            dieType="d12"
            value={d12}
            handleChange={this.handleChange}
          />
          <RollFormSelect
            dieType="d20"
            value={d20}
            handleChange={this.handleChange}
          />
        </Row>

        <Button
          variant="primary"
          disabled={isSubmitting}
          type={!isSubmitting ? 'submit' : null}
        >
          {!isSubmitting ? 'Lancia dadi' : 'Lancio dadi...'}
        </Button>
      </Form>
    );
  }
}

RollForm.propTypes = {
  submitRoll: PropTypes.func.isRequired,
};

export default RollForm;
