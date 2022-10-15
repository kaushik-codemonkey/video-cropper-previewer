import React, { useEffect, useState } from "react";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const VideoCropper = (props) => {

  const {showCropper, source, setCrop:setParentCrop,setVideoProps,onCrop:onCropSubmit} = props;
  
  // const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [crop, setCrop] = useState({
    x: 0, y: 0 ,
    width: 100,//31.6662,29.6761
    height: 100,
    unit: 'px',
  });
  //
  // const [zoom, setZoom] = useState(1);
  // const [finalObj, setFinalObj] = useState({
  //   x: 0,
  //   y: 0,
  //   height: 200,
  //   width: 200,
  // });
  useEffect(()=>{
    setParentCrop(crop);
  },[crop.x,crop.y])
  if(!source){
    return null;
  }
  const videoPlayerHeight = 500

  const aspectRatio = 9/16

  const onVideoLoaded = (e)=>{
    const videoHeight = e.target.videoHeight
    const videoWidth = e.target.videoWidth
    // calculate the width based on the aspect ratio and full height
    const calculatedWidth = aspectRatio * videoHeight;
    // calculate the percentages
    const widthPixel = (videoPlayerHeight/videoHeight)*calculatedWidth
    
    //find middle of the video x & y
    const actualWidth = (videoPlayerHeight/videoHeight)*videoWidth
    const xPos = (actualWidth/2)-(widthPixel/2)
    
    if(actualWidth < widthPixel){
      setCrop((cropData)=>({...cropData, width:actualWidth, height: videoPlayerHeight, x: 0,y:0}))
    }
    else{
      setCrop((cropData)=>({...cropData, width:widthPixel, height: videoPlayerHeight, x: xPos,y:0}))
    }
    setVideoProps((prevState = {})=>({...prevState,videoHeight:videoPlayerHeight,videoWidth:actualWidth,naturalWidth: videoWidth,naturalHeight:videoHeight }))
    }
    
    return (
    // <div style={showCropper? {display: 'block'} : {display: 'none'}}>
    <div >
      <div className="crop-container">
        <ReactCrop crop={crop} onChange={(c)=>setCrop(c)} aspect={aspectRatio} locked >
        <video
          src={source}
          autoPlay
          height={videoPlayerHeight}
          loop 
          muted
          onLoadedMetadata={onVideoLoaded}
        ></video>
        </ReactCrop>
      </div>
      <div className="controls" >
        <button onClick={onCropSubmit}>Crop Now!</button>
      </div>
    </div>
  );
};
export default VideoCropper;
