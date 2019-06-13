import React from 'react';
import NavBar from './components/NavBar';
import FriendCard from './components/FriendCard';
import PostForm from './components/PostForm';
import axios from 'axios';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

const StylesApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: -webkit-linear-gradient(to bottom right, #ec2F4B 2%, #009FFF);
  background: linear-gradient(to bottom right, #ec2F4B 2%, #009FFF);
  min-height: 70vh;
  padding: 100px 0 100px;

  section {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
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
      searchInput: '',
      postBtnText: 'ADD FRIEND',
      friendID: null,
    }
  }

  componentDidMount() {
    this.setState({ spinner: true });
    this.fetchDataHandler();
  }

  fetchDataHandler = () => {
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
    event.preventDefault();
    //post thing goes here
    if(this.state.name !== '' && this.state.inputAge !== '' && this.state.inputEmail !== '') {
      let name = this.state.inputName;
      let age = this.state.inputAge;
      let email = this.state.inputEmail;

      this.postRequestHandler({ name, age, email });
    }

    this.setState({
      inputName: '',
      inputAge: '',
      inputEmail: '',
    });
  }

  postRequestHandler = ({ name, age, email }) => {
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

  updateFriendDetails = (id) => {
    this.state.friendsData.map(friend => {
      if(friend.id === id) {
        return this.setState({
          inputName: friend.name,
          inputAge: friend.age,
          inputEmail: friend.email,
          postBtnText: 'UPDATE',
          friendID: id
        })
      }
      return null;
    })
  }

  updateFriendHandler = (event) => {
    event.preventDefault();
    let id = this.state.friendID;

    this.state.friendsData.map(friend => {
      if(friend.id === id) {
        return this.setState(prevState => ({
          inputName: prevState.inputName,
          inputAge: prevState.inputAge,
          inputEmail: prevState.inputEmail,
          postBtnText: 'ADD FRIEND',        
        })) 
      }
      return null;   
    })

    this.putRequestHandler(id);

    this.setState({
      inputName: '',
      inputAge: '',
      inputEmail: '',
      friendID: null
    });
  }

  putRequestHandler = (id) => {
    axios.put(`http://localhost:5000/friends/${id}`, {
      id: id,
      name: this.state.inputName,
      age: this.state.inputAge,
      email: this.state.inputEmail,
    }).then(() => this.fetchDataHandler());
  }

  searchInputHandler = (event) => {
    let { value } = event.target;
    this.setState({ searchInput: value });
  }

  searchFriendHandler = () => {
    let friendName = this.state.searchInput;
    let foundFriend = this.state.friendsData.filter(friend => {
      return friend.name.toLowerCase().startsWith(friendName.toLowerCase());
    })

    this.setState({ 
      friendsData: foundFriend,
      searchInput: '',
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
            <Route path="/" render={(props) =>  <NavBar {...props} 
                                                  data={this.state.friendsData}
                                                  search={this.state.searchInput}
                                                  searchInputHandler={this.searchInputHandler}
                                                  searchFriendHandler={this.searchFriendHandler}
                                                  fetchDataHandler={this.fetchDataHandler}
                                                />} />
            <section>
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
            </section>
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
