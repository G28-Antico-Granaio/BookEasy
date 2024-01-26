'use client'

import React, { useState } from 'react'

import { Form, Input, Button, message } from 'antd'

import { useRouter } from 'next/navigation';
import axios from 'axios';

import style from '@/app/(pages)/(auth)/auth.module.css'
import Loader from '@/app/components/loader';

interface user{
    password: string;
    email: string,
}

function Delete_Account() {

    const [form] = Form.useForm();

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const onDelete = async (values: user) => {
        try {
            setLoading(true);

            const email: string | null = localStorage.getItem('email') || '';

            const data: user = {
                ...values,
                email
            };

            await axios.post("/api/auth/delete-account", data);
            message.success("Account Eliminato");
            router.push("/");
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            localStorage.removeItem('email')
            
            setLoading(false);
        }
    };

    const [userLog, setUserLog] = useState<string | null>(null);
    const [loadingUserLog, setLoadingUserLog] = useState(true)
    React.useEffect(() => {
        const log = localStorage.getItem('log');
        setUserLog(log);
        setLoadingUserLog(false)
    }, []);
    
    if(loadingUserLog){
        return(
            <Loader />
        )
    }

    if (userLog === 'true') {
        return (
            <section className='container'>

                <h1>Eliminazione Account</h1>

                <section className={style.blabla}>
                    Quando elimini il tuo account, non potrai più recuperare
                    le tue vecchie credemziali e lo storico delle prenotazioni.
                    Inoltre non sarà più possibile prenotare online in questo 
                    ristornate.
                </section>

                <section className={style.blabla}>
                    Se desideri procedere con l&apos;operazione, inserisci la
                    password e clicca conferma
                </section>

                <Form
                    name='delete'
                    form={form}
                    onFinish={onDelete}
                    scrollToFirstError>

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
                            width: '25%',
                            height: '3rem'
                        }}/>

                    </Form.Item>

                    <Button htmlType='submit' block loading={loading} style={{
                            width: '25% !important',
                            height: '3rem'
                        }}>
                        Cancella definitivamente l&apos;account 
                    </Button>
                </Form>
            </section>
        )
    } else {
        router.push('/login');
    }
} export default Delete_Account