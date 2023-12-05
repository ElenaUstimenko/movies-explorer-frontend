import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <h3 className='techs__title'>Технологии</h3>

      <div className='techs__text'>
        <h4 className='techs__main'>7 технологий</h4>
        <p className='techs__about'>На курсе веб-разработки мы освоили технологии, 
        которые применили в дипломном проекте.</p>
      </div>

      <ul className='techs__list'>
          <li className='techs__item'>HTML</li>
          <li className='techs__item'>CSS</li>
          <li className='techs__item'>JS</li>
          <li className='techs__item'>React</li>
          <li className='techs__item'>Git</li>
          <li className='techs__item'>Express.js</li>
          <li className='techs__item'>mongoDB</li>
      </ul>
    </section>
  );
}

export { Techs };