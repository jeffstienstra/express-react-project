import {useEffect, useState} from 'react'
import './Home.css'

interface Customer {
  name: string
  company: string
}
interface User {
  name: string
  age: string
}

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({name: '', age: ''});

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  function createUser(e: React.FormEvent) {
    e.preventDefault();
    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(user => {
      console.log('User created:', user);
      setUsers([...users, user]);
      setShowCreateUserModal(false);
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });
  };

function deleteUser(user: User) {
  console.log('Deleting user:', user)
  fetch(`http://localhost:5000/api/users/${user.name}`, {
    method: 'DELETE',
  })
}

function handleToggleCreateUserModal() {
  setShowCreateUserModal(!showCreateUserModal)
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
          <div className='data-block' key={user.name}>
            <p key={user.name}>{user.name}</p>
            <button className='button' onClick={() => deleteUser(user)}>
                delete
            </button>
          </div>
        ))}
      </div>
        <button className='button' onClick={handleToggleCreateUserModal}>+User</button>
      <div className="card">
        <h3>Customers</h3>
        {customers?.map((customer) => (
          <p key={customer.name}>{`${customer.name}: ${customer.company}`}</p>
        ))}
      </div>

      {/* MODALS */}
      {/* create user */}
      {showCreateUserModal && (
        <div className="modal-background">
          <form onSubmit={createUser} className="modal-container">
            <h3 className='modal-title'>Create User</h3>
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name='name'
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name='age'
                onChange={handleInputChange}
                placeholder="Age"
                required
              />
            </div>
            <div className="button-container">
              <button type='submit' className='button btn-submit'>Create</button>
              <button type='button' className='button btn-cancel' onClick={handleToggleCreateUserModal}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default App
