import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ExpenseList({
  expenses,
  handleEditClick,
  handleDelete,
  formatCurrency,
  onDragEnd,
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='expensesListDnd'>
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='list-disc pl-5'
          >
            {expenses.map((exp, index) => (
              <Draggable
                key={exp.id}
                draggableId={String(exp.id)}
                index={index}
              >
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    key={exp.id}
                    className='mb-1 flex justify-between items-center border-b border-gray-200 py-2'
                  >
                    <div className='flex-1'>
                      <div className='flex justify-between'>
                        <span className='flex-1 pr-2 border-r border-gray-200'>
                          {exp.item}
                        </span>
                        <span className='flex-1 pl-2'>
                          {formatCurrency(exp.amount)}
                        </span>
                      </div>
                    </div>
                    <div className='flex'>
                      <button
                        onClick={() => handleEditClick(exp.id)}
                        className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mx-1'
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
                      >
                        삭제
                      </button>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default ExpenseList;
