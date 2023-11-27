import './AboutProject.css';

function AboutProject() {
  return (
    <div className="about-project">
      <h3 className="about-project__title">О проекте</h3>

      <div className="about-project__deadlines">
        <div className="about-project__deadlines_type_steps">
          <h4 className="about-project__text_main">Дипломный проект включал 5 этапов</h4>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, 
        добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__deadlines_type_weeks">
          <h4 className="about-project__text_main">На выполнение диплома ушло 5 недель</h4>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, 
        которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <div className="about-project__weeks">
        <div className="about-project__weeks_backend">
          <p className="about-project__weeks_backend__count">1 неделя</p>
          <p className="about-project__weeks_text">Back-end</p>
        </div>
        <div className="about-project__weeks_frontend">
          <p className="about-project__weeks__frontend__count">4 недели</p>
          <p className="about-project__weeks_text">Front-end</p>
        </div>
      </div>

    </div>
  );
}

export { AboutProject };