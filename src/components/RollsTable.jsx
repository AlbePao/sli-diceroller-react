import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

const RollsTable = props => (
  <>
    {props.rollsList.length === 0 ? (
      <Row>
        <Col className="text-center py-4">
          {props.rollsListLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            'Nessun lancio di dadi presente'
          )}
        </Col>
      </Row>
    ) : (
      props.rollsList.map(
        (roll, rollIndex) => (
          <Row key={rollIndex}>
            <Col lg="12">
              <hr />
            </Col>
            <Col lg="8">
              <Table responsive hover className="mt-3">
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
              <Table responsive hover className="mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Risultati lanci</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(roll.rollResults || {}).map(rollResultIndex => (
                    <tr key={rollResultIndex}>
                      <th scope="row">{rollResultIndex}</th>
                      <td>{roll.rollResults[rollResultIndex].join(' ')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )
      )
    )}
  </>
);

RollsTable.propTypes = {
  rollsList: PropTypes.array.isRequired,
  rollsListLoading: PropTypes.bool.isRequired,
};

export default RollsTable;
