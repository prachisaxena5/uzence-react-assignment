import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {DataTable} from '../src/components/DataTable/DataTable';
import type {Column} from '../src/types'


interface Product {
id: number;
name: string;
category: string;
price: number;
inStock: boolean;
}


const MOCK_PRODUCTS: Product[] = [
{ id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1200, inStock: true },
{ id: 2, name: 'Desk Chair', category: 'Furniture', price: 350, inStock: true },
{ id: 3, name: 'Keyboard', category: 'Electronics', price: 150, inStock: false },
];


const productColumns: Column<Product>[] = [
{ key: 'name', title: 'Product Name', dataIndex: 'name', sortable: true },
{ key: 'category', title: 'Category', dataIndex: 'category', sortable: true },
{ key: 'price', title: 'Price', dataIndex: 'price', sortable: true },
{
key: 'stock',
title: 'Stock Status',
dataIndex: 'inStock',
render: (value) => (
<span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
}`}>
{value ? 'In Stock' : 'Out of Stock'}
</span>
),
},
];


const metaTable: Meta<typeof DataTable<Product>> = {
title: 'Components/DataDisplay/DataTable',
component: DataTable,
};
export default metaTable;


const TemplateTable = (args: any) => {
const [selectedRows, setSelectedRows] = useState<Product[]>([]);
return <DataTable {...args} onRowSelect={setSelectedRows} />;
};


export const DefaultTable: StoryObj<typeof DataTable<Product>> = {
render: (args) => <TemplateTable {...args} />,
args: {
data: MOCK_PRODUCTS,
columns: productColumns,
selectable: true,
rowKey: 'id',
},
};


export const LoadingState: StoryObj<typeof DataTable<Product>> = {
render: (args) => <DataTable {...args} />,
args: {
data: [],
columns: productColumns,
loading: true,
},
};


export const EmptyState: StoryObj<typeof DataTable<Product>> = {
render: (args) => <DataTable {...args} />,
args: {
data: [],
columns: productColumns,
emptyStateText: 'No products available.',
},
};