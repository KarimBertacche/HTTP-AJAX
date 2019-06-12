import React from 'react';
import NavBar from './components/NavBar';
import FriendCard from './components/FriendCard';
import PostForm from './components/PostForm';
import axios from 'axios';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

const StylesApp = styled.div`
  background-color: #fff;
  min-height: 100vh;
  padding: 50px 0 100px;
`;

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
      <StylesApp>
        {
          this.state.spinner && 
          <div>Data is still fetching ...</div>
        }
        {
          this.state.errorMessage && 
          <div>{this.state.errorMessage}</div>
        }
        {

        }
        
        {
          this.state.friendsData &&
          <> 
            <Route path="/" render={(props) => <NavBar {...props} data={this.state.friendsData}/>} />
            <div>
              {
                this.state.friendsData.map(friend => {
                  return (
                    <>
                      <Route 
                        exact
                        path="/" 
                        render={(props) => {
                          return (
                            <FriendCard 
                              {...props}
                              key={friend.id}
                              name={friend.name} 
                              age={friend.age}
                              email={friend.email}
                            />
                          ) 
                        }}  
                      />
                      <Route 
                        path={`/${friend.name}/${friend.id}`} 
                        render={(props) => {
                          return (
                            <FriendCard 
                              {...props}
                              key={friend.id}
                              name={friend.name} 
                              age={friend.age}
                              email={friend.email}
                            />
                          )
                        }}  
                      /> 
                    </>
                  )    
                })
              }
            </div>
            <PostForm />
          </>
        }
      </StylesApp>
    );
  }
}

export default App;
