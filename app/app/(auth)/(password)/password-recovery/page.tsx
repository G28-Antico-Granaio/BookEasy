'use client'

import React from 'react';

import { Form, Button } from 'antd';
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';

import style from '../../auth.module.css'

interface user{
    email: string;
}

function Password_Recovery() {
  return (
    <main>
        <div className={style.form}>

            <h1>Modifica Password</h1>

            <Form>

                <Form.Item name={'email'}
                    rules={getAntdFieldRequiredRule('Inserire un indirizzo E-Mail valido')}>
                    <input type='email' placeholder='esempio@dominio.com'/>
                </Form.Item>

                <div>
                    Si prega di controllare la casella di posta elettronica per il messaggio 
                    di recuper password. In caso di non ricezione si consiglia di verificare 
                    la casella dello spam o che l&apos;indirizzo e-mail scritto nella casella sopra 
                    sia corrretto e premere il bottone &quot;reinvia e-mail&quot;
                </div>

                <Button htmlType='submit'>
                    Renvia E-Mail
                </Button>

            </Form>

        </div>
    </main>
  )
}export default Password_Recovery