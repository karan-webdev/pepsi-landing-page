import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './hero.css';

function Hero() {
  const promptRef = useRef(null);
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const sloganRef = useRef(null);

  useEffect(() => {
     gsap.fromTo(
      sloganRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        delay: 0.8,
        duration: 1.5,
        ease: 'power3.out',
      }
    );
     gsap.fromTo(
    promptRef.current,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2,
      ease: 'power1.inOut',
      onComplete: () => {
        
        gsap.to(promptRef.current, {
          opacity: 0.2,
          duration: 0.3,
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.3,
        });
      },
    }
  );

  gsap.fromTo(
    cloud1Ref.current,
    { x: -200, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 2,
      delay: 0.5,
      ease: 'power3.out',
      onComplete: () => {
    
        gsap.to(cloud1Ref.current, {
          x: 20,
          y: 10,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      },
    }
  );

  
  gsap.fromTo(
    cloud2Ref.current,
    { x: 200, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 2,
      delay: 0.7,
      ease: 'power3.out',
      onComplete: () => {

        gsap.to(cloud2Ref.current, {
          x: -20,
          y: -10,
          duration: 5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      },
    }
  );
  }, []);



  return (
    <section>
            <div ref={sloganRef} class="hero-slogan">Clouds bring the water, Pepsi brings the chill.</div>
            <h1>PEPSI</h1>
            <div  ref={promptRef} className='hero-prompt'>
                Scroll to discover
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>
            <img  ref={cloud1Ref} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1177d997-54a5-47ed-8309-eb5d0285890a/ddwgbm7-50135889-e768-44ed-a473-9d97bf2cda03.png/v1/fill/w_1280,h_507,strp/fog_png_transparent_8_by_agusrockforlife_ddwgbm7-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTA3IiwicGF0aCI6IlwvZlwvMTE3N2Q5OTctNTRhNS00N2VkLTgzMDktZWI1ZDAyODU4OTBhXC9kZHdnYm03LTUwMTM1ODg5LWU3NjgtNDRlZC1hNDczLTlkOTdiZjJjZGEwMy5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.K8ZFZWbjseZDxawYby5kpYRdKQSxEOXKROJ05eAtI-Q" alt="cloud" />
            <img  ref={cloud2Ref} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1177d997-54a5-47ed-8309-eb5d0285890a/ddwgbm7-50135889-e768-44ed-a473-9d97bf2cda03.png/v1/fill/w_1280,h_507,strp/fog_png_transparent_8_by_agusrockforlife_ddwgbm7-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTA3IiwicGF0aCI6IlwvZlwvMTE3N2Q5OTctNTRhNS00N2VkLTgzMDktZWI1ZDAyODU4OTBhXC9kZHdnYm03LTUwMTM1ODg5LWU3NjgtNDRlZC1hNDczLTlkOTdiZjJjZGEwMy5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.K8ZFZWbjseZDxawYby5kpYRdKQSxEOXKROJ05eAtI-Q" alt="cloud" />
    </section>
  );
}

export default Hero;
