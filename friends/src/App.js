import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import FriendCard from './components/FriendCard';
import axios from 'axios';
import { Route } from 'react-router-dom';

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
              <>
                <Route path="/" render={(props) => <NavBar {...props} data={this.state.friendsData}/>} />
                <FriendCard 
                  key={friend.id}
                  name={friend.name} 
                  age={friend.age}
                  email={friend.email}
                />
              </>
            )
          })
        }
      </div>
    );
  }
}

export default App;
