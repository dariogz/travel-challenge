Endpoints
  Airlines: https://beta.id90travel.com/airlines 
  Auth: https://beta.id90travel.com/session.json
  Hotels: https://beta.id90travel.com/api/v1/hotels.json

  Controllers
    Authentication
      > Login
      > Logout
    Search
      > SearchHotels
    Configuration
      > GetConfigurationData
        > Airlines
        > SortCriterias
        > SortOrders
  Services
    Hotels
    Airlines
  Providers
    ID90Travel
    FakeProvider >>> Unit testing
  Framework
    Request
    Response
    Database
    Configuration
    Cache
  Models
    User
    Airlines
    Hotels
    Searches
    Destinations
  