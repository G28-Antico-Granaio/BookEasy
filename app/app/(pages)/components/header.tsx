import React from 'react'

import Image from 'next/image'

import style from './components.module.css'
import logo from '@/img/duck.jpg'
import user from '@/img/duck.jpg'
import Link from 'next/link'

function Header() {
  return (
    <header className={style.header}>
      <div className={style.container}>
        
        <div className={style.header_item}></div>

        <div className={style.header_item}></div>

        <div className={style.header_item}>
          <a href={`/`}>
            <div className={style.restaurant_icon}>
              <div className={style.logo}><Image src={logo} alt='logo' width={100} height={100} /></div>
              <div className={style.title}><h1>Antico Granaio</h1></div>
            </div>
          </a>
        </div>

        
        <div className={style.header_item}>
          <div className={style.dropdown_container}>
            <div className={style.dropdown}>
              <span className={style.span}>Lingua</span>
              <div className={style.dropdown_item}>
                <div className={style.locale}>it</div>
                <div className={style.locale}>en</div>
                <div className={style.locale}>de</div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.header_item}>
          <div className={style.user_icon}>
            <Link href={`/private-area`} className={style.user}>
              <Image src={user} alt='private area' width={50} height={50} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}export default Header