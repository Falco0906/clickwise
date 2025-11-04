import React, { useState } from 'react';
import emailClassifier from '../ml/emailClassifier';

const EmailScanner = () => {
  const [emailText, setEmailText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async () => {
    if (!emailText.trim()) return;
    
    setIsLoading(true);
    try {
      const prediction = await emailClassifier.predict(emailText);
      setResult(prediction);
    } catch (error) {
      console.error('Error scanning email:', error);
      setResult({ error: 'Failed to scan email' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Email Scam Detector</h2>
      
      <div className="mb-6">
        <label htmlFor="emailText" className="block text-sm font-medium text-gray-700 mb-2">
          Paste the email content to analyze:
        </label>
        <textarea
          id="emailText"
          className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Paste email content here..."
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
        />
      </div>

      <button
        onClick={handleScan}
        disabled={isLoading || !emailText.trim()}
        className={`px-6 py-3 rounded-md text-white font-medium ${
          isLoading || !emailText.trim()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Analyzing...' : 'Scan Email'}
      </button>

      {result && (
        <div className={`mt-6 p-4 rounded-md ${
          result.error
            ? 'bg-red-100 border-l-4 border-red-500 text-red-700'
            : result.isScam
            ? 'bg-red-100 border-l-4 border-red-500 text-red-700'
            : 'bg-green-100 border-l-4 border-green-500 text-green-700'
        }`}>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <h3 className="font-bold text-lg mb-2">
                {result.isScam ? '⚠️ Potential Scam Detected' : '✅ Email Appears Safe'}
              </h3>
              <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
              <p className="mt-2">{result.explanation}</p>
              {result.isScam && (
                <div className="mt-3 p-3 bg-white bg-opacity-50 rounded">
                  <h4 className="font-semibold mb-1">⚠️ Warning Signs:</h4>
                  <ul className="list-disc pl-5">
                    <li>Urgent or threatening language</li>
                    <li>Requests for personal information</li>
                    <li>Suspicious links or attachments</li>
                    <li>Unusual sender address</li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="mt-8 bg-gray-50 p-4 rounded-md">
        <h3 className="font-bold text-gray-800 mb-2">How to use:</h3>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Copy and paste the suspicious email content into the text area above</li>
          <li>Click "Scan Email" to analyze the content</li>
          <li>Review the results and warnings</li>
          <li>When in doubt, contact the sender through a verified method</li>
        </ol>
      </div>
    </div>
  );
};

export default EmailScanner;
