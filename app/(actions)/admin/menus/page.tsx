"use client"

import React , { useEffect, useState } from 'react';



import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';


import Body from './body';


import { QueryClient, QueryClientProvider, useQuery } from 'react-query';



export default function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Body />
    </QueryClientProvider>
  )
}



