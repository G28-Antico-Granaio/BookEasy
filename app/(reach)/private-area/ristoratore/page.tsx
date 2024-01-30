'use client'

import React from 'react'

import Image from 'next/image'
import { Button, DatePicker, Form, Select, message } from 'antd';

import { useRouter } from 'next/navigation';

import style from '../../reach.module.css'
import map from '@/public/img/plan.png'
import Review from '@/app/components/review';
import axios from 'axios';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const { Option } = Select;
dayjs.extend(customParseFormat);

function Private_Area() {

  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onLogout = async () => {
    try {
      if (localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('log')) {
        setLoading(true);

        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.setItem('log', 'false');

        message.success("Logout Effettuato");
        router.push("/login");
      } else {
        message.warning("Impossibile eseguire il logout");
      }
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const onModify = async () => {
    await router.push('/modify-credentials')
  }

  const onDate =async () => {
    message.warning("Funzione non ancora Implementata");
  }

  React.useEffect(() => {
    const log = localStorage.getItem('log');
    const role = localStorage.getItem('role');
    if (!log || !role) {
      router.push("/login");
    }
  }, [router]);
  
    return (
      <section className='container'>
        <section className={style.link}>
          <a onClick={onModify}>Modifica le Credenziali</a>
        </section>
        <section className={style.link}>
          <a onClick={onLogout}>Logout</a>
        </section>

        <hr />

        <section className={style.date}>
          <Form
            name='check'
            form={form}
            onFinish={onDate}
            scrollToFirstError>

            <Form.Item
              label='Data'
              name={'date'}
              rules={[
                {
                  required: true,
                  message: 'Selezionare una data'
                }
              ]}>
              <DatePicker
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>

            <Form.Item
              label='Turno'
              name={'turn'}
              rules={[
                {
                  required: true,
                  message: 'seleziona un turno',
                }
              ]}>
              <Select style={{
                width: '10rem',
              }}>
                <Option value="12.00" >12.00</Option>
                <Option value="14.00" >14.00</Option>
                <Option value="19.00" >19.00</Option>
                <Option value="21.00" >21.00</Option>
              </Select>
            </Form.Item>
            
                <Button htmlType='submit' block loading={loading} style={{
                    width: '10rem !important', 
                    height: '2rem !important', 
                    marginBottom: '24px !important',
                    marginLeft: '24px !important'}}>
                    Controlla
                </Button>

            </Form>
        </section>

        <section className={style.plan}>
            <Image src={map} alt="map" width={950} height={700} />
        </section>

        <section className={style.review}>
            <Review />
            <Review />
            <Review />
            <Review />
        </section>
    </section>
    )
} export default Private_Area