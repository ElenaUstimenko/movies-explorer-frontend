import './Promo.css';
import logo from '../../images/logo/promo_picture.svg';


function Promo() {
  return (
    <section className='promo'>
     <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
     <img
        className='promo__logo'
        src={logo}
        alt='нарисованные кругами белые линии'
      />
    </section>
  );
}

export { Promo };
