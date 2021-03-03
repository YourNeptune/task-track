
const AddTask = () => {
    return (
        <form className='add-form'>
            <div className='form-container'>
                <label>Task</label>
                <input type='text' placeholder='Add Task'></input>
            </div>
            <div className='form-container'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time'></input>
            </div>
            <div className='reminder-container'>
                <label>Set Reminder</label>
                <input type='checkbox'></input>
            </div>

            <input type='submit' value='Save Task' className='btn save-task-btn'></input>
        </form>
    )
}

export default AddTask
