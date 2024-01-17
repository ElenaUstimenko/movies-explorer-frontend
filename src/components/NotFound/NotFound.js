import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate(-1)
  }

  return (
    <section className='not-found'>
      <p className='not-found__number'>404</p>
      <p className='not-found__text'>Страница не найдена</p>
      <p className='not-found__link' onClick={handleClick}>Назад</p>
    </section>
  ); 
}

export { NotFound };