import React, { useState, useCallback } from 'react';
import type { Column } from './types'; 
import type { ChangeEvent } from 'react';
import { InputField } from './components/InputField/InputField';
import { DataTable } from './components/DataTable/DataTable';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1200, inStock: true },
  { id: 2, name: 'Desk Chair Ergonomic', category: 'Furniture', price: 350, inStock: true },
  { id: 3, name: 'Mechanical Keyboard', category: 'Electronics', price: 150, inStock: false },
  { id: 4, name: 'External SSD 1TB', category: 'Storage', price: 90, inStock: true },
  { id: 5, name: 'Monitor 4K', category: 'Electronics', price: 600, inStock: false },
];

const productColumns: Column<Product>[] = [
  { key: 'name', title: 'Product Name', dataIndex: 'name', sortable: true },
  { key: 'category', title: 'Category', dataIndex: 'category', sortable: true },
  { key: 'price', title: 'Price', dataIndex: 'price', sortable: true,
    render: (value) => `$${(value as number).toFixed(2)}`
  },
  { key: 'stock', title: 'Stock Status', dataIndex: 'inStock', sortable: true,
    render: (value) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        value ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      }`}>
        {value ? 'In Stock' : 'Out of Stock'}
      </span>
    )
  },
];


const App: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [password, setPassword] = useState('secure-password');
  const [email, setEmail] = useState('invalid@email');
  const [dataSelection, setDataSelection] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const handleClearText = useCallback(() => setTextValue(''), []);

  const handleRowSelect = useCallback((selectedRows: Product[]) => {
    setDataSelection(selectedRows);
    console.log('Selected Rows:', selectedRows.map(r => r.name));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 sm:p-10 transition-colors duration-300 font-sans">
      <style>{`
        /* Apply Inter font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <header className="mb-10 pb-4 border-b border-indigo-200 dark:border-indigo-800">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400">
          Component Development Assignment
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Two production-ready, accessible, and responsive React components.
        </p>
      </header>

      {/* --- DEMO 1: InputField Component --- */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">1. InputField Component</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Outlined (Default) - Medium */}
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md border dark:border-gray-800">
            <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">Outlined (Default)</h3>
            <InputField
              label="Standard Text (Md)"
              placeholder="Enter your name"
              helperText="This is the helper text."
              value={textValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTextValue(e.target.value)} // Added type for best practice
              onClear={handleClearText}
            />
          </div>

          {/* Filled - Large - Invalid */}
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md border dark:border-gray-800">
            <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">Filled & Invalid (Lg)</h3>
            <InputField
              label="Email Address"
              placeholder="user@example.com"
              errorMessage="Please enter a valid email format."
              invalid
              variant="filled"
              size="lg"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} // Added type for best practice
              type="email"
            />
          </div>

          {/* Ghost - Small - Password Toggle */}
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md border dark:border-gray-800">
            <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">Ghost & Password (Sm)</h3>
            <InputField
              label="Password"
              placeholder="Hidden text"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} // Added type for best practice
              type="password"
              variant="ghost"
              size="sm"
            />
          </div>

          {/* Disabled State (Correctly omits onChange now that it's optional) */}
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md border dark:border-gray-800">
            <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">Disabled State</h3>
            <InputField
              label="API Key (Read Only)"
              value="********************"
              disabled
              readOnly
              variant="outlined"
            />
          </div>

          {/* Clear Button Demo */}
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md border dark:border-gray-800">
            <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">Clearable Input (Filled)</h3>
            <InputField
              label="Search Query"
              placeholder="Click X to clear"
              value={textValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTextValue(e.target.value)} // Added type for best practice
              onClear={handleClearText}
              variant="filled"
            />
          </div>
        </div>
      </section>

      {/* --- DEMO 2: DataTable Component --- */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">2. DataTable Component</h2>

        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                Selected: <span className="font-bold text-indigo-600 dark:text-indigo-400">{dataSelection.length} rows</span>
            </p>
            <button
              onClick={() => { setLoadingData(true); setTimeout(() => setLoadingData(false), 2000); }}
              disabled={loadingData}
              className="mt-3 sm:mt-0 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md disabled:bg-indigo-400"
            >
              {loadingData ? 'Simulating Load (2s)...' : 'Simulate Loading State'}
            </button>
        </div>

        <DataTable<Product>
          data={loadingData ? [] : MOCK_PRODUCTS}
          columns={productColumns}
          loading={loadingData}
          selectable={true}
          onRowSelect={handleRowSelect}
          rowKey="id"
          emptyStateText="The product list is currently empty. Try adding items."
        />
      </section>

      <footer className="mt-16 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-600">
        <p>Assignment Demo built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
