import { useState } from 'react';

const DragDropQuiz = () => {
  const [droppedAnswer, setDroppedAnswer] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [feedback, setFeedback] = useState({ message: '', type: '', show: false });
  const [dragOverZone, setDragOverZone] = useState(false);

  const correctAnswer = "best alternative";

  const answerOptions = [
    { id: 1, value: "wrong choice", color: "option-brown" },
    { id: 2, value: "best alternative", color: "option-yellow" },
    { id: 3, value: "first option", color: "option-lightorange" },
    { id: 4, value: "last decision", color: "option-orange" }
  ];

  const handleDragStart = (e, answer) => {
    setDraggedItem(answer);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', answer.id.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragOverZone(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Only remove drag over state if we're actually leaving the drop zone
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverZone(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOverZone(false);
    
    if (draggedItem) {
      setDroppedAnswer(draggedItem);
      setFeedback({ message: '', type: '', show: false });
      setDraggedItem(null);
    }
  };

  const handleDroppedItemDragStart = (e) => {
    if (droppedAnswer) {
      setDraggedItem(droppedAnswer);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', droppedAnswer.id.toString());
    }
  };

  const handleAnswerAreaDrop = (e) => {
    e.preventDefault();
    // If we're dragging from the drop zone back to the answer area
    if (draggedItem && droppedAnswer && draggedItem.id === droppedAnswer.id) {
      setDroppedAnswer(null);
      setFeedback({ message: '', type: '', show: false });
    }
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    if (!droppedAnswer) {
      showFeedback('Please drag an answer to the blank first!', 'error');
      return;
    }

    if (droppedAnswer.value === correctAnswer) {
      showFeedback('🎉 Correct! Opportunity cost is indeed the value of the best alternative you don\'t choose.', 'success');
    } else {
      showFeedback('❌ Not quite right. Try again! Think about what you give up when making a choice.', 'error');
    }
  };

  const showFeedback = (message, type) => {
    setFeedback({ message, type, show: true });
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const resetQuiz = () => {
    setDroppedAnswer(null);
    setDraggedItem(null);
    setFeedback({ message: '', type: '', show: false });
    setDragOverZone(false);
  };

  return (
    <div className="quiz-container">
      <style>{`
        .quiz-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #3b82f6, #9333ea);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          box-sizing: border-box;
        }
        .quiz-box {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          max-width: 800px;
          width: 100%;
          overflow: hidden;
        }
        .quiz-header {
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          color: white;
          text-align: center;
          padding: 2rem;
        }
        .quiz-header h1 {
          margin: 0;
          font-size: 2rem;
        }
        .quiz-body {
          padding: 2rem;
          background: #eff6ff;
        }
        .question-box {
          background: white;
          padding: 1.5rem;
          border-left: 6px solid #3b82f6;
          border-radius: 12px;
          margin-bottom: 2rem;
        }
        .question-text {
          font-size: 1.2rem;
          line-height: 2;
        }
        .drop-zone {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 150px;
          height: 40px;
          border: 2px dashed #ccc;
          background: #f9f9f9;
          margin: 0 0.5rem;
          border-radius: 8px;
          padding: 0 1rem;
          transition: all 0.3s ease;
        }
        .drop-zone.drag-over {
          background-color: #e0f2fe;
          border-color: #3b82f6;
          transform: scale(1.05);
        }
        .drop-zone.drop-correct {
          border-color: #10b981;
          background-color: #e6ffed;
        }
        .drop-zone.drop-incorrect {
          border-color: #ef4444;
          background-color: #fee2e2;
        }
        .dropped-option {
          padding: 8px 12px;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          cursor: grab;
          user-select: none;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .dropped-option:active {
          cursor: grabbing;
        }
        .placeholder {
          color: #999;
          font-size: 0.9rem;
          user-select: none;
        }
        .answers-section {
          margin-bottom: 2rem;
        }
        .answers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }
        .answer-card {
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
          font-weight: bold;
          cursor: grab;
          color: white;
          transition: all 0.2s ease;
          user-select: none;
        }
        .answer-card:hover:not(.used) {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .answer-card:active:not(.used) {
          cursor: grabbing;
          transform: translateY(-2px);
        }
        .answer-card.used {
          opacity: 0.3;
          pointer-events: none;
          transform: scale(0.95);
        }
        .option-brown {
          background: linear-gradient(to right, #78350f, #92400e);
        }
        .option-yellow {
          background: linear-gradient(to right, #facc15, #fde047);
          color: #333;
        }
        .option-lightorange {
          background: linear-gradient(to right, #fdba74, #fed7aa);
          color: #333;
        }
        .option-orange {
          background: linear-gradient(to right, #fb923c, #f97316);
        }
        .buttons {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .buttons button {
          background: #3b82f6;
          color: white;
          padding: 0.8rem 1.5rem;
          margin: 0 1rem;
          border: none;
          border-radius: 999px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .buttons button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .buttons button:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-2px);
        }
        .feedback-box {
          text-align: center;
          font-weight: bold;
          padding: 1rem;
          border-radius: 10px;
          animation: slideIn 0.3s ease;
        }
        .feedback-box.success {
          background-color: #d1fae5;
          color: #065f46;
          border: 2px solid #10b981;
        }
        .feedback-box.error {
          background-color: #fee2e2;
          color: #991b1b;
          border: 2px solid #ef4444;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="quiz-box">
        <div className="quiz-header">
          <h1>📚 FILL IN THE BLANK</h1>
          <p>Drag the answers to complete the sentence</p>
        </div>

        <div className="quiz-body">
          <div className="question-box">
            <p className="question-text">
              Opportunity cost is the value of the
              <span
                className={`drop-zone ${dragOverZone ? 'drag-over' : ''} ${
                  droppedAnswer && feedback.show ? 
                    (feedback.type === 'success' ? 'drop-correct' : 'drop-incorrect') : 
                    ''
                }`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {droppedAnswer ? (
                  <span
                    className={`dropped-option ${droppedAnswer.color}`}
                    draggable
                    onDragStart={handleDroppedItemDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    {droppedAnswer.value}
                  </span>
                ) : (
                  <span className="placeholder">Drop answer here</span>
                )}
              </span>
              option you don't choose.
            </p>
          </div>

          <div 
            className="answers-section" 
            onDragOver={(e) => e.preventDefault()} 
            onDrop={handleAnswerAreaDrop}
          >
            <h2>Available Answers:</h2>
            <div className="answers-grid">
              {answerOptions.map(answer => {
                const isUsed = droppedAnswer?.id === answer.id;
                return (
                  <div
                    key={answer.id}
                    className={`answer-card ${answer.color} ${isUsed ? 'used' : ''}`}
                    draggable={!isUsed}
                    onDragStart={(e) => !isUsed && handleDragStart(e, answer)}
                    onDragEnd={handleDragEnd}
                  >
                    {answer.value}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="buttons">
            <button onClick={checkAnswer} disabled={!droppedAnswer}>
              Check Answer
            </button>
            <button onClick={resetQuiz}>Reset</button>
          </div>

          {feedback.show && (
            <div className={`feedback-box ${feedback.type}`}>
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDropQuiz;