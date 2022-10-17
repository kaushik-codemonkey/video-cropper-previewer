import React, { useEffect, useState } from "react";
import VideoCropper from "./components/video-cropper/VideoCropper";
import VideoPreviewer from "./components/video-previewer/VideoPreviewer";

const App = () => {
  const [showCropper, setShowCropper] = useState(false);
  const [chosenFile, setChosenFile] =  useState();
  const [sourceUrl,setSourceUrl] = useState('')
  const [crop,setCrop] = useState()
  const [videoProps,setVideoProps] = useState()//{videoHeight,videoWidth,naturalWidth,naturalHeight }

  const [output, setOutput] = useState(null);

  const cropVideoNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = videoProps.naturalWidth / videoProps.videoWidth;
    const scaleY = videoProps.naturalHeight / videoProps.videoHeight;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
  
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      document.createElement('video',{src:sourceUrl}),
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
      
    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    setOutput(base64Image);
  };

  

  useEffect(()=>{
    chosenFile&&setSourceUrl(URL.createObjectURL(chosenFile));
  },[chosenFile])
  // useEffect(()=>{
  //   console.log(crop)
  // },[crop?.x,crop?.y])
  return (
    <div className="App">
      <input type={'file'} onChange={(e)=>setChosenFile(e.target.files[0])}/>
      <VideoCropper source={sourceUrl} showCropper={showCropper} setCrop={setCrop} onCrop={cropVideoNow} setVideoProps={setVideoProps}/>
      <VideoPreviewer source={videoProps && sourceUrl} cropOptions={crop} showCropper={showCropper} crop={crop}/>
      <button
        onClick={() => {
          setShowCropper((prev) => !prev);
        }}
      > 
        Show Cropper
      </button>
    </div>
  );
};

export default App;
