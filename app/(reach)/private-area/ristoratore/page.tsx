'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { Button, DatePicker, Form, Select, Tooltip, message } from 'antd';

import { useRouter } from 'next/navigation';

import style from '../../reach.module.css'
import map from '@/public/img/plan.png'
import Review from '@/app/components/review';
import axios from 'axios';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const { Option } = Select;
dayjs.extend(customParseFormat);

interface Check {
  date: Date;
  turn: number;
}

interface Reservation {
  _id: string;
  table_id: number;
  date: Date;
  turn: number;
  cover_number: number;
  email: string;
  name: string;
  surname: string;
}

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

  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [tablesPrenotato, setTablesPrenotato] = useState<number[]>([]);
  const [tablesLibero, setTablesLibero] = useState<number[]>([]);
  const [tablesOccupato, setTablesOccupato] = useState<number[]>([]);
  const [allTables, setAllTables] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

  const onDate = async (values: Check) => {
    try {
      setLoading(true);

      const formattedDate = dayjs(values.date).format('YYYY-MM-DD');

      const response = await axios.get(`/api/reservations/all-reservation/${formattedDate}/${values.turn}`);
      const data = response.data.data;

      const newTables = data.map((reservation: any) => reservation.table_id);
      setTablesPrenotato(newTables);

      const nonSelectedTables = allTables.filter(tableId => !newTables.includes(tableId));
      setTablesLibero(nonSelectedTables);

      message.success('Dati Raccolti');
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }

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

  const changeTableStatus = async (value: string, tableId: number) => {
    try {
      if (value === 'lib') {
        //await axios.delete(`/api/reservations/delete-reservation/${tableId}`);
  
        setTablesPrenotato((prevTables) => prevTables.filter((t) => t !== tableId));
        setTablesLibero((prevTablesLibero) => [...prevTablesLibero, tableId]);
        setTablesOccupato((prevTablesOccupato) => prevTablesOccupato.filter((t) => t !== tableId));
      } else if (value === 'pre') {
        //router.push('/reserve');
  
        const newReservation: Reservation = {
          _id: '',
          table_id: tableId,
          date: new Date(),
          turn: 0,
          cover_number: 0,
          email: '',
          name: '',
          surname: '',
        };
  
        setTablesPrenotato((prevTablesPrenotato) => [...prevTablesPrenotato, tableId]);
        setTablesLibero((prevTablesLibero) => prevTablesLibero.filter((t) => t !== tableId));
        setTablesOccupato((prevTablesOccupato) => prevTablesOccupato.filter((t) => t !== tableId));
      } else if (value === 'occ') {
        setTablesOccupato((prevTablesOccupato) => [...prevTablesOccupato, tableId]);
        setTablesPrenotato((prevTablesPrenotato) => prevTablesPrenotato.filter((t) => t !== tableId));
        setTablesLibero((prevTablesLibero) => prevTablesLibero.filter((t) => t !== tableId));
      }
    } catch (error: any) {
      // Handle errors
    }
  };
  

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

        <section onClick={handleClick} className={style.plan} style={{ position: 'relative' }}>
          <Image src={map} alt="map" id='map' width={500} height={500} />

          {tablesPrenotato.map((table) => (
            <div
              key={table}
              style={{
                position: 'absolute',
                top: clickableAreas[table - 1].y,
                left: clickableAreas[table - 1].x,
                width: clickableAreas[table - 1].width,
                height: clickableAreas[table - 1].height,
                backgroundColor: 'rgba(150, 100, 0, 0.5)',
                border: '2px solid yellow',
            }}>

              {/*<Tooltip title={`${table.name} ${table.surname} - ${table.cover_number}`}>
                <span style={{
                  backgroundColor: 'beige',
                  borderRadius: '2px',
                  padding: '2px'
                }}>
                  info
                </span>
              </Tooltip>*/}

              <br />

              <Select defaultValue={'prenotato'} onChange={(value) => changeTableStatus(value, table)}> 
                <Option value="lib" >libero</Option>
                <Option value="pre" >prenotato</Option>
                <Option value="occ" >occupato</Option>
              </Select>
            </div>
          ))}

          {tablesLibero.map((table) => (
            <div
              key={table}
              style={{
                position: 'absolute',
                top: clickableAreas[table - 1].y,
                left: clickableAreas[table - 1].x,
                width: clickableAreas[table - 1].width,
                height: clickableAreas[table - 1].height,
                backgroundColor: 'rgba(0, 200, 0, 0.5)',
                border: '2px solid green',
            }}>

              <Select defaultValue={'libero'} onChange={(value) => changeTableStatus(value, table)}> 
                <Option value="lib" >libero</Option>
                <Option value="pre" >prenotato</Option>
                <Option value="occ" >occupato</Option>
              </Select>
            </div>
          ))}

          {tablesOccupato.map((table) => (
            <div
              key={table}
              style={{
                position: 'absolute',
                top: clickableAreas[table - 1].y,
                left: clickableAreas[table - 1].x,
                width: clickableAreas[table - 1].width,
                height: clickableAreas[table - 1].height,
                backgroundColor: 'rgba(200, 0, 0, 0.5)', // Red color for occupied tables
                border: '2px solid red',
              }}>
                <Select defaultValue={'occupato'} onChange={(value) => changeTableStatus(value, table)}>
                  <Option value="lib" >libero</Option>
                  <Option value="pre" >prenotato</Option>
                  <Option value="occ" >occupato</Option>
                </Select>
              </div>
          ))}


        </section>

        <hr />

        <section className={style.review}>
            <Review />
            <Review />
            <Review />
            <Review />
        </section>
    </section>
    )
} export default Private_Area