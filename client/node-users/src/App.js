import React, { useState, useEffect} from 'react';
import './App.css';

import axios from 'axios'

import SimpleCard from './components/Card'



function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('localhost:5000/api/users')
    .then(res => {
      console.log(res)
    })

    .catch(err => console.log(err))
  },[])
  return (
    <div className="App">
      {users.map(user => (
        <SimpleCard user={user}/>
      ))}
    </div>
  );
}

export default App;
