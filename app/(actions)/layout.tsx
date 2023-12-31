"use client"

import React  from 'react';


import MainLayout from './__layout';



import { Provider } from 'react-redux';
import { store } from '../../store/store';



export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <Provider store={store}>
      <MainLayout>
          {children}
      </MainLayout>
    </Provider>
  );
};