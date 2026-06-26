import { useState } from "react";
import { useData } from "../context/DataContext";

function Input({setBalance,setHistory})
{
  let [amount,setAmount] = useState("");
  let [spendDetail,setSpendDetail] = useState("");
  const { addSpending, deductSpending } = useData();

  async function handleAdd()
  {
    if(amount && spendDetail)
    {
      await addSpending(amount, spendDetail);
      setAmount("");
      setSpendDetail("");
    }
  }
  async function handleDeduct()
  {
    if(amount && spendDetail)
    {
      await deductSpending(amount, spendDetail);
      setAmount("");
      setSpendDetail("");
    }
  }

  function handleInput(e)
  {
    setAmount(e.target.value);
  }

  function handleChange(e)
  {
    setSpendDetail(e.target.value);
  }

  return (
    <div className="flex flex-row">
        <div className="flex flex-col md:flex-row">
          <input type="number" placeholder="Enter Amount" onChange={handleInput} value={amount} className="border  rounded-2xl text-[22px] pl-2 text-white ml-2 w-50% md:w-40 h-13 mt-2" />
          <input type="text" placeholder="Detail" onChange={handleChange} value={spendDetail} className="border rounded-2xl text-[22px] pl-2 text-white ml-1 w-50% md:w-50 h-13 mt-2" />
        </div>
        <div className="flex flex-col md:flex-row md:mt-2">
          <button onClick={handleAdd} className="bg-green-500 hover:scale-105 text-white w-22 md:w-16 h-13 md:h-12 text-[25px] mt-2 md:mt-1 ml-2 rounded-2xl">Add</button>
          <button onClick={handleDeduct} className="bg-red-500 hover:scale-105 text-white w-22 md:w-24 h-13 md:h-12 text-[25px] mt-2 md:mt-1 ml-2 rounded-2xl">Deduct</button>
        </div>
    </div>
  )
}

export default Input