'use client'

import Image from 'next/image'

import style from './components.module.css'
import logo from '@/public/img/logo.png'
import user from '@/public/img/user.png'

import { usePathname, useRouter  } from 'next/navigation'
import { message } from 'antd'
import React from 'react'

function Header() {

  const router = useRouter();
  const onPriv = async () => {
    const role = localStorage.getItem('role');
    if (role === 'false') {
      router.push('/private-area') ;
    } else if (role === 'true') {
      router.push('/private-area/ristoratore')
    } else if (!role) {
      router.push('/login')
    }
  }
  const onHome = async () => {
    router.push('/');
  }

  const it_flag = '/img/flags/it.png';
  const en_flag = '/img/flags/en.png';
  const de_flag = '/img/flags/de.png';

  const onLocale = async (locale: number) => {
    if (document.getElementById('flag')) {
        const element = document.getElementById('flag');
        
        if (element !== null) {
            if (locale === 0) {
                element.style.backgroundImage = `url(${it_flag})`;
                message.success('Lingua cambiata');
            } else if (locale === 1) {
                element.style.backgroundImage = `url(${en_flag})`;
                message.success('Language changed');
            } else if (locale === 2) {
                element.style.backgroundImage = `url(${de_flag})`;
                message.success('Sprache geändert');
            } else {
                message.warning('error');
            }
        }
    }
  };

  const pathname = usePathname();
  let show_header = true;
  if (pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/private-area"){

    show_header = false;
  }
  
  if(show_header === false){
    return (
      <header className={style.header}>
        <div className={style.container}>
          
          <div className={style.header_item}></div>

          <div className={style.header_item}></div>

          <div className={style.header_item}></div>

          <div className={style.header_item}>
            <a onClick={onHome}>
              <div className={style.restaurant_icon}>
                <div className={style.logo}><Image src={logo} alt='logo' width={100} height={100} /></div>
                <div className={style.title}><h1>Antico Granaio</h1></div>
              </div>
            </a>
          </div>

          <div className={style.header_item}>
            <div className={style.dropdown_container}>
              <div className={style.dropdown}>
                <span className={style.span} id='flag'>hh</span>
                <div className={style.dropdown_item}>
                  <hr className={style.hr}/>
                  <a className={style.locale_it} onClick={() => onLocale(0)}>it</a>
                  <a className={style.locale_en} onClick={() => onLocale(1)}>en</a>
                  <a className={style.locale_de} onClick={() => onLocale(2)}>de</a>
                </div>
              </div>
            </div>
          </div>

          <div></div>

        </div>
      </header>
    )
  } else {
    return (
      <header className={style.header}>
        <div className={style.container}>
          
          <div className={style.header_item}></div>
  
          <div className={style.header_item}></div>

          <div className={style.header_item}></div>
  
          <div className={style.header_item}>
            <a onClick={onHome}>
              <div className={style.restaurant_icon}>
                <div className={style.logo}><Image src={logo} alt='logo' width={100} height={100} /></div>
                <div className={style.title}><h1>Antico Granaio</h1></div>
              </div>
            </a>
          </div>

          <div className={style.header_item}></div>

          <div className={style.header_item}>
            <div className={style.dropdown_container}>
              <div className={style.dropdown}>
                <span className={style.span} id='flag'>hh</span>
                <div className={style.dropdown_item}>
                  <hr className={style.hr}/>
                  <a className={style.locale_it} onClick={() => onLocale(0)}>it</a>
                  <a className={style.locale_en} onClick={() => onLocale(1)}>en</a>
                  <a className={style.locale_de} onClick={() => onLocale(2)}>de</a>
                </div>
              </div>
            </div>
          </div>
  
          <div className={style.header_item}>
            <a onClick={onPriv} className={style.user}>
              <div className={style.user_icon}>
                <Image src={user} alt='private area' width={50} height={50} />
              </div>
            </a>
          </div>
        </div>
      </header>
    )
  }
} export default Header

