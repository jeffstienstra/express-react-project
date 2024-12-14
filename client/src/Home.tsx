import {useEffect, useState} from 'react'
import './Home.css'

interface Customer {
  id: number
  name: string
  company: string
}
interface User {
  id: number
  name: string
}

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(
        response => response.json()
      ).then(
        users => {
          console.log('Users:',users);
          setUsers(users)
        }
      );

    fetch('http://localhost:5000/api/customers').then(
      response => response.json()
    ).then(
      customers => {
        console.log('Customers:',customers);
        setCustomers(customers)
      }
    );
  }, []);

function createUser() {
  fetch('http://localhost:5000/api/users', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body: JSON.stringify({
      name: 'New User'
    })
  })
}

function deleteUser(user: User) {
  console.log('Deleting user:', user)
  fetch(`http://localhost:5000/api/users/${user.name}`, {
    method: 'DELETE',
  })
}

// function createCustomer() {
//   fetch('http://localhost:5000/api/customers', {
//     method: 'POST',
//   })
// }

  return (
    <>
      <h1>DATA!</h1>
      <div className="card">
        <h3>Users</h3>
        {users?.map((user) => (
          <div key={user.name}>
            <p key={user.name}>{user.name}</p>
            <button onClick={() => deleteUser(user)}>-User</button>
          </div>
        ))}
      </div>
        <button onClick={createUser}>+User</button>
      <div className="card">
        <h3>Customers</h3>
        {customers?.map((customer) => (
          <p key={customer.name}>{`${customer.name}: ${customer.company}`}</p>
        ))}
      </div>
        {/* <button onClick={createCustomer}>+Customer</button> */}
    </>
  )
}

export default App
