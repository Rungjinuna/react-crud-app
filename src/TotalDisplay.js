function TotalDisplay({ calculateTotal, formatCurrency }) {
  return (
    <div className='text-right mt-3'>
      <p className='font-bold'>총 지출: {formatCurrency(calculateTotal())}</p>
    </div>
  );
}

export default TotalDisplay;
