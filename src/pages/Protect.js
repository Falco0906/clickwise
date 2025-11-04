import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle, Search, Mail, Lock, Eye, Zap } from 'lucide-react';

function Protect() {
  const [linkInput, setLinkInput] = useState('');
  const [emailHeaderInput, setEmailHeaderInput] = useState('');
  const [linkResult, setLinkResult] = useState(null);
  const [emailResult, setEmailResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeLink = () => {
    if (!linkInput.trim()) return;

    setIsAnalyzing(true);

    // Simulate analysis delay
    setTimeout(() => {
      const url = linkInput.toLowerCase();
      let riskLevel = 'safe';
      let issues = [];

      // Check for HTTPS
      if (!url.startsWith('https://')) {
        issues.push('Missing HTTPS encryption');
        riskLevel = 'suspicious';
      }

      // Check for suspicious domains
      const suspiciousDomains = ['paypa1.com', 'goog1e.com', 'amaz0n.com', 'bankofamerica-login.com'];
      const domain = url.replace('https://', '').replace('http://', '').split('/')[0];
      if (suspiciousDomains.some(suspicious => domain.includes(suspicious))) {
        issues.push('Suspicious domain (typosquatting)');
        riskLevel = 'unsafe';
      }

      // Check for suspicious endings
      const suspiciousEndings = ['.tk', '.ml', '.ga', '.cf', '.gq'];
      if (suspiciousEndings.some(ending => domain.endsWith(ending))) {
        issues.push('Suspicious top-level domain');
        riskLevel = 'unsafe';
      }

      // Check for too many redirects (simulated)
      if (url.includes('redirect') || url.split('/').length > 4) {
        issues.push('Multiple redirects detected');
        riskLevel = riskLevel === 'safe' ? 'suspicious' : riskLevel;
      }

      // Check for URL shorteners
      const shorteners = ['bit.ly', 'tinyurl.com', 'goo.gl', 't.co'];
      if (shorteners.some(shortener => url.includes(shortener))) {
        issues.push('URL shortener detected - cannot verify destination');
        riskLevel = 'suspicious';
      }

      setLinkResult({
        url: linkInput,
        riskLevel,
        issues: issues.length > 0 ? issues : ['No obvious security issues detected'],
        recommendations: getRecommendations(riskLevel)
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const analyzeEmailHeader = () => {
    if (!emailHeaderInput.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const header = emailHeaderInput;
      let analysis = {
        from: 'Not found',
        replyTo: 'Not found',
        spf: 'Not checked',
        dkim: 'Not checked',
        riskLevel: 'unknown',
        issues: [],
        recommendations: []
      };

      // Extract From header
      const fromMatch = header.match(/From:\s*(.+)/i);
      if (fromMatch) {
        analysis.from = fromMatch[1].trim();
      }

      // Extract Reply-To header
      const replyMatch = header.match(/Reply-To:\s*(.+)/i);
      if (replyMatch) {
        analysis.replyTo = replyMatch[1].trim();
      }

      // Check SPF
      if (header.includes('spf=pass')) {
        analysis.spf = 'Pass';
      } else if (header.includes('spf=fail')) {
        analysis.spf = 'Fail';
        analysis.issues.push('SPF check failed');
        analysis.riskLevel = 'suspicious';
      }

      // Check DKIM
      if (header.includes('dkim=pass')) {
        analysis.dkim = 'Pass';
      } else if (header.includes('dkim=fail')) {
        analysis.dkim = 'Fail';
        analysis.issues.push('DKIM check failed');
        analysis.riskLevel = 'suspicious';
      }

      // Check for domain mismatch
      if (analysis.from !== 'Not found' && analysis.replyTo !== 'Not found') {
        const fromDomain = analysis.from.split('@')[1];
        const replyDomain = analysis.replyTo.split('@')[1];
        if (fromDomain && replyDomain && fromDomain !== replyDomain) {
          analysis.issues.push('From and Reply-To domains do not match');
          analysis.riskLevel = 'suspicious';
        }
      }

      if (analysis.issues.length === 0 && analysis.riskLevel === 'unknown') {
        analysis.riskLevel = 'safe';
        analysis.issues.push('No obvious issues detected');
      }

      analysis.recommendations = getEmailRecommendations(analysis.riskLevel);

      setEmailResult(analysis);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getRecommendations = (riskLevel) => {
    switch (riskLevel) {
      case 'safe':
        return ['Continue with caution', 'Verify the destination manually if unsure'];
      case 'suspicious':
        return ['Do not click this link', 'Contact the organization directly', 'Report suspicious activity'];
      case 'unsafe':
        return ['Do not click this link', 'Report as phishing', 'Check your security settings'];
      default:
        return ['Exercise caution', 'Verify through official channels'];
    }
  };

  const getEmailRecommendations = (riskLevel) => {
    switch (riskLevel) {
      case 'safe':
        return ['Email appears legitimate', 'Proceed with normal caution'];
      case 'suspicious':
        return ['Verify sender identity', 'Do not click any links', 'Contact sender through official channels'];
      default:
        return ['Unable to verify email authenticity', 'Exercise extra caution'];
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'suspicious': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'unsafe': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'safe': return <CheckCircle className="h-5 w-5" />;
      case 'suspicious': return <AlertTriangle className="h-5 w-5" />;
      case 'unsafe': return <XCircle className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const safetyTips = [
    {
      icon: Lock,
      title: 'Check the Padlock',
      description: 'Always look for the padlock icon and "https://" in the address bar before entering sensitive information.'
    },
    {
      icon: Eye,
      title: 'Hover Before Clicking',
      description: 'Hover over links to see the actual URL destination before clicking. Be wary of shortened URLs.'
    },
    {
      icon: Shield,
      title: 'Use Security Software',
      description: 'Keep your antivirus software updated and run regular security scans on your devices.'
    },
    {
      icon: Zap,
      title: 'Enable Two-Factor Authentication',
      description: 'Add an extra layer of security to your accounts with 2FA, making it harder for attackers to gain access.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">Protect & Check</h1>
            <p className="text-gray-600 mt-2">Powerful tools to verify links and analyze email security</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Safe Link Checker */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Search className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Safe Link Checker</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="link-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter URL to check
                </label>
                <input
                  type="url"
                  id="link-input"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={analyzeLink}
                disabled={!linkInput.trim() || isAnalyzing}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {isAnalyzing ? 'Analyzing...' : 'Check Link Safety'}
              </button>
            </div>

            {linkResult && (
              <div className={`mt-6 p-4 rounded-lg border ${getRiskColor(linkResult.riskLevel)}`}>
                <div className="flex items-center mb-3">
                  {getRiskIcon(linkResult.riskLevel)}
                  <span className="ml-2 font-semibold capitalize">{linkResult.riskLevel}</span>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium mb-2">Analysis Results:</p>
                  <ul className="text-sm space-y-1">
                    {linkResult.issues.map((issue, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Recommendations:</p>
                  <ul className="text-sm space-y-1">
                    {linkResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Email Header Analyzer */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Mail className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Email Header Analyzer</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email-header-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Paste email headers
                </label>
                <textarea
                  id="email-header-input"
                  value={emailHeaderInput}
                  onChange={(e) => setEmailHeaderInput(e.target.value)}
                  placeholder="Paste the raw email headers here..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                />
              </div>

              <button
                onClick={analyzeEmailHeader}
                disabled={!emailHeaderInput.trim() || isAnalyzing}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Headers'}
              </button>
            </div>

            {emailResult && (
              <div className={`mt-6 p-4 rounded-lg border ${getRiskColor(emailResult.riskLevel)}`}>
                <div className="flex items-center mb-3">
                  {getRiskIcon(emailResult.riskLevel)}
                  <span className="ml-2 font-semibold capitalize">{emailResult.riskLevel}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">From:</p>
                    <p className="text-sm break-all">{emailResult.from}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Reply-To:</p>
                    <p className="text-sm break-all">{emailResult.replyTo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">SPF:</p>
                    <p className="text-sm">{emailResult.spf}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">DKIM:</p>
                    <p className="text-sm">{emailResult.dkim}</p>
                  </div>
                </div>

                {emailResult.issues.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-2">Issues Found:</p>
                    <ul className="text-sm space-y-1">
                      {emailResult.issues.map((issue, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium mb-2">Recommendations:</p>
                  <ul className="text-sm space-y-1">
                    {emailResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Browser Safety Tips */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browser Safety Tips</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyTips.map((tip, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <tip.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Security Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Password Managers</h4>
              <p className="text-sm text-gray-600">Use tools like LastPass or Bitwarden to generate and store strong passwords.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">VPN Services</h4>
              <p className="text-sm text-gray-600">Protect your connection on public Wi-Fi with services like ExpressVPN or NordVPN.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Security Audits</h4>
              <p className="text-sm text-gray-600">Regularly review your accounts and change passwords every 3-6 months.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Protect;
