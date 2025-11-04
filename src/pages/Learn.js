import React, { useState } from 'react';
import { BookOpen, Trophy, Clock, CheckCircle, XCircle, ArrowRight, Play, Award, Target } from 'lucide-react';

function Learn() {
  const [currentModule, setCurrentModule] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);
  const [userProgress, setUserProgress] = useState({
    quizzesCompleted: 0,
    badgesEarned: 0,
    points: 0
  });

  const modules = [
    {
      id: 1,
      title: 'What is Phishing?',
      description: 'Learn the basics of phishing attacks',
      content: 'Phishing is a cyber attack where attackers try to trick you into giving sensitive information like passwords, credit card numbers, or personal data. They often pose as trustworthy entities through email, phone calls, or fake websites.',
      quiz: [
        {
          question: 'What is phishing?',
          options: [
            'A type of fish',
            'A cyber attack to steal information',
            'A computer virus',
            'A network protocol'
          ],
          correct: 1
        },
        {
          question: 'Which of these is NOT a common phishing method?',
          options: [
            'Fake emails',
            'Phone calls',
            'Fake websites',
            'Computer hardware'
          ],
          correct: 3
        }
      ]
    },
    {
      id: 2,
      title: 'Recognizing Phishing Emails',
      description: 'Spot the red flags in suspicious emails',
      content: 'Phishing emails often contain urgent language, suspicious sender addresses, grammatical errors, and unexpected attachments. Always verify the sender and never click links from unknown sources.',
      quiz: [
        {
          question: 'What should you do if you receive an email asking for your password?',
          options: [
            'Reply with your password',
            'Click the link to reset it',
            'Contact the organization directly through official channels',
            'Ignore it completely'
          ],
          correct: 2
        }
      ]
    },
    {
      id: 3,
      title: 'Safe Online Practices',
      description: 'Best practices for staying secure online',
      content: 'Use strong, unique passwords for each account. Enable two-factor authentication. Keep your software updated. Be cautious with public Wi-Fi. Verify website security with HTTPS.',
      quiz: [
        {
          question: 'Which of these is a strong password?',
          options: [
            'password123',
            'MySecureP@ss2024!',
            'qwerty',
            '123456'
          ],
          correct: 1
        }
      ]
    }
  ];

  const weeklyQuiz = {
    question: 'You receive an email from your "bank" saying your account is suspended and you need to click a link to verify your identity. What should you do?',
    options: [
      'Click the link immediately to fix the issue',
      'Call the bank using the number on your card',
      'Reply to the email with your account details',
      'Forward the email to a friend for advice'
    ],
    correct: 1
  };

  const phishingSimulator = [
    {
      type: 'email',
      subject: 'Urgent: Your PayPal Account Suspended',
      from: 'security@paypa1.com',
      content: 'Dear Customer, Your PayPal account has been suspended due to suspicious activity. Click here to verify your identity and restore access.',
      isPhishing: true,
      explanation: 'This is phishing because: 1) Sender email is "paypa1.com" (note the "1" instead of "l"), 2) Creates urgency, 3) Asks you to click a link'
    },
    {
      type: 'email',
      subject: 'Your Amazon Order Confirmation',
      from: 'orders@amazon.com',
      content: 'Thank you for your recent purchase. Your order #12345 has been shipped and will arrive in 2-3 business days.',
      isPhishing: false,
      explanation: 'This appears legitimate: 1) Correct Amazon domain, 2) No urgent action required, 3) Standard order confirmation'
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    const currentQuiz = modules[currentModule].quiz;
    const isCorrect = selectedAnswer === currentQuiz[currentQuestion].correct;

    if (isCorrect) {
      setScore(score + 1);
      setUserProgress(prev => ({
        ...prev,
        points: prev.points + 10
      }));
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    const currentQuiz = modules[currentModule].quiz;

    if (currentQuestion < currentQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Module completed
      if (!completedModules.includes(currentModule)) {
        setCompletedModules([...completedModules, currentModule]);
        setUserProgress(prev => ({
          ...prev,
          quizzesCompleted: prev.quizzesCompleted + 1,
          badgesEarned: prev.badgesEarned + (score === currentQuiz.length ? 1 : 0)
        }));
      }
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedAnswer(null);
    }
  };

  const startModule = (moduleIndex) => {
    setCurrentModule(moduleIndex);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Learn & Practice</h1>
              <p className="text-gray-600 mt-1">Master phishing awareness with interactive lessons</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userProgress.points}</div>
                <div className="text-sm text-gray-500">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userProgress.badgesEarned}</div>
                <div className="text-sm text-gray-500">Badges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userProgress.quizzesCompleted}</div>
                <div className="text-sm text-gray-500">Quizzes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2 space-y-6">
            {/* Module Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{modules[currentModule].title}</h2>
              </div>

              <p className="text-gray-600 mb-6">{modules[currentModule].content}</p>

              {/* Quiz Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Knowledge Check</h3>

                {!showResult ? (
                  <div>
                    <h4 className="font-medium mb-4">{modules[currentModule].quiz[currentQuestion].question}</h4>
                    <div className="space-y-3">
                      {modules[currentModule].quiz[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                            selectedAnswer === index
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Submit Answer
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    {selectedAnswer === modules[currentModule].quiz[currentQuestion].correct ? (
                      <div>
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-green-600 mb-2">Correct!</h4>
                        <p className="text-gray-600 mb-6">Great job! You earned 10 points.</p>
                      </div>
                    ) : (
                      <div>
                        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-red-600 mb-2">Not quite right</h4>
                        <p className="text-gray-600 mb-2">The correct answer is:</p>
                        <p className="font-medium text-gray-900 mb-6">
                          {modules[currentModule].quiz[currentQuestion].options[modules[currentModule].quiz[currentQuestion].correct]}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={handleNextQuestion}
                      className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {currentQuestion < modules[currentModule].quiz.length - 1 ? 'Next Question' : 'Complete Module'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Weekly Quiz */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Security Quiz of the Week</h3>
              </div>
              <p className="text-gray-600 mb-4">{weeklyQuiz.question}</p>
              <div className="space-y-2">
                {weeklyQuiz.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="weekly-quiz"
                      id={`weekly-${index}`}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`weekly-${index}`} className="text-gray-700">{option}</label>
                  </div>
                ))}
              </div>
              <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                Submit Weekly Quiz
              </button>
            </div>

            {/* Phishing Simulator */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Play className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Phishing Simulator</h3>
              </div>
              <p className="text-gray-600 mb-6">Practice identifying phishing attempts with real examples.</p>

              <div className="space-y-4">
                {phishingSimulator.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{item.subject}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.isPhishing ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.isPhishing ? 'PHISHING' : 'LEGITIMATE'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">From: {item.from}</div>
                    <p className="text-gray-700 mb-3">{item.content}</p>
                    <details className="text-sm">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                        Why is this {item.isPhishing ? 'phishing' : 'legitimate'}?
                      </summary>
                      <p className="mt-2 text-gray-600">{item.explanation}</p>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Module List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Modules</h3>
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => startModule(index)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                      currentModule === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                      {completedModules.includes(index) && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Modules Completed</span>
                    <span>{completedModules.length}/{modules.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Badges Earned</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: userProgress.badgesEarned }, (_, i) => (
                      <Award key={i} className="h-4 w-4 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Always verify sender email addresses</li>
                <li>• Look for HTTPS in website URLs</li>
                <li>• Never share passwords via email</li>
                <li>• Use unique passwords for each account</li>
                <li>• Enable two-factor authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learn;
