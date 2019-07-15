import React from 'react';

interface Props {
  headline: string;
  text: string;
  onClose: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

class Popup extends React.Component<Props> {
  render() {
    // Destrukturierung der Props
    const { headline, text, onClose, onDelete, onEdit } = this.props;

    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-content">
            <header>
              <h2>{headline}</h2>
            </header>
            <p>{text}</p>
          </div>
          <button onClick={onClose}>Close</button>
          {onDelete && <button onClick={onDelete}>Delete</button>}
          {onEdit && <button onClick={onEdit}>Save Edit</button>}
        </div>
      </div>
    );
  }
}

export default Popup;
