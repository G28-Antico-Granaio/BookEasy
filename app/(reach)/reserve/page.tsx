'use client'

import React, { useRef, useState } from 'react'

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

    const [checkValues, setCheckValues] = React.useState<Reservation | null>(null);

    const [selectedTables, setSelectedTables] = useState<number[]>([]);

    const onCheck =async (values: Reservation) => {
        try {
            setLoading(true);

            setCheckValues(values);

            const formattedDate = dayjs(values.date).format('YYYY-MM-DD');

            const response = await axios.get(`/api/reservations/all-reservation/${formattedDate}/${values.turn}`);
            const data = response.data.data;

            const newSelectedTables  = data.map((reservation: any) => reservation.table_id);
            setSelectedTables(newSelectedTables);

            message.success('Dati Raccolti');

        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const onReserve = async (values: Reservation) => {
        try {
            if (selectedArea === null || selectedArea === undefined) {
                throw new Error("Selezionare un tavolo");
            }

            setLoading(true);

            const email: string | null = localStorage.getItem('email') || '';
            const response = await axios.get(`/api/users/user/${email}`);
            const user = response.data.data;

            const data: Reservation = {
                ...values,
                email: user.email,
                name: user.name,
                surname: user.surname,
                table_id: selectedArea
            };

            await axios.post('/api/reservations/reserve', data);

            message.success('Prenotazione Effettuata');
            router.push('/private-area');
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const [selectedArea, setSelectedArea] = useState<number | null>(null);
    const handleClick = (event: { nativeEvent: { offsetX: any; offsetY: any } }) => {
        const { offsetX, offsetY } = event.nativeEvent;

        const selectedArea = clickableAreas.find((area) => {
            const isInside =
                offsetX >= area.x &&
                offsetX <= area.x + area.width &&
                offsetY >= area.y &&
                offsetY <= area.y + area.height;
            return isInside;
        });
        
        if (selectedArea) {
            setSelectedArea(selectedArea.id);
        } else {
            setSelectedArea(null);
        }
    }
   
    const clickableAreas = [
        { id: 1, x: 0, y: 0, width: 100, height: 100 },
        { id: 2, x: 195, y: 0, width: 100, height: 100 },
        { id: 3, x: 397, y: 0, width: 100, height: 100 },
        { id: 4, x: 99, y: 100, width: 100, height: 100 },
        { id: 5, x: 299, y: 100, width: 100, height: 100 },
        { id: 6, x: 397, y: 200, width: 100, height: 100 },
        { id: 7, x: 99, y: 300, width: 100, height: 100 },
        { id: 8, x: 299, y: 300, width: 100, height: 100 },
        { id: 9, x: 0, y: 397, width: 100, height: 100 },
        { id: 10, x: 196, y: 397, width: 100, height: 100 },
        { id: 11, x: 397, y: 397, width: 100, height: 100 }
    ];      

    React.useEffect(() => {
        const log = localStorage.getItem('log');
        const role = localStorage.getItem('role');
        if (!log || !role) {
            router.push('/login');
        }
    }, [router]);

    return (
        <section className='container'>
            <section className={style.date}>
                <Form
                    name='check'
                    form={form}
                    onFinish={onCheck}
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
                            format='YYYY-MM-DD'
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
                        controls={false}
                        formatter={(value: string | number | undefined) => (value ? `${value}`.replace(/\D/g, '') : '')}
                        parser={(value: string | undefined) => (value ? value.replace(/\D/g, '') : '')}
                        style={{
                            width: '10rem',
                            height: '2rem',
                            fontSize: 'medium'
                        }}/>

                    </Form.Item>

                    <Button htmlType="submit" block loading={loading}
                        style={{
                            marginTop: '3rem',
                            marginRight: 'auto',
                            marginLeft: 'auto'
                    }}>
                        Controlla
                    </Button>
                </Form>
            </section>

            <section onClick={handleClick} className={style.plan} style={{ position: 'relative' }}>
                <Image src={map} alt="map" id='map' width={500} height={500} />

                {selectedArea !== null && (
                    <div
                        style={{
                            position: 'absolute',
                            top: clickableAreas[selectedArea - 1].y,
                            left: clickableAreas[selectedArea - 1].x,
                            width: clickableAreas[selectedArea - 1].width,
                            height: clickableAreas[selectedArea - 1].height,
                            backgroundColor: 'rgba(169, 169, 169, 0.5)',
                            border: '2px solid #696969',
                        }}
                    />
                )}

                {selectedTables.map((tableId) => (
                    <div
                        key={tableId}
                        style={{
                            position: 'absolute',
                            top: clickableAreas[tableId - 1].y,
                            left: clickableAreas[tableId - 1].x,
                            width: clickableAreas[tableId - 1].width,
                            height: clickableAreas[tableId - 1].height,
                            backgroundColor: 'rgba(200, 0, 0, 0.5)',
                            border: '2px solid red',
                        }}
                    />
                    ))}

            </section>

            <br />

            <section>
                Si ricorda che, se dopo 30 minuti dall&apos;inizio del turno selezionato 
                non ci si presenta a reclamare la prenotazioe, essa non sarà più valida 
                e il tavolo potrebbe essere ri assegnato
            </section>

            <br />

            <section>
                <Button onClick={async () => {
                            try {
                                setLoading(true);
                                if (checkValues) {
                                    await onReserve(checkValues);
                                }
                            } catch (error: any) {
                                message.error(error.response.data.message);
                            } finally {
                                setLoading(false);
                            }
                        }} htmlType='submit' block loading={loading}
                    style={{
                        marginTop: '3rem',
                        marginRight: 'auto',
                        marginLeft: 'auto'
                    }}>
                    Prenota
                </Button>
            </section>
        </section>
    )
} export default Reserve