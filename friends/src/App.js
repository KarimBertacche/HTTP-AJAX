import React from 'react';
import NavBar from './components/NavBar';
import FriendCard from './components/FriendCard';
import PostForm from './components/PostForm';
import axios from 'axios';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

const StylesApp = styled.div`
  background: -webkit-linear-gradient(to right, #ec2F4B, #009FFF);
  background: linear-gradient(to right, #ec2F4B, #009FFF);
  min-height: 100vh;
  padding: 100px 0 100px;
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
      postBtnText: 'ADD FRIEND',
      friendID: null,
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

  addFriendHandler = (event) => {
    //post thing goes here
    if(this.state.name !== '' && this.state.inputAge !== '' && this.state.inputEmail !== '') {
      let name = this.state.inputName;
      let age = this.state.inputAge;
      let email = this.state.inputEmail;

      axios.post('http://localhost:5000/friends', { name, age, email })
        .then(response => {
          this.setState({ friendsData: response.data });
        })
    }

  }

  deleteFriendHandler = (id) => {
    const newFriendData = this.state.friendsData.filter(friend => friend.id !== id);

    this.setState({
      friendsData: newFriendData,
    })

    axios.delete(`http://localhost:5000/friends/${id}`);
      
  }

  updateFriendDetails = (id) => {
    // pass the current values from the friend object to the respective input fields
    // maintain the same id to hold same position
    // update friend details
    this.state.friendsData.map(friend => {
      if(friend.id === id) {
        this.setState({
          inputName: friend.name,
          inputAge: friend.age,
          inputEmail: friend.email,
          postBtnText: 'UPDATE',
          friendID: id
        })
      }
    })
  }

  updateFriendHandler = () => {
    let id = this.state.friendID;

    this.state.friendsData.map(friend => {
      if(friend.id === id) {
        return this.setState(prevState => ({
          inputName: prevState.inputName,
          inputAge: prevState.inputAge,
          inputEmail: prevState.inputEmail,
          postBtnText: 'ADD FRIEND',
          friendID: null
        })) 
      }
      return null;
    })
    
    axios.put(`http://localhost:5000/friends/${id}`, {
      id: id,
      name: this.state.inputName,
      age: this.state.inputAge,
      email: this.state.inputEmail,
    })

    this.setState({
      inputName: '',
      inputAge: '',
      inputEmail: '',
    });
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
              btn={this.state.postBtnText} 
              inputHandler={this.inputHandler}
              addFriendHandler={this.addFriendHandler}
              updateFriendHandler={this.updateFriendHandler}
            />
          </>
        }
      </StylesApp>
    );
  }
}

export default App;
