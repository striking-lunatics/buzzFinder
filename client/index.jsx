import React from 'react';
import ReactDOM from 'react-dom';
import RecipeWindow from './components/RecipeWindow.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
       <RecipeWindow/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
