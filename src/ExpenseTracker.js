import './App.css';

import React, { useState, useEffect } from 'react';

function ExpenseTracker({ onAddExpense }) {
  const [expenses, setExpenses] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editExpense, setEditExpense] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    try {
      const loadedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
      setExpenses(loadedExpenses);
    } catch (error) {
      console.error('Failed to load expenses from local storage:', error);
      setExpenses([]);
    }
  }, []);

  // 지출 목록이 변경될 때 로컬 스토리지 업데이트
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleEditChange = (id, key, value) => {
    const updatedExpenses = expenses.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [key]: value };
      }
      return exp;
    });
    setExpenses(updatedExpenses);
  };

  const handleEditClick = (id) => {
    setIsEditing(id);
  };

  const handleSave = (id) => {
    setIsEditing(null);
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const handleAdd = () => {
    const newExpense = {
      id: expenses.length + 1,
      item: editExpense,
      amount: parseFloat(editAmount),
    };
    setExpenses([...expenses, newExpense]);
    setEditExpense('');
    setEditAmount('');
    setShowAlert(true);
    onAddExpense(newExpense);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const calculateTotal = () => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  return (
    <div className='container mx-auto p-4'>
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

      <ul className='list-disc pl-5'>
        {expenses.map((exp) => (
          <li
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
        ))}
      </ul>

      <div className='text-right mt-3'>
        <p className='font-bold'>총 지출: {formatCurrency(calculateTotal())}</p>
      </div>
    </div>
  );
}

export default ExpenseTracker;
