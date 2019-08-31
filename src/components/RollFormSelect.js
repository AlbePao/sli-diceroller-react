import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const RollFormSelect = props => (
  <Col sm="12" md="6">
    <Form.Group controlId={props.dieType}>
      <Form.Label>{props.dieType}</Form.Label>
      <Form.Control
        required
        value={props.value}
        onChange={props.handleChange}
        as="select"
        style={{
          color: 'gray',
        }}
      >
        <option value="">
          Selezionare quanti {props.dieType} lanciare
        </option>
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        Specificare quanti {props.dieType} lanciare.
      </Form.Control.Feedback>
    </Form.Group>
  </Col>
);

RollFormSelect.propTypes = {
  dieType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default RollFormSelect;
