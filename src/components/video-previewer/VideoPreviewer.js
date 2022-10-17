import { createRef, useEffect } from 'react';
import styling from './VideoPreviewer.module.css'

const VideoPreviewer = (props) => {
    const {source, showCropper,} = props;



  // 
  useEffect(()=>{
    var canvas = document.getElementById("canV");

    if(canvas){ 
      var ctx = canvas.getContext("2d");
      var video = document.createElement("video");
      video.src = source;
      video.autoplay = true;
      video.loop = true
      video.addEventListener('loadeddata', function() {
        video.play();  // start playing
        update(); //Start rendering
        console.log(video,canvas)
      });
    
      function update(){
        ctx.drawImage(video,0,0,256,256);   
        requestAnimationFrame(update); // wait for the browser to be ready to present another animation fram.       
      }
    }
  },[source])
            
  if(!source){
    return null
}
    return(
        <div className={styling.container}>
         {/* <video
        className={styling.glass}
          src={source}
          type="video/*"
          loop
          onLoadedData={()=>{
          
          }}
        //   width={500}
          height={500}
          muted="muted"
          onMouseOver={(e) => {
            !showCropper && e.target.play();
          }}
          onMouseLeave={(e) => {
            e.target.pause();
          }}
        ></video> */}
        <canvas id="canV"  width={800} height={600}></canvas>
      </div>
    )
}

export default VideoPreviewer;