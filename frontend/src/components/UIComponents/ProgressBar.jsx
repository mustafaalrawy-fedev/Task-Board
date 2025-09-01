import {motion} from 'motion/react';

const ProgressBar = ({progress, duration}) => {
  return (
    <motion.div className="w-36 h-1 bg-gray-200 rounded-full overflow-hidden">
      <motion.div 
        initial={{width: 0}} 
        animate={{width:`${progress}%`}}
        transition={{duration:duration, ease: 'easeInOut'}} 
        className={`h-full bg-AddBtnCol rounded-full`} 
      />
    </motion.div>
  )
}

export default ProgressBar