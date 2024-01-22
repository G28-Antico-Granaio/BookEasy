'use client'

import React from 'react';

import { Form, Button, Input, message } from 'antd';

import style from '../(auth)/auth.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NextResponse } from 'next/server';

interface user{
    password: string;
}

function Reset_Password() {

    const [form] = Form.useForm();

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const onSend = async (values: user) => {
        message.warning("Funzione non ancora Implementata");
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
                            
                        <Input.Password placeholder='Password'
                        style={{
                            width: '75%',
                            height: '3rem',
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
                        }}/>
                    
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