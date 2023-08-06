"use client"

import React , { useState , useEffect } from 'react';

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';


import { due , universal } from '../../../../components/lines/page';


import {
  CreateRollWrapper ,
  Preview ,
  FormItem ,
  ContentWrapper ,
  BreadCrumbs , 
  Center
} from '../../../../components/styled/styled';


import axios, {isCancel, AxiosError} from 'axios';

import { Table } from 'antd';

import URL , { 
  RollerCreationPath , 
  getAllRollersPath ,
  deleteRollerPath ,
} from '../../../../api/request';

import { Modal } from 'antd';


import { Space, Spin } from 'antd';


import Loader from '../../../../components/loader/loader';




export default function App () {


  const [mounted , setMounted] = useState(false);

  useEffect( () => {
    //console.log(`running useEffect ...`);
    //getAllRollers();

    return () => {
      // Clean up resources or cancel any pending operations.
    };

  } , [] );

  

  if(mounted == false) return (
      <Loader />
  ) ;



  return (
    <div>
        create stand / section
    </div>
  );
};

