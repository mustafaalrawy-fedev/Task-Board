import { addIcon } from '../../data/images'

const AddTask = ({handleClick}) => {
  return (
    <button 
      onClick={() => handleClick(null)}
      type='button' 
      className='bg-addNewTask outline-2 outline-transparent hover:outline-highlightCol border-3 border-transparent hover:border-primaryColor enabled:focus:outline-highlightCol enabled:focus:border-primaryColor rounded-xl w-full flex items-center gap-5 p-4 cursor-pointer main-transition'
    >
        <div className='bg-AddBtnCol w-10 h-10 rounded-lg flex justify-center items-center'>
            <img src={addIcon} alt="Add Icon" />
        </div>
        {/* Icon Add task */}
        <p>Add new task</p>
    </button>
  )
}

export default AddTask