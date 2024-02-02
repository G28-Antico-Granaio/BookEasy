'use client'

// logic
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// UI
import {  Button, Form, Input, InputNumber, Modal, message } from 'antd';
import style from '../reach.module.css'

// interfaces
interface Reservation {
  _id: string;
  table_id: number;
  date: Date;
  turn: number;
  cover_number: number;
}

interface Review {
  reservation_id: string,
  name: string;
  surname: string;
  date: Date;
  location: number
  menu: number;
  service: number;
  bill: number;
  comment: string
}

function Private_Area() {

  // basics
  const router = useRouter();
  const [loading, setLoading] = useState(false);  

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

  // handle delete account
  const onDeleteAcc = async () => {
    // send to page
    router.push('/delete-account')
  }
  
  // handle delete reservation
  const onDelete = async (_id: string) => {
    try {
      // call API to delete reservation
      const response = await axios.delete(`/api/reservations/delete-reservation/${_id}`);

      // view success
      message.success(response.data.message);

      // reload window to remove the UI
      window.location.reload();
    } catch (error: any) {
      // view error
      message.error(error.response.data.message);
    }
  }

  // modals
  const [pastModalVisible, setPastModalVisible] = useState(false);
  const [currentPastReservation, setCurrentPastReservation] = useState<Reservation | null>(null);

  // handle review
  const onRev = async (values: Review, reservation: Reservation) => {
    try {
      // start loading animation
      setLoading(true);

      // get email from localStorage
      const email: string | null = localStorage.getItem('email') || '';

      // call API to get user info
      const response = await axios.get(`/api/users/get-user/${email}`);
      const user = response.data.data;

      // add missing infor to interface
      const data: Review = {
        ...values,
        name: user.name,
        surname: user.surname,
        reservation_id: reservation._id,
        date: reservation.date
      }
      
      // call API to post review
      const result = await axios.post(`/api/reviews/review/${reservation._id}`, data)

      // view successs
      message.success(result.data.message);
    } catch (error: any) {
      // view error
      message.error(error.response.data.message)
    } finally {
      // close modal
      setPastModalVisible(false);
      //end loading animation
      setLoading(false);
    }    
  };

  // handle exit modal
  const onCancel = () => {
    setPastModalVisible(false);
  };

  // handle open modal
  const showModal = (reservation: Reservation) => {
    setCurrentPastReservation(reservation);
    setPastModalVisible(true);
  };
  
  // useEffect

  //
  const [newData, setNewData] = useState([]);
  const [oldData, setOldData] = useState([]);

  React.useEffect(() => {
    // get data
    const log = localStorage.getItem('log');
    const role = localStorage.getItem('role');
    // if not logged send to login
    if (!log || !role) {
      router.push('/login');
    } else {
      // if is admin sent right page
      if (role === 'true') {
        router.push('/private-area/ristoratore')
      }
    }

    // handele new reservation
    const onReserveNew =async () => {
      // get email from localStorage
      const email: string | null = localStorage.getItem('email');

      // call API to get new reservation
      const response = await axios.get(`/api/reservations/new-reservations/${email}`);

      // set data
      setNewData(response.data.data);
    };

    // handle old reservation
    const onReserveOld =async () => {
      // get email from localStorage
      const email: string | null = localStorage.getItem('email');

      // call API to get old reservations
      const response = await axios.get(`/api/reservations/old-reservations/${email}`);

      // set data
      setOldData(response.data.data);
    };

    onReserveNew();
    onReserveOld();
  }, [router]);
 
  return(
    <section className='container'>
      <section className={style.link}>
          <a onClick={onModify}>Modifica le Credenziali</a>
      </section>
      <section className={style.link}>
        <a onClick={onLogout}>Logout</a>
      </section>

      <hr className={style.hr_form} />

      <section>
        <h2>Prenotazioni Attive</h2>
        {newData.map((reservation: Reservation) => {
        return (
          <div key={reservation.table_id} className={style.post_rev}>
            <div>{`Prenotazione - ${new Date(reservation.date).toLocaleDateString('en-GB')}`}</div>
            <div>{`Orario: ${reservation.turn}.00 - ${reservation.turn + 2}.00 | ${reservation.cover_number} Persone | Tavolo ${reservation.table_id}`}</div>
            <a className={style.link} onClick={() => onDelete(reservation._id)}>Cancella la prenotazione</a>
          </div>
        );
      })}
      </section>

      <hr className={style.hr_form} />

      <section>
        <h2>Prenotazioni Passate</h2>
        <div>Fino a 7 giorni fa</div>

        {oldData.map((reservation: Reservation) => {
        return (
          <div key={reservation.table_id} className={style.past_rev}>
            <div>{`Prenotazione - ${new Date(reservation.date).toLocaleDateString('en-GB')}`}</div>
            <div>{`Orario: ${reservation.turn}.00 - ${reservation.turn + 2}.00 | ${reservation.cover_number} Persone | Tavolo ${reservation.table_id}`}</div>

            <a className={style.link} onClick={() => showModal(reservation)}>Recensisci Prenotazione</a>

            <Modal
              title="Recensione"
              open={pastModalVisible}
              onCancel={onCancel}
              footer={null}>

              <Form 
                name="Response"
                onFinish={(values) => {if(currentPastReservation){onRev(values, currentPastReservation)}} }>

                <Form.Item
                  label='Location'
                  name={'location'}
                  rules={[
                    {
                      required: true,
                      message: 'Inserire le stelle'
                    }
                ]}>

                  <InputNumber min={1} max={5}
                    controls={false}
                    formatter={(value: string | number | undefined) => (value ? `${value}`.replace(/\D/g, '') : '')}
                    parser={(value: string | undefined) => (value ? value.replace(/\D/g, '') : '')}/>

                </Form.Item>

                <Form.Item
                  label='Menù'
                  name={'menu'}
                  rules={[
                    {
                      required: true,
                      message: 'Inserire le stelle'
                    }
                ]}>

                  <InputNumber min={1} max={5}
                    controls={false}
                    formatter={(value: string | number | undefined) => (value ? `${value}`.replace(/\D/g, '') : '')}
                    parser={(value: string | undefined) => (value ? value.replace(/\D/g, '') : '')}/>
                    
                </Form.Item>

                <Form.Item
                  label='Servizio'
                  name={'service'}
                  rules={[
                    {
                      required: true,
                      message: 'Inserire le stelle'
                    }
                ]}>

                  <InputNumber min={1} max={5}
                    controls={false}
                    formatter={(value: string | number | undefined) => (value ? `${value}`.replace(/\D/g, '') : '')}
                    parser={(value: string | undefined) => (value ? value.replace(/\D/g, '') : '')}/>
                    
                </Form.Item>

                <Form.Item
                  label='Conto'
                  name={'bill'}
                  rules={[
                    {
                      required: true,
                      message: 'Inserire le stelle'
                    }
                ]}>

                  <InputNumber min={1} max={5}
                    controls={false}
                    formatter={(value: string | number | undefined) => (value ? `${value}`.replace(/\D/g, '') : '')}
                    parser={(value: string | undefined) => (value ? value.replace(/\D/g, '') : '')}/>
                    
                </Form.Item>


                <Form.Item
                  name={'comment'}
                  label="comme"
                  rules={[
                    {
                      required: true,
                      message: 'Inserire recensione scritta',
                    },
                  ]}
                >
                  <Input.TextArea maxLength={500}/>

                </Form.Item>

                <Button htmlType='submit' block loading={loading}>
                  Invia
                </Button>
              </Form>
            </Modal>
          </div>);        
        })}
      </section>

      <hr className={style.hr_form} />

      <section className={style.link}>
        <a onClick={onDeleteAcc}>Elimina l&apos;Account</a>
      </section>
    </section>
  )
} export default Private_Area