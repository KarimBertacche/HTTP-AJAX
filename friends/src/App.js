import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friendsData: null,
      errorMessage: '',
      spinner: false,
    }
  }

  componentDidMount() {
    this.setState({ spinner: true });
    axios.get('http://localhost:5000/friends')
      .then(response => {
        this.setState({ friendsData: response.data });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      })
      .finally(() => {
        this.setState({ spinner: false });
      })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.spinner && 
          <div>Data is still fetching ...</div>
        }
        {
          this.state.errorMessage && 
          <div>{this.state.errorMessage}</div>
        }
        {
          this.state.friendsData && 
          this.state.friendsData.map(friend => {
            return(
              <div key={friend.id}>
                <p>{friend.name} {friend.age}</p>
                <span>{friend.email}</span>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
