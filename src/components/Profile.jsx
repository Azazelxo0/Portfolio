import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import img1 from "../assets/profilepic.jpeg"
import pdf from '../assets/Amit-Suraj-Resume.pdf'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'


export default function Profile() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Download CV
    </Tooltip>
  )

  const renderTool = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      View CV
    </Tooltip>
  )

  // Text Section Animation
  const textControls = useAnimation()
  const [textRef, textInView] = useInView({ threshold: 0.6 })

  useEffect(() => {
    if (textInView) {
      textControls.start({ x: 0, opacity: 1 })
    } else {
      textControls.start({ x: -50, opacity: 0 })
    }
  }, [textInView, textControls])

  // Image Section Animation
  const imgControls = useAnimation()
  const [imgRef, imgInView] = useInView({ threshold: 0.6 })

  useEffect(() => {
    if (imgInView) {
      imgControls.start({ scale: 1, opacity: 1 })
    } else {
      imgControls.start({ scale: 0.9, opacity: 0 })
    }
  }, [imgInView, imgControls])

  return (
    <>
      <Container fluid className='mt-5'>
       
        <Row>
          <Col md={8}>
            <motion.div
              ref={textRef}
              animate={textControls}
              initial={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
              style={{ height: "60vh" }}
            >
              <div className='my-5' style={{ marginLeft: "120px", marginRight: "50px" }}>
                <h3>I'm</h3>
                <h1 className='fw-bold my-3'>Amit Suraj</h1>
                <h5 className='text-muted mb-2'>Web Developer</h5>
                <p className='mb-3'>
                  I specialize in front-end and back-end development, crafting modern,
                  responsive, and user-focused websites and applications. Combining creativity with technical
                  expertise to deliver seamless digital experiences.
                </p>

                <h5>Resume</h5>
                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}>
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    href={pdf}
                    download
                    className='btn mt-3'
                  >
                    <i className="fa-solid fa-download"></i>
                  </motion.a>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTool}>
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    href={pdf}
                    target='_blank'
                    className='btn ms-3 mt-3'
                  >
                    <i className="fa-solid fa-eye"></i>
                  </motion.a>
                </OverlayTrigger>
              </div>
            </motion.div>
          </Col>

          <Col md={4}>
            <motion.div
              ref={imgRef}
              animate={imgControls}
              initial={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 1 }}
              className='my-5 d-flex justify-content-center'
              style={{ height: "60vh" }}
            >
              <img
                src={img1}
                alt=""
                className='img-fluid rounded-circle shadow-lg'
                style={{ width: "350px", height: "350px", objectFit: "cover" }}
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
