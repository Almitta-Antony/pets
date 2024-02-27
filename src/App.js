import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Footer from './components/Footer';
import SingleView from './pages/SingleView';
import AddPet from './pages/AddPet';

function App() {
  return (
    <div className="App">
            <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      <Route path='/login' element={<Auth></Auth>}></Route>
      <Route path='/register' element={<Auth register></Auth>}></Route>
      <Route path='/single-view' element={<SingleView ></SingleView>}></Route>
      <Route path='/addpet' element={<AddPet ></AddPet>}></Route>

      </Routes>
      <Footer></Footer>

    </div>
  );
}

export default App;
