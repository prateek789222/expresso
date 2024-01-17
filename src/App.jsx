import logo from './../components/logo.png'
import logo_black from './../components/logo_black.png'
import './App.css'

function App() {
  console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID)

  return (
    <div>
      <img src={logo} alt="" className='myImg' />
    </div>
  );
}

export default App