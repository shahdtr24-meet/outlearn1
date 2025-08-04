export const opportunityCostLessons = {
  skillName: "Opportunity Cost",
  skillDescription: "Understanding the hidden costs of every choice you make",
  totalLevels: 4,
  levels: [
    {
      level: 1,
      title: "The Basics – Every Choice Has a Cost",
      explanation: `You make choices all the time. What to eat, what to do, where to go.
But have you ever thought about what you're giving up every time you choose something?
That's what opportunity cost is all about:
It's the thing you didn't choose — the second-best option you had.
It might be time with friends, money you could've saved, or something fun you passed up.
Once you see it, you can start making better choices.`,
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "You choose to watch a movie instead of going to a friend's party. What's your opportunity cost?",
          options: [
            "Watching the movie",
            "The ticket for the movie", 
            "Going to the party",
            "Popcorn"
          ],
          correctAnswer: 2,
          explanation: "The opportunity cost is what you give up - in this case, going to the party."
        },
        {
          id: 2,
          type: "true_false",
          question: "Opportunity cost only happens when you spend money.",
          correctAnswer: false,
          explanation: "Opportunity cost applies to any choice, not just money. It can be time, experiences, or other valuable things you give up."
        },
        {
          id: 3,
          type: "multiple_choice",
          question: "Opportunity cost is the value of the __________ option you didn't choose.",
          options: [
            "best",
            "second-best", 
            "worst",
            "cheapest"
          ],
          correctAnswer: 1,
          explanation: "Opportunity cost refers to the value of the next best alternative you could have chosen."
        },
        {
          id: 4,
          type: "multiple_choice",
          question: "When you choose to play video games instead of studying, the opportunity cost might be:",
          options: [
            "Winning the game",
            "Better grades",
            "Taking a nap",
            "Watching TV"
          ],
          correctAnswer: 1,
          explanation: "By choosing video games, you're giving up the potential for better grades through studying."
        },
        {
          id: 5,
          type: "matching",
          question: "Match the choice to its opportunity cost:",
          pairs: [
            { choice: "Play video games", opportunityCost: "Better grades" },
            { choice: "Buy candy", opportunityCost: "Saving money" },
            { choice: "Take a nap", opportunityCost: "Time with friends" }
          ],
          explanation: "Each choice has a specific opportunity cost - what you give up by making that choice."
        }
      ]
    },
    {
      level: 2,
      title: "Everyday Trade-Offs – What You're Really Giving Up",
      explanation: `It's not just big decisions — small ones matter too.
When you spend your money, your time, or your energy, you're always giving something up in return.
Every "yes" to one thing is a "no" to something else.
And that "no" is your opportunity cost.
This lesson will help you spot those trade-offs in real-life situations — like choosing between spending now or saving, relaxing or learning, fun or future goals.
The more aware you are of what you're passing up, the smarter your choices will be.`,
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "You spend $15 on fast food instead of saving it. What is your opportunity cost?",
          options: [
            "The food",
            "$15",
            "What you could've saved for",
            "The restaurant"
          ],
          correctAnswer: 2,
          explanation: "The opportunity cost isn't the money itself, but what you could have used that money for instead."
        },
        {
          id: 2,
          type: "multiple_choice",
          question: "You choose to sleep in instead of going to the gym. Your opportunity cost is:",
          options: [
            "Sleep",
            "Better health and fitness",
            "The gym membership",
            "Time"
          ],
          correctAnswer: 1,
          explanation: "By choosing to sleep in, you're giving up the health and fitness benefits of going to the gym."
        },
        {
          id: 3,
          type: "true_false",
          question: "Opportunity cost is always about money.",
          correctAnswer: false,
          explanation: "Opportunity cost can be about time, experiences, relationships, or any valuable alternative you give up."
        },
        {
          id: 4,
          type: "multiple_choice",
          question: "You decide to work overtime instead of going to your friend's birthday party. What's your opportunity cost?",
          options: [
            "Extra money",
            "Time with friends",
            "Work experience",
            "The party food"
          ],
          correctAnswer: 1,
          explanation: "By choosing to work, you're giving up the opportunity to spend time with friends at the party."
        },
        {
          id: 5,
          type: "matching",
          question: "Match each situation to its opportunity cost:",
          pairs: [
            { choice: "Study for exam", opportunityCost: "Hanging out with friends" },
            { choice: "Buy new phone", opportunityCost: "Money for other things" },
            { choice: "Watch TV", opportunityCost: "Time for exercise" }
          ],
          explanation: "Each choice involves giving up something else that could have been valuable."
        }
      ]
    },
    {
      level: 3,
      title: "Smart Choices – How to Think About Opportunity Cost",
      explanation: `Now that you understand what opportunity cost is, let's learn how to use it to make better decisions.
The key is to think about what you're really giving up before you make a choice.
Sometimes the opportunity cost is obvious, like choosing between two activities.
Other times it's hidden, like the long-term effects of your choices.
This lesson will help you spot opportunity costs and use them to make smarter decisions.`,
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "Which choice has the highest opportunity cost?",
          options: [
            "Choosing between two similar video games",
            "Choosing between college and a full-time job",
            "Choosing between two restaurants",
            "Choosing between two TV shows"
          ],
          correctAnswer: 1,
          explanation: "Choosing between college and a full-time job has the highest opportunity cost because it affects your long-term career and earning potential."
        },
        {
          id: 2,
          type: "multiple_choice",
          question: "You're deciding whether to save $100 or spend it on clothes. What should you consider?",
          options: [
            "Only the clothes you want",
            "Only the money you'll save",
            "What you could do with that $100 in the future",
            "Just the current price"
          ],
          correctAnswer: 2,
          explanation: "You should consider what that $100 could be worth in the future if invested or saved for something more important."
        },
        {
          id: 3,
          type: "true_false",
          question: "Opportunity cost helps you make better decisions by showing what you're giving up.",
          correctAnswer: true,
          explanation: "Understanding opportunity cost helps you see the full picture of your choices and make more informed decisions."
        },
        {
          id: 4,
          type: "multiple_choice",
          question: "You have 2 hours free. You could study, exercise, or watch a movie. If you choose to study, what's your opportunity cost?",
          options: [
            "Just the movie",
            "Just the exercise",
            "Both the movie and exercise",
            "Nothing"
          ],
          correctAnswer: 2,
          explanation: "By choosing to study, you're giving up both the movie and exercise - your opportunity cost is the next best alternative."
        },
        {
          id: 5,
          type: "matching",
          question: "Match each decision-making tip to its benefit:",
          pairs: [
            { choice: "Think long-term", opportunityCost: "Better future outcomes" },
            { choice: "Consider alternatives", opportunityCost: "More informed choices" },
            { choice: "Weigh pros and cons", opportunityCost: "Clearer decision making" }
          ],
          explanation: "These strategies help you understand opportunity costs and make better decisions."
        }
      ]
    },
    {
      level: 4,
      title: "Recap Challenge – Maya's Big Decision",
      explanation: `You're going to help Maya, a 16-year-old student, make a big decision about her summer.
She has to choose between taking a summer job that pays well or attending a summer program that could help her get into a better college.
This is a perfect example of opportunity cost in action.
You'll help Maya think through her options and understand what she's really giving up with each choice.`,
      isInteractive: true,
      steps: [
        {
          title: "Maya's Situation",
          question: "Maya has two options for her summer: a job paying $2,000 or a college prep program that costs $1,500 but could help her get into a better college. What's the main opportunity cost of choosing the job?",
          options: [
            "The $2,000 she'll earn",
            "The chance to improve her college applications",
            "The $1,500 program cost",
            "Her summer free time"
          ],
          followUpQuestion: {
            type: "multiple_choice",
            question: "Why is the college prep program the opportunity cost of choosing the job?",
            options: [
              "Because it costs money",
              "Because it's the next best alternative that could have long-term benefits",
              "Because it takes time",
              "Because it's educational"
            ],
            correctAnswer: 1,
            explanation: "The college prep program is the opportunity cost because it's the next best alternative that could provide long-term benefits for Maya's future."
          }
        },
        {
          title: "Thinking Long-Term",
          question: "Maya realizes that getting into a better college could mean better job opportunities and higher earnings in the future. What type of opportunity cost is this?",
          options: [
            "Short-term opportunity cost",
            "Long-term opportunity cost",
            "Financial opportunity cost",
            "Time opportunity cost"
          ],
          followUpQuestion: {
            type: "multiple_choice",
            question: "Why is it important to consider long-term opportunity costs?",
            options: [
              "Because they're always bigger",
              "Because they can have lasting effects on your future",
              "Because they cost more money",
              "Because they take more time"
            ],
            correctAnswer: 1,
            explanation: "Long-term opportunity costs can have lasting effects on your future, making them crucial to consider in major decisions."
          }
        },
        {
          title: "Maya's Decision",
          question: "Maya decides to take the job because she needs money for college. What opportunity cost is she accepting?",
          options: [
            "The money she'll earn",
            "The potential college admission benefits",
            "Her summer free time",
            "The program cost"
          ],
          followUpQuestion: {
            type: "multiple_choice",
            question: "Is Maya's decision necessarily wrong?",
            options: [
              "Yes, she should always choose education",
              "No, it depends on her specific situation and priorities",
              "Yes, money is never worth more than education",
              "No, jobs are always better than programs"
            ],
            correctAnswer: 1,
            explanation: "The decision depends on Maya's specific situation, priorities, and what she values most. There's no universally 'right' choice."
          }
        },
        {
          title: "Alternative Solutions",
          question: "Maya wonders if there's a way to reduce her opportunity cost. What could she consider?",
          options: [
            "Only working part-time",
            "Finding a cheaper college prep program",
            "Both working part-time and doing a shorter program",
            "Giving up on both options"
          ],
          followUpQuestion: {
            type: "multiple_choice",
            question: "Why is finding a compromise often a good strategy?",
            options: [
              "Because it's cheaper",
              "Because it can reduce opportunity costs by combining benefits",
              "Because it takes less time",
              "Because it's easier"
            ],
            correctAnswer: 1,
            explanation: "Compromises can reduce opportunity costs by allowing you to gain some benefits from multiple options instead of choosing just one."
          }
        },
        {
          title: "Final Reflection",
          question: "What's the most important lesson about opportunity cost from Maya's situation?",
          options: [
            "Always choose money over education",
            "Always choose education over money",
            "Consider both short-term and long-term consequences of your choices",
            "Opportunity cost doesn't matter for big decisions"
          ],
          followUpQuestion: {
            type: "multiple_choice",
            question: "How can understanding opportunity cost help you in your own life?",
            options: [
              "It can help you make more informed decisions",
              "It will always tell you the right choice",
              "It makes decisions easier",
              "It only applies to money decisions"
            ],
            correctAnswer: 0,
            explanation: "Understanding opportunity cost helps you make more informed decisions by showing you what you're really giving up with each choice."
          }
        }
      ]
    }
  ]
};

