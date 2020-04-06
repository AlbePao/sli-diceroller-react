import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import { v1 as uuidv1 } from 'uuid';

const getDieUrl = (die, result) => `${window.location.origin}/dice/${die}_${result}.gif`;

class RollResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { rollResult } = this.props;
    this.onUpdate(prevProps.rollResult, rollResult);
  }

  onUpdate(preRollResult, rollResult) {
    if (preRollResult !== rollResult && Object.keys(rollResult).length > 0) {
      this.setState({ showAlert: true });
    }
  }

  render() {
    const { showAlert } = this.state;

    if (!showAlert) {
      return null;
    }

    const {
      rollResult: {
        rollData,
        rollResults,
      },
    } = this.props;

    return (
      <Alert
        variant="primary"
        onClose={() => this.setState({ showAlert: false })}
        dismissible
      >
        <Alert.Heading>Lancio effettuato!</Alert.Heading>
        <p>
          Lancio effettuato con successo. Hai ottenuto i seguenti risultati
        </p>
        {Object.keys(rollResults).map((rollResult) => (
          <p key={uuidv1()}>
            {rollResults[rollResult].map((dieResult) => (
              <span key={uuidv1()} className="mx-1">
                <img
                  src={getDieUrl(rollResult, dieResult)}
                  alt={`d${rollResult}`}
                />
              </span>
            ))}
          </p>
        ))}
        <hr />
        <p>
          Copia ed incolla il seguente messaggio nel topic
          della Zona delle probabilit&aacute; del GdR
        </p>
        <code
          className="p-3"
          style={{
            backgroundColor: '#FFFFFF',
            display: 'block',
            whiteSpace: 'pre-wrap',
          }}
        >
          {`${rollData.user} ha effettuato il seguente lancio\nMotivo del lancio: ${rollData.reason}`}
          {Object.keys(rollResults).map((rollResult) => (
            <React.Fragment key={uuidv1()}>
              {`\n\nLancio ${rollData[rollResult]}${rollResult}\n`}
              {rollResults[rollResult].map((dieResult) => (
                <React.Fragment key={uuidv1()}>
                  [IMG]
                  {getDieUrl(rollResult, dieResult)}
                  [/IMG]
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </code>
      </Alert>
    );
  }
}

RollResult.propTypes = {
  rollResult: PropTypes.shape({
    rollData: PropTypes.shape({
      date: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
    }),
    rollResults: PropTypes.shape({
      d4: PropTypes.number.isRequired,
      d6: PropTypes.number.isRequired,
      d8: PropTypes.number.isRequired,
      d10: PropTypes.number.isRequired,
      d12: PropTypes.number.isRequired,
      d20: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default RollResult;
