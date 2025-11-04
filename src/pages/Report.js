import React, { useState } from 'react';
import { Flag, Upload, CheckCircle, AlertTriangle, Mail, Link as LinkIcon, FileText } from 'lucide-react';

function Report() {
  const [reportType, setReportType] = useState('');
  const [formData, setFormData] = useState({
    url: '',
    email: '',
    description: '',
    screenshot: null,
    anonymous: false,
    contactInfo: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportTypes = [
    {
      id: 'phishing-url',
      title: 'Phishing URL',
      description: 'Report a suspicious website or link',
      icon: LinkIcon
    },
    {
      id: 'phishing-email',
      title: 'Phishing Email',
      description: 'Report a suspicious email message',
      icon: Mail
    },
    {
      id: 'suspicious-content',
      title: 'Suspicious Content',
      description: 'Report other suspicious online content',
      icon: FileText
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reportType) {
      alert('Please select a report type');
      return;
    }

    if (!formData.description.trim()) {
      alert('Please provide a description');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const resetForm = () => {
    setReportType('');
    setFormData({
      url: '',
      email: '',
      description: '',
      screenshot: null,
      anonymous: false,
      contactInfo: ''
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-poppins">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for helping keep the internet safe. Your report has been submitted and will be reviewed by our security team.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Report ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <button
                onClick={resetForm}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Submit Another Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <Flag className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">Report a Scam</h1>
            <p className="text-gray-600 mt-2">Help us protect others by reporting suspicious activities</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Type Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What would you like to report?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                  reportType === type.id
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <type.icon className={`h-8 w-8 mb-3 ${
                  reportType === type.id ? 'text-red-600' : 'text-gray-600'
                }`} />
                <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Report Form */}
        {reportType && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Report Details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* URL Field (for phishing URL reports) */}
              {(reportType === 'phishing-url' || reportType === 'suspicious-content') && (
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                    Suspicious URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://suspicious-site.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the full URL of the suspicious website or link
                  </p>
                </div>
              )}

              {/* Email Field (for phishing email reports) */}
              {reportType === 'phishing-email' && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Sender Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="suspicious@sender.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Please provide as much detail as possible about the suspicious content, including what made you suspicious, when you encountered it, and any other relevant information..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Screenshot Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Screenshot (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Upload a screenshot of the suspicious content</p>
                  <input
                    type="file"
                    name="screenshot"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label
                    htmlFor="screenshot-upload"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                  >
                    Choose File
                  </label>
                  {formData.screenshot && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {formData.screenshot.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information (Optional)
                </label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  placeholder="Email or phone number for follow-up"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  We'll only contact you if we need additional information
                </p>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                  Submit anonymously (we won't store any identifying information)
                </label>
              </div>

              {/* reCAPTCHA Placeholder */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">reCAPTCHA</p>
                    <p className="text-xs text-gray-600">ClickWise protects your privacy</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> apply.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <Flag className="h-5 w-5 mr-2" />
                    Submit Report
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Important Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notice</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Reports are reviewed by our security team within 24 hours</li>
                <li>• False reports may result in account restrictions</li>
                <li>• For immediate threats, contact local authorities</li>
                <li>• Your privacy is protected - we never share personal information</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Reports Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">247</div>
              <div className="text-sm text-gray-600">Reports This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">89%</div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24hrs</div>
              <div className="text-sm text-gray-600">Average Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
