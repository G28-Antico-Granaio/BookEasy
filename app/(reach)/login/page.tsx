'use client'

//logic
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// UI
import { Form, Input, Button, message } from 'antd';
import style from '../reach.module.css'
import NumCalculator from 'antd/es/theme/util/calc/NumCalculator';

// interface
interface User{
  email: string;
  password: string;
}

function Login(){

  // basics
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // handle login
  const onLogin = async (values: User) => {
    try {
      // start loading
      setLoading(true);

      // call API to login
      const response = await axios.post("/api/users/login", values);
      const result = response.data;

      // save non sensitive informations in localStorage
      localStorage.setItem('email', values.email);
      localStorage.setItem('role', result.data.isAdmin);
      localStorage.setItem('log', 'true');

      // get role
      const role = localStorage.getItem('role');

      // view success and send to right page based on role
      message.success(response.data.message);
      if (role === 'true') {
        router.push("/private-area/ristoratore");
      } else {
        router.push("/private-area");
      }
    } catch (error: any) {
      // view error
      message.error(error.response.data.message);
    } finally {      
      // end loading animation      
      setLoading(false);
    }
  };

  // handle forgot password
  const onForgot = async () => {
    // if mail in localStorage
    const email: string | null = form.getFieldValue('email');
    if (email) {
      localStorage.setItem('email', email);
    }

    //sends to recove password
    router.push('/recover-password')
  }

  // handle register
  const onReg = async () => {
    // sendo to page
    router.push('/register')
  }

  // useEffect
  React.useEffect(() => {
    // get data
    const log = localStorage.getItem('log');

    // if data doesn't exist send to login
    if (log === 'true') {
      router.push('/');
    }
  }, [router]);

  return(
    <section className='container'>
      <section className={style.form}>

        <Form
          name='login'
          form={form}
          onFinish={onLogin}
          scrollToFirstError
          onValuesChange={(changedValues, allValues) => {
            if (changedValues.email) {
              localStorage.setItem('email', changedValues.email);
            }
          }}>

          <h2>Login</h2>

          <hr className={style.hr_form} />
                    
          <Form.Item
            name={'email'}
            rules={[
            {
              type: 'email',
              message: 'E-Mail inserita non è valida'
            },  {
              required: true,
              message: 'Inserire il tuo indirizzo E-Mail'
            },
          ]}>

            <Input placeholder='E-Mail'
              style={{
                height: '3rem',
            }}/>

          </Form.Item>

          <Form.Item
            name={'password'}
            rules={[
            {
              required: true,
              message: 'Inserisci la tua Password'
            },
          ]}>
                            
            <Input.Password placeholder='Password'/>
                    
          </Form.Item>

          <Form.Item>
            <a onClick={onForgot} className={style.link}>
              Recupera Password
            </a>
          </Form.Item>

          <Button htmlType='submit' block loading={loading}>
            Accedi
          </Button>

          <hr className={style.hr_form}/>

          <div>
            Non hai gà un account?

            <br />

            <a onClick={onReg} className={style.link}>
              Registrati
            </a>
          </div>
        </Form>
      </section>
    </section>
  )
}export default Login