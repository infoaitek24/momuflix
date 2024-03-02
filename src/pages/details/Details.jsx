import React, { useState } from 'react';
import "./style.scss";
import useFetch from './../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendations';
import VideoStream from '../../components/videoPopup/VideoStream';

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
  
  // State to control the visibility of the VideoStream component
  const [showStream, setShowStream] = useState(false);

  // Assuming the first video in the data.results array is the trailer you want to show
  const trailerUrl = data?.results?.find(video => video.type === "Trailer")?.key;

  // Function to handle showing the trailer
  const handleWatchTrailer = () => {
    setShowStream(true);
  };

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>

      {/* Button to Play Movie HD */}
      {trailerUrl && (
        <button className="watch-trailer-button" onClick={handleWatchTrailer}>
          Play Movie HD
        </button>
      )}

      {/* VideoStream component for showing the trailer */}
      <VideoStream show={showStream} setShow={setShowStream} movieId={trailerUrl} />
    </div>
  );
}

export default Details;
