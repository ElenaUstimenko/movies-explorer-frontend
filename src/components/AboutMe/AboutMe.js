import './AboutMe.css';
import photo from '../../images/photo/photo.jpg';

function AboutMe() {
  return (

    <section className="about-me">
      <h3 className="about-me__title">Студент</h3>
      <div className="about-me__information">
        <div className="about-me__text">
          <h2 className="about-me__name">Елена</h2>
          <p className="about-me__profession">Фронтенд-разработчик</p>
          <p className="about-me__story">Моё первое высшее образование - экономическое, 
          специальность "Бухгалтерский учёт, анализ и аудит", работала бухгалтером, 
          затем долгое время финансовым аналитиком. Владею английским языком, недавно 
          начала изучать корейский язык. После прохождения курса "Веб-разработчик" 
          от школы "Яндекс.Практикум" планирую сменить сферу деятельности на наиболее 
          мне интересную и работать фронтенд-разработчиком.</p> 
          <a 
            className='about-me__github link'
            href='https://github.com/ElenaUstimenko/'
            rel='noreferrer'
            target='_blank'
            >Github</a>

        </div>
        <img
          className='about-me__photo'
          src={photo}
          alt='фотография человека, которому принадлежит этот сайт'
        />
      </div>
    </section>
  );
}

export { AboutMe };