"use client"

import React , { useState } from 'react';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


export default function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}



export function Example () {

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
    </div>
  );
};

