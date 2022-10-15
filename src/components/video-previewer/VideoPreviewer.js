import styling from './VideoPreviewer.module.css'

const VideoPreviewer = (props) => {
    const {source, showCropper} = props;

    if(!source){
        return null
    }
    console.log('source',source)

    return(
        <div className={styling.container}>
          <img src={source}/>
        <video
        className={styling.glass}
          src={source}
          type="video/*"
          loop
        //   width={500}
          height={500}
          muted="muted"
          onMouseOver={(e) => {
            !showCropper && e.target.play();
          }}
          onMouseLeave={(e) => {
            e.target.pause();
          }}
        ></video>
      </div>
    )
}

export default VideoPreviewer;