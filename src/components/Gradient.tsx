import { useEffect, useState } from "react";
import randomcolor from 'randomcolor';
import { Clipboard } from 'lucide-react';

const Gradient = () => {
  const [color1, setColor1] = useState(randomcolor());
  const [color2, setColor2] = useState(randomcolor());
  

  const gradient = `linear-gradient(to right, ${color1},${color2})`;
  const code_text="background-image :" +gradient +';';

  useEffect(() => {
    document.body.style.background = gradient;
  }, [color1, color2]);

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'color1') {
      setColor1(value);
    } else {
      setColor2(value);
    }
  };

  const randomChange = () => {
    setColor1(randomcolor());
    setColor2(randomcolor());
  };

  const copyToClipboard = async () => {
    const codeText = code_text;
    try {
    
      await navigator.clipboard.writeText(codeText);
      console.log('Code copied to clipboard successfully!');
      const popup = document.createElement('div');
      popup.className = 'copy-popup'; 
      popup.textContent = 'Copied to Clipboard!';
      document.body.appendChild(popup);

      setTimeout(() => {
        document.body.removeChild(popup);
      }, 1000); // 1 second delay

    } catch (err) {
      console.error('Failed to copy code to clipboard:', err);
      alert('Could not copy code to clipboard. Please try selecting and copying manually.');
    }
  };

  return (
    <div className="gradient">
      <h1>Create your own gradient</h1>
      <div className="colorPicker">
        <input type="color" name="color1" value={color1} onChange={handleChangeColor} />
        <input type="color" name="color2" value={color2} onChange={handleChangeColor} />
      </div>
      <button className="random" onClick={randomChange}>Create a random gradient</button>
      <div className="btn_copy">
        <button className="code" >
          background-image : {gradient}
          <Clipboard className='copy'  onClick={copyToClipboard}/>
        </button>
      </div>
    </div>
  );
};

export default Gradient;
