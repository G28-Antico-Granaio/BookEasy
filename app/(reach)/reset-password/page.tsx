'use client'

// logic
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// UI
import { Form, Button, Input, message } from 'antd';
import style from '../reach.module.css'

//interface
interface User{
  password: string;
}

function Reset_Password() {

  // basics
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // handle password reset
  const onSend = async (values: User) => {
    try {
      // start loading animation
      setLoading(true);

      // get email from localStorage
      const email: string | null = localStorage.getItem('email') || '';

      // call API to reset user password
      const response = await axios.patch(`/api/users/reset-password/${email}`, values);

      // remove data from localStorage and set log to false
      localStorage.clear();
      localStorage.setItem('log', 'false');

      // view success and send to login
      message.success(response.data.message);
      router.push('/login');
    } catch (error: any) {
      // view error
      message.error(error.response.data.message);
    } finally {
      // end loading animation
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

          <hr className={style.hr_form}  />

          <Form.Item
            name={'password'}
            rules={[
                {
                  required: true,
                  message: 'Inserisci la tua Password'
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                  message: 'Assicurarsi che la password abbia almeno 8 caratteri, includa almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale come !, @, #, _',
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
                message: 'Inserisci la tua Password'
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                message: 'Assicurarsi che la password abbia almeno 8 caratteri, includa almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale come !, @, #, _',
              },
              ({ getFieldValue }) => ({validator(_, value) {

              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
                return Promise.reject(new Error('La password e la sua conferma non corrispondono. Assicurarsi che entrambi i campi siano identici”'));
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