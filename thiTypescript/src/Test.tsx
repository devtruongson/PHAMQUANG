import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState("yêu các em , anh yêu em ");

  const speak = () => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }

  return (
    <div>
      <h2>{text}</h2>
      <button onClick={speak}>Phát âm</button>
    </div>
  );
}

export default TextToSpeech;
