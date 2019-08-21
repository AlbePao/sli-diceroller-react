import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const RollsTable = () => (
  <Row>
    <Col>
      <Table responsive className="mt-3">
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
          <tr>
            <td>19/08/2019 14:44</td>
            <td>Lorem ipsum</td>
            <td>Admiral</td>
            <td>Velrog</td>
            <td>2 4</td>
            <td>3 1 5</td>
            <td></td>
            <td>9</td>
            <td>12</td>
            <td>15</td>
          </tr>
          <tr>
            <td>19/08/2019 14:44</td>
            <td>Lorem ipsum</td>
            <td>Admiral</td>
            <td>Velrog</td>
            <td>2 4</td>
            <td>3 1 5</td>
            <td></td>
            <td>9</td>
            <td>12</td>
            <td>15</td>
          </tr>
          <tr>
            <td>19/08/2019 14:44</td>
            <td>Lorem ipsum</td>
            <td>Admiral</td>
            <td>Velrog</td>
            <td>2 4</td>
            <td>3 1 5</td>
            <td></td>
            <td>9</td>
            <td>12</td>
            <td>15</td>
          </tr>
        </tbody>
      </Table>
    </Col>
  </Row>
);

export default RollsTable;
