'use client'

import React from 'react';

import { Form, Input, Button, message } from 'antd';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NextResponse } from 'next/server';

import style from '../auth.module.css'

interface user{
    email: string;
    password: string;
}

function Login(){

    const [form] = Form.useForm();

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const onLogin = async (values: user) => {
        try {
            setLoading(true);

            await axios.post("/api/auth/login", values);
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
        <main>
            <div className={style.form}>

                <Form
                name='login'
                form={form}
                onFinish={onLogin}
                scrollToFirstError>

                    <h1>Login</h1>

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

                        <Input placeholder='E-Mail'/>

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
                        }}/>
                    
                    </Form.Item>

                    <Link href='/password_recovery' className={style.link}>
                        Recupera Password
                    </Link>

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
            </div>
        </main>
    )
}export default Login