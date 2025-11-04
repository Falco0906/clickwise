import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, CheckCircle, Users, AlertTriangle, ArrowRight, Play, Award } from 'lucide-react';

function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Learn & Practice',
      description: 'Interactive modules and quizzes to master phishing awareness.',
      link: '/learn',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Protect & Check',
      description: 'Powerful tools to verify links and analyze email headers.',
      link: '/protect',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Community & Share',
      description: 'Connect with others and share your phishing experiences.',
      link: '/community',
      color: 'text-purple-600'
    }
  ];

  const scamAlerts = [
    {
      title: 'Bank Impersonation Scam',
      description: 'Fake emails claiming account suspension with urgent action required.',
      severity: 'High',
      date: '2024-11-04'
    },
    {
      title: 'Investment Opportunity Fraud',
      description: 'Unsolicited offers promising high returns with minimal risk.',
      severity: 'Medium',
      date: '2024-11-03'
    },
    {
      title: 'Tech Support Scam',
      description: 'Pop-up alerts claiming computer infection requiring immediate call.',
      severity: 'High',
      date: '2024-11-02'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Think before you click.<br />
              <span className="text-blue-200">Learn Smart. Stay Safe.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Master phishing awareness with interactive learning, powerful protection tools, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/learn"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 text-lg"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/protect"
                className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors duration-200 text-lg"
              >
                Check a Link
                <Shield className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay safe online
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From learning the basics to advanced protection tools, ClickWise has you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gray-100 mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Scam Alerts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Scam Alerts
            </h2>
            <p className="text-xl text-gray-600">
              Stay informed about the latest phishing threats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scamAlerts.map((alert, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    alert.severity === 'High'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {alert.severity} Risk
                  </div>
                  <span className="text-sm text-gray-500">{alert.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{alert.title}</h3>
                <p className="text-gray-600">{alert.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/report"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Report a Scam
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to become a ClickWise Champion?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who are learning to stay safe online. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 text-lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors duration-200 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
