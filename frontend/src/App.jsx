import { useSelector } from 'react-redux';
import { AnimatePresence } from 'motion/react';
import {
  TasksList,
  TaskDetailsModal,
  TaskHeader,
  SplashScreen,
  Overlay,
} from './components';
import RateLimiterUI from './components/UIComponents/RateLimiterUI';
import Loader from './components/UIComponents/Loader.jsx';

function App() {
  const { showTaskModel, isRateLimit, isLoading } = useSelector(
    (state) => state.task2
  );

  return (
    <SplashScreen>
      <>
        {isLoading && <Loader />}
        <div className='container'>
          <TaskHeader />
          {/* Tasks List */}
          {isRateLimit ? <RateLimiterUI /> : <TasksList />}
          {/* Model or task details */}
          <AnimatePresence mode='wait'>
            {showTaskModel ? (
              <>
                {/* task Details */}
                <TaskDetailsModal />
                <Overlay />
              </>
            ) : null}
          </AnimatePresence>
        </div>
      </>
    </SplashScreen>
  );
}

export default App;
