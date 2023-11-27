import './Techs.css';

function Techs() {
  return (
    <div className="techs">
      <h3 className="techs__title">Технологии</h3>

      <div className="techs__text">
        <h4 className="techs__text_main">7 технологий</h4>
        <p className="techs__text_about">На курсе веб-разработки мы освоили технологии, 
        которые применили в дипломном проекте.</p>
      </div>

      <ul className="techs__list">
          <li className="techs__list_item">HTML</li>
          <li className="techs__list_item">CSS</li>
          <li className="techs__list_item">JS</li>
          <li className="techs__list_item">React</li>
          <li className="techs__list_item">Git</li>
          <li className="techs__list_item">Express.js</li>
          <li className="techs__list_item">mongoDB</li>
      </ul>
    </div>
  );
}

export { Techs };