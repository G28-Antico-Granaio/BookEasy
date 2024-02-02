'use client'

// logic
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// UI
import { Form, Input, Select, Button, message, InputNumber } from 'antd';
import style from '../reach.module.css'
const { Option } = Select;

// interface
interface User{
    name: string;
    surname: string;
    tel_number: number;
    tel_area_code: number;
    email: string;
} 

function Modify_Credentials() {
  
  // basics
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // handle change credentials
  const onChange = async (values: User) => {
    try {
      // start loading animation
      setLoading(true);

      // get email from localStorage
      const email: string | null = localStorage.getItem('email') || '';

      // call API to change user info
      const response = await axios.put(`/api/users/modify-credentials/${email}`, values);

      // set localStorage variable to new email
      localStorage.setItem('email', values.email);

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

  // useEffect
  React.useEffect(() => {
    // get data
    const log = localStorage.getItem('log');
    const role = localStorage.getItem('role');
    if (!log || !role) {
      // if data doesn't exist send to login
      router.push('/login');
    }

    // load current credentials in form
    const onLoad = async () => {
      try {
        // get email from localStorage
        const email: string | null = localStorage.getItem('email') || '';

        // call API to get user info
        const response = await axios.get(`/api/users/get-user/${email}`);
        const user: User = response.data.data;

        // set form field
        form.setFieldsValue({
          name: user.name,
          surname: user.surname,
          tel_number: user.tel_number,
          tel_area_code: user.tel_area_code,
          email: user.email,
        });
      } catch (error: any) {
        // view error
        message.error(error.response.data.message);
      }
    }    
    onLoad();
  }, [form, router]);

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
      <section className={style.form}>
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
                type: 'number',
                message: 'Inserire un numero valido',
              },
              {
                required: true,
                message: 'Inserisci il tuo Numero di Telefono'
              },
              {
                pattern: /^[0-9]{10}$/,
                message: 'Formato del numero di telefono non è valido. Inserire un numero di telefono nel formato corretto (+39 1234567890)',
              },
          ]}>

            <InputNumber addonBefore={prefixSelector} placeholder='Numero di Telefono'
              controls={false}
              style={{
                width: '75%',
                height: '3rem',
                borderRadius: '30px'
            }}/>
          
          </Form.Item>

          <Form.Item
            name={'email'}
            rules={[
              {
                type: 'email',
                message: "L'indirizzo e-mail inserito non è valido. Inserire un indirizzo e-mail nel formato corretto (nome@dominio.com)"
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

          <Button htmlType='submit' block loading={loading}>
            Conferma le Modifiche
          </Button>

        </Form>
      </section>
    </section>
  )
}export default Modify_Credentials