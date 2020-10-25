import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

const RollsTable = ({
  rollsList,
  rollsListLoading,
}) => (
  <>
    {rollsList.length === 0 ? (
      <Row>
        <Col className="text-center py-4">
          {rollsListLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            'Nessun lancio di dadi presente'
          )}
        </Col>
      </Row>
    ) : (
      rollsList.map((roll) => (
        <Row key={roll.id}>
          <Col lg="12">
            <hr />
          </Col>
          <Col lg="8">
            <Table responsive striped hover className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Dati lancio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Data lancio</th>
                  <td>{roll.rollData.date}</td>
                </tr>
                <tr>
                  <th scope="row">Utente</th>
                  <td>{roll.rollData.user}</td>
                </tr>
                <tr>
                  <th scope="row">Personaggio</th>
                  <td>{roll.rollData.character}</td>
                </tr>
                <tr>
                  <th scope="row">Motivo lancio</th>
                  <td>{roll.rollData.reason}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col lg="4">
            <Table responsive striped hover className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Risultati lanci</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(roll.rollResults || {}).map((rollResultIndex) => (
                  <tr key={rollResultIndex}>
                    <th scope="row">{rollResultIndex}</th>
                    <td>{roll.rollResults[rollResultIndex].join(' ')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      ))
    )}
  </>
);

RollsTable.propTypes = {
  rollsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    rollData: PropTypes.shape({
      date: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
    }),
    rollResults: PropTypes.shape({
      d4: PropTypes.arrayOf(PropTypes.string),
      d6: PropTypes.arrayOf(PropTypes.string),
      d8: PropTypes.arrayOf(PropTypes.string),
      d10: PropTypes.arrayOf(PropTypes.string),
      d12: PropTypes.arrayOf(PropTypes.string),
      d20: PropTypes.arrayOf(PropTypes.string),
    }),
  })).isRequired,
  rollsListLoading: PropTypes.bool.isRequired,
};

export default RollsTable;
