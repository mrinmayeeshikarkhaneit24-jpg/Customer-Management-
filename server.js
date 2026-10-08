const express = require('express');
const mongoose= require('mongoose');
const core = require('cors');

const app = express();
app.use(express.static("public"));
app.use(core());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/CustomerDB")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });
    
const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});
const Customer = mongoose.model('Customer', CustomerSchema);  
app.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
});
app.post('/customers', async (req, res) => {
    const customer = new Customer(req.body);
    await customer.save();
    res.json(customer);
});

app.put("/customers/:id", async (req, res) => {
     const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
     res.json(customer);
});
app.delete("/customers/:id", async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
});

app.listen(3000,() => console.log("Server Started"));