import React, { useState } from 'react';
import { FileText, Upload, Pen, Check, Clock } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  uploadedAt: string;
  status: 'Draft' | 'In Review' | 'Signed';
  signer?: string;
}

export const DocumentChamber: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Investment Agreement.pdf',
      uploadedAt: '2026-04-24',
      status: 'Signed',
      signer: 'John Investor',
    },
    {
      id: '2',
      name: 'Terms & Conditions.pdf',
      uploadedAt: '2026-04-23',
      status: 'In Review',
    },
    {
      id: '3',
      name: 'Pitch Deck.pdf',
      uploadedAt: '2026-04-22',
      status: 'Draft',
    },
  ]);

  const [showSignModal, setShowSignModal] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [signature, setSignature] = useState('');

  const handleSign = () => {
    if (selectedDocId && signature) {
      setDocuments(
        documents.map((doc) =>
          doc.id === selectedDocId
            ? { ...doc, status: 'Signed', signer: 'You' }
            : doc
        )
      );
      setSignature('');
      setShowSignModal(false);
      setSelectedDocId(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: e.target.files[0].name,
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Draft',
      };
      setDocuments([...documents, newDoc]);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Signed':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'In Review':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Draft':
        return <Pen className="w-5 h-5 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed':
        return 'bg-green-100 text-green-800';
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Chamber</h1>
          <p className="text-gray-600">Upload, review, and sign documents for deals</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-dashed border-indigo-300">
          <div className="flex flex-col items-center gap-4">
            <Upload className="w-16 h-16 text-indigo-600" />
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900">Upload Documents</h3>
              <p className="text-gray-600 text-sm">PDF, DOC, or image files</p>
            </div>
            <label className="bg-indigo-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-indigo-700 transition">
              Choose File
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </label>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Document</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Uploaded</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Signer</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-gray-400" />
                      <span className="font-medium text-gray-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {doc.signer ? (
                      <span className="font-medium">{doc.signer}</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {doc.status !== 'Signed' && (
                      <button
                        onClick={() => {
                          setSelectedDocId(doc.id);
                          setShowSignModal(true);
                        }}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm font-medium"
                      >
                        Sign
                      </button>
                    )}
                    {doc.status === 'Signed' && (
                      <button className="bg-green-100 text-green-800 px-4 py-2 rounded text-sm font-medium cursor-default">
                        Signed ✓
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {documents.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No documents uploaded yet</p>
            </div>
          )}
        </div>

        {/* Signature Modal */}
        {showSignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sign Document</h2>
              
              <p className="text-gray-600 mb-4 text-sm">
                {documents.find((d) => d.id === selectedDocId)?.name}
              </p>

              <div className="border-2 border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 min-h-40">
                <p className="text-gray-400 text-sm mb-2">Digital Signature Pad</p>
                <input
                  type="text"
                  placeholder="Type your name (e-signature)"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xl font-script italic"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSign}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
                >
                  Sign
                </button>
                <button
                  onClick={() => {
                    setShowSignModal(false);
                    setSignature('');
                    setSelectedDocId(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentChamber;