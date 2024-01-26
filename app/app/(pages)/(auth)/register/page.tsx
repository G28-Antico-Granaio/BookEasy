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
      message.error(error.response.data.message);
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
        <section className='container'>
            <div className={style.form}>

                <Form
                    name='register'
                    form={form}
                    onFinish={onRegister}
                    initialValues={{ tel_area_code: '39' }}
                    scrollToFirstError>

                    <h1>Registrati</h1>

                    <hr className='hr_r_l' />

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
                                required: true,
                                message: 'Inserisci il tuo Numero di Telefono'
                            },
                        ]}>

                        <InputNumber addonBefore={prefixSelector} placeholder='Numnero di Telefono'
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
                                message: 'E-Mail inserita non è valida'
                            },
                            {
                                required: true,
                                message: 'Inserire un indirizzo E-Mail'
                            },
                        ]}>
                        <Input placeholder='E-Mail'
                        style={{
                            height: '3rem',
                        }}/>
                    </Form.Item>

                    <hr className='hr_r_l' />

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
                            height: '3rem',
                            borderRadius: '30px'
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
                            height: '3rem',
                            borderRadius: '30px'
                        }}/>
                    
                    </Form.Item>


                    <Button htmlType='submit' block loading={loading}>
                        Registrati
                    </Button>

                    <hr className='hr_r_l' />

                    <div>
                        Hai gà un account?

                        <br />

                        <Link href='/login' className={style.link}>
                            Accedi
                        </Link>
                    </div>
                </Form>
            </div>
        </section>
  )
} export default Register