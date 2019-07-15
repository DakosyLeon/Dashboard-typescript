import React from 'react';

interface Props {
  headline: string;
  text: string;
  tfInputName?: string;
  tfInputLand?: string;
  tfInputSize?: number;
  onClose: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

class Popup extends React.Component<Props> {
  render() {
    // Destrukturierung der Props
    const { headline, text, onClose, onDelete, onEdit, tfInputName, tfInputLand, tfInputSize } = this.props;

    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-content">
            <header>
              <h2>{headline}</h2>
            </header>
            <p>{text}</p>
            {onEdit && <label>Name:</label>}
            {onEdit && <input placeholder={tfInputName} />}
            {onEdit && <label>Land:</label>}
            {onEdit && <input placeholder={tfInputLand} />}
            {onEdit && <label>Größe:</label>}
            {onEdit && <input value={tfInputSize} />}
            <button onClick={onClose}>Close</button>
            {onEdit && <button onClick={onEdit}>Save</button>}
            {onDelete && <button onClick={onDelete}>Delete</button>}
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
