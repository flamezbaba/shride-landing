// import Lottie from 'lottie-react';
import dynamic from 'next/dynamic';

// import * as ldata from '@/public/img/1.json';
// import vd from "@/public/img/01.mp4";
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function HomeLottie() {
  return (
  //   <Lottie animationData={ldata}
  //   height={400}
  //   width={400} loop={true}
  // />
  <video width="100%" height="auto" autoPlay loop muted>
      <source src="/img/01.mp4" type="video/mp4" />
      
    </video>
  );
}
