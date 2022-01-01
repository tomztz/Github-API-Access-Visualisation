import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

//Test connection with backend
class App extends Component {
    
    constructor() {
        super();
        this.state = {users: []}
        
    }

    componentDidMount() {
    fetch("http://localhost:3001/users")
      .then( res => {
        console.log(res);
        return res.json()
     })   
     .then(users => { 
        console.log(users); 
        this.setState({ users })
     });
  }

    render() {
      

        return (
            <div className="App">
                
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                
                {this.state.users.map(user =>
                <div key={user.id}>name: {user.name} value: {user.value}</div>
              )}
            </div>
            
        );
    }
}

export default App;