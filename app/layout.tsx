import './globals.css'

import React  from 'react';

import { Provider } from 'react-redux';
import store from '../store/store';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const queryClient = new QueryClient()

  return (
    <html lang="en" dir="rtl">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              {children}
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  )
}