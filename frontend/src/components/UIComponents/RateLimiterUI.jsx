import { CloudCog } from 'lucide-react';

const RateLimiterUI = () => {
  return (
    <section>
      <div className='p-5 rounded-2xl bg-black/70 flex items-center gap-5'>
        <div className='flex justify-center items-center bg-taskWontDoBtnCol/80 p-2.5 rounded-2xl'>
          <CloudCog className='text-taskWontDoCol/80' size={64} />
        </div>
        <main className='flex flex-col gap-4'>
          <h1 className='text-2xl font-bold text-primaryColor'>
            Rate Limiting Reached
          </h1>
          <p className='text-md text-primaryColor/70'>
            You have reached the maximum number of requests per minute. Please
            try again after{' '}
            <span className='text-taskWontDoBtnCol tracking-wide font-bold'>
              40 second
            </span>
            .
          </p>
        </main>
      </div>
    </section>
  );
};

export default RateLimiterUI;
