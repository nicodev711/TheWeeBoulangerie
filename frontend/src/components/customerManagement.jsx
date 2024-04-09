import React, { useState, useEffect } from 'react';

function CustomerManagement() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [customers, setCustomers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${apiUrl}/users/users`);
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleChangeRole = (customerId) => {
        console.log('Changing role for:', customerId);
        // Add your logic to change the customer's role
    };

    const handleEdit = (customerId) => {
        console.log('Editing:', customerId);
        // Add your logic to edit the customer
    };

    const handleDelete = (customerId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            console.log('Deleting:', customerId);
            // Add your logic to delete the customer
            // Don't forget to update your state after deletion!
        }
    };

    if (customers.length === 0) {
        return <div>Loading customers...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-400 p-2">Customer ID</th>
                    <th className="border border-gray-400 p-2">Name</th>
                    <th className="border border-gray-400 p-2">Email</th>
                    <th className="border border-gray-400 p-2">Total Amount Spend</th>
                    <th className="border border-gray-400 p-2">Accept Marketing</th>
                    <th className="border border-gray-400 p-2">Address</th>
                    <th className="border border-gray-400 p-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {customers.map(customer => (
                    <tr key={customer._id} className="hover:bg-gray-100">
                        <td className="border border-gray-400 p-2">{customer._id}</td>
                        <td className="border border-gray-400 p-2">{customer.username}</td>
                        <td className="border border-gray-400 p-2">{customer.email}</td>
                        <td className="border border-gray-400 p-2">{customer.totalAmountSpent}</td>
                        <td className="border border-gray-400 p-2">
                            {customer.marketingEmailsConsent ? '✅' : '❌'}
                        </td>
                        <td className="border border-gray-400 p-2">
                            {customer.address
                                ? `${customer.address.street || ''}, ${customer.address.city || ''}, ${customer.address.postalCode || ''}, ${customer.address.country || ''}`
                                : 'No address provided'}
                        </td>

                        <td className="border border-gray-400 p-2 text-center">
                            <button
                                onClick={() => handleChangeRole(customer._id)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-1"
                            >
                                Role
                            </button>
                            <button
                                onClick={() => handleEdit(customer._id)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1"
                            >
                                Edit
                            </button>
                            {customer.role !== "admin" && (  // Only show this button if customer's role is not 'admin'
                                <button
                                    onClick={() => handleDelete(customer._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1"
                                >
                                    Delete
                                </button>
                            )}
                        </td>


                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerManagement;
