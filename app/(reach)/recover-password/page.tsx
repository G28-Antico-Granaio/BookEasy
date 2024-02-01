'use client'

import React from 'react';

import { Form, Button, Input } from 'antd';

import style from '../reach.module.css'

function Password_Recovery() {
  return (
    <section className='container'>
      <div className={style.form}>
        <Form
          name='password-recovery'
          scrollToFirstError>

          <h2>Recupero password</h2>

          <hr className={style.hr_form}  />

          <Form.Item
            name={'email'}
            rules={[
            {
              type: 'email',
              message: 'E-Mail inserita non è valida'
            },  {
              required: true,
              message: 'Inserire un indirizzo E-Mail'
            },
          ]}>

            <Input placeholder='E-Mail'
              style={{
                height: '3rem',
            }}/>

          </Form.Item>

          <section className={style.blabla}>
            Si prega di controllare la casella di posta elettronica 
            per il messagio di recupero password.
            Nel caso di non ricezione si prega di controllarelo spam 
            o che la mail riportata sopra sia corretta ed eventualmente 
            modificarla
          </section>

          <Button htmlType='submit' block>
            Accedi
          </Button>
        </Form>
      </div>
    </section>
  )
} export default Password_Recovery