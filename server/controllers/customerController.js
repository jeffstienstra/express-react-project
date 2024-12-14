import Customer from '../models/Customer.js';

const getCustomers = (req, res) => {
    Customer.find({})
        .then((customers) => {
            res.json(customers);
        })
        .catch((err) => {
            console.log(err);
        })
};

export default {
    getCustomers
}
