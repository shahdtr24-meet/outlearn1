import { ArrowLeft, ArrowRight, CheckCircle, ChevronDown, ChevronUp, Smartphone } from 'lucide-react';
import { useState } from 'react';

const colors = {
  primary: "#72AEE6",
  secondary: "#FDBD10", 
  accent: "#72AEE6",
  background: "#ffffff",
  card: "#F0F7FF",
  text: "#2C3E50",
  textLight: "#7F8C8D",
  success: "#2ecc71",
  border: "#BFD7ED",
  blue: "#72AEE6",
  orange: "#FDBD10",
  brown: "#6B3F27",
  gradient: ["#72AEE6", "#5D9CDB"],
};

// Sample payslip data
const samplePayslip = {
  employeeInfo: {
    name: "Yossi Cohen",
    id: "123456789",
    position: "Software Developer",
    department: "Development",
    employeeNumber: "E001",
    company: "Tech Solutions Ltd.",
    payPeriod: "June 2024"
  },
  salaryDetails: {
    baseSalary: 15000,
    overtime: 1200,
    bonus: 800,
    totalGross: 17000
  },
  deductions: {
    incomeTax: 2040,
    nationalInsurance: 680,
    healthTax: 255,
    pensionEmployee: 765,
    totalDeductions: 3740
  },
  employerContributions: {
    pensionEmployer: 1275,
    severancePay: 850,
    studyFund: 127.5
  },
  netSalary: 13260,
  month: "June 2024"
};

const CourseApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [selectedSection, setSelectedSection] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPayslip, setShowPayslip] = useState(true);

  const steps = [
    {
      id: 'intro',
      title: 'Introduction',
      icon: '👋',
      description: 'What is a payslip?'
    },
    {
      id: 'structure', 
      title: 'Structure',
      icon: '🏗️',
      description: 'Payslip parts'
    },
    {
      id: 'gross-salary',
      title: 'Earnings',
      icon: '💰',
      description: 'Your income'
    },
    {
      id: 'deductions',
      title: 'Deductions',
      icon: '📉',
      description: 'What\'s taken out'
    },
    {
      id: 'net-salary',
      title: 'Net Pay',
      icon: '💵',
      description: 'Final amount'
    },
    {
      id: 'quiz',
      title: 'Quiz',
      icon: '🎯',
      description: 'Test yourself'
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the difference between gross and net salary?",
      options: [
        "No difference",
        "Gross before deductions, net after",
        "Net is always higher",
        "Depends on month"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "What does National Insurance include?",
      options: [
        "Only health insurance",
        "Only pension",
        "Health, pension & benefits",
        "Only taxes"
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Who pays pension contributions?",
      options: [
        "Only employee",
        "Only employer",
        "Both employee & employer",
        "Government"
      ],
      correct: 2
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const markStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  };

  const nextStep = () => {
    markStepComplete(currentStep);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const submitQuiz = () => {
    setShowQuizResults(true);
    const correctAnswers = quizQuestions.filter(q => 
      quizAnswers[q.id] === q.correct
    ).length;
    
    if (correctAnswers >= 2) {
      markStepComplete(currentStep);
    }
  };

  // Collapsible Section Component
  const CollapsibleSection = ({ title, children, isExpanded, onToggle, icon, badge }) => (
    <div className="border rounded-lg mb-3" style={{ borderColor: colors.border }}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{icon}</span>
          <span className="font-semibold" style={{ color: colors.text }}>{title}</span>
          {badge && (
            <span className="px-2 py-1 text-xs rounded-full text-white" style={{ backgroundColor: colors.primary }}>
              {badge}
            </span>
          )}
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isExpanded && (
        <div className="p-4 border-t" style={{ borderColor: colors.border, backgroundColor: colors.card }}>
          {children}
        </div>
      )}
    </div>
  );

  // Mobile Payslip Component
  const MobilePayslip = ({ highlightSection = null }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ border: `2px solid ${colors.border}` }}>
      {/* Toggle Button */}
      <button
        onClick={() => setShowPayslip(!showPayslip)}
        className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <Smartphone className="w-5 h-5" />
          <span className="font-bold">Sample Payslip</span>
        </div>
        {showPayslip ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {showPayslip && (
        <div className="space-y-1">
          {/* Company Header */}
          <div className="bg-blue-600 text-white p-3 text-center">
            <div className="font-bold text-sm">{samplePayslip.employeeInfo.company}</div>
            <div className="text-xs opacity-90">{samplePayslip.employeeInfo.payPeriod}</div>
          </div>

          {/* Employee Info - Collapsible */}
          <CollapsibleSection
            title="Employee Information"
            icon="👤"
            isExpanded={expandedSections.employee || highlightSection === 'employee'}
            onToggle={() => toggleSection('employee')}
          >
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="font-medium">Name:</span><br/>{samplePayslip.employeeInfo.name}</div>
              <div><span className="font-medium">ID:</span><br/>{samplePayslip.employeeInfo.id}</div>
              <div><span className="font-medium">Position:</span><br/>{samplePayslip.employeeInfo.position}</div>
              <div><span className="font-medium">Emp #:</span><br/>{samplePayslip.employeeInfo.employeeNumber}</div>
            </div>
          </CollapsibleSection>

          {/* Earnings - Collapsible */}
          <CollapsibleSection
            title="Earnings"
            icon="💰"
            badge={`₪${samplePayslip.salaryDetails.totalGross.toLocaleString()}`}
            isExpanded={expandedSections.earnings || highlightSection === 'earnings'}
            onToggle={() => toggleSection('earnings')}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Salary</span>
                <span className="font-bold text-green-600">₪{samplePayslip.salaryDetails.baseSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Overtime</span>
                <span className="font-bold text-green-600">₪{samplePayslip.salaryDetails.overtime.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bonus</span>
                <span className="font-bold text-green-600">₪{samplePayslip.salaryDetails.bonus.toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold">
                <span>GROSS TOTAL</span>
                <span className="text-green-600">₪{samplePayslip.salaryDetails.totalGross.toLocaleString()}</span>
              </div>
            </div>
          </CollapsibleSection>

          {/* Deductions - Collapsible */}
          <CollapsibleSection
            title="Deductions"
            icon="📉"
            badge={`-₪${samplePayslip.deductions.totalDeductions.toLocaleString()}`}
            isExpanded={expandedSections.deductions || highlightSection === 'deductions'}
            onToggle={() => toggleSection('deductions')}
          >
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Income Tax</span>
                <span className="font-bold text-red-600">₪{samplePayslip.deductions.incomeTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>National Insurance</span>
                <span className="font-bold text-red-600">₪{samplePayslip.deductions.nationalInsurance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Health Tax</span>
                <span className="font-bold text-red-600">₪{samplePayslip.deductions.healthTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pension</span>
                <span className="font-bold text-red-600">₪{samplePayslip.deductions.pensionEmployee.toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold">
                <span>TOTAL DEDUCTIONS</span>
                <span className="text-red-600">₪{samplePayslip.deductions.totalDeductions.toLocaleString()}</span>
              </div>
            </div>
          </CollapsibleSection>

          {/* Net Pay */}
          <div className="p-4">
            <div className="text-center p-4 rounded-lg font-bold text-lg" style={{ backgroundColor: colors.secondary }}>
              <div className="text-sm text-gray-600 mb-1">NET PAY</div>
              <div className="text-xl">₪{samplePayslip.netSalary.toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-1">To your bank account</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Mobile Progress Dots
  const MobileProgress = () => (
    <div className="flex justify-center space-x-2 p-4" style={{ backgroundColor: colors.card }}>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex flex-col items-center"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              completedSteps.has(index) || index === currentStep
                ? 'text-white scale-110'
                : 'text-gray-400'
            }`}
            style={{
              backgroundColor: completedSteps.has(index)
                ? colors.success
                : index === currentStep
                ? colors.primary
                : '#e0e0e0'
            }}
          >
            {completedSteps.has(index) ? <CheckCircle className="w-4 h-4" /> : step.icon}
          </div>
          <div className="text-xs mt-1 text-center" style={{ color: colors.textLight }}>
            {step.title}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'intro':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
                Welcome to Payslip Course!
              </h2>
            </div>

            <CollapsibleSection
              title="What is a payslip?"
              icon="📄"
              isExpanded={expandedSections.what || true}
              onToggle={() => toggleSection('what')}
            >
              <p className="text-sm" style={{ color: colors.textLight }}>
                A payslip is a document that shows all your earnings and deductions for a specific pay period. It's your proof of income and helps you understand exactly how much you earned and what was taken out.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Why is it important?"
              icon="❗"
              isExpanded={expandedSections.why}
              onToggle={() => toggleSection('why')}
            >
              <ul className="space-y-2 text-sm" style={{ color: colors.textLight }}>
                <li>• Proof of income for loans or rentals</li>
                <li>• Track your tax payments</li>
                <li>• Monitor pension contributions</li>
                <li>• Verify you're paid correctly</li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection
              title="What you'll learn"
              icon="🎓"
              isExpanded={expandedSections.learn}
              onToggle={() => toggleSection('learn')}
            >
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span>💰</span><span>How to read earnings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📉</span><span>Understanding deductions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>💵</span><span>Calculate net salary</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⚖️</span><span>Know your rights</span>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        );

      case 'structure':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center" style={{ color: colors.text }}>
              Payslip Structure
            </h2>
            
            <MobilePayslip />

            <CollapsibleSection
              title="Key Components"
              icon="🔑"
              isExpanded={expandedSections.components || true}
              onToggle={() => toggleSection('components')}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded" style={{ backgroundColor: '#e3f2fd' }}>
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-semibold text-sm">Employee Info</div>
                    <div className="text-xs text-gray-600">Your personal details</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded" style={{ backgroundColor: '#e8f5e8' }}>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <div>
                    <div className="font-semibold text-sm">Earnings</div>
                    <div className="text-xs text-gray-600">What you earned</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded" style={{ backgroundColor: '#fde8e8' }}>
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div>
                    <div className="font-semibold text-sm">Deductions</div>
                    <div className="text-xs text-gray-600">What was taken out</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded" style={{ backgroundColor: colors.card }}>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                  <div>
                    <div className="font-semibold text-sm">Net Pay</div>
                    <div className="text-xs text-gray-600">Final amount to you</div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <div className="p-3 rounded-lg text-center text-sm" style={{ backgroundColor: colors.card, color: colors.textLight }}>
              💡 Tip: Tap the sections above to expand and explore the payslip!
            </div>
          </div>
        );

      case 'gross-salary':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center" style={{ color: colors.text }}>
              💰 Your Earnings
            </h2>
            
            <MobilePayslip highlightSection="earnings" />

            <CollapsibleSection
              title="Base Salary"
              icon="🏠"
              badge={`₪${samplePayslip.salaryDetails.baseSalary.toLocaleString()}`}
              isExpanded={expandedSections.base}
              onToggle={() => toggleSection('base')}
            >
              <p className="text-sm" style={{ color: colors.textLight }}>
                Your fixed monthly wage as agreed in your contract. This is the foundation of your income.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Overtime"
              icon="⏰"
              badge={`₪${samplePayslip.salaryDetails.overtime.toLocaleString()}`}
              isExpanded={expandedSections.overtime}
              onToggle={() => toggleSection('overtime')}
            >
              <p className="text-sm" style={{ color: colors.textLight }}>
                Payment for hours worked beyond your regular schedule. Usually paid at 125% or 150% of your hourly rate.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Bonus"
              icon="🎁"
              badge={`₪${samplePayslip.salaryDetails.bonus.toLocaleString()}`}
              isExpanded={expandedSections.bonus}
              onToggle={() => toggleSection('bonus')}
            >
              <p className="text-sm" style={{ color: colors.textLight }}>
                Performance bonuses, holiday pay, or other additional payments from your employer.
              </p>
            </CollapsibleSection>

            <div className="p-4 rounded-lg font-bold text-center" style={{ backgroundColor: colors.success, color: 'white' }}>
              <div className="text-sm mb-1">GROSS TOTAL</div>
              <div className="text-lg">₪{samplePayslip.salaryDetails.totalGross.toLocaleString()}</div>
              <div className="text-xs mt-1 opacity-90">Before any deductions</div>
            </div>
          </div>
        );

      case 'deductions':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center" style={{ color: colors.text }}>
              📉 Deductions
            </h2>
            
            <MobilePayslip highlightSection="deductions" />

            <CollapsibleSection
              title="Income Tax"
              icon="🏛️"
              badge={`₪${samplePayslip.deductions.incomeTax.toLocaleString()}`}
              isExpanded={expandedSections.tax}
              onToggle={() => toggleSection('tax')}
            >
              <p className="text-sm" style={{ color: colors.textLight }}>
                Tax paid to the government based on your income level. Higher earners pay higher rates (progressive taxation).
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="National Insurance"
              icon="🛡️"
              badge={`₪${samplePayslip.deductions.nationalInsurance.toLocaleString()}`}
              isExpanded={expandedSections.insurance}
              onToggle={() => toggleSection('insurance')}
            >
              <p className="text-sm" style={{ color: colors.textLight }}>
                Covers unemployment benefits, disability insurance, maternity leave, and contributes to your pension.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Health Tax"
              icon="🏥"
              badge={`₪${samplePayslip.deductions.healthTax.toLocaleString()}`}
              isExpanded={expandedSections.health}
              onToggle={() => toggleSection('health')}
            >
              <p className="text-sm" style={{ color: colors.textLight }}>
                Payment to health funds (Kupot Holim) for medical coverage and healthcare services.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Pension (Your Part)"
              icon="👴"
              badge={`₪${samplePayslip.deductions.pensionEmployee.toLocaleString()}`}
              isExpanded={expandedSections.pension}
              onToggle={() => toggleSection('pension')}
            >
              <p className="text-sm" style={{ color: colors.textLight }}>
                Your contribution to retirement savings. Your employer also contributes additional money to your pension fund.
              </p>
            </CollapsibleSection>

            <div className="p-4 rounded-lg font-bold text-center" style={{ backgroundColor: '#e74c3c', color: 'white' }}>
              <div className="text-sm mb-1">TOTAL DEDUCTIONS</div>
              <div className="text-lg">₪{samplePayslip.deductions.totalDeductions.toLocaleString()}</div>
              <div className="text-xs mt-1 opacity-90">Taken from gross salary</div>
            </div>
          </div>
        );

      case 'net-salary':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center" style={{ color: colors.text }}>
              💵 Your Take-Home Pay
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm">Gross Salary:</span>
                <span className="font-bold text-green-600">₪{samplePayslip.salaryDetails.totalGross.toLocaleString()}</span>
              </div>
              
              <div className="text-center text-2xl font-bold text-gray-400">−</div>
              
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm">Total Deductions:</span>
                <span className="font-bold text-red-600">₪{samplePayslip.deductions.totalDeductions.toLocaleString()}</span>
              </div>
              
              <div className="text-center text-2xl font-bold text-gray-400">=</div>
              
              <div className="p-4 rounded-lg font-bold text-center text-lg" style={{ backgroundColor: colors.secondary }}>
                <div className="text-sm text-gray-600 mb-1">NET SALARY</div>
                <div className="text-2xl">₪{samplePayslip.netSalary.toLocaleString()}</div>
                <div className="text-xs text-gray-600 mt-1">Deposited to your account</div>
              </div>
            </div>
            
            <CollapsibleSection
              title="Important to Know"
              icon="💡"
              isExpanded={expandedSections.tips}
              onToggle={() => toggleSection('tips')}
            >
              <ul className="space-y-2 text-sm" style={{ color: colors.textLight }}>
                <li>• Your employer also contributes to your pension</li>
                <li>• Always check your payslip for errors</li>
                <li>• Keep payslips for tax purposes</li>
                <li>• You have the right to receive a payslip copy</li>
                <li>• Net salary = what actually reaches your bank</li>
              </ul>
            </CollapsibleSection>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center" style={{ color: colors.text }}>
              🎯 Test Your Knowledge
            </h2>
            {!showQuizResults ? (
              <div className="space-y-4">
                {quizQuestions.map((question, index) => (
                  <CollapsibleSection
                    key={question.id}
                    title={`Question ${index + 1}`}
                    icon="❓"
                    isExpanded={expandedSections[`q${question.id}`] || true}
                    onToggle={() => toggleSection(`q${question.id}`)}
                  >
                    <div className="space-y-3">
                      <p className="font-semibold text-sm" style={{ color: colors.text }}>
                        {question.question}
                      </p>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={optionIndex}
                              onChange={() => handleQuizAnswer(question.id, optionIndex)}
                              className="text-blue-500"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </CollapsibleSection>
                ))}
                <button
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className="w-full py-3 px-6 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: colors.primary }}
                >
                  Check My Answers
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-6xl">🎉</div>
                <h3 className="text-lg font-bold" style={{ color: colors.text }}>
                  Congratulations!
                </h3>
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.success, color: 'white' }}>
                  <p className="font-semibold">Course Completed!</p>
                  <p className="text-sm mt-1">Score: {quizQuestions.filter(q => quizAnswers[q.id] === q.correct).length}/{quizQuestions.length}</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setShowQuizResults(false);
                    setQuizAnswers({});
                    setCompletedSteps(new Set());
                    setExpandedSections({});
                  }}
                  className="px-6 py-2 rounded-lg text-white font-semibold"
                  style={{ backgroundColor: colors.primary }}
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <h1 className="text-xl font-bold text-center">📱 Israeli Payslip Course</h1>
        <p className="text-center text-sm opacity-90 mt-1">Learn on your phone!</p>
      </div>

      {/* Mobile Progress */}
      <MobileProgress />

      {/* Main Content */}
      <div className="max-w-lg mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 min-h-96">
          {renderStepContent()}
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-between items-center mt-4 space-x-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            style={{
              backgroundColor: currentStep === 0 ? '#e0e0e0' : colors.border,
              color: colors.text
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Previous</span>
          </button>

          <div className="text-center px-2">
            <span className="text-xs" style={{ color: colors.textLight }}>
              {currentStep + 1}/{steps.length}
            </span>
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed flex-1 justify-center"
            style={{
              backgroundColor: currentStep === steps.length - 1 ? '#e0e0e0' : colors.primary
            }}
          >
            <span className="text-sm">Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowPayslip(!showPayslip)}
            className="p-2 rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: colors.secondary }}
          >
            {showPayslip ? 'Hide' : 'Show'} Payslip
          </button>
          <button
            onClick={() => setExpandedSections({})}
            className="p-2 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: colors.card, color: colors.text }}
          >
            Collapse All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseApp;