'use client'

// logic
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// UI
import {Button, Form, Input, InputNumber, Select, message } from 'antd';
import Link from 'next/link';
import style from '../reach.module.css'
const { Option } = Select;

// interface
interface user{
  name: string;
  surname: string;
  tel_number: number;
  tel_area_code: number;
  email: string;
  password: string;
}

function Register() {

  //basics
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // handle register
  const onRegister = async (values: user) => {
    try {
      // start loading animation
      setLoading(true);

      // call API to register
      const response = await axios.post('/api/users/register', values);

      // view success and send to login
      message.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      // view error
      message.error(error.response.data.message);
    } finally {
      // end loading animation
      setLoading(false);
    }
  };

  // handle login
  const onLogin = async () => {
    // send to page
    router.push('login');
  }

  // useEffect
  React.useEffect(() => {
    // get data
    const log = localStorage.getItem('log');

    // if data doesn't exist send to login
    if (log === 'true') {
      router.push('/');
    }
  }, [router]);

  const prefixSelector = (
    <Form.Item name="tel_area_code" noStyle>
      <Select>
        <Option value="39">+39</Option>
        <Option value="44">+44</Option>
        <Option value="49">+49</Option>
      </Select>
    </Form.Item>
  );

  return (
    <section className='container'>
      <div className={style.form}>

        <Form
          name='register'
          form={form}
          onFinish={onRegister}
          initialValues={{ tel_area_code: '39' }}
          scrollToFirstError>

          <h1>Registrati</h1>

          <hr className={style.hr_form}  />

          <Form.Item
            name={'name'}
            rules={[
            {
              required: true,
              message: 'Inserisci il tuo nome'
            },
          ]}>

            <Input placeholder='Nome'
            style={{
                height: '3rem',
            }}/>

          </Form.Item>

          <Form.Item
            name={'surname'}
            rules={[
            {
              required: true,
              message: 'Inserisci il tuo Cognome'
            },
          ]}>

            <Input placeholder='Cognome'
              style={{
                height: '3rem',
            }}/>

          </Form.Item>

          <Form.Item
            className={style.numb}
            name={'tel_number'}
            rules={[
              {
                type: 'number',
                message: 'Inserire un numero valido',
              },
              {
                required: true,
                message: 'Inserisci il tuo Numero di Telefono'
              },
              {
                pattern: /^[0-9]{10}$/,
                message: 'Formato del numero di telefono non è valido. Inserire un numero di telefono nel formato corretto (+39 1234567890)',
              },
          ]}>

            <InputNumber addonBefore={prefixSelector} placeholder='Numero di Telefono'
              controls={false}
              style={{
                width: '75%',
                height: '3rem',
                borderRadius: '30px'
            }}/>
          
          </Form.Item>

          <Form.Item
            name={'email'}
            rules={[
            {
              type: 'email',
              message: "L'indirizzo e-mail inserito non è valido. Inserire un indirizzo e-mail nel formato corretto (nome@dominio.com)"
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
            Registrati
          </Button>

          <hr className={style.hr_form}  />

          <div>
            Hai già un account?

          <br />

            <a onClick={onLogin} className={style.link}>
              Accedi
            </a>
          </div>
        </Form>
      </div>
    </section>
  )
} export default Register