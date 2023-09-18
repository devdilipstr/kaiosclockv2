
import Alarm from './context/Alarm';
import DigitalClock from './components/DigitalClock';
import './App.css';


function App() {
  return (
    <section className="clock container" >
      
      <div className="clock-container grid">
        <div className="clock-content grid">
          <Alarm>
            
            <DigitalClock />
            
          </Alarm>
        </div>
      </div>
    </section>
  );
}

export default App;
