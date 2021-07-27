function Hotel({ hotelInfo, bookingInfo }) {

  const formattedTotal = "$ " + (Math.round(bookingInfo.price_total * 100) / 100).toLocaleString();
  return (
    <article className="border w-full p-5 flex mb-5">
      <img className="rounded pr-3" src={ hotelInfo.photo } alt="Hotel"></img>
      <div className="pl-3">
        <header className="flex justify-between items-center mb-4">
          <div className="flex flex-col pr-4">
            <h2 className="text-xl">{ hotelInfo.title }</h2>
            <h3 className="text-sm text-gray-500">{ hotelInfo.location }</h3>
          </div>
          <div className="flex content-center items-center">
            <div className="flex flex-col pr-2">
              <span className="text-sm text-bold text-gray-800">{ hotelInfo.review_category }</span>
              <span className="text-sm text-gray-500">{ hotelInfo.review_count } reviews</span>
            </div>
            <span className="bg-green-600 text-white p-2 rounded text-lg">{ hotelInfo.review_rating}</span>
          </div>

        </header>

        <p className="mb-3">{ hotelInfo.description }</p>

        <footer className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-gray-600">Distance from NZ airport 20km.</p>
            <small className="text-gray-500">{ bookingInfo.rooms } Room | { bookingInfo.nights } Nights</small>
          </div>
          <div className="flex flex-col">
            <p className="text-sm uppercase font-bold text-right">Total</p>
            <span className="text-xl block text-right mb-3">{ formattedTotal }</span>
            <button className="bg-blue-600 text-white active:bg-green-700 text-sm font-bold uppercase px-6 py-3 rounded shadow outline-none focus:outline-none">View Deal</button>
          </div>
        </footer>
      </div>
    </article>
  );
}

export default Hotel;