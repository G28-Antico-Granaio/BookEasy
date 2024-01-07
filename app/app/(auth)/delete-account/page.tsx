'use client'

import React from 'react'

import { Form, Input, Button, message } from 'antd'

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NextResponse } from 'next/server';


import style from '../auth.module.css'

interface user{
    password: string;
}

function Delete_Account() {

    const [form] = Form.useForm();

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const onLogin = async (values: user) => {
        try {
            setLoading(true);

            await axios.post("/api/auth/delete-account", values);
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
    
  return (
    <main>
        <h1>Eliminazione Account</h1>

        <p>
            Quando elimini il tuo account, non potrai più recuperare
            le tue vecchie credemziali e lo storico delle prenotazioni.
            Inoltre non sarà più possibile prenotare online in questo 
            ristornate.
        </p>

        <p>
            Se desideri procedere con l&apos;operazione, inserisci la
            password e clicca conferma
        </p>

        <Form>
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
                    width: '75%',
                }}/>

            </Form.Item>

            <Button htmlType='submit' block loading={loading}>
                Conferma 
            </Button>
        </Form>
    </main>
  )
} export default Delete_Account