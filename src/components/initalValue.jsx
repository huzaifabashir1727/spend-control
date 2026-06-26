import { useState } from "react";
import { useData } from "../context/DataContext";

function InitialValue({setInitialValueStatus})
{
    const { setInitialValue } = useData();
    let [input,setInput] = useState("");

    function handleChange(e)
    {
        setInput(Number(e.target.value));
    }

    async function handleClick(e)
    {
        e.preventDefault();
        if (input) {
            await setInitialValue(input);
            setInitialValueStatus(false);
            setInput("");
        }
    }

    return (
        <div>
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"></div>
            <div className="fixed rounded-2xl bg-gray-800 opacity-96 w-72 h-auto md:w-120 md:h-110 flex flex-col border border-white z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button onClick={() => setInitialValueStatus(false)}
                className="group flex relative z-10 [transition:all_0.5s_ease] rounded-md p-[5px] cursor-pointer border-none ml-auto mt-2.5 mr-2 outline-none focus-visible:outline-0">
                    <svg
                        fill="currentColor"
                        stroke="none"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 md:w-7 md:h-7 overflow-visible text-white [transition:transform_.35s_ease] group-hover:delay-[.25s] [&_path]:[transition:transform_.35s_ease] group-hover:rotate-45">
                        <path className="group-hover:transform-[rotate(112.5deg)_translate(-27.2%,-80.2%)]" d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z"></path>
                        <path className="group-hover:transform-[rotate(22.5deg)_translate(15.5%,-23%)]" d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z"></path>
                        <path className="group-hover:transform-[rotate(112.5deg)_translate(-15%,-149.5%)]" d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"></path>
                    </svg>
                </button>

                <div className="flex flex-col justify-center items-center mt-6 md:mt-20 px-5 pb-8">
                    <h1 className="text-3xl md:text-6xl text-white text-center">Set Initial Value</h1>
                    <div className="mt-5 md:mt-10 flex flex-col md:flex-row gap-2 md:gap-0 w-full md:w-auto">
                        <input type="number" value={input} placeholder="Enter initial value" onChange={handleChange} className="border text-white border-white rounded w-full md:w-80 h-10 focus:outline px-2 text-lg md:text-2xl" />
                        <button className="border text-white rounded md:ml-2 w-full md:w-18 h-10 text-base md:text-[20px] cursor-pointer" onClick={handleClick}>Set</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InitialValue