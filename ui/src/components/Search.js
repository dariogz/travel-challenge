import "react-dates/initialize";
import { useState } from 'react'
import { DateRangePicker } from 'react-dates';
import "react-dates/lib/css/_datepicker.css";
import axios from 'axios';

import Hotel from './Hotel';
import LoaderSVG from '../assets/loader.svg'

function Search() {
  const [location, setLocation] = useState();
  const [guests, setGuests] = useState(1);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hotels, setHotels] = useState([]);

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const formattedDate = `${dateObj.getFullYear()}-${("0" + (dateObj.getMonth() + 1)).slice(-2)}-${("0" + dateObj.getDate()).slice(-2)}`;
    return formattedDate;
  }

  const searchOnApi = async (location, startDate, endDate, guests) => {
    try {
      const params = {
        guests,
        location,
        date_from: formatDate(startDate),
        date_to: formatDate(endDate)
      }
      const response = await axios.get('http://localhost/api/search', { params, withCredentials: true });
      setHotels(response.data.results.hotels);
    } catch (error) {
      setError(error.response);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !startDate || !endDate)
      return;

    setLoading(true);
    searchOnApi(location, startDate, endDate, guests);
  }

  return (
    <div className="h-full min-h-screen top-0 pt-24 flex">
      <aside className="container p-4 w-96 bg-gray-200 p-8">
        <h2 className="mb-4 block uppercase font-bold">Search</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-5">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Location</label>
            <input type="text" className="w-full px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:shadow-outline border border-gray-300" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <div className="w-full mb-5">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Date</label>
            <DateRangePicker
              startDate={startDate}
              startDateId="start-date"
              endDate={endDate}
              endDateId="end-date"
              onDatesChange={({ startDate, endDate }) => {
                setStartDate(startDate);
                setEndDate(endDate);
              }}
              focusedInput={focusedInput}
              onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            />
          </div>
          <div className="w-full mb-5">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Guests</label>
            <select className="w-full px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:shadow-outline border border-gray-300" value={guests} onChange={e => setGuests(e.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="w-full mb-5">
            {!loading ? <button className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit">Search</button> : ''}
          </div>
        </form>
      </aside>
      
      <main className="p-8 w-full">

        {loading ? (
          <div className="center flex items-center flex-col">
            <h1 className="mb-4 block uppercase font-bold">Searching for the best hotels!</h1>
            <img src={LoaderSVG} alt="Loading..." />
          </div>
        ): ( hotels.length > 0 ?
          <div>
            <h2 className="mb-4 block uppercase font-bold">Search Results</h2>
            {hotels.map(function(hotel, i) {
              return <Hotel hotelInfo={ hotel.hotel } bookingInfo={ hotel.booking} key={i}/>
            })}
          </div> :
          <div>
            <h2 className="mb-4 block uppercase font-bold">Find Hotels</h2>
            <p className="mb-8 block">Please fill the information about your trip to find deals on hotels, homes, and much more...</p>  
          </div>
          
        )}
      </main>
    </div>
  );
}

export default Search;