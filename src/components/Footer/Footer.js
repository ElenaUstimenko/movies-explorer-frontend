import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>

      <div className="footer__info">
        <p className="footer__info_date">© 2023</p>

        <div className="footer__info_links"> 
          <a 
            className="footer__info_links__school link"
            href="https://practicum.yandex.ru/"
            rel="noreferrer"
            target="_blank"
          >Яндекс.Практикум</a>
          <a 
            className="footer__info_links__github link"
            href="https://github.com/ElenaUstimenko/"
            rel="noreferrer"
            target="_blank"
            >Github</a>
        </div>
   
      </div>
    </footer>
  );
}

export { Footer };