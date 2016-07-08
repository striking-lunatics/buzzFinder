import React from 'react';
import ReactDOM from 'react-dom';
import RecipeWindow from './components/RecipeWindow.jsx'

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {term: ''}
    }
    render() {
        return (
            <div className="container App">
                <div className="row">
                here is our state: {this.state.term}
                    <div className="col-sm-offset-2 col-sm-8">
                        <input
                        value={this.state.term}
                        onKeyPress={(e) => this.test(e)}
                        onChange={(e) => this.setState({term: e.target.value})}
                         type='text' className='form-control' placeholder='Search your recipes...'/>
                        <RecipeWindow/>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('root'));
