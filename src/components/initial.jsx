function Initial({initial,setInitialValueStatus})
{
  function handleClick()
  {
    setInitialValueStatus(true);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full cursor-pointer h-16 md:h-42" onClick={handleClick}>
      <h1 className='text-[16px] md:text-5xl text-white text-center'>Initial Balance</h1>
      <h2 className='text-[16px] md:text-5xl text-green-500 mt-0.5 md:mt-5 text-center'>Rs {initial}</h2>
    </div>
  )
}

export default Initial