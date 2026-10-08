const API_URL = "/customers";

let editCustomerId = null;


// Load customers when page opens
document.addEventListener("DOMContentLoaded", loadCustomers);


// Get customers
async function loadCustomers() {

    try {

        const response = await fetch(API_URL);

        const customers = await response.json();

        displayCustomers(customers);

    } catch (error) {

        console.error("Error:", error);

        alert("Could not load customers");

    }
}


// Display customers
function displayCustomers(customers) {

    const customerList = document.getElementById("customerList");

    customerList.innerHTML = "";

    customers.forEach(customer => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${customer.name}</td>

            <td>${customer.email}</td>

            <td>${customer.phone}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editCustomer(
                        '${customer._id}',
                        '${customer.name}',
                        '${customer.email}',
                        '${customer.phone}'
                    )"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteCustomer('${customer._id}')"
                >
                    Delete
                </button>

            </td>

        `;

        customerList.appendChild(row);

    });
}


// Add / Update customer
document
    .getElementById("customerForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        const customerData = {
            name: name,
            email: email,
            phone: phone
        };


        try {

            // UPDATE
            if (editCustomerId) {

                await fetch(`${API_URL}/${editCustomerId}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(customerData)

                });

                alert("Customer updated successfully");

            }

            // ADD
            else {

                await fetch(API_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(customerData)

                });

                alert("Customer added successfully");

            }


            document.getElementById("customerForm").reset();

            cancelEdit();

            loadCustomers();

        } catch (error) {

            console.error("Error:", error);

            alert("Something went wrong");

        }

    });


// Edit customer
function editCustomer(id, name, email, phone) {

    editCustomerId = id;

    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone;

    document.getElementById("formTitle").innerText =
        "Update Customer";

    document.getElementById("submitBtn").innerText =
        "Update Customer";

    document.getElementById("cancelBtn").style.display =
        "block";
}


// Cancel editing
function cancelEdit() {

    editCustomerId = null;

    document.getElementById("customerForm").reset();

    document.getElementById("formTitle").innerText =
        "Add Customer";

    document.getElementById("submitBtn").innerText =
        "Add Customer";

    document.getElementById("cancelBtn").style.display =
        "none";
}


// Delete customer
async function deleteCustomer(id) {

    if (!confirm("Are you sure you want to delete this customer?")) {
        return;
    }

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        alert("Customer deleted successfully");

        loadCustomers();

    } catch (error) {

        console.error("Error:", error);

        alert("Could not delete customer");

    }
}