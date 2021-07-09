import Searcharea from "./Searcharea";
import {Router} from '@reach/router'
import Watcharea from "./Watcharea";
function App() {
  
  return (
    <div >
      <header>
      <a href='/'>ITube</a>
      </header>
      <Router>
      <Searcharea path='/'/>
      <Watcharea  path='/watch/:id'/>
      </Router>
      

    </div>
  );
}

export default App;
