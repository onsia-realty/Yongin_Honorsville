"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function ClusterSection() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dotRef.current) return

    let angle = 0
    const radius = 99
    let animationId: number

    const animate = () => {
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      }

      angle += 0.02
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-white py-20">
      <div className="max-w-7xl mx-auto relative">
        <div className="relative">
          {/* Main Background Layout */}
          <div className="sec02_item04_box relative">
            <div className="sec02_item04_01">
              <Image
                src="/sk-hynix-banner.png"
                alt="cluster yongin honorsville"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
            <div className="sec02_item04_02 absolute top-0 left-0 w-full h-full">
              <Image
                src="/cluster-yongin-main-hero.png"
                alt="cluster yongin honorsville"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
            
            {/* Animated Icon with Rotating Dot */}
            <div className="sec02_item02 absolute" data-aos="fade" data-aos-duration="700" data-aos-delay="200">
              <Image
                src="/sec02_item02_open.png"
                alt="아이콘"
                width={200}
                height={200}
              />
              <div className="sec02_item03_box relative">
                <div 
                  ref={dotRef}
                  className="sec02_item03 absolute"
                  style={{ transform: 'translate(-78.3596px, 60.5044px) translate(-50%, -50%)' }}
                >
                  <Image
                    src="/placeholder.jpg"
                    alt="점"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="sec02_item05 mt-8" data-aos="fade-right" data-aos-duration="450" data-aos-delay="600">
            <Image
              src="/sec02_item05_open.png"
              alt="반도체 프리미엄은 고속도로를 타고 클러스터용인 경남아너스빌로 옵니다!"
              width={800}
              height={100}
              className="mx-auto"
            />
          </div>

          {/* Feature Circles Grid */}
          <div className="sec02_circle_box on grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {/* Feature 1 - SK & Samsung */}
            <div className="sec02_item07 relative">
              <div className="sec02_circle01 relative">
                <Image
                  src="/img/main/sec02_circle_open.png"
                  alt="배경"
                  width={400}
                  height={400}
                  className="w-full"
                />
                <div className="sec02_item07_01 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/img/main/sec02_item07_01_open.png"
                    alt="반도체 일러스트"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="sec02_item07_04 absolute">
                  <Image
                    src="/img/main/sec02_item07_04.png"
                    alt="삼성 이미지"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="sec02_item07_03 absolute">
                  <Image
                    src="/img/main/sec02_item07_03_open.png"
                    alt="반도체 이미지"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div className="sec02_item07_02 mt-4">
                <Image
                  src="/img/main/sec02_item07_02_open.png"
                  alt="01. SK&SAMSUNG 반도체 클러스터를 빠르게"
                  width={400}
                  height={100}
                />
              </div>
            </div>

            {/* Feature 2 - Speed Traffic */}
            <div className="sec02_item08 relative">
              <div className="sec02_item08_02 mb-4">
                <Image
                  src="/img/main/sec02_item08_02_open.png"
                  alt="02. SPEED TRAFFIC"
                  width={400}
                  height={100}
                />
              </div>
              <div className="sec02_circle02 relative">
                <Image
                  src="/img/main/sec02_circle_open.png"
                  alt="배경"
                  width={400}
                  height={400}
                  className="w-full"
                />
                <div className="sec02_item08_01 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/img/main/sec02_item08_01_open.png"
                    alt="고속도로 일러스트"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="sec02_item08_03 absolute">
                  <Image
                    src="/img/main/sec02_item08_03.png"
                    alt="톨게이트 이미지"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="sec02_item08_04 absolute">
                  <Image
                    src="/img/main/sec02_item08_04_open.png"
                    alt="자동차 이미지"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            {/* Feature 3 - Education */}
            <div className="sec02_item09 relative">
              <div className="sec02_circle03 relative">
                <Image
                  src="/img/main/sec02_circle_open.png"
                  alt="배경"
                  width={400}
                  height={400}
                  className="w-full"
                />
                <div className="sec02_item09_01 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/img/main/sec02_item09_01_open.png"
                    alt="인프라 일러스트"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="sec02_item09_03 absolute">
                  <Image
                    src="/img/main/sec02_item09_03_open.png"
                    alt="어린이 이미지"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="sec02_item09_04 absolute">
                  <Image
                    src="/img/main/sec02_item09_04.png"
                    alt="블럭 이미지"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div className="sec02_item09_02 mt-4">
                <Image
                  src="/img/main/sec02_item09_02_open.png"
                  alt="03. EDUCATION"
                  width={400}
                  height={100}
                />
              </div>
            </div>

            {/* Feature 4 - Premium Life */}
            <div className="sec02_item10 relative">
              <div className="sec02_item10_02 mb-4">
                <Image
                  src="/img/main/sec02_item10_02_open.png"
                  alt="04. PREMIUM LIFE"
                  width={400}
                  height={100}
                />
              </div>
              <div className="sec02_circle04 relative">
                <Image
                  src="/img/main/sec02_circle_open.png"
                  alt="배경"
                  width={400}
                  height={400}
                  className="w-full"
                />
                <div className="sec02_circle04_opa">
                  <div className="sec02_item10_03 absolute">
                    <Image
                      src="/img/main/sec02_item10_03.png"
                      alt="아파트 이미지"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="sec02_item10_01 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/img/main/sec02_item10_01_open.png"
                    alt="아파트 일러스트"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="sec02_item10_04 absolute">
                  <Image
                    src="/img/main/sec02_item10_04.png"
                    alt="사람 이미지"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sec02_item04_box {
          position: relative;
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
        }

        .sec02_item02 {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .sec02_item03_box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
        }

        .sec02_circle_box {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 4rem;
        }

        @media (max-width: 768px) {
          .sec02_circle_box {
            grid-template-columns: 1fr;
          }
        }

        /* Circle Animations */
        .sec02_circle01, .sec02_circle02, .sec02_circle03, .sec02_circle04 {
          position: relative;
          animation: float 3s ease-in-out infinite;
        }

        .sec02_circle02 {
          animation-delay: 0.5s;
        }

        .sec02_circle03 {
          animation-delay: 1s;
        }

        .sec02_circle04 {
          animation-delay: 1.5s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Absolute positioned items inside circles */
        .sec02_item07_03 {
          top: 20%;
          right: 10%;
        }

        .sec02_item07_04 {
          bottom: 20%;
          left: 10%;
        }

        .sec02_item08_03 {
          top: 15%;
          left: 15%;
        }

        .sec02_item08_04 {
          bottom: 15%;
          right: 15%;
        }

        .sec02_item09_03 {
          top: 10%;
          right: 20%;
        }

        .sec02_item09_04 {
          bottom: 10%;
          left: 20%;
        }

        .sec02_item10_03 {
          top: 25%;
          left: 25%;
        }

        .sec02_item10_04 {
          bottom: 25%;
          right: 25%;
        }
      `}</style>
    </section>
  )
}