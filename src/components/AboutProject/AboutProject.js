import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h3 className="about-project__title">О проекте</h3>

      <div className="about-project__deadlines">
        <div className="about-project__steps">
          <h4 className="about-project__main">Дипломный проект включал 5 этапов</h4>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, 
        добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__discription">
          <h4 className="about-project__main">На выполнение диплома ушло 5 недель</h4>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, 
        которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <div className="about-project__weeks">
        <div className="about-project__period-backend">
          <p className="about-project__count-backend">1 неделя</p>
          <p className="about-project__part">Back-end</p>
        </div>
        <div className="about-project__period-frontend">
          <p className="about-project__count-frontend">4 недели</p>
          <p className="about-project__part">Front-end</p>
        </div>
      </div>

    </section>
  );
}

export { AboutProject };