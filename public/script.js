const API_URL = "/customers";
let editCustomerId = null;

let allCustomers = [];
let visibleCustomers = [];


// Load customers when page opens
document.addEventListener("DOMContentLoaded", loadCustomers);


// Get customers

async function loadCustomers() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load customers");
        }

        const customers = await response.json();

        allCustomers = customers;
        applySearchAndSort();
    } catch (error) {
        console.error("Error:", error);
        alert("Could not load customers");
    }
}


// Display customers

function displayCustomers(customers) {
    const customerList = document.getElementById("customerList");

    customerList.innerHTML = "";

    // Update dashboard counts
    document.getElementById("totalCustomers").innerText =
        allCustomers.length;

    document.getElementById("matchingCustomers").innerText =
        customers.length;

    // Keep your existing total-count badge working
    const countBadge = document.getElementById("customerCount");
    if (countBadge) {
        countBadge.innerText =
            "Total Customers: " + allCustomers.length;
    }

    // Show a message if no customers match
    if (customers.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 4;
        cell.className = "empty-message";
        cell.innerText = allCustomers.length === 0
            ? "No customers added yet."
            : "No customers found.";

        row.appendChild(cell);
        customerList.appendChild(row);
        return;
    }

    customers.forEach(customer => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        // Use textContent for customer data
        row.cells[0].textContent = customer.name;
        row.cells[1].textContent = customer.email;
        row.cells[2].textContent = customer.phone;

        row.querySelector(".edit-btn").addEventListener("click", () => {
            editCustomer(
                customer._id,
                customer.name,
                customer.email,
                customer.phone
            );
        });

        row.querySelector(".delete-btn").addEventListener("click", () => {
            deleteCustomer(customer._id);
        });

        customerList.appendChild(row);
    });
}


// Add / Update customer
document
    .getElementById("customerForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        const namePattern = /^[A-Za-z ]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;

        if (name === "") {
            alert("Please enter customer name");
            return;
        }

        if (!namePattern.test(name)) {
            alert("Name should contain only letters");
        return;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address");
        return;
        }

        if (!phonePattern.test(phone)) {
            alert("Phone number must contain exactly 10 digits");
        return;
        }

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


function applySearchAndSort() {
    const searchInput = document.getElementById("searchInput");
    const sortOrder = document.getElementById("sortOrder").value;

    const searchText = searchInput.value.trim().toLowerCase();

    visibleCustomers = allCustomers.filter(customer => {
        const name = (customer.name || "").toLowerCase();
        const email = (customer.email || "").toLowerCase();
        const phone = String(customer.phone || "").toLowerCase();

        return name.includes(searchText) ||
               email.includes(searchText) ||
               phone.includes(searchText);
    });

    visibleCustomers.sort((a, b) => {
        const nameA = (a.name || "").toLowerCase();
        const nameB = (b.name || "").toLowerCase();

        if (sortOrder === "desc") {
            return nameB.localeCompare(nameA);
        }

        return nameA.localeCompare(nameB);
    });

    displayCustomers(visibleCustomers);
}

// Search whenever the user types
document.getElementById("searchInput").addEventListener(
    "input",
    applySearchAndSort
);

// Change alphabetical order
document.getElementById("sortOrder").addEventListener(
    "change",
    applySearchAndSort
);

// Clear the search
document.getElementById("clearSearchBtn").addEventListener(
    "click",
    function () {
        document.getElementById("searchInput").value = "";
        applySearchAndSort();
    }
);


document.getElementById("exportBtn").addEventListener("click", function () {
    if (visibleCustomers.length === 0) {
        alert("No customers available to export.");
        return;
    }

    function escapeCSV(value) {
        let text = String(value ?? "");

        // Prevent spreadsheet formulas from running
        if (/^[=+\-@\t\r]/.test(text)) {
            text = "'" + text;
        }

        return '"' + text.replace(/"/g, '""') + '"';
    }

    const headers = ["Name", "Email", "Phone"];

    const rows = visibleCustomers.map(customer => [
        customer.name,
        customer.email,
        customer.phone
    ]);

    const csvContent = [headers, ...rows]
        .map(row => row.map(escapeCSV).join(","))
        .join("\r\n");

    const blob = new Blob(
        ["\uFEFF" + csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "customers.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
});