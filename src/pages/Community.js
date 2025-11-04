import React, { useState } from 'react';
import { Users, MessageCircle, ThumbsUp, Award, Plus, Heart, Flag } from 'lucide-react';

function Community() {
  const [selectedTab, setSelectedTab] = useState('stories');
  const [newStory, setNewStory] = useState({ title: '', content: '', anonymous: false });
  const [showNewStoryForm, setShowNewStoryForm] = useState(false);

  const stories = [
    {
      id: 1,
      author: 'Sarah M.',
      title: 'How I Almost Lost $5,000 to a Fake Bank Email',
      summary: 'I received an email that looked exactly like it was from my bank, asking me to verify my account details...',
      lesson: 'Always call your bank directly using the number on your card, never click links in emails.',
      upvotes: 24,
      comments: 8,
      date: '2024-11-03',
      tags: ['Bank Fraud', 'Email Phishing']
    },
    {
      id: 2,
      author: 'Mike R.',
      title: 'Tech Support Scam Over the Phone',
      summary: 'Someone called claiming to be from Microsoft tech support, saying my computer had viruses...',
      lesson: 'Legitimate tech companies never call you unsolicited. Always verify by calling them back directly.',
      upvotes: 31,
      comments: 12,
      date: '2024-11-01',
      tags: ['Tech Support Scam', 'Phone Phishing']
    },
    {
      id: 3,
      author: 'Anonymous',
      title: 'Fake Amazon Package Delivery',
      summary: 'Got a text about a package delivery with a tracking link. Almost clicked it...',
      lesson: 'Check your actual Amazon account through the official app/website, not through links in texts.',
      upvotes: 18,
      comments: 5,
      date: '2024-10-30',
      tags: ['SMS Phishing', 'Package Scam']
    }
  ];

  const champions = [
    { name: 'Alex Chen', points: 1250, badges: 8, rank: 1 },
    { name: 'Maria Garcia', points: 1180, badges: 7, rank: 2 },
    { name: 'David Kim', points: 1090, badges: 6, rank: 3 },
    { name: 'Emma Wilson', points: 980, badges: 5, rank: 4 },
    { name: 'James Brown', points: 920, badges: 5, rank: 5 }
  ];

  const handleUpvote = (storyId) => {
    // In a real app, this would update the database
    alert('Thanks for your feedback! Upvotes help others learn from these experiences.');
  };

  const handleSubmitStory = () => {
    if (!newStory.title.trim() || !newStory.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    // In a real app, this would submit to backend
    alert('Thank you for sharing your story! It will help others stay safe online.');
    setNewStory({ title: '', content: '', anonymous: false });
    setShowNewStoryForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">Community & Share</h1>
            <p className="text-gray-600 mt-2">Connect with others and share your phishing experiences</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setSelectedTab('stories')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                selectedTab === 'stories'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Real Stories
            </button>
            <button
              onClick={() => setSelectedTab('champions')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                selectedTab === 'champions'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Champions
            </button>
          </div>
        </div>

        {selectedTab === 'stories' && (
          <div className="space-y-6">
            {/* Share Your Story Button */}
            <div className="text-center">
              <button
                onClick={() => setShowNewStoryForm(true)}
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Share Your Story
              </button>
            </div>

            {/* New Story Form */}
            {showNewStoryForm && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Share Your Experience</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Story Title
                    </label>
                    <input
                      type="text"
                      value={newStory.title}
                      onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                      placeholder="Brief title for your story"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Story
                    </label>
                    <textarea
                      value={newStory.content}
                      onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                      placeholder="Describe what happened and what you learned..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={newStory.anonymous}
                      onChange={(e) => setNewStory({...newStory, anonymous: e.target.checked})}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                      Share anonymously
                    </label>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSubmitStory}
                      className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                    >
                      Share Story
                    </button>
                    <button
                      onClick={() => setShowNewStoryForm(false)}
                      className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stories Wall */}
            <div className="space-y-6">
              {stories.map((story) => (
                <div key={story.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">{story.author}</span>
                        <span className="text-sm text-gray-500">{story.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                      <p className="text-gray-700 mb-4">{story.summary}</p>

                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Lesson Learned:</h4>
                        <p className="text-blue-800">{story.lesson}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {story.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleUpvote(story.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{story.upvotes}</span>
                      </button>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MessageCircle className="h-4 w-4" />
                        <span>{story.comments}</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                      <Flag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'champions' && (
          <div className="space-y-6">
            {/* Champions Leaderboard */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-8">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">ClickWise Champions</h2>
                <p className="text-gray-600">Our top contributors making the internet safer</p>
              </div>

              <div className="space-y-4">
                {champions.map((champion, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index < 3 ? 'bg-gradient-to-r from-yellow-50 to-purple-50 border border-yellow-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {champion.rank}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{champion.name}</h3>
                        <p className="text-sm text-gray-600">{champion.points} points • {champion.badges} badges</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: champion.badges }, (_, i) => (
                        <Award key={i} className="h-4 w-4 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Become a Champion */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">How to Become a Champion</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h4 className="font-semibold mb-1">Learn & Quiz</h4>
                  <p className="text-sm opacity-90">Complete modules and quizzes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h4 className="font-semibold mb-1">Protect & Report</h4>
                  <p className="text-sm opacity-90">Use safety tools and report scams</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h4 className="font-semibold mb-1">Share Stories</h4>
                  <p className="text-sm opacity-90">Help others by sharing experiences</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Community Guidelines */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Community Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✅ Do's</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Share your real experiences honestly</li>
                <li>• Be supportive and encouraging</li>
                <li>• Report suspicious activities</li>
                <li>• Help others learn from your mistakes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❌ Don'ts</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Share personal information</li>
                <li>• Blame or shame other victims</li>
                <li>• Post spam or irrelevant content</li>
                <li>• Give financial or legal advice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
