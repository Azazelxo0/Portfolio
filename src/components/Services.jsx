import React, { useEffect } from 'react'
import TiltedCard from '../../reactbits/TiltedCard/TiltedCard'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.2, 
      duration: 0.5,
      ease: 'easeInOut',
    },
  }),
}

export default function Services() {
  const controls = useAnimation()
  const textControls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.4 })

  useEffect(() => {
    if (inView) {
      textControls.start({ opacity: 1, y: 0 })
      controls.start((i) => 'visible')
    } else {
      textControls.start({ opacity: 0, y: 10 })
      controls.start('hidden')
    }
  }, [inView, controls, textControls])

  const cards = [
    {
      img: 'https://static.vecteezy.com/system/resources/previews/016/878/155/non_2x/ui-ux-design-outline-icon-design-illustration-design-and-development-symbol-on-white-background-eps-10-file-vector.jpg',
      
    },
    {
      img: 'https://static.vecteezy.com/system/resources/previews/003/835/835/non_2x/front-end-concept-icon-software-development-kit-idea-thin-line-illustration-service-orchestration-programming-and-coding-responsive-website-design-isolated-outline-drawing-vector.jpg',
      
    },
    {
      img: 'https://www.shutterstock.com/image-vector/backend-icon-thin-linear-outline-600nw-2139453627.jpg',
      
    },
  ]

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={textControls}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="text-center "
        style={{marginTop:"300px"}}
        
      >
        <h3 className="fw-bold">Services</h3>
        <p className="fw-semibold">What I do</p>
      </motion.div>

      <motion.div
        style={{ height: '60vh' }}
        className="d-flex flex-row justify-content-evenly align-items-center flex-wrap mb-5"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
          >
            <TiltedCard
              imageSrc={card.img}
              altText=""
              captionText=""
              containerHeight="250px"
              containerWidth="250px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text text-center fw-bold">{card.content}</p>
              }
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}
