'use client'

import React from 'react';

import { Form, Button, Input, message } from 'antd';

import style from '../reach.module.css'
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User{
  password: string;
}

function Reset_Password() {

  const [form] = Form.useForm();

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const onSend = async (values: User) => {
    try {
      setLoading(true);

      const email: string | null = localStorage.getItem('email') || '';
      await axios.patch(`/api/users/reset-password/${email}`, values);
      localStorage.clear();
      localStorage.setItem('log', 'false');

      message.success('Password Modificata');
      router.push('/login');
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <section className='container'>
      <div className={style.form}>
        <Form
          name='register'
          form={form}
          onFinish={onSend}
          initialValues={{ tel_area_code: '39' }}
          scrollToFirstError>

          <h2>Resetta la Password</h2>

          <hr />

          <Form.Item
            name={'password'}
            rules={[
            {
              required: true,
              message: 'Inserisci la tua Password'
            },
            ]}
            hasFeedback>
                    
            <Input.Password placeholder='Password' />
          
          </Form.Item>

          <Form.Item
            name={'conf_password'}
            dependencies={['password']}
            hasFeedback
            rules={[
                  {
                required: true,
                message: 'Conferma la password',
              },
              ({ getFieldValue }) => ({validator(_, value) {

              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
                return Promise.reject(new Error('Le password inserite non coincidono!'));
              },
            }),
          ]}>

            <Input.Password placeholder='Conferma Password' />

          </Form.Item>


          <Button htmlType='submit' block loading={loading}>
            Conferma
          </Button>
        </Form>
      </div>
    </section>
  )
}
export default Reset_Password