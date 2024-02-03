'use client'

// logic
import React from 'react';

// UI
import { Form, Button, Input, message, Modal } from 'antd';
import style from '../reach.module.css'

// inteface
interface Email {
  email: string;
}

function Password_Recovery() {

  // basics
  const [loading, setLoading] = React.useState(false);

  const onResend = async (values: Email) => {
    try{
      // start loading animation
      setLoading(true);

      // send email

      // view success
      message.success("Le abbiamo inviato una e-mail contenente le istruzioni per il recupero della sua password")
    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  }

  function error() {
    Modal.error({
      title: 'Funzione non ancora implementata',
      content: 'Se si vuole procedere con il ripristino della password andare alla pagina https://bookeasy-antico-granaio.vercel.app/reset-password (online) o http://localhost:3000/recover-password (locale)',
    });
  }

  // useEffect
  React.useEffect(() => {
    // send email logic
    try {
      // check if wrote the email in login form
      const email = localStorage.getItem('email');
      if (!email) {
        throw new Error("Inserire nel campo un indirizzo e-mail")
      }

      // send email
      /*
      const data: Email = {
        email: email
      }
      onResend(data);
      */

    } catch (error: any) {
      message.error(error.message)
    }
  }, []);

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
          
          <Button onClick={error} type="primary" htmlType='submit' block loading={loading}>
            Recupera Password
          </Button>
        </Form>
      </div>
    </section>
  )
} export default Password_Recovery