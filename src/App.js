import React, {useState} from 'react';
import ReactPlayer from 'react-player'
import moment from 'moment';
import {PageHeader, Input, Button, Empty} from 'antd';
import "antd/dist/antd.css";

function App() {
  const [currenURL, setCurrentURL] = useState('https://www.youtube.com/watch?v=o1jO14fQBro');
  const [videoLen, setVideoLen] = useState(0);
  const [currentPoS, setCurrentPos] = useState(0);
  //values for caluclating time
  const [startFrame, setStartFrame] = useState(null);
  const [endFrame, setEndFrame] = useState(null);
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
    <div className="App" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <PageHeader
        className="header"
        title="Dusty Frames"
      />
      <span>Youtube or Twitch video URL</span>
      <Input style={{width: 400, marginBottom: 20}} value={currenURL || ''} onChange={(e) => changeURL(e.target.value)}/>
      <div>
        <div style={{height: 380}}>
        {currenURL.length ? (
            <ReactPlayer
            controls
            url={currenURL} 
            onDuration={(d) => setVideoLen(d)} 
            onProgress={(p) => changeProgress(p)}
          /> 
        ) : <Empty/>}
        </div>
        <div style={{display: 'flex', marginBottom: 30}}>
          <div style={{display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'center'}}>
            <Button onClick={() => setStartFrame(Math.floor(currentPoS * 60))}>Set START Frame</Button>      
            <span>Frame: {startFrame}</span>
          </div>
          <Button onClick={() => setStartFrame(null)}>Clear Start</Button>
          <div style={{display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'center'}}>
            <Button onClick={() => setEndFrame(Math.floor(currentPoS * 60))}>Set END Frame</Button>
            <span>Frame: {endFrame}</span>
          </div>
          <Button onClick={() => setEndFrame(null)}>Clear End</Button>
        </div>
      </div>
      <span>TOTAL FRAMES COUNTED = {(endFrame - startFrame) > 0 ? (endFrame - startFrame) : 0}</span>
      <span style={{height: 10, fontSize: 10, color: 'brown'}}>{startFrame && endFrame ? (null) : 'Please set both start and end frames'}</span>
      <span style={{fontSize: 30, fontWeight: 'bold', color: startFrame && endFrame ? 'green' : 'red', width: 400}}>FINAL TIME = {moment().startOf('day').seconds(((endFrame / 60) - (startFrame / 60))).format('HH:mm:ss')}.{getMs()}</span>
      <span style={{fontSize: 12, color: 'red'}}> The frame count and time you may receive via Dusty Frames may not be 100% accurate to the millisecond</span>
      <span>If you are ever unsure, please use Avidemux for a more accurate frame timing</span>
      <a href="http://avidemux.sourceforge.net/">SourceForge Download</a>
      <div style={{marginTop: 80}}>
        <span> The code in this project is Open Source and free for anyone to use and contribute to.</span>
        <a href='https://github.com/licebeam/dustyframes/tree/master'> Github Repo</a>
      </div>
      <span>Built using React, ant design and ReactPlayer</span>
    </div>
  );
}

export default App;
