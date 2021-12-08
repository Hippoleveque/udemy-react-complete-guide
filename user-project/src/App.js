import React, { useState } from 'react';
import AddUser from "./components/Users/AddUser"
import UsersList from "./components/Users/UsersList"

function App() {

  const [users, setUsers] = useState([])

  const addUserHandler = (newUser) => {
    setUsers(prevUsers => [newUser, ...prevUsers])
  }

  return (
    <div>
      <AddUser addUserHandler={addUserHandler}/>
      <UsersList users={users}/>
    </div>
  );
}

export default App;
