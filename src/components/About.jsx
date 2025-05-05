import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
    const imgControls = useAnimation()
    const [imgRef, imgInView] = useInView({ threshold: 0.6 })

    const textControls = useAnimation()
    const [textRef, textInView] = useInView({ threshold: 0.6 })

    useEffect(() => {
        if (imgInView) {
            imgControls.start({ x: 0, opacity: 1 })
        } else {
            imgControls.start({ x: -50, opacity: 0 })
        }
    }, [imgInView, imgControls])

    useEffect(() => {
        if (textInView) {
            textControls.start('visible')
        } else {
            textControls.start('hidden')
        }
    }, [textInView, textControls])

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 10,
        },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.3,
                duration: 0.5,
                ease: 'easeInOut',
            },
        }),
    }

    const points = [
        {
            label: "Skilled React Developer –",
            description: "Passionate about building dynamic, responsive, and user-focused web applications using React and modern JavaScript."
        },
        {
            label: "Clean & Creative UI Development –",
            description: "I specialize in crafting seamless front-end interfaces with attention to design, usability, and performance."
        },
        {
            label: "Full-Stack Capabilities –",
            description: "Comfortable working on both front-end and back-end, including REST API integration and server-side logic."
        },
        {
            label: "Efficient State Management –",
            description: "Experienced with scalable state management solutions like Redux or Context API for better app structure and performance."
        },
        {
            label: "Performance-Driven Coding –",
            description: "I focus on writing clean, optimized, and maintainable code to ensure fast and smooth user experiences."
        },
        {
            label: "Problem-Solving Mindset –",
            description: "I approach each challenge analytically, always looking for the most efficient and effective solutions."
        }
    ];

    return (
        <>
            <Row className='mb-5'>

                <Col md={5}>
                    <motion.div
                        ref={imgRef}
                        animate={imgControls}
                        initial={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className='d-flex justify-content-center align-items-center'
                        style={{ height: "50vh" }}
                    >
                        <img
                            src="https://d3kqdc25i4tl0t.cloudfront.net/articles/content/802_781536_WhyShouldWeHireYou_WhattoSayinYourInterview_hero.jpg"
                            alt=""
                            className='img-fluid rounded-circle shadow-lg'
                            style={{ width: "350px", height: "350px", objectFit: "cover" }}
                        />
                    </motion.div>
                </Col>

                <Col md={7}>
                    <motion.div
                        ref={textRef}
                        initial="hidden"
                        animate={textControls}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                        }}
                        className='d-flex justify-content-center'
                        style={{ height: "50vh" }}
                    >
                        <div className='mx-5'>
                            <h3>WHY HIRE ME?</h3>
                            <ul>
                                {points.map((point, index) => (
                                    <motion.li
                                        key={index}
                                        custom={index}
                                        initial="hidden"
                                        animate={textControls}
                                        variants={textVariants}
                                        className='mb-3'
                                    >
                                        <span className='fw-bold'>{point.label}</span> {point.description}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </Col>

            </Row>
        </>
    )
}
