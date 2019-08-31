import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import RollFormSelect from './RollFormSelect';

class RollForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      this.props.submitRoll({
        date: this.getCurrentDate(),
        reason: this.state.reason,
        user: this.state.user,
        character: this.state.character,
        d4: this.state.d4,
        d6: this.state.d6,
        d8: this.state.d8,
        d10: this.state.d10,
        d12: this.state.d12,
        d20: this.state.d20,
      });
      // TODO: form reset
    }

    this.setState({ isValidated: true });
  }

  render() {
    return (
      <Form
        noValidate
        validated={this.state.isValidated}
        onSubmit={this.handleSubmit}
        className="mb-3"
      >
        <Row>
          <Col>
            <Form.Group controlId="reason">
              <Form.Label>Motivo lancio</Form.Label>
              <Form.Control
                required
                value={this.state.reason}
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
                value={this.state.user}
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
                value={this.state.character}
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
            value={this.state.d4}
            handleChange={this.handleChange}
          />
          <RollFormSelect
            dieType="d6"
            value={this.state.d6}
            handleChange={this.handleChange}
          />
        </Row>

        <Row>
          <RollFormSelect
            dieType="d8"
            value={this.state.d8}
            handleChange={this.handleChange}
          />
          <RollFormSelect
            dieType="d10"
            value={this.state.d10}
            handleChange={this.handleChange}
          />
        </Row>

        <Row>
          <RollFormSelect
            dieType="d12"
            value={this.state.d12}
            handleChange={this.handleChange}
          />
          <RollFormSelect
            dieType="d20"
            value={this.state.d20}
            handleChange={this.handleChange}
          />
        </Row>

        <Button
          variant="primary"
          disabled={this.state.isSubmitting}
          type={this.state.isSubmitting === false ? 'submit' : null}
        >
          {this.state.isSubmitting === false ? 'Lancia dadi' : 'Lancio dadi...'}
        </Button>
      </Form>
    );
  }
}

RollForm.propTypes = {
  submitRoll: PropTypes.func.isRequired,
};

export default RollForm;
