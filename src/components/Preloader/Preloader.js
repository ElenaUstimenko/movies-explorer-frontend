import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader">
      <div className='preloader__container'>
        <div className='preloader__round'></div>
      </div>
    </div>
  );
}

export { Preloader };