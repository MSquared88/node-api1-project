import React, { useState, useEffect} from 'react';
import './App.css';

import axios from 'axios'

import SimpleCard from './components/Card'
import SimpleModal from './components/Modal'



function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
    .then(res => {
      console.log(res)
      setUsers(res.data)
    })
    
    .catch(err => console.log(err))
  },[])

  const addUser = user => {
    axios.post(`http://localhost:5000/api/users/`, user)
    .then(res => {
      console.log(res)
    })

    .catch(err => {
      console.log(err)
    })
  }
  const deleteUser = id => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
    .then(res => {
      console.log(res)
    })

    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="App">
      {users.map(user => {
        return <SimpleCard user={user} deleteUser= {deleteUser}/>
      })}
    <SimpleModal addUser= {addUser} setUsers={setUsers} users={users}/>
    </div>
  );
}

export default App;
