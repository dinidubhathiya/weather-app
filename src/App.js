import './App.css';
import { useState } from 'react';
import DailyInfoTable from './Components/DailyInfoTable';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from './Components/Loading';

function App() {

  const [dailyData, setDailyData] = useState(null);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [loadingError, setloadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&snowfall_sum&timezone=auto`);
    setIsLoading(false);
    if (resp.ok) {
      const data = await resp.json();
      setloadingError(false);
      setDailyData(data.daily);
    } else {
      setloadingError(true);
    }
  }

  return (
    <div className="container">
      <h1>Weather Information</h1>
      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-md-6">
          <label className="form-label">latitude: </label>
          <input onChange={(e) => { setLatitude(e.target.value); }} value={latitude} type='text' className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">longitude: </label>
          <input onChange={(e) => { setLongitude(e.target.value) }} value={longitude} type='text' className="form-control" />
        </div>
        <button className="col-md-3 mx-auto btn btn-primary" type='submit'>submit</button>
      </form>

      <div className="row mt-5">
        {!loadingError && !isLoading && <DailyInfoTable dailyData={dailyData} />}
        {loadingError && !isLoading && <p className='error-message'>Error loading data for given inputs.</p>}
        {isLoading && <Loading />}
      </div>
    </div>
  );
}

export default App;
