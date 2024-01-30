'use client'

import React from 'react';

import { Form, Input, Button, message } from 'antd';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import axios from 'axios';

import style from '../reach.module.css'

interface User{
  email: string;
  password: string;
}

function Login(){

  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onLogin = async (values: User) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      const result = response.data;

      await localStorage.setItem('email', values.email);
      await localStorage.setItem('role', result.data.isAdmin);
      await localStorage.setItem('log', 'true');

      const role = localStorage.getItem('role');

      message.success("Login Effettuato");
      if (role === 'true') {
        router.push("/private-area/ristoratore");
      } else {
        router.push("/private-area");
      }
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {            
      setLoading(false);
    }
  };

  return(
    <section className='container'>
      <section className={style.form}>

        <Form
          name='login'
          form={form}
          onFinish={onLogin}
          scrollToFirstError>

          <h2>Login</h2>

          <hr className={style.hr_form} />
                    
          <Form.Item
            name={'email'}
            rules={[
            {
              type: 'email',
              message: 'E-Mail inserita non è valida'
            },  {
              required: true,
              message: 'Inserire un indirizzo E-Mail'
            },
          ]}>

            <Input placeholder='E-Mail'
              style={{
                height: '3rem',
            }}/>

          </Form.Item>

          <Form.Item
            name={'password'}
            rules={[
            {
              required: true,
              message: 'Inserisci la tua Password'
            },
          ]}>
                            
            <Input.Password placeholder='Password'/>
                    
          </Form.Item>

          <Form.Item>
            <Link href='/recover-password' className={style.link} prefetch={false}>
              Recupera Password
            </Link>
          </Form.Item>

          <Button htmlType='submit' block loading={loading}>
            Accedi
          </Button>

          <hr className={style.hr_form}/>

          <div>
            Non hai gà un account?

            <br />

            <Link href='/register' className={style.link}>
              Registrati
            </Link>
          </div>
        </Form>
      </section>
    </section>
  )
}export default Login