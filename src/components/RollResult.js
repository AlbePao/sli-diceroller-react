import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const RollResult = props => {
  if (Object.keys(props.rollResult).length === 0) {
    return null;
  }

  return (
    <Alert variant="primary">
      <Alert.Heading>Lancio effettuato!</Alert.Heading>
      <p>
        Lancio effettuato con successo. Hai ottenuto i seguenti
        risultati
      </p>
      {Object.keys(props.rollResult).map(
        (rollResult, rollResultIndex) => (
          <p key={rollResultIndex}>
            {props.rollResult[rollResult].map(
              (dieResult, dieResultIndex) => (
                <span key={dieResultIndex} className="mx-1">
                  <img
                    src={`https://www.soniclegacy.it/wp-content/uploads/2019/08/${rollResult}_${dieResult}.gif`}
                    alt={`d${rollResult}`}
                  />
                </span>
              ),
            )}
          </p>
        ),
      )}
      <hr />
      <p>
        Copia ed incolla il seguente report nel post della Zona delle
        probabilit&aacute; del GdR
      </p>
      <code
        className="p-3"
        style={{
          backgroundColor: '#FFFFFF',
          display: 'block',
          whiteSpace: 'pre-wrap',
        }}
      >
        {`${props.rollData.user} ha effettuato il seguente lancio\nMotivo del lancio: ${props.rollData.reason}`}
        {Object.keys(props.rollResult).map(
          (rollResult, rollResultIndex) => (
            <React.Fragment key={rollResultIndex}>
              {`\n\nLancio ${props.rollData[rollResult]}${rollResult}\n`}
              {props.rollResult[rollResult].map(
                (dieResult, dieResultIndex) => (
                  <React.Fragment key={dieResultIndex}>
                    {dieResultIndex ? ' ' : ''}[IMG]
                    {`https://www.soniclegacy.it/wp-content/uploads/2019/08/${rollResult}_${dieResult}.gif`}
                    [/IMG]
                  </React.Fragment>
                ),
              )}
            </React.Fragment>
          ),
        )}
      </code>
    </Alert>
  );
};

RollResult.propTypes = {
  rollData: PropTypes.object.isRequired,
  rollResult: PropTypes.object.isRequired,
};

export default RollResult;
