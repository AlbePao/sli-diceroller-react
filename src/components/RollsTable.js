import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

const RollsTable = props => (
  <Row>
    <Col>
      <Table responsive hover className="mt-3">
        <thead>
          <tr>
            <th>Data lancio</th>
            <th>Motivo lancio</th>
            <th>Utente</th>
            <th>Personaggio</th>
            <th>d4</th>
            <th>d6</th>
            <th>d8</th>
            <th>d10</th>
            <th>d12</th>
            <th>d20</th>
          </tr>
        </thead>
        <tbody>
          {props.rollsListLoading ? (
            <tr>
              <td colSpan="10" className="text-center py-4">
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
          ) : (
            props.rollsList.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  Nessun lancio di dadi presente
                </td>
              </tr>
            ) : (
              props.rollsList.map(
                (roll, rollIndex) => (
                  <tr key={rollIndex}>
                    <td>{roll.rollData.date}</td>
                    <td>{roll.rollData.reason}</td>
                    <td>{roll.rollData.user}</td>
                    <td>{roll.rollData.character}</td>
                    <td>{roll.rollResult.d4.join(' ')}</td>
                    <td>{roll.rollResult.d6.join(' ')}</td>
                    <td>{roll.rollResult.d8.join(' ')}</td>
                    <td>{roll.rollResult.d10.join(' ')}</td>
                    <td>{roll.rollResult.d12.join(' ')}</td>
                    <td>{roll.rollResult.d20.join(' ')}</td>
                  </tr>
                )
              )
            )
          )}
        </tbody>
      </Table>
    </Col>
  </Row>
);

RollsTable.propTypes = {
  rollsList: PropTypes.array.isRequired,
  rollsListLoading: PropTypes.bool.isRequired,
};

export default RollsTable;
