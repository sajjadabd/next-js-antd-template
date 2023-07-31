"use client"

import React , { useEffect, useState } from 'react';



import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';


import Body from './body';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';


const queryClient = new QueryClient()


export default function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    <Body />
    // </QueryClientProvider>
  )
}



