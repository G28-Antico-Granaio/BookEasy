'use client'

// logic
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

// UI
import { Form, Input, Button, message } from 'antd'
import style from '../reach.module.css'

// interface
interface User{
  password: string;
}

function Delete_Account() {

  // basics
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // handle delete
  const onDelete = async (values: User) => {
    try {
      // statrt loading animation
      setLoading(true);

      // get email from localStorage
      const email: string | null = localStorage.getItem('email') || '';

      // call API to delete account
      const response = await axios.post(`/api/users/delete-account/${email}`, values);

      // remove localStoreage data and set log to false
      localStorage.clear();
      localStorage.setItem('log', 'false');

      // view success and send to Home
      message.success(response.data.message);
      router.push("/");
    } catch (error: any) {
      // view error
      message.error(error.response.data.message);
    } finally {      
      // end loading animation
      setLoading(false);
    }
  };
  
  // useEffect
  React.useEffect(() => {
    // get data
    const log = localStorage.getItem('log');
    const role = localStorage.getItem('role');

    // if data doesn't exist send to login
    if (!log || !role) {
      router.push('/login');
    }
  }, [router]);

  return (
    <section className='container'>

      <h1>Eliminazione Account</h1>

      <section className={style.blabla}>
        Quando elimini il tuo account, non potrai più recuperare
        le tue vecchie credemziali e lo storico delle prenotazioni.
        Inoltre non sarà più possibile prenotare online in questo 
        ristornate.
      </section>

      <section className={style.blabla}>
        Se desideri procedere con l&apos;operazione, inserisci la
        password e clicca conferma
      </section>

      <Form
        name='delete'
        form={form}
        onFinish={onDelete}
        scrollToFirstError>

        <Form.Item
          name={'password'}
          rules={[
          {
            required: true,
            message: 'Inserisci la tua Password'
          }
        ]}>

          <Input.Password placeholder='Password'
            style={{
              width: '25%',
              height: '3rem'
          }}/>

        </Form.Item>

        <Button htmlType='submit' block loading={loading}
          style={{
            width: '25% !important',
            height: '3rem'
          }}>
          
          Cancella definitivamente l&apos;account 

        </Button>
      </Form>
    </section>
  )
} export default Delete_Account