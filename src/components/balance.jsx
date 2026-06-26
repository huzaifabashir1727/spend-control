
function Balance({balance}) 
{
  return (
    <div className='flex flex-col items-center justify-center w-full h-16 md:h-42'>
      <h1 className='text-[16px] md:text-5xl text-white text-center whitespace-nowrap'>Remaining Balance</h1>
      <h2 className='text-[16px] md:text-5xl text-green-500 mt-0.5 md:mt-5 text-center'>Rs {balance}</h2>
    </div>
  )
}

export default Balance