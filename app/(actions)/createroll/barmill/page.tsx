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


import { section , barmill } from '../../../../components/lines/page';


import {
  CreateRollWrapper ,
  Preview ,
  FormItem ,
  ContentWrapper ,
  BreadCrumbs
} from '../../../../components/styled/styled';


import axios, {isCancel, AxiosError} from 'axios';

import { Table } from 'antd';

import URL , { 
  RollerCreationPath , 
  getAllRollersPath ,
  deleteRollerPath ,
} from '../../../../api/request';

import { Modal } from 'antd';




const rollerColumns = [
  // {
  //   key: 'sort',
  // },
  {
    title: 'شماره',
    dataIndex: 'id',
    key: 'id',
    width: 50,
  },
  {
    title: 'جنس غلطک',
    dataIndex: 'gender',
    key: 'gender',
    width: 70,
  },
  {
    title: 'عرض غلطک',
    dataIndex: 'width',
    key: 'width',
    width: 70,
  },
  {
    title: 'قطر غلطک',
    dataIndex: 'diameter',
    key: 'diameter',
    width: 70,
  },
  {
    title: 'تیپ غلطک',
    dataIndex: 'type',
    key: 'type',
    width: 70,
  },
  {
    title: 'کد غلطک',
    dataIndex: 'roller_code',
    key: 'roller_code',
    width: 70,
  },
  {
    title: 'جایگاه غلطک',
    dataIndex: 'position',
    key: 'position',
    width: 70,
  },
];



export default function App () {

  const [mounted , setMounted] = useState(false);

  useEffect( () => {

    setMounted(true);


    return () => {
      // Clean up resources or cancel any pending operations.
    };

  } , [] ) ;


  if(mounted == false) return 'loading...'

  return (
    <ContentWrapper>

        <BreadCrumbs>
          <span>
            ایجاد غلطک
          </span>
          <span>
            &gt;
          </span>
          <span>
            بارمیل
          </span>
        </BreadCrumbs>


    </ContentWrapper>
  );
};

