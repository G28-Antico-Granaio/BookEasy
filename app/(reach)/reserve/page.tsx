'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { Button, DatePicker, Form, InputNumber, Select, message } from 'antd'

import { useRouter } from 'next/navigation';
import axios from 'axios';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import style from '../reach.module.css'
import map from '@/public/img/plan.png'
import Loader from '@/app/components/loader';

interface Reservation {
    table_id: number;
    date: Date;
    turn: number;
    cover_numer: number;
    email: string;
    name: string;
    surname: string;
}

const { Option } = Select;
dayjs.extend(customParseFormat);

function Reserve() {

    const [form] = Form.useForm();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const onReserve =async (values: Reservation) => {
        try {
            setLoading(true);

            const email: string | null = localStorage.getItem('email') || '';
            const response = await axios.get(`/api/users/user/${email}`);
            const user = response.data.data;

            const data: Reservation = {
                ...values,
                email: user.email,
                name: user.name,
                surname: user.surname,
                table_id: 1
            }
            
            await axios.post('/api/reservations/reserve', data);

            message.success('Prenotazione Effettuata');
            router.push('/private-area');
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const [userLog, setUserLog] = useState<string | null>(null);
    const [loadingUserLog, setLoadingUserLog] = useState(true)

    React.useEffect(() => {
        if (localStorage.getItem('role')) {

        const log = localStorage.getItem('log');
        setUserLog(log);

        setLoadingUserLog(false);
        }
    }, []);

    if(loadingUserLog){
        return(
          <Loader />
        )
    }
    
    if (userLog === 'true') {
        return (
            <section className='container'>
                <section className={style.date}>
                    <Form
                        name='login'
                        form={form}
                        onFinish={onReserve}
                        scrollToFirstError>

                        <Form.Item
                            label='Date'
                            name={'date'}
                            rules={[
                                {
                                    required: true,
                                    message: 'seleziona una data'
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
                        
                        <Form.Item
                            label='Coperti'
                            name={'cover_number'}
                            rules={[
                            {
                                required: true,
                                message: 'Inserire i coperti'
                            }
                            ]}>

                            <InputNumber min={1} max={8}
                            style={{
                                width: '10rem',
                            }}/>

                        </Form.Item>
                    </Form>

                </section>

                <section className={style.plan}>
                    <Image src={map} alt="map" width={950} height={700} />
                </section>

                <br />

                <section>
                    Si ricorda che, se dopo 30 minuti dall&apos;inizio del turno selezionato 
                    non ci si presenta a reclamare la prenotazioe, essa non sarà più valida 
                    e il tavolo potrebbe essere ri assegnato
                </section>

                <br />

                <section>
                    <Button form='login' htmlType='submit' block loading={loading}>
                        Controlla
                    </Button>
                </section>
            </section>
        )
    } else {
        router.push('/login');
    }
} export default Reserve