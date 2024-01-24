'use client'

import React from 'react';

import { Form, Input, Button, message } from 'antd';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NextResponse } from 'next/server';

import style from '../auth.module.css'

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
            const response = await axios.post("/api/auth/login", values);
            const result = response.data;

            localStorage.setItem('email', values.email);
            localStorage.setItem('role', result.data.isAdmin);
            localStorage.setItem('log', 'true');

            message.success("Login Effettuato");
            router.push("/private-area")
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
    }

    return(
        <section className='container'>
            <section className={style.form}>

                <Form
                name='login'
                form={form}
                onFinish={onLogin}
                scrollToFirstError>
                    <h2>Login</h2>

                    <hr />
                    
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

                    <Form.Item
                        name={'password'}
                        rules={[
                            {
                                required: true,
                                message: 'Inserisci la tua Password'
                            },
                        ]}>
                            
                        <Input.Password placeholder='Password'
                        style={{
                            width: '75%',
                            height: '3rem',
                        }}/>
                    
                    </Form.Item>

                    <Form.Item>
                        <Link href='/password_recovery' className={style.link} prefetch={false}>
                            Recupera Password
                        </Link>
                    </Form.Item>

                    <Button htmlType='submit' block loading={loading}>
                        Accedi
                    </Button>

                    <hr />

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