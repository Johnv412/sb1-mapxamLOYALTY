import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  joinDate: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Simulating API call to fetch customers
    const mockCustomers: Customer[] = Array.from({ length: 50 }, (_, index) => ({
      id: `CUST-${1000 + index}`,
      name: `Customer ${index + 1}`,
      email: `customer${index + 1}@example.com`,
      phone: `+1 555-${String(1000 + index).padStart(4, '0')}`,
      points: Math.floor(Math.random() * 1000),
      joinDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
    }));
    setCustomers(mockCustomers);
  }, []);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Customer Management</h2>
      
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <Plus size={20} className="mr-2" /> Add New Customer
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Customer ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Points</th>
              <th className="p-2 text-left">Join Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="p-2">{customer.id}</td>
                <td className="p-2">{customer.name}</td>
                <td className="p-2">{customer.email}</td>
                <td className="p-2">{customer.phone}</td>
                <td className="p-2">{customer.points}</td>
                <td className="p-2">{customer.joinDate}</td>
                <td className="p-2">
                  <button className="text-blue-500 mr-2" title="Edit">
                    <Edit size={20} />
                  </button>
                  <button className="text-red-500" title="Delete">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} customers
        </div>
        <div className="flex">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredCustomers.length}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customers;