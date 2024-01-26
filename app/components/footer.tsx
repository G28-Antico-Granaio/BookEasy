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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d742.5307566267605!2d12.491587169662798!3d41.89021119655536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sColosseo!5e0!3m2!1sit!2sit!4v1706201457987!5m2!1sit!2sit"
                width="600"
                height="450"
                loading="lazy"
                style={{ border: 0 }}>
           </iframe>
        </div>
    </footer>
  )
}export default Footer