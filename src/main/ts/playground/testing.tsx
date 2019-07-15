import React from 'react';

class Testing extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <h2>Editierbare Felder</h2>
        </header>
        <div className="Testing">
          <label>Name:</label>
          <input placeholder="Namen anpassen" />
          <label>Land:</label>
          <input placeholder="Land anpassen" />
          <label>Größe:</label>
          <input placeholder="Größe anpassen" />
        </div>
        <div className="Testing">
          <button>Save Edit</button>
        </div>
      </div>
    );
  }
}

export default Testing;

/*
function handleInputChange(e: Event) {
  this.setState({
    title: e.target.value
  });
}

<input
 type="text"
 value={this.state.title}
 onChange={e => this.handleInputChange(e)}
/>

*/
