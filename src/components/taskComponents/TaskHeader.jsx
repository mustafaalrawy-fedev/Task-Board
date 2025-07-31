import { editIcon, logoIcon } from "../../data/images"
import { motion } from "motion/react"

const TaskHeader = () => {
  return (
    <header className='mb-6'>
    <main className='flex gap-4'>
      {/* Logo */}
      <motion.img 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.7, delay: 0.7}}
        src={logoIcon} alt="Logo Icon" />
      <motion.h2 
        initial={{opacity: 0, x: 20}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.7, delay: 0.3}}
        className='text-4xl font-normal text-black'>
        My Task Board
      </motion.h2>
      {/* Edit */}
      <motion.img
        initial={{ filter: "blur(20px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{duration: 0.7, delay: 0.8}}
        src={editIcon} alt="Edit Icon" />
    </main>
    <motion.p 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{duration: 0.7, delay: 1}}
        className='mt-5'
    >Tasks To Keep Organized</motion.p>
  </header>
  )
}

export default TaskHeader