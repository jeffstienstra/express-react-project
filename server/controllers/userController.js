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
        name: req.body.name || 'Unknown',
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

const updateUser = (req, res) => {
    console.log('updateUser route hit:'); // Debugging statement
    User.findById(req.params._id)
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found');
            }

            console.log('User found:', user); // Debugging statement

            user.name = req.body.name || user.name;
            user.age = req.body.age || user.age;

            user.save()
                .then(updatedUser => {
                    console.log('User updated:', updatedUser); // Debugging statement
                    res.json(updatedUser);
                })
                .catch(err => {
                    console.log('Error updating user:', err);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch(err => {
            console.log('Error finding user:', err);
            res.status(500).send('Internal Server Error');
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
    updateUser,
    deleteUser
}
