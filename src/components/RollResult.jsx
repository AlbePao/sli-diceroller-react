import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

class RollResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { rollResult } = this.props;

    if (prevProps.rollResult !== rollResult && Object.keys(rollResult).length > 0) {
      this.setState({ showAlert: true });
    }
  }

  render() {
    if (!this.state.showAlert) {
      return null;
    }

    const { rollData, rollResults } = this.props.rollResult;

    return (
      <Alert
        variant="primary"
        onClose={() => this.setState({ showAlert: false })}
        dismissible
      >
        <Alert.Heading>Lancio effettuato!</Alert.Heading>
        <p>
          Lancio effettuato con successo. Hai ottenuto i seguenti
          risultati
        </p>
        {Object.keys(rollResults).map(
          (rollResult, rollResultIndex) => (
            <p key={rollResultIndex}>
              {rollResults[rollResult].map(
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
          Copia ed incolla il seguente messaggio nel topic della Zona delle
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
          {`${rollData.user} ha effettuato il seguente lancio\nMotivo del lancio: ${rollData.reason}`}
          {Object.keys(rollResults).map(
            (rollResult, rollResultIndex) => (
              <React.Fragment key={rollResultIndex}>
                {`\n\nLancio ${rollData[rollResult]}${rollResult}\n`}
                {rollResults[rollResult].map(
                  (dieResult, dieResultIndex) => (
                    <React.Fragment key={dieResultIndex}>
                      {dieResultIndex ? ' ' : ''}
                      [IMG]
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
  }
}

RollResult.propTypes = {
  rollResult: PropTypes.object.isRequired,
};

export default RollResult;
