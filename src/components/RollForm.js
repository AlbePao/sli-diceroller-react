import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import RollFormSelect from './RollFormSelect';

const RollForm = props => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      props.handleSubmit();
    }

    setValidated(true);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="mb-3"
    >
      <Row>
        <Col>
          <Form.Group controlId="reason">
            <Form.Label>Motivo lancio</Form.Label>
            <Form.Control
              required
              onChange={props.handleChange}
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
              onChange={props.handleChange}
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
              onChange={props.handleChange}
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
          handleChange={props.handleChange}
        />
        <RollFormSelect
          dieType="d6"
          handleChange={props.handleChange}
        />
      </Row>

      <Row>
        <RollFormSelect
          dieType="d8"
          handleChange={props.handleChange}
        />
        <RollFormSelect
          dieType="d10"
          handleChange={props.handleChange}
        />
      </Row>

      <Row>
        <RollFormSelect
          dieType="d12"
          handleChange={props.handleChange}
        />
        <RollFormSelect
          dieType="d20"
          handleChange={props.handleChange}
        />
      </Row>

      <Button type="submit">Lancia dadi</Button>
    </Form>
  );
};

RollForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default RollForm;
