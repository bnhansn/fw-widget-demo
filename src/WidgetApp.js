import React, { useEffect, useRef, useState } from 'react'

// Instructions: Refactor this App to function like the demo https://bnhansn.github.io/fw-widget-demo
// 1. Fetch videos from this url https://next-demo-flax.vercel.app/api/suggested_videos
// 2. The first video should start playing automatically
// 3. When the mouse hovers over a video, that video should start playing and all others should pause
// 4. When a video starts playing, the caption should fade out

// const video = {
//   caption: 'Mars Rover',
//   file_url:
//     'https://cdn1.fireworktv.com/medias/2020/1/17/1579225505-saivlmkp/watermarked/540/techembed3*.mp4',
//   id: 1,
//   thumbnail_url:
//     'https://cdn1.fireworktv.com/medias/2020/1/17/1579225697-jifpemag/540_960/techembed3.jpg'
// }

// export default function App() {
//   const videoRef = useRef()

//   useEffect(() => {
//     videoRef.current.play()
//     // videoRef.current.pause() pauses the video
//   }, [])

//   return (
//     <>
//       <video
//         loop
//         muted
//         ref={videoRef}
//         src={video.file_url}
//         poster={video.thumbnail_url}
//         style={{
//           width: '154px',
//           height: '250px'
//         }}
//       />
//     </>
//   )
// }

async function fetchVideos() {
  return await fetch(
    'https://next-demo-flax.vercel.app/api/suggested_videos'
  ).then((response) => response.json())
}

export default function App() {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos().then(({ videos }) => {
      setVideos(videos)
    })
  }, [])

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
