function History({history})
{
  // let storedHistory = JSON.parse(localStorage.getItem("spendDetail")) || [];

  return (
    <div className="flex flex-col items-center px-2 h-83 md:h-75">
      <h1 className="text-center text-3xl mt-3 text-white">History</h1>
      <div className="bg-gray-950 rounded-2xl mt-3 w-full h-65 md:w-135 md:h-55 overflow-hidden">
        <div className="h-full  overflow-y-auto custom-scroll">
          {history.length > 0 ? (
            history.map(spend => (
              spend.status === "Add" ?
                ( 
                  <div className="flex justify-between mt-0.5">
                      <div className="text-green-500 text-3xl pl-3">{spend.amount}</div>
                      <div className="text-green-500 text-3xl pr-3">{spend.detail}</div>
                    </div>
                  )
                  :
                  (
                    <div className="flex justify-between mt-0.5">
                      <div className="text-red-500 text-2xl md:text-3xl pl-3">{spend.amount}</div>
                      <div className="text-red-500 text-2xl md:text-3xl pr-3">{spend.detail}</div>
                    </div>
                  )
              ))
            ) : (
            <h1 className="text-gray-400 text-2xl md:text-3xl text-center mt-2">No history yet</h1>
          )}
        </div>
      </div>
    </div>
  )
}
export default History