export const getLevel = (levelNumber) => {
  return opportunityCostLessons.levels.find(level => level.level === levelNumber);
};

export const getTotalQuestions = (levelNumber) => {
  const level = getLevel(levelNumber);
  if (!level) return 0;
  
  if (level.isInteractive) {
    return level.steps.reduce((total, step) => {
      return total + 1 + (step.followUpQuestion ? 1 : 0) + (step.followUpQuestions ? step.followUpQuestions.length : 0);
    }, 0);
  }
  
  return level.questions?.length || 0;
};

export const validateAnswer = (levelNumber, questionId, userAnswer) => {
  const level = getLevel(levelNumber);
  if (!level) return false;
  
  if (level.isInteractive) {
    // Handle interactive scenario validation
    return true; // Simplified for now
  }
  
  const question = level.questions?.find(q => q.id === questionId);
  if (!question) return false;
  
  return validateQuestionAnswer(question, userAnswer);
};

const validateQuestionAnswer = (question, userAnswer) => {
  switch (question.type) {
    case 'multiple_choice':
      return userAnswer === question.correctAnswer;
    case 'true_false':
      return userAnswer === question.correctAnswer;
    case 'dropdown':
      return userAnswer === question.correctAnswer;
    case 'matching':
      // For matching, we need to check if all pairs match correctly
      if (!Array.isArray(userAnswer) || !Array.isArray(question.pairs)) {
        return false;
      }
      
      if (userAnswer.length !== question.pairs.length) {
        return false;
      }
      
      // Check if all pairs in userAnswer exist in question.pairs
      return userAnswer.every(userPair => 
        question.pairs.some(correctPair => 
          correctPair.choice === userPair.choice && 
          correctPair.opportunityCost === userPair.opportunityCost
        )
      );
    default:
      return false;
  }
}; 