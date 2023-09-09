
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Feedbackform from './Layout/Feedbackform';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Thankyou from './Layout/Thankyou';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route>
          <Route exact path="/" element={<Feedbackform />} />
          <Route path="/thankYou" element={<Thankyou />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
