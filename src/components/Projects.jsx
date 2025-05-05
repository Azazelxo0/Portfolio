import React from 'react'
import CircularGallery from '../../reactbits/CircularGallery/CircularGallery'
import SplitText from '../../reactbits/SplitText/SplitText'

export default function Projects() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!')
  }

  return (
    <div className="" style={{marginTop:"200px"}}>
      <div className="text-center my-5">
        <SplitText
          text="Projects"
          className="fs-1 fw-bold"
          delay={100}
          animationFrom={{ opacity: 0, transform: 'translateY(40px)' }}
          animationTo={{ opacity: 1, transform: 'translateY(0)' }}
          easing="easeOutCubic"
          threshold={0.3}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>

      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery
          bend={3}
          textColor="#000000"
          borderRadius={0.05}
        />
      </div>
    </div>
  )
}
