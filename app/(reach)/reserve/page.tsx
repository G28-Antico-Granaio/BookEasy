'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import Image from 'next/image'
import { Button, DatePicker, Form, InputNumber, Select, message } from 'antd'
import style from '../reach.module.css'
import map from '@/public/img/plan.png'
const { Option } = Select;

// interface
interface Reservation {
    table_id: number;
    date: Date;
    turn: number;
    cover_numer: number;
    email: string;
    name: string;
    surname: string;
}

function Reserve() {

    // basics
    const [form] = Form.useForm();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    // handle check of table on data given
    const [checkValues, setCheckValues] = React.useState<Reservation | null>(null);
    const [selectedTables, setSelectedTables] = useState<number[]>([]);

    // handle check
    const onCheck = async (values: Reservation) => {
        try {
            // start loading animation
            setLoading(true);
            
            // save checked values
            setCheckValues(values);

            // format recived date
            const formattedDate = dayjs(values.date).format('YYYY-MM-DD');

            // call API to get reservation
            const response = await axios.get(`/api/reservations/day-turn-reservations/${formattedDate}/${values.turn}`);
            const data = response.data.data;

            // save the reserved tables
            const newSelectedTables = data.map((reservation: any) => reservation.table_id);
            setSelectedTables(newSelectedTables);

            if (data.length === 11) {
                message.warning("Impossibile prenotare un tavolo nel turno selezionato");
            } else {
                // view success
                message.success(response.data.message);
            }
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // handle reservation
    const onReserve = async (values: Reservation) => {
        try {
            // if a table is not selected throw error
            if (selectedArea === null || selectedArea === undefined) {
                throw new Error("Impossibile procedere con la prenotazione, nessun tavolo selezionato");
            }

            // start loading animation
            setLoading(true);

            // get email from localStorage
            const email: string | null = localStorage.getItem('email') || '';

            // call API to get user info
            const response = await axios.get(`/api/users/get-user/${email}`);
            const user = response.data.data;

            // add missing info to inteface
            const data: Reservation = {
                ...values,
                email: user.email,
                name: user.name,
                surname: user.surname,
                table_id: selectedArea
            };

            // call API to reserve table
            const result = await axios.post('/api/reservations/reserve', data);

            // get role
            const role = localStorage.getItem('role');

            // view success and send to right page based on role
            message.success(result.data.message);
            if (role === 'true') {
                router.push("/private-area/ristoratore");
            } else {
                router.push("/private-area");
            }
        } catch (error: any) {
            const error_message = error.response?.data?.message || error.message || "Errore durante la prenotazione";
            message.error(error_message);
        } finally {
            setLoading(false);
        }
    };

    // handle select table

    // save selected area
    const [selectedArea, setSelectedArea] = useState<number | null>(null);
    
    // clickable areas
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

    // handle click on screen
    const handleClick = (event: { nativeEvent: { offsetX: any; offsetY: any } }) => {
        // get coordinates of click
        const { offsetX, offsetY } = event.nativeEvent;

        // check if click corresponds to a clickable area
        const selectedArea = clickableAreas.find((area) => {
            const isInside =
                offsetX >= area.x &&
                offsetX <= area.x + area.width &&
                offsetY >= area.y &&
                offsetY <= area.y + area.height;
            return isInside;
        });
        
        // if an area is selected
        if (selectedArea) {
            // save the id
            setSelectedArea(selectedArea.id);
        } else {
            // set to null
            setSelectedArea(null);
        }
    }

    // useEffect
    React.useEffect(() => {
        // get data
        const log = localStorage.getItem('log');
        const role = localStorage.getItem('role');

        // if data doesn't exist send to login
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
                                message: 'Seleziona una data'
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
                            message: 'Seleziona un turno',
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
                                type: 'number',
                                message: 'Inserire un numero valido',
                            },
                            {
                                required: true,
                                message: 'Inserire i coperti'
                            },
                            {
                                pattern: /^[1-8]{1}$/,
                                message: 'Formato del numero di coperti non è valido. Inserire un numero compreso tra 1 e 8',
                            },
                        ]}>

                        <InputNumber 
                        controls={false}
                        style={{
                            width: '10rem',
                            height: '2rem',
                        }}/>

                    </Form.Item>
                </Form>
            </section>

            <Button form='check' htmlType="submit" block loading={loading}
                style={{
                marginTop: '3rem',
                marginRight: 'auto',
                marginLeft: 'auto'
            }}>
                Controlla
            </Button>   

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