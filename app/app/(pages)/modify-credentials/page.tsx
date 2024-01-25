'use client'

import React from 'react';

import { Form, Input, Select, Button, message } from 'antd';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NextResponse } from 'next/server';


import style from '../(auth)/auth.module.css'

const { Option } = Select;

interface User{
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

    React.useEffect(() => {
        const onLoad = async () => {
          try {
            const email: string | null = localStorage.getItem('email') || '';
            const response = await axios.get(`/api/user/${email}`);
            const user: User = response.data.data;
    
            form.setFieldsValue({
              name: user.name,
              surname: user.surname,
              tel_number: user.tel_number,
              tel_area_code: user.tel_area_code,
              email: user.email,
            });
          } catch (error: any) {
            console.log("Error fetching user data:", error);
          }
        }    
        onLoad();
      }, [form]);

    
    const onChange = async (values: User) => {
        try {
            setLoading(true);

            const email: string | null = localStorage.getItem('email') || '';

            await axios.post(`/api/modify-credentials/${email}`, values);
            message.success('Modifica delle Credenziali effettuata');

            localStorage.setItem('email', values.email);

            router.push("/private-area");
        } catch (error: any) {
            return NextResponse.json({
                message: error.message,
            }, {
                status: 400
            });
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
                    onFinish={onChange}
                    scrollToFirstError>

                    <h2>Modifica Credenziali</h2>

                    <hr />

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
                        <Input placeholder='E-Mail'
                        style={{
                            height: '3rem',
                        }}/>
                    </Form.Item>


                    <Button htmlType='submit' block loading={loading}>
                        Conferma le Modifiche
                    </Button>

                </Form>
            </div>
        </section>
    )
}export default Modify_Credentials