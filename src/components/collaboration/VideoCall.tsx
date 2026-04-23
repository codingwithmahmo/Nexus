import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, Phone, PhoneOff } from 'lucide-react';

export const VideoCallComponent: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  const startCall = () => {
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setVideoEnabled(true);
    setAudioEnabled(true);
    setScreenSharing(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Video Conference</h1>

        {!isCallActive ? (
          // Pre-Call UI
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Video className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start a Video Call</h2>
            <p className="text-gray-600 mb-8">Connect with investors or entrepreneurs instantly</p>
            
            <button
              onClick={startCall}
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition"
            >
              <Phone className="inline-block mr-2 w-5 h-5" />
              Start Call
            </button>
          </div>
        ) : (
          // In-Call UI
          <div className="space-y-6">
            {/* Video Windows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Local Video */}
              <div className="relative bg-black rounded-lg overflow-hidden h-96">
                {videoEnabled ? (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-20 h-20 text-white mx-auto mb-4" />
                      <p className="text-white font-semibold">You (Local)</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <div className="text-center">
                      <VideoOff className="w-20 h-20 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 font-semibold">Camera Off</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  Local Feed
                </div>
              </div>

              {/* Remote Video */}
              <div className="relative bg-black rounded-lg overflow-hidden h-96">
                {videoEnabled ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-20 h-20 text-white mx-auto mb-4" />
                      <p className="text-white font-semibold">Remote Participant</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <div className="text-center">
                      <VideoOff className="w-20 h-20 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 font-semibold">Camera Off</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  Remote Feed
                </div>
              </div>
            </div>

            {/* Screen Share Preview (if active) */}
            {screenSharing && (
              <div className="bg-black rounded-lg overflow-hidden h-64 flex items-center justify-center border-2 border-yellow-500">
                <div className="text-center">
                  <Monitor className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                  <p className="text-yellow-500 font-semibold">Screen Sharing Active</p>
                </div>
              </div>
            )}

            {/* Call Duration & Info */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">Call Duration</p>
                  <p className="text-2xl font-bold text-gray-900">02:34</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">Participants: 2</p>
                  <p className="text-lg font-semibold text-gray-900">Connected</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-wrap gap-4 justify-center">
                {/* Video Toggle */}
                <button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                    videoEnabled
                      ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {videoEnabled ? (
                    <>
                      <Video className="w-5 h-5" /> Video On
                    </>
                  ) : (
                    <>
                      <VideoOff className="w-5 h-5" /> Video Off
                    </>
                  )}
                </button>

                {/* Audio Toggle */}
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                    audioEnabled
                      ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {audioEnabled ? (
                    <>
                      <Mic className="w-5 h-5" /> Mic On
                    </>
                  ) : (
                    <>
                      <MicOff className="w-5 h-5" /> Mic Off
                    </>
                  )}
                </button>

                {/* Screen Share Toggle */}
                <button
                  onClick={() => setScreenSharing(!screenSharing)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                    screenSharing
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  <Monitor className="w-5 h-5" /> Share Screen
                </button>

                {/* End Call Button */}
                <button
                  onClick={endCall}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <PhoneOff className="w-5 h-5" /> End Call
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};