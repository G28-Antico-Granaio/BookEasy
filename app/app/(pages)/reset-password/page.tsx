'use client'

import React from 'react';

import { Form, Button } from 'antd';
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';

import style from '../../auth.module.css'

interface user{
    password: string;
    conf_password: string;
}

function Reset_Password() {
  return (
        <main>
            <div className={style.form}>

                <h1>Modifica Password</h1>

                <hr />

                <Form>

                    <Form.Item name={'password'}
                        rules={getAntdFieldRequiredRule('Inserire una Password')}>
                        <input type="password" placeholder='Password'/>
                    </Form.Item>

                    <Form.Item name={'password'}
                        rules={getAntdFieldRequiredRule('Inserire la Conferma della Password')}>
                        <input type="password" placeholder='Conferma Password'/>
                    </Form.Item>

                    <Button htmlType='submit'>
                        Conferma
                    </Button>

                </Form>
            </div>
        </main>
    )
}

export default Reset_Password