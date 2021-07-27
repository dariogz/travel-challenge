import logo from '../assets/logo.png';
import axios from 'axios';

function Header({ user, setLoading, setUser }) {

  const logoutOnApi = async () => {
    setLoading(true);
    await axios('http://localhost/api/logout', {withCredentials: true});
    setUser(false);
    setLoading(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    logoutOnApi();
  }

  return (
    <header className="absolute top-0 w-full bg-blue-600 h-24 flex items-center">
      <div className="container p-4 flex flex-row justify-between items-center text-white m-auto">
        <img src={logo} className="w-32" alt="ID90 Travel" />

        {user ? 
        <div className="flex relative h-full items-center">
          <img className="rounded h-14 mr-5" src={ user.avatar_url } alt="Profile" />
          <div className="flex flex-col">
            <h1>{user.name} {user.last_name}</h1>
            <span className="text-xs">{user.email}</span>
            <form onSubmit={handleSubmit}>
              <button className="text-xs mt-1" type="submit">Logout</button>
            </form>
          </div>
        </div> : ''}
        
      </div>
    </header>
  );
}

export default Header;