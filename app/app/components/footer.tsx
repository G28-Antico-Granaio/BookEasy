import React from 'react'

import style from './components.module.css'

function Footer() {
  return (
    <footer className={style.footer}>
        <div className={style.footer_item}>
            <h3>Dove puoi trovarci:</h3>
            <p>
                Via del Colosseo 1, Roma, RM, Italia
            </p>
        </div>

        <div className={style.footer_item}>
            <h3>Come puoi conttattarci:</h3>
            <div>
                <h4>Numero di Telefono:</h4>
                <p>
                    <a href="tel:+391234567890">+39 1234567890</a>
                </p>
            </div>
            <br />
            <div>
                <h4>E-Mail: </h4>
                <p>
                    <a href="mailto:info@anticogranaio.it">info@anticogranaio.it</a>
                </p>
            </div>
        </div>

        <div>
            <iframe
                width="500"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1498.6690220301467!2d12.4922916!3d41.8900331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6a0551b926c7%3A0x57b48b6ea147594a!2sPiazza%20del%20Colosseo%2C%201%2C%2000184%20Roma%20RM!5e0!3m2!1sen!2sit!v=weekly">
           </iframe>
        </div>
    </footer>
  )
}export default Footer