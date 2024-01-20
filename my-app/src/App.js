import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { EventView } from './components/EventView';
import { EventForm } from './components/EventForm';
import { EventDetail } from './components/EventDetail';
import { VolunteerView } from './components/VolunteerView';
import { VolunteerForm } from './components/VolunteerForm';
import { VolunteerDetail } from './components/VolunteerDetail';

function App() {
  return (
    <div className="App bg-gray-800 min-h-screen">
      <NavBar/>
      <Routes>
        <Route path='/' element={<EventView/>}/>
        <Route path='/events/add' element={<EventForm/>}/>
        <Route path='/events/edit/:id' element={<EventForm/>}/>
        <Route path='/events/:id' element={<EventDetail/>}/>
        <Route path='/volunteers' element={<VolunteerView/>}/>
        <Route path='/volunteers/add' element={<VolunteerForm/>}/>
        <Route path='/volunteers/edit/:id' element={<VolunteerForm/>}/>
        <Route path='/volunteers/:id' element={<VolunteerDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
