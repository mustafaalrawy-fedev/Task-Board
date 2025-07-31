import { useDispatch } from "react-redux";
import { handleHideTaskDetails } from "../../store/slices/taskSlice";
import { AnimatePresence, motion } from "motion/react";

const Overlay = () => {
  const dispatch = useDispatch();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.3}}
        onContextMenu={() => dispatch(handleHideTaskDetails())}
        onClick={() => dispatch(handleHideTaskDetails())}
        className='w-full h-full fixed top-0 left-0 bg-black/20'
      />
    </AnimatePresence>
  )
}

export default Overlay