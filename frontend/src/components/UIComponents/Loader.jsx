import { LoaderCircleIcon } from 'lucide-react';

const Loader = () => {
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen w-screen'>
      <LoaderCircleIcon size={64} className='animate-spin text-AddBtnCol' />
    </div>
  );
};

export default Loader;
