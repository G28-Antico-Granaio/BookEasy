'use client'

import React from 'react';

import { Form, Button } from 'antd';
import Link from 'next/link';

import style from '../auth.module.css'

interface user{
    name: string;
    surname: string;
    tel_number: number;
    tel_area_code: number;
    email: string;
} 

function Modify_Credentials() {
  return (
    <main>
    <div className={style.form}>

        <h1>Modifica Credenziali</h1>

        <hr />

        <Form>

            <Form.Item name={'Name'}
                rules={getAntdFieldRequiredRule('Inserisci il tuo Nome')}>
                <input type="text" placeholder='Nome'/>
            </Form.Item>

            <Form.Item name={'surname'}
                rules={getAntdFieldRequiredRule('Inserisci il tuo Cognome')}>
                <input type="email" placeholder='Cognome'/>
            </Form.Item>

            <Form.Item name={'tel_number'}
                rules={getAntdFieldRequiredRule('Inserire un numero di Telefono valido')}>
                    <input className={style.prefix} type="number" placeholder='Prefisso'/>
                    <input className={style.postfix} type="number" placeholder='Numnero di Telefono'/>
            </Form.Item>

            <Form.Item name={'email'}
                rules={getAntdFieldRequiredRule('Inserisci un indirizzo E-Mail valido')}>
                <input type="email" placeholder='E-Mail'/>
            </Form.Item>


            <Button htmlType='submit'>
                Conferma le Modifiche
            </Button>

        </Form>
    </div>
</main>
    )
}export default Modify_Credentials