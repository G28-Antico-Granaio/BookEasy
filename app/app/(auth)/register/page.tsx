'use client'

import React from 'react';

import {Button, Form, Input, InputNumber, Select, message } from 'antd';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NextResponse } from 'next/server';

import style from '../auth.module.css'

const { Option } = Select;

interface user{
    name: string;
    surname: string;
    tel_number: number;
    tel_area_code: number;
    email: string;
    password: string;
    conf_password: string;
}

function Register() {

    const [form] = Form.useForm();

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const onRegister = async (values: user) => {
    
        try {
            setLoading(true);

            await axios.post('/api/auth/register', values);
            message.success('Registrazione effettuata con successo, ora effettuare il login');
            router.push("/login");

        } catch (error: any) {

            return NextResponse.json({
                message: error.message,
            },
                {
                    status: 400
                }
            );

        } finally {

            setLoading(false);
        }
    };


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
        <main>
            <div className={style.form}>

                <Form
                    name='register'
                    form={form}
                    onFinish={onRegister}
                    initialValues={{ tel_area_code: '39' }}
                    scrollToFirstError>

                    <h1>Registrati</h1>

                    <hr />

                    <Form.Item
                        name={'name'}
                        rules={[
                            {
                                required: true,
                                message: 'Inserisci il tuo nome'
                            },
                        ]}>

                        <Input placeholder='Nome'/>

                    </Form.Item>

                    <Form.Item
                        name={'surname'}
                        rules={[
                            {
                                required: true,
                                message: 'Inserisci il tuo Cognome'
                            },
                        ]}>

                        <Input placeholder='Cognome'/>

                    </Form.Item>

                    <Form.Item
                        className={style.numb}
                        name={'tel_number'}
                        rules={[
                            {
                                required: true,
                                message: 'Inserisci il tuo Numero di Telefono'
                            },
                        ]}>

                        <Input addonBefore={prefixSelector} placeholder='Numnero di Telefono'
                        style={{
                            width: '75%',
                        }}/>
                    
                    </Form.Item>

                    <Form.Item
                        name={'email'}
                        rules={[
                            {
                                type: 'email',
                                message: 'E-Mail inserita non è valida'
                            },
                            {
                                required: true,
                                message: 'Inserire un indirizzo E-Mail'
                            },
                        ]}>
                        <Input placeholder='E-Mail'/>
                    </Form.Item>

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
                            
                        <Input.Password placeholder='Password'
                        style={{
                            width: '75%',
                        }}/>
                    
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

                        <Input.Password placeholder='Conferma Password'
                        style={{
                            width: '75%',
                        }}/>
                    
                    </Form.Item>


                    <Button htmlType='submit' block loading={loading}>
                        Registrati
                    </Button>

                    <hr />

                    <div>
                        Hai gà un account?

                        <br />

                        <Link href='/login' className={style.link}>
                            Accedi
                        </Link>
                    </div>
                </Form>
            </div>
        </main>
  )
}

export default Register




const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

    </Form>
  );
};
