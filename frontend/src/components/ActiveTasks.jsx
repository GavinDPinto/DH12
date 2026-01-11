import { useState, useEffect } from 'react';
import Task from './Task';
import { api } from '../utils/api.js';

export default function ActiveTasks({ onTaskComplete, refreshTrigger }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const fetchTasks = async () => {
    try {
      const data = await api.getResolutions();
      setTasks(data);
      setShowAll(false); // Reset to collapsed view when tasks refresh
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskComplete = async (taskId) => {
    try {
      await api.completeResolution(taskId);
      fetchTasks(); // Refresh tasks
      if (onTaskComplete) onTaskComplete(); // Refetch tokens in parent
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await api.deleteResolution(taskId);
      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Sort tasks: incomplete first, completed at bottom
  const sortedTasks = [...tasks].sort((a, b) => {
    const aCompleted = a.completed_today ? 1 : 0;
    const bCompleted = b.completed_today ? 1 : 0;
    return aCompleted - bCompleted;
  });

  const displayedTasks = showAll ? sortedTasks : sortedTasks.slice(0, 5);
  const hasMore = sortedTasks.length > 5;

  return (
    <div>
      <h1 className="font-bold text-left text-6xl text-white">Active Tasks</h1>
      {loading ? (
        <p className="text-left text-xl text-gray-300 mt-4">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-left text-xl text-gray-300 mt-4">One day or DAY ONE 😈😈😈😈</p>
      ) : (
        <div className="mt-6 space-y-4">
          {displayedTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              pointValue={task.points}
              description={task.description}
              schedule={task.type}
              status={task.status}
              completedToday={task.completed_today}
              onComplete={handleTaskComplete}
              onDelete={handleTaskDelete}
            />
          ))}
          {hasMore && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-4 w-full cursor-pointer text-blue-400 hover:text-blue-300 font-semibold py-2 rounded-lg transition"
            >
              Show All ({tasks.length} tasks)
            </button>
          )}
          {showAll && (
            <button
              onClick={() => setShowAll(false)}
              className="mt-4 w-full text-blue-400 cursor-pointer hover:text-blue-300 font-semibold py-2 rounded-lg transition"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
}