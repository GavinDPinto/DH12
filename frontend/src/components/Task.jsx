import { useState } from 'react';
export default function Task({ id, title, pointValue, description, schedule, status, completedToday, onComplete }) {
    const [active, setActive] = useState(false)
    const handleComplete = () => {
        if (onComplete) {
            onComplete(id);
        }
    };


    return (
        <div
      onClick={() => setActive(!active)}
      className={`flex flex-row gap-10 bg-gray-800 hover p-4 rounded-lg border border-gray-700 ${active ? 'w-full h-80 cursor-pointer' : 'w-full h-30 cursor-pointer'} transition-all duration-300`}
    >       
            <div className='flex flex-col'>
            <h2 className="p-5 text-2xl font-semibold text-white">{title}</h2>
            {active && (
                <div className="flex flex-col text-gray-300 text-left ml-10 mt-6  gap-1 text-2xl w-full">
                    <p><strong>Points:</strong> {pointValue}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Schedule:</strong> {schedule}</p>
                    <p><strong>Status:</strong> {status}</p>
                </div>
            )}
            </div>

            {active &&completedToday && <p className="text-green-500 mt-30">✓ Completed Today</p>}
            {active && !completedToday && (
                <button
                    onClick={handleComplete}
                    className="w-24 h-10 mt-30 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Complete
                </button>
            )}
            
            
        </div>
    );
}