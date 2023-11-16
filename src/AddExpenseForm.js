function AddExpenseForm({
  editExpense,
  setEditExpense,
  editAmount,
  setEditAmount,
  handleAdd,
}) {
  return (
    <div className='flex gap-2 mb-4'>
      <input
        type='text'
        value={editExpense}
        onChange={(e) => setEditExpense(e.target.value)}
        placeholder='지출 항목'
        className='border p-2 rounded w-1/2'
      />
      <input
        type='number'
        value={editAmount}
        onChange={(e) => setEditAmount(e.target.value)}
        placeholder='비용'
        className='border p-2 rounded w-1/2'
      />
      <button
        onClick={handleAdd}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        추가
      </button>
    </div>
  );
}
export default AddExpenseForm;
