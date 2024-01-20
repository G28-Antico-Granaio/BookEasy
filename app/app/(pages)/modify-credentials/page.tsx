'use client'

import React from 'react';

import { Form, Input, Select, Button, message } from 'antd';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NextResponse } from 'next/server';


import style from '../(auth)/auth.module.css'

const { Option } = Select;

interface user{
    name: string;
    surname: string;
    tel_number: number;
    tel_area_code: number;
    email: string;
} 

function Modify_Credentials() {

    const [form] = Form.useForm();

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const onChange = async (values: user) => {
    
        try {
            setLoading(true);

            await axios.post('/api/auth/modify-credentials', values);
            message.success('Modifica delle Credenziali effettuata');
            router.push("/private-area");

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
                    onFinish={onChange}
                    initialValues={{ tel_area_code: '39' }}
                    scrollToFirstError>

                    <h1>Modifica Credenziali</h1>

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


                    <Button htmlType='submit' block loading={loading}>
                        Conferma le Modifiche
                    </Button>

                </Form>
            </div>
        </main>
    )
}export default Modify_Credentials