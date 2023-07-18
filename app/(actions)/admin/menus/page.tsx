"use client"

import React , { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';


interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}


const dataSource = [
  {
    key: '1',
    name: 'John Doe',
    age: 25,
    address: '123 ABC Street',
  },
  {
    key: '2',
    name: 'Jane Smith',
    age: 32,
    address: '456 XYZ Street',
  },
];


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];








export default function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}



export function Example () {


  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };


  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;


  const { isLoading, error, data } = useQuery('repoData', () => 
    fetch('http://127.0.0.1:8000').then(res =>
      res.json()
    )
  )






  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error

  console.log(data)






  return (
    <div>
        admin / menus
        <div>
          {data.message}
        </div>

        <div>
          <div style={{ marginBottom: 16 }}>
            {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
              Reload
            </Button> */}
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>  
          <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
        </div>
        


    </div>
  );
};

