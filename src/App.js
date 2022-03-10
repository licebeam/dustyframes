import './App.css';
import React, {useState} from 'react';
import ReactPlayer from 'react-player'
import moment from 'moment';

function App() {
  const [currenURL, setCurrentURL] = useState('https://www.youtube.com/watch?v=o1jO14fQBro');
  const [videoLen, setVideoLen] = useState(0);
  const [currentPoS, setCurrentPos] = useState(0);
  //values for caluclating time
  const [startFrame, setStartFrame] = useState(0);
  const [endFrame, setEndFrame] = useState(0);
  // position seems to be 2 frames instead of one when moving frame by frame
  const changeURL = (value) => {
    setCurrentPos(0);
    setVideoLen(0);
    setCurrentURL(value);
  };

  const changeProgress = (p) => {
    setCurrentPos(p.playedSeconds)
  }

  const getMs = () => {
    if((((endFrame / 60) - (startFrame / 60)) + "").split(".")[1])
      return (((endFrame / 60) - (startFrame / 60)) + "").split(".")[1].slice(0, 3)
  }

  return (
    <div className="App">
      <input value={currenURL || ''} onChange={(e) => changeURL(e.target.value)}/>
      <ReactPlayer
        controls
        url={currenURL} 
        onDuration={(d) => setVideoLen(d)} 
        onProgress={(p) => changeProgress(p)}
      /> 
      <button onClick={() => setStartFrame(Math.floor(currentPoS * 60))}>Set START Frame</button>
      <button onClick={() => setEndFrame(Math.floor(currentPoS * 60))}>Set END Frame</button>
      <span>{startFrame} = startFrame</span>/
      <span>{endFrame} = endFrame</span>
      <br></br>
      <span>TOTAL FRAMES = {(endFrame - startFrame)}</span>
      <br></br>
      <span>FINAL TIME = {moment().startOf('day').seconds(((endFrame / 60) - (startFrame / 60))).format('HH:mm:ss')}.{getMs()}</span>
    </div>
  );
}

export default App;
