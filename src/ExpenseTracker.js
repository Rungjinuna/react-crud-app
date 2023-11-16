import './App.css';
import React, { useState, useEffect } from 'react';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';
import TotalDisplay from './TotalDisplay';

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
    console.log('Editing ID:', id);
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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedExpenses = Array.from(expenses);
    const [reorderedItem] = updatedExpenses.splice(result.source.index, 1);
    updatedExpenses.splice(result.destination.index, 0, reorderedItem);

    setExpenses(updatedExpenses);
  };

  return (
    <div className='container mx-auto p-4'>
      <AddExpenseForm
        editExpense={editExpense}
        setEditExpense={setEditExpense}
        editAmount={editAmount}
        setEditAmount={setEditAmount}
        handleAdd={handleAdd}
      />

      <ExpenseList
        expenses={expenses}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        formatCurrency={formatCurrency}
        onDragEnd={onDragEnd}
        handleEditChange={handleEditChange}
        handleSave={handleSave}
      />

      <TotalDisplay
        calculateTotal={calculateTotal}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}

export default ExpenseTracker;
