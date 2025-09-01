import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import {motion} from 'motion/react';

const SplashScreen = ({ children }) => {
    const [loadingScreen, setLoadingScreen] = useState(false);
    const duration = 3000;
    const durationINSecond = duration/1000

    useEffect (() => {
        const timeOut = setTimeout(() => {
            setLoadingScreen(true);
        }, duration)

        return () => clearTimeout(timeOut)
    }, []);

  return (
    !loadingScreen ? 
        <section className="w-[100dvw] h-[100dvh] flex justify-center flex-col items-center gap-10">
            <motion.h1 
                initial={{y:-100, scale: 0.75, opacity: 0}}
                animate={{y:0, scale: 1, opacity: 1}}
                transition={{duration: 0.7, delay: 0.2}}
                className="text-2xl tracking-[8px]">Tasks Board</motion.h1>
            {/* Progress bar */}
            <motion.div 
                initial={{opacity: 0, y:30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7}}
            >
                <ProgressBar duration={durationINSecond} progress={100}/>
            </motion.div>
        </section> 
    : children
  )
}

export default SplashScreen