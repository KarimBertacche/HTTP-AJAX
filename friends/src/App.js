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
      inputName: '',
      inputAge: '',
      inputEmail: '',
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

  inputHandler = event => {
    let { value } = event.target;
    let name = event.target.name;
    this.setState({ [ name ]: value });
  }

  addFriendHandler = () => {
    //post thing goes here
    let name = this.state.inputName;
    let age = this.state.inputAge;
    let email = this.state.inputEmail;

    axios.post('http://localhost:5000/friends', { name, age, email })
      .then(response => {
        this.setState({ friendsData: response.data });
      })
  }

  deleteFriendHandler = (id) => {
    const newFriendData = this.state.friendsData.filter(friend => friend.id !== id);

    this.setState({
      friendsData: newFriendData,
    })


    axios.delete(`http://localhost:5000/friends/${id}`);
      
  }

  updateFriendDetails = () => {
    // pass the current values from the friend object to the respective input fields
    // maintain the same id to hold same position
    // update friend details
    console.log('I was clicked!!')
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
                    <div key={friend.id}>
                      <Route 
                        exact
                        path="/" 
                        render={(props) => {
                          return (
                            <FriendCard 
                              {...props}  
                              id={friend.id}    
                              name={friend.name} 
                              age={friend.age}
                              email={friend.email}
                              deleteFriendHandler={this.deleteFriendHandler}
                              updateFriendDetails={this.updateFriendDetails}
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
                              id={friend.id} 
                              name={friend.name} 
                              age={friend.age}
                              email={friend.email}
                              deleteFriendHandler={this.deleteFriendHandler}
                              updateFriendDetails={this.updateFriendDetails}
                            />
                          )
                        }}  
                      /> 
                    </div>
                  )    
                })
              }
            </div>
            <PostForm 
              name={this.state.inputName} 
              age={this.state.inputAge} 
              email={this.state.inputEmail}  
              inputHandler={this.inputHandler}
              addFriendHandler={this.addFriendHandler}
            />
          </>
        }
      </StylesApp>
    );
  }
}

export default App;
