"use client"

import React from 'react';


import styled from 'styled-components'


const Center = styled.div`
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%,-50%);
`



export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ 
        position : 'absolute' , 
        top : '50%' ,  
        //right : '10%' , 
        transform : 'translate(-50%,-50%)' ,
    }}>
        {children}
    </div>
  )
}