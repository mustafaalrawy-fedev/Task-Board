import { useSelector } from 'react-redux'
import './App.css'
import SplashScreen from './components/UIComponents/SplashScreen'
import TaskDetailsModal from './components/taskComponents/TaskDetailsModal'
import Overlay from './components/UIComponents/Overlay'
import { AnimatePresence } from 'motion/react'
import TasksList from './components/taskComponents/TasksList'
import TaskHeader from './components/taskComponents/TaskHeader'
import Toast from './components/UIComponents/Toast'

function App() {
  const {show} = useSelector(state => state.task);
  const {toastInfo} = useSelector(state => state.toast);

  return (
    <SplashScreen>
      <>
        <div className='container'>
          <TaskHeader />
          {/* Tasks List */}
          <TasksList />
          {/* Model or task details */}
          <AnimatePresence mode='wait'>
            {show? 
            <>
            {/* task Details */}
              <TaskDetailsModal />
              <Overlay />
            </>
            : null}
          </AnimatePresence>
        </div>
      </>
    <Toast 
      colorInfo={toastInfo.colorInfo} 
      message={toastInfo.message} 
      position={toastInfo.position}
    />
    </SplashScreen>
  )
}

export default App