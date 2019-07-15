import React from 'react';

interface Props {
  headline: string;
  text: string;
  onClose: () => void;
  onDelete?: () => void;
}

class Popup extends React.Component<Props> {
  render() {
    // Destrukturierung
    const { headline, text, onClose, onDelete } = this.props;

    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-content">
            <h1>{headline}</h1>
            <p>{text}</p>
          </div>
          <button onClick={onClose}>Close</button>
          {onDelete && <button onClick={onDelete}>Delete</button>}
        </div>
      </div>
    );
  }
}

export default Popup;
