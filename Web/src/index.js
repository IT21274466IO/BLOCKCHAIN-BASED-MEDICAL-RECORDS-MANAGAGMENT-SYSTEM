import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import Swiper styles
import 'swiper/css';
import 'aos';
import 'aos/dist/aos.css';
import reportWebVitals from './reportWebVitals';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-modern-drawer/dist/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
