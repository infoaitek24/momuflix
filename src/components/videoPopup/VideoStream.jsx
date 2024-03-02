import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import './style.scss';

const VideoStream = ({ show, setShow, movieId }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const hidePopup = () => {
    setShow(false);
    setShowTrailer(false); // Close the trailer when hiding the popup
  };

  const handlePlayMovieHD = () => {
    setShowTrailer(true); // Show the trailer when "Play Movie HD" is clicked
  };

  // Construct the URL dynamically using the movieId
  const streamUrl = `https://vidsrc.xyz/embed/movie/${movieId}`;

  return (
    <div className={`videoPopup ${show ? 'visible' : ''}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>Close</span>
        {showTrailer && (
          <ReactPlayer
            url={streamUrl}
            controls
            width="100%"
            height="100%"
          />
        )}
      </div>
      {/* Icon and text to play movie HD */}
      <div className="playMovieHD" onClick={handlePlayMovieHD}>
        <i className="fa fa-video"></i> Play Movie HD
      </div>
    </div>
  );
};

export default VideoStream;


