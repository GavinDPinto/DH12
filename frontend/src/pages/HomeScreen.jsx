import { useState, useEffect } from 'react';
import ActiveTasks from "../components/ActiveTasks.jsx";
import TokenDisplay from "../components/TokenDisplay.jsx";
import Chat from '../pages/Chat.jsx';
import ChatPanel from '../pages/ChatPanel.jsx';

export default function HomeScreen() {
  const [tokens, setTokens] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: 10,
    type: 'daily',
    target_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch tokens on mount
  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const response = await fetch('/api/score');
      const data = await response.json();
      setTokens(data.total_points);
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        title: formData.title,
        description: formData.description || undefined,
        points: formData.points,
        type: formData.type,
        target_date: formData.target_date || undefined,
      };

      const response = await fetch('/api/resolutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('✓ Task created successfully!');
        setFormData({
          title: '',
          description: '',
          points: 10,
          type: 'daily',
          target_date: '',
        });
        setShowForm(false);
        window.location.reload();
      } else {
        setMessage('✗ Failed to create task');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('✗ Error creating task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full overflow-y-auto'>
    <div className="items-center flex flex-row  gap-10 w-full">
        <TokenDisplay tokens={tokens}/>
        <div className="flex flex-col gap-10 w-1/2 h-1/2">
            <ActiveTasks onTaskComplete={fetchTokens}/>
        </div>
      </div>
      <ChatPanel />
    </div>
    );
}