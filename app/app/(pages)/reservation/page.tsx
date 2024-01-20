'use client'

import React from 'react'

import { Form, DatePicker, Select, message, InputNumber, Button } from 'antd'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { NextResponse } from 'next/server'

import style from './reservation.module.css'
import map from '@/img/duck.jpg'


const { Option } = Select;

interface reservation {
    table_id: number,
    date: Date
    turn: number,
    cover: number,
    email: String,
    name: String,
    surname: String,
}

interface check {}

function Reservation() {

    const [form] = Form.useForm();

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const onReservation = async (values: reservation) => {
        try {
            setLoading(true);
            await axios.post("/api/reservation", values);
            message.success("Prenotazione Effettuata");
            router.push("/private-area");

        } catch (error: any) {
            return NextResponse.json( {
                message: error.message,
            },
                {
                    status: 400
                }
            )

        } finally {

            setLoading(false);
        }
    }

    const onCheck = async (values: check) => {
        message.warning("Funzione non ancora Implementata");
    }




    return (
        <main>
            <div className={style.form}>

                <h1>Prenota</h1>

                <hr />

                <Form
                name='reservation'
                form={form}
                onFinish={onReservation}
                scrollToFirstError>

                    <Form.Item
                        name={'date'}
                        rules={[
                            {
                                required: true,
                                message: 'Inserire una data'
                            },
                        ]}>

                        <DatePicker />

                    </Form.Item>

                    <Form.Item
                        name={'turn'}
                        rules={[
                            {
                                required: true,
                                message: 'Inserire un turno'
                            }
                        ]}>

                        <Select>
                            <Option value="12.00" >12.00</Option>
                            <Option value="14.00" >14.00</Option>
                            <Option value="19.00" >19.00</Option>
                            <Option value="21.00" >21.00</Option>
                        </Select>
                        
                    </Form.Item>

                    <Form.Item
                        name={'cover'}
                        rules={[
                            {
                                required: true,
                                message: 'Inserire i coperti'
                            }
                        ]}>

                        <InputNumber min={1} max={8}/>

                    </Form.Item>

                    <Form.Item
                        name={'table'}
                        rules={[
                            {
                                required: true,
                                message: 'Inserire un tavolo'
                            }
                        ]}>

                        <InputNumber min={1} max={20} />
                        
                    </Form.Item>

                    <Button htmlType='submit' block onClick={onCheck}>
                        Controlla Disponibilità
                    </Button>

                    <div>
                        <Image src={map} alt="map" width={1000} height={500} />
                    </div>

                    <p>
                        Si ricorda che, se dopo 30 minuti dall&apos;inizio 
                        del turno non ci si presenta a reclamare la prenotazione, 
                        essa non sarà più valida e il tavolo potrebbe venire 
                        riassegnato
                    </p>

                    <Button htmlType='submit' block loading={loading}>
                        Prenota
                    </Button>

                </Form>

                <div></div>
                
            </div>
        </main>
    )
}

export default Reservation