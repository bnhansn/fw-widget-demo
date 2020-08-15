import React, { useEffect, useRef } from 'react'
import videos from './videos'

// Instructions: Refactor this App to function like the demo https://bnhansn.github.io/fw-widget-demo
// 1. The first video should start playing automatically
// 2. When the mouse hovers over a video, that video should start playing and all others should pause
// 3. When a video starts playing, the caption should fade out

export default function App() {
  const video = videos[0]
  const videoRef = useRef()

  useEffect(() => {
    videoRef.current.play()
    // videoRef.current.pause() pauses the video
  }, [])

  return (
    <>
      <video
        loop
        muted
        ref={videoRef}
        src={video.file_url}
        poster={video.thumbnail_url}
        style={{
          width: '154px',
          height: '250px'
        }}
      />
    </>
  )
}
