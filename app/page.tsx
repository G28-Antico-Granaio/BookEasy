'use client'

import React, { useRef, useState } from 'react';

import { Button } from 'antd';
import Image from 'next/image';

import style from './page.module.css'
import styled from './(reach)/reach.module.css'

import img1 from '@/public/img/carosello/1.jpg'
import img2 from '@/public/img/carosello/2.jpg'
import img3 from '@/public/img/carosello/3.jpg'

import { useRouter } from 'next/navigation';
import axios from 'axios';

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
  response: string;
}

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const [responseVisible, setResponseVisible] = useState<{ [key: string]: boolean }>({});

  const toggleResponse = (reviewId: string) => {
    setResponseVisible((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const onBook = async () => {
    setLoading(true);

    const log = localStorage.getItem('log');
    if (log === 'true') {
      await router.push('/reserve');
    } else {
      router.push('/login');
    }

    setLoading(false);
  };

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % newData.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex(
      (prevIndex) => (prevIndex - 1 + newData.length) % newData.length
    );
  };

  const downloadButtonRef = useRef<HTMLButtonElement>(null);

  const [newData, setNewData] = useState<Review[]>([]);

  React.useEffect(() => {

    const onLoad = async () => {
      const response = await axios.get('/api/reviews/last-reviews');
      console.log(response.data.data);
      setNewData(response.data.data);
    }

    onLoad();

    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = '/download/menu.pdf';
      link.download = 'menu.pdf';
      link.click();
    };

    const buttonRefCurrent = downloadButtonRef.current;

    if (buttonRefCurrent) {
      buttonRefCurrent.addEventListener('click', handleDownload);
    }

    return () => {
      if (buttonRefCurrent) {
        buttonRefCurrent.removeEventListener('click', handleDownload);
      }
    };
  }, []);

  return (
    <section className="container">
      <section className={style.description}>
        Benvenuti all&apos;Antico Granaio, dove l&apos;arte culinaria si fonde 
        per creare un&apos;esperienza gastronomica incredibile. Situato in un 
        ambiente accogliente e raffinato, il nostro ristorante vi invita a gustare 
        una cucina straordinaria che celebra sapori autentici e ingredienti freschi 
        di stagione. La nostra passione per il cibo si riflette in ogni piatto 
        preparato con cura dai nostri chef talentuosi, mentre il nostro servizio 
        attento e cordiale vi farà sentire a casa.
      </section>

      <section className={style.images}>
          <Image src={img1} alt='img1' width={375} height={225} />
          <Image src={img2} alt='img2' width={500} height={300} />
          <Image src={img3} alt='img3' width={375} height={225} />
      </section>

      <section className={style.column}>
        <div>
          <h2>Scarica il Menù</h2>
            <Button ref={downloadButtonRef} block loading={loading}>
              Scarica
            </Button>
        </div>
        
        <div>
          <h2>Prenota il Tavolo</h2>
            <Button htmlType='submit' block onClick={onBook} loading={loading}>
              Prenota
            </Button>
        </div>
      </section>

      <section className={style.recnsioni}>
        {newData.length > 0 && (
          <div className={styled.review}>
            <div className={styled.star}>
              <h3>Location</h3>
              <div>{`${newData[currentReviewIndex].location}/5`}</div>

              <h3>Menù</h3>
              <div>{`${newData[currentReviewIndex].menu}/5`}</div>

              <h3>Servizio</h3>
              <div>{`${newData[currentReviewIndex].service}/5`}</div>

              <h3>Conto</h3>
              <div>{`${newData[currentReviewIndex].bill}/5`}</div>
            </div>

            <div className={styled.text}>
              <div className={styled.name_date}>
                <b>{`${newData[currentReviewIndex].name} ${newData[currentReviewIndex].surname}`}</b>{` - ${new Date(
                  newData[currentReviewIndex].date
                ).toLocaleDateString('en-GB')}`}
              </div>

              <div className={styled.review_text}>
                {newData[currentReviewIndex].comment}
              </div>

              {newData[currentReviewIndex].response !== undefined && (
                <div className={styled.response}>
                  <div
                    className={styled.response_link}
                    onClick={() => toggleResponse(newData[currentReviewIndex]._id)}
                  >
                    <b>Risposta Antico Granaio</b>
                    <span
                      className={
                        responseVisible[newData[currentReviewIndex]._id]
                          ? styled.arrowUp
                          : styled.arrowDown
                      }
                    ></span>
                  </div>
                  {responseVisible[newData[currentReviewIndex]._id] && (
                    <div className={styled.response_text}>
                      {`${newData[currentReviewIndex].response}`}
                    </div>
                  )}
                </div>
              )}
            </div>

            {newData.length > 1 && (
              <div className={styled.navigationButtons}>
                <button onClick={prevReview} disabled={currentReviewIndex === 0}>
                  <div className={styled.arrowUp}></div>
                </button>
                <button onClick={nextReview} disabled={currentReviewIndex === newData.length - 1}>
                  <div className={styled.arrowDown}></div>
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </section>
  );
}
