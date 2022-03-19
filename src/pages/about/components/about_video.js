import React from "react";

import "./about_video.css";
import img from "../../../assets/images/about_video_play.png";
import ReactPlayer from 'react-player/youtube'

// Only loads the YouTube player



class AboutVideo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showVideo: 'none',
            showCtrls: 'block' ,
            player: false
        };
    }

    playVideo = () => {
        if(this.state.player){
            this.setState({showVideo: 'block', showCtrls: 'none'});
            this.state.player.playVideo();
        }
    }
    stopVideo = () => {
        if(this.state.player){
            this.setState({showVideo: 'none', showCtrls: 'block'});
            this.state.player.pauseVideo();
        }
    }
      
    onReady = (event) => {
        this.setState({player: event.target});
    }
    render(){
        return (
            <>
                <div className="part_block">
                    <div className="row custom_container">
                        <div className="about_video_container row d-flex justify-content-center">
                            <ReactPlayer url='https://www.youtube.com/watch?v=dSwYHxV5lLY' width="100%" height="auto" className='videoBox'/>
                        </div>                
                    </div>
                </div>
            </>
        );
    }
};

export default AboutVideo;
