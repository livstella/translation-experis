
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import LoginView from './views/LoginView';
import ProfileView from './views/ProfileView';
import TranslationsView from './views/TranslationView';
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';


//navbar displayed outside the routes
function App() {
  return (
   <BrowserRouter>
     <div className="App">
       <Navbar/>
        <Routes>
          <Route path='/' element={ <LoginView />} />
          <Route path='/translations' element={ <TranslationsView/> } />
          <Route path='/profile' element={ <ProfileView />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
   </BrowserRouter>
  );
}

export default App;
