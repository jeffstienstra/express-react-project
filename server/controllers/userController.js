import User from '../models/User.js';

const getUsers = (req, res) => {
    console.log('getUsers route hit'); // Debugging statement

    User.find({})
        .then((users) => {
            console.log('Users found:', users); // Debugging statement

            res.json(users);
        })
        .catch((err) => {
            console.log('Error finding users:', err);
        });
};

const createUser = (req, res) => {
    console.log('createUser route hit:'); // Debugging statement

    const user = new User({
        name: req.body.name || 'testName',
        age: req.body.age || 0,
    })

    user.save()
        .then((user) => {
            console.log('User created:', user); // Debugging statement

            res.json(user);
        })
        .catch((err) => {
            console.log('Error creating user:', err);
        });
}

const deleteUser = (req, res) => {
    console.log('deleteUser route hit:'); // Debugging statement

    User.deleteOne({name: req.params.name})
        .then((result) => {
            console.log('User deleted:', result); // Debugging statement

            res.json(result);
        })
        .catch((err) => {
            console.log('Error deleting user:', err);
        });
}

export default {
    getUsers,
    createUser,
    deleteUser
}
