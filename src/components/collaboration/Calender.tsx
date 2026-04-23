import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Check, X } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  requester: string;
  status: 'pending' | 'accepted' | 'declined';
}

export const CalendarComponent: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Investment Discussion',
      date: '2026-04-25',
      time: '10:00 AM',
      requester: 'John Investor',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Pitch Session',
      date: '2026-04-26',
      time: '2:00 PM',
      requester: 'Sarah Entrepreneur',
      status: 'accepted',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    requester: '',
  });

  const handleAddMeeting = () => {
    if (formData.title && formData.date && formData.time) {
      const newMeeting: Meeting = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
      };
      setMeetings([...meetings, newMeeting]);
      setFormData({ title: '', date: '', time: '', requester: '' });
      setShowModal(false);
    }
  };

  const handleStatusChange = (id: string, status: 'accepted' | 'declined') => {
    setMeetings(
      meetings.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Meeting Calendar</h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="w-5 h-5" />
            Add Availability
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Add Meeting Slot</h2>
              
              <input
                type="text"
                placeholder="Meeting Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              
              <input
                type="text"
                placeholder="Requester Name"
                value={formData.requester}
                onChange={(e) => setFormData({ ...formData, requester: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              />
              
              <div className="flex gap-3">
                <button
                  onClick={handleAddMeeting}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Meetings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white rounded-lg shadow-md p-4 border-l-4 border-indigo-600"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-900">{meeting.title}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(meeting.status)}`}>
                  {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-2">
                📅 {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                👤 {meeting.requester || 'You'}
              </p>

              {meeting.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(meeting.id, 'accepted')}
                    className="flex-1 bg-green-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-green-600 transition"
                  >
                    <Check className="w-4 h-4" /> Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(meeting.id, 'declined')}
                    className="flex-1 bg-red-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" /> Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {meetings.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No meetings scheduled yet</p>
          </div>
        )}
      </div>
    </div>
  );
};