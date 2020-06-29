import React, { useEffect, useRef, useState } from 'react'
import videos from './videos'

export default function App() {
  const [focusedIndex, setFocusedIndex] = useState(0)

  return (
    <div
      style={{
        display: 'flex',
        overflow: 'auto',
        flexWrap: 'nowrap',
        paddingLeft: '5px'
      }}
    >
      {videos.map((video, index) => (
        <VideoCell
          key={video.id}
          video={video}
          index={index}
          isFocused={focusedIndex === index}
          onMouseEnter={() => setFocusedIndex(index)}
        />
      ))}
    </div>
  )
}

function VideoCell({ video, isFocused, onMouseEnter }) {
  const videoRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const videoPlayer = videoRef.current

    if (isFocused & !isPlaying) {
      videoPlayer.play()
      setIsPlaying(true)
    }

    if (!isFocused && isPlaying) {
      videoPlayer.pause()
      setIsPlaying(false)
    }
  }, [isFocused, isPlaying])

  return (
    <div
      onMouseEnter={onMouseEnter}
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        marginRight: '10px',
        flexShrink: 0,
        width: '154px',
        height: '250px',
        position: 'relative'
      }}
    >
      <video
        loop
        muted
        ref={videoRef}
        src={video.file_url}
        poster={video.thumbnail_url}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.8))',
          transition: 'opacity 200ms',
          opacity: isPlaying ? 0 : 1
        }}
      >
        <span
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
            padding: '8px'
          }}
        >
          {video.caption}
        </span>
      </div>
    </div>
  )
}
