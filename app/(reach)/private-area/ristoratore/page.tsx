'use client'

// logic
import React, { useRef, useState } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import mongoose from 'mongoose';
import moment from 'moment';
import { useRouter } from 'next/navigation';
dayjs.extend(customParseFormat);

// UI
import Image from 'next/image'
import { Button, DatePicker, Form, Input, Modal, Select, Tooltip, message } from 'antd';
import style from '../../reach.module.css'
import map from '@/public/img/plan.png'
const { Option } = Select;

// interfaces
interface Check {
  date: Date;
  turn: number;
}

interface Reservation {
  _id: string;
  table_id: number;
  date: Date;
  turn: number;
  status: Boolean;
  cover_number: number;
  email: string;
  name: string;
  surname: string;
}

interface Review {
  _id: string;
  name: string;
  surname: string;
  date: Date;
  location: number;
  menu: number;
  service: number;
  bill: number;
  comment: string;
}

interface Response {
  comment: string
}

// tabels lists
let tablesPrenotato: Reservation[] = [];
let tablesLibero: Reservation[] = [];
let tablesOccupato: Reservation[] = [];
let allTables: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function Private_Area() {

  // basics
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // handle logout
  const onLogout = async () => {
    try {
      // if the values exist in the localStorage
      if (localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('log')) {
        // start loading animation
        setLoading(true);
        
        // remove value from localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.setItem('log', 'false');

        // view success and send to login
        message.success("Logout Effettuato");
        router.push("/login");
      } else {
        // view error
        message.error("Impossibile eseguire il logout");
      }
    } catch (error: any) {
      // view error
      message.error("Impossibile eseguire il logout");
    } finally {
      // end loading animation
      setLoading(false);
    }
  };

  // handle modify credentials
  const onModify = async () => {
    // send to page
    router.push('/modify-credentials')
  }

  // handle response to review

  // modal consts
  const [open, setOpen] = useState(false);
  const [formModal] = Form.useForm();

  // handle response
  const onResponse = async (response: Response, _id: string) => {
    try {
      // start loading animation
      setLoading(true);

      // call API to post response
      const result = await axios.patch(`/api/reviews/response/${_id}`, response);

      // view success
      message.success(result.data.message);
    } catch (error: any) {
      // view error
      message.error(error.response.data.message)
    } finally {
      // close modal
      setOpen(false);

      // end loading animation
      setLoading(false);

      //reload page to remove responded review
      window.location.reload();
    }    
  };

  // handle exit modal
  const onCancel = () => {
    // close modal
    setOpen(false);
  };

  // handle open modal
  const showModal = () => {
    // open modal
    setOpen(true);
  };

  // andle view table request
  const onDate = async (values: Check) => {

    // get saved form values
    localStorage.setItem('form', JSON.stringify(values));

    try {
      // start loading animation
      setLoading(true);

      // format the date recived in input
      const formattedDate = dayjs(values.date).format('YYYY-MM-DD');

      // call API to get reservation of that day
      const response = await axios.get(`/api/reservations/all-reservation/${formattedDate}/${values.turn}`);
      const data = response.data.data;

      // set tables
      const newTables = data.map((reservation: any) => reservation);
      const prenotatoTables = newTables.filter((reservation: Reservation) => !reservation.status);
      const occupatoTables = newTables.filter((reservation: Reservation) => reservation.status);
      tablesPrenotato  = prenotatoTables;
      tablesOccupato = occupatoTables;
      const nonSelectedTables = allTables.filter((tableId: number) => !newTables.some((newReservation: Reservation) => newReservation.table_id === tableId));

      // create a fake reservation for free tables
      const fakeReservations: Reservation[] = nonSelectedTables.map((tableId: number) => ({
        _id: new mongoose.Types.ObjectId().toString(),
        table_id: tableId,
        date: values.date,
        turn: values.turn,
        status: false,
        cover_number: 0,
        email: 'ristoratore@anticogranio.com',
        name: 'Anonimo',
        surname: 'Nobody',
      }));
      tablesLibero = fakeReservations;
    } catch (error: any) {
      // veiew error
      message.error(error.response.data.message);
    } finally {
      // end loading
      setLoading(false);
    }
  }

  // 
  const liberoSelectRef = useRef('libero');
  const prenotatoSelectRef = useRef('prenotato');
  const occupatoSelectRef = useRef('occupato');

  // handle change status
  const changeTableStatus = async (value: string, table: Reservation, prevValue: string) => {
    try {
      // change status based on selected status an previus status
      if (value === 'libero') {
        await axios.delete(`/api/reservations/delete-reservation/${table._id}`);
      } else if (value === 'prenotato') {
        if (prevValue === 'libero') {
          await axios.post(`/api/reservations/reserve`, table);
        } else if (prevValue === 'occupato') {
          await axios.patch(`/api/reservations/change-status/${table._id}`);
        }
      } else if (value === 'occupato') {
        if (prevValue === 'prenotato') {
          await axios.patch(`/api/reservations/change-status/${table._id}`);
        } else if (prevValue === 'libero') {
          table.status = true;
          await axios.post(`/api/reservations/reserve`, table);
        }
      }

      // reload window to show update UI
      window.location.reload();
    } catch (error: any) {
      // view error message
      message.error(error.response.data.message)
    }
  };

  // area you can click on top of the map
  const clickableAreas = [
    { id: 1, x: 0, y: 0, width: 96, height: 96 },
    { id: 2, x: 200, y: 0, width: 96, height: 96 },
    { id: 3, x: 400, y: 0, width: 96, height: 96 },
    { id: 4, x: 100, y: 100, width: 96, height: 96 },
    { id: 5, x: 300, y: 100, width: 96, height: 96 },
    { id: 6, x: 400, y: 200, width: 96, height: 96 },
    { id: 7, x: 100, y: 300, width: 96, height: 96 },
    { id: 8, x: 300, y: 300, width: 96, height: 96 },
    { id: 9, x: 0, y: 400, width: 96, height: 96 },
    { id: 10, x: 200, y: 400, width: 96, height: 96 },
    { id: 11, x: 400, y: 400, width: 96, height: 96 }
  ]; 

  // useEffect

  // useState for review with no response
  const [newData, setNewData] = useState([]);

  React.useEffect(() => {
    // get data
    const log = localStorage.getItem('log');
    const role = localStorage.getItem('role');

    // if data doesn't exist send to login
    if (!log || !role) {
      router.push('/login');
    }

    // Load review with no response
    const onLoad = async () => {
      // call API to che review with no response
      const response = await axios.get('/api/reviews/no-response-review');

      // set values
      setNewData(response.data.data);
    }

    // load last info in to the form check

    // get data from localStorage
    const formValues = localStorage.getItem('form');

    // if the value exists
    if (formValues) {
      // parse the json
      const data = JSON.parse(formValues);

      // format the date
      data.date = data.date ? moment(data.date) : null;

      // set field values
      form.setFieldsValue({
        date: data.date,
        turn: data.turn
      });

      // create varieble
      const info: Check = {
        date: data.date,
        turn: data.turn
      };

      // load the UI
      onDate(info);
    }

    // 
    onLoad();
  }, [form, router]);
  
  return (
    <section className='container'>
      <section className={style.link}>
        <a onClick={onModify}>Modifica le Credenziali</a>
      </section>
      <section className={style.link}>
        <a onClick={onLogout}>Logout</a>
      </section>

      <hr className={style.hr_form} />

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
          </Form>

          <Button form='check' htmlType='submit' block loading={loading} style={{
            marginTop: '3rem',
            marginRight: 'auto',
            marginLeft: 'auto'
          }}>
              Controlla
          </Button>
        </section>

        <section className={style.plan} style={{ position: 'relative' }}>
          <Image src={map} alt="map" id='map' width={500} height={500} />

          {tablesPrenotato !== null && tablesPrenotato.map((table) => (
            <div
              key={table.table_id}
              style={{
                position: 'absolute',
                top: clickableAreas[table.table_id - 1].y,
                left: clickableAreas[table.table_id - 1].x,
                width: clickableAreas[table.table_id - 1].width,
                height: clickableAreas[table.table_id - 1].height,
                backgroundColor: 'rgba(150, 100, 0, 0.5)',
                border: '2px solid yellow',
                borderRadius: '10px',
            }}>
              <br />

              <Tooltip title={`${table.name} ${table.surname} - ${table.cover_number}`}>
                <span style={{
                  backgroundColor: 'beige',
                  borderRadius: '2px',
                  padding: '4px',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                }}>
                  info
                </span>
              </Tooltip>

              <br />
              <br />

              <Select defaultValue={'prenotato'} onChange={(value) => changeTableStatus(value, table, prenotatoSelectRef.current)}
                style={{
                  width: '100px'
                }}>
                <Option value="libero" >libero</Option>
                <Option value="prenotato" >prenotato</Option>
                <Option value="occupato" >occupato</Option>
              </Select>
            </div>
          ))}

          {tablesLibero !== null && tablesLibero.map((table) => (
            <div
              key={table.table_id}
              style={{
                position: 'absolute',
                top: clickableAreas[table.table_id - 1].y,
                left: clickableAreas[table.table_id - 1].x,
                width: clickableAreas[table.table_id - 1].width,
                height: clickableAreas[table.table_id - 1].height,
                backgroundColor: 'rgba(0, 200, 0, 0.5)',
                border: '2px solid green',
                borderRadius: '10px',
            }}>
              <br />
              <br />
              <br />
              <Select defaultValue={'libero'} onChange={(value) => changeTableStatus(value, table, liberoSelectRef.current)}
                style={{
                  width: '100px'
                }}>
                <Option value="libero" >libero</Option>
                <Option value="prenotato" >prenotato</Option>
                <Option value="occupato" >occupato</Option>
              </Select>
            </div>
          ))}

          {tablesOccupato !== null && tablesOccupato.map((table) => (
            <div
              key={table.table_id}
              style={{
                position: 'absolute',
                top: clickableAreas[table.table_id - 1].y,
                left: clickableAreas[table.table_id - 1].x,
                width: clickableAreas[table.table_id - 1].width,
                height: clickableAreas[table.table_id - 1].height,
                backgroundColor: 'rgba(200, 0, 0, 0.5)',
                border: '2px solid red',
                borderRadius: '10px',
              }}>
                <br />

                <Tooltip title={`${table.name} ${table.surname} - ${table.cover_number}`}>
                  <span style={{
                    backgroundColor: 'beige',
                    borderRadius: '2px',
                    padding: '4px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                  }}>
                    info
                  </span>
                </Tooltip>

                <br />
                <br />


                <Select defaultValue={'occupato'} onChange={(value) => changeTableStatus(value, table, occupatoSelectRef.current)}
                  style={{
                    width: '100px'
                  }}>
                  <Option value="libero" >libero</Option>
                  <Option value="prenotato" >prenotato</Option>
                  <Option value="occupato" >occupato</Option>
                </Select>
              </div>
          ))}
        </section>

        <section>
          {newData.map((review: Review) => {
            return (
              <div key={review._id} className={style.review}>

                <div className={style.star}>
                  <h3>Location</h3>
                  <div>{`${review.location}/5`}</div>
              
                  <h3>Menù</h3>
                  <div>{`${review.menu}/5`}</div>

                  <h3>Servizio</h3>
                  <div>{`${review.service}/5`}</div>

                  <h3>Conto</h3>
                  <div>{`${review.bill}/5`}</div>

                  <div className={style.modal}>
                    <a className={style.link} onClick={showModal}>Rispondi alla Recensione</a>
                  </div>
                </div>

                <div className={style.text}>
                  <p className={style.name_date}>
                    <b>{`${review.name} ${review.surname}`}</b>{` - ${new Date(review.date).toLocaleDateString('en-GB')}`}
                  </p>

                  <p className={style.review_text}>
                    {review.comment}
                  </p>
                </div>

                <Modal
                  title="Risposta"
                  open={open}
                  onCancel={onCancel}
                  footer={null}>
                  <Form 
                    form={formModal}
                    name="Response"
                    onFinish={(values) => onResponse(values, review._id)}>

                    <Form.Item
                      name="response"
                      label="response"
                      rules={[
                        {
                          required: true,
                          message: 'Inserire una risposta',
                        },
                      ]}
                    >
                      <Input.TextArea />

                    </Form.Item>

                    <Button htmlType='submit' block loading={loading}>
                      Invia
                    </Button>
                  </Form>
                </Modal>
              </div>
            );
          })}
        </section>
      </section>
    )
} export default Private_Area