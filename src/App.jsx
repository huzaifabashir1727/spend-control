import './index.css'
import { useState } from 'react'
import { useData } from './context/DataContext';
import Input from './components/input'
import History from './components/history'
import Balace from './components/balance'
import Initial from './components/initial'
import InitialValue from './components/initalValue'

function App()
{
  const { initialValue, balance, history, loading, clearAllData } = useData();
  const [initialValueStatus, setInitialValueStatus] = useState(false);

  const handleReset = async () => {
    await clearAllData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl">Loading your data...</div>
      </div>
    );
  }

  return (
    <div className='bg-gray-900 h-screen'>
      <button onClick={handleReset}
      className='cursor-pointer text-white text-xl md:text-2xl border rounded-2xl p-1 md:p-2 mt-4 md:mt-6 ml-70 md:ml-312 hover:bg-red-500 hover:border-red-500 '>Reset</button>

      {initialValueStatus && <InitialValue setInitialValueStatus={setInitialValueStatus} />}
      <h1 className='text-center text-white text-5xl font-bold md:text-8xl pt-2 md:pt-1'><span className='text-red-600'>Spend</span> <span className='text-green-600'>History</span></h1>
      <div className='flex flex-col items-center lg:flex-row md:justify-center md-10 md:mt-21'>
        <div className='flex flex-row md:hidden px-4 gap-2 mb-4'>
          <div className='bg-white rounded-3xl p-px mt-6 flex-1'>
            <div className='flex flex-col w-43 bg-gray-900 rounded-3xl'>
              <Initial initial={initialValue} setInitialValueStatus={setInitialValueStatus} initialValueStatus={initialValueStatus} />
            </div>
          </div>
          <div className='bg-white rounded-3xl p-px mt-6 flex-1'>
            <div className='flex flex-col w-43 bg-gray-900 rounded-3xl'>
              <Balace balance={balance} />
            </div>
          </div>
        </div>

        <div className='flex flex-col w-93 md:w-140 h-113 md:h-90 border border-white rounded-3xl'>
          <Input />
          <History history={history} />
        </div>
        <div className='hidden md:block'>
          <div className='bg-white rounded-2xl p-px ml-7'>
            <div className='flex w-120 h-42 rounded-2xl bg-gray-900 items-center justify-center'>
              <Initial initial={initialValue} setInitialValueStatus={setInitialValueStatus} initialValueStatus={initialValueStatus} />
            </div>
          </div>
          <div className='bg-white rounded-3xl h-42.5 p-px ml-7 mt-6'>
            <div className='flex flex-col w-120 h-42 bg-gray-900 rounded-3xl'>
              <Balace balance={balance} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App