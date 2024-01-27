// App.jsx
import {BrowserRouter as Router, 
  useNavigate, 
  Routes, 
  Route} from 'react-router-dom';
import {NextUIProvider} from '@nextui-org/react';

// Import all pages
import HomePage from './pages/home/HomePage';
//import Page1 from './pages/1/Page1';


export default function App() {
const navigate = useNavigate();

return (

  <NextUIProvider navigate={navigate}>
    {/* Your app here... */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* ... 
      <Route path="/page1" element={<Page1 />} />
      */}
    </Routes>
  </NextUIProvider>

);
}