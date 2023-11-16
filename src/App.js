import React, { useState } from 'react';
import ExpenseTracker from './ExpenseTracker';
import './App.css';

function App() {
  const [showAlert, setShowAlert] = useState(false);

  const handleAddExpense = (newExpense) => {
    // ExpenseTracker에서 항목 추가 로직 실행

    // 알림 표시
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <div className='container mx-auto my-6 p-4 border rounded-md  bg-slate-100'>
      {showAlert && (
        <div
          className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4'
          role='alert'
        >
          <p className='font-bold'>성공</p>
          <p>항목이 추가되었습니다!</p>
        </div>
      )}
      <h1 className='text-2xl font-bold text-left mb-6'>예산 계산기</h1>
      <ExpenseTracker onAddExpense={handleAddExpense} />
    </div>
  );
}

export default App;
