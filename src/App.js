import { useState } from 'react';
import './App.css';

const LoadURLVideo=()=>{
  const [nameURL, setNameURL] = useState('');
  console.log("nameURL:::", nameURL);
  return (
    <div>
      <input onChange={e=>{setNameURL(e.target.value)}} className="style-input" type='text' placeholder='Please Input Url'/>
      <div>
      <iframe title="Video" width="600" height="345" src="https://www.youtube.com/embed/ZSfAw1gnxZw"/>
      </div>
  </div>
  );
}

function App() {
  return (
    <div className="App">
      <h2>Load Video Youtube</h2>
      <LoadURLVideo/>
    </div>
  );
}

export default App;
