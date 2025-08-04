export const riskManagementLessons = {
  skillName: "Risk Management",
  skillDescription: "Learn how to identify, assess, and manage risks in your personal and financial life.",
  levels: [
    {
      level: 1,
      title: "What Is Risk Management?",
      explanation: "Life is full of surprises. Some good, some not so much. Risk management is all about spotting what could go wrong—and planning what to do about it. Whether you're saving money, deciding where to invest, or just planning for the future, learning how to handle risks helps you stay in control.",
      questions: [
        {
          id: 1,
          type: "true_false",
          question: "Risk is anything that could cause you harm, loss, or trouble.",
          correctAnswer: true,
          explanation: "Risk is indeed anything that could cause harm, loss, or trouble. It's the possibility of something bad happening."
        },
        {
          id: 2,
          type: "multiple_choice",
          question: "Which of the following is an example of a financial risk?",
          options: [
            "Going for a walk",
            "Losing your job",
            "Watching TV",
            "Listening to music"
          ],
          correctAnswer: 1,
          explanation: "Losing your job is a financial risk because it can cause you to lose income and financial stability."
        },
        {
          id: 3,
          type: "multiple_choice",
          question: "When you manage risk, you prepare for the chance something might go wrong.",
          options: [
            "safety",
            "risk",
            "plan",
            "loss"
          ],
          correctAnswer: 1,
          explanation: "Risk management involves preparing for the chance something might go wrong."
        },
        {
          id: 4,
          type: "multiple_choice",
          question: "Which of these situations shows you are managing risk?",
          options: [
            "Ignoring your bank account",
            "Spending all your money quickly",
            "Saving money for emergencies",
            "Buying things without thinking"
          ],
          correctAnswer: 2,
          explanation: "Saving money for emergencies is a form of risk management because you're preparing for unexpected financial challenges."
        },
        {
          id: 5,
          type: "matching",
          question: "Match each situation with whether it's a risk or not:",
          pairs: [
            { choice: "Not studying for a big test", opportunityCost: "Yes" },
            { choice: "Wearing a helmet while biking", opportunityCost: "No" },
            { choice: "Spending all your savings", opportunityCost: "Yes" },
            { choice: "Having health insurance", opportunityCost: "No" }
          ],
          explanation: "Not studying and spending all savings are risks, while wearing a helmet and having insurance are risk management strategies."
        }
      ]
    },
    {
      level: 2,
      title: "Spotting Risk in Real Life",
      explanation: "Now that you know what risk is, let's talk about how to find it. Risks can hide in everyday choices—like how you spend your money, what you do with your time, or who you trust. The trick is learning to notice them before they become problems.",
      questions: [
        {
          id: 1,
          type: "true_false",
          question: "Risk always looks obvious and easy to see.",
          correctAnswer: false,
          explanation: "Risk doesn't always look obvious. Some risks are hidden and not immediately apparent."
        },
        {
          id: 2,
          type: "multiple_choice",
          question: "Which of these is an example of hidden risk?",
          options: [
            "A visible pothole in the road",
            "A job that seems fun but doesn't pay well",
            "A loud thunderstorm",
            "A big red warning sign"
          ],
          correctAnswer: 1,
          explanation: "A job that seems fun but doesn't pay well is a hidden risk because the low pay might not be immediately obvious."
        },
        {
          id: 3,
          type: "multiple_choice",
          question: "Some risks don't involve money—they can also cost you time.",
          options: [
            "decision",
            "danger",
            "money",
            "time"
          ],
          correctAnswer: 3,
          explanation: "Some risks can cost you time, not just money. Time is also a valuable resource."
        },
        {
          id: 4,
          type: "multiple_choice",
          question: "You spend all your allowance on games and don't save any. What type of risk might that be?",
          options: [
            "Time risk",
            "No risk",
            "Financial risk",
            "Health risk"
          ],
          correctAnswer: 2,
          explanation: "Spending all your money without saving creates financial risk because you won't have money for emergencies."
        },
        {
          id: 5,
          type: "matching",
          question: "Match each situation with the type of risk it involves:",
          pairs: [
            { choice: "Not saving money", opportunityCost: "Financial" },
            { choice: "Not wearing sunscreen", opportunityCost: "Health" },
            { choice: "Trusting a stranger online", opportunityCost: "Social" },
            { choice: "Wasting hours on unimportant tasks", opportunityCost: "Time" }
          ],
          explanation: "Each situation involves different types of risks: financial, health, social, and time risks."
        }
      ]
    },
    {
      level: 3,
      title: "Smart Choices – Risk Strategies That Work",
      explanation: "By now, you understand how to recognize risk and measure how risky a situation is. But what do you actually do with that information? You manage it. There are four main strategies used to manage risk effectively: Risk Avoidance, Risk Reduction, Risk Transfer, and Risk Retention.",
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "You decide not to invest in a new business because it's too risky. What risk management strategy is this?",
          options: [
            "Risk Reduction",
            "Risk Transfer",
            "Risk Retention",
            "Risk Avoidance"
          ],
          correctAnswer: 3,
          explanation: "Choosing not to invest at all is risk avoidance - you completely avoid the activity that brings the risk."
        },
        {
          id: 2,
          type: "true_false",
          question: "Buying car insurance is an example of risk reduction.",
          correctAnswer: false,
          explanation: "Buying car insurance is risk transfer, not risk reduction. You're transferring the risk to the insurance company."
        },
        {
          id: 3,
          type: "multiple_choice",
          question: "Wearing a seatbelt is a form of risk reduction.",
          options: [
            "Retention",
            "Reduction",
            "Avoidance",
            "Transfer"
          ],
          correctAnswer: 1,
          explanation: "Wearing a seatbelt reduces the chance of injury in an accident, so it's risk reduction."
        },
        {
          id: 4,
          type: "multiple_choice",
          question: "You take the chance of not buying travel insurance and hope everything goes fine. What strategy are you using?",
          options: [
            "Transfer",
            "Avoidance",
            "Retention",
            "Reduction"
          ],
          correctAnswer: 2,
          explanation: "Choosing not to buy insurance and accepting the risk is risk retention."
        },
        {
          id: 5,
          type: "matching",
          question: "Match each situation to the correct strategy:",
          pairs: [
            { choice: "You don't ski because it feels dangerous", opportunityCost: "Avoidance" },
            { choice: "You install antivirus software on your laptop", opportunityCost: "Reduction" },
            { choice: "You buy health insurance", opportunityCost: "Transfer" },
            { choice: "You choose not to insure your old phone", opportunityCost: "Retention" }
          ],
          explanation: "Each situation demonstrates a different risk management strategy: avoiding, reducing, transferring, or retaining risk."
        }
      ]
    },
    {
      level: 4,
      title: "Recap Challenge – Real-World Risk Decisions",
      explanation: "You've learned what risk is, how to spot it, and how to manage it. Now it's time to put it all together. This lesson starts with some review questions. Then, you'll enter a real-life scenario where you make choices for a character and manage risks along the way.",
      isInteractive: true,
      steps: [
        {
          title: "Review Questions",
          question: "Let's start with some review questions to test your knowledge:",
          options: [
            "Start Review Questions"
          ],
          followUpQuestions: [
            {
              type: "true_false",
              question: "All risks can be removed completely.",
              correctAnswer: false,
              explanation: "Not all risks can be removed completely. Some risks are inherent and can only be managed, not eliminated."
            },
            {
              type: "multiple_choice",
              question: "Which of these is an example of risk transfer?",
              options: [
                "Skipping class",
                "Buying insurance",
                "Avoiding a party",
                "Deleting your account"
              ],
              correctAnswer: 1,
              explanation: "Buying insurance is risk transfer because you're shifting the risk to the insurance company."
            },
            {
              type: "multiple_choice",
              question: "A good plan helps reduce the impact of unexpected problems.",
              options: [
                "Risk",
                "Plan",
                "Strategy",
                "Loss"
              ],
              correctAnswer: 1,
              explanation: "A good plan helps reduce the impact of unexpected problems."
            },
            {
              type: "multiple_choice",
              question: "What's the best strategy for handling a small risk that won't cost much if it happens?",
              options: [
                "Avoidance",
                "Transfer",
                "Retention",
                "Reduction"
              ],
              correctAnswer: 2,
              explanation: "For small risks that won't cost much, risk retention is often the most practical strategy."
            },
            {
              type: "matching",
              question: "Match the situation to the strategy:",
              pairs: [
                { choice: "You stop riding your bike", opportunityCost: "Avoidance" },
                { choice: "You wear a helmet while biking", opportunityCost: "Reduction" },
                { choice: "You get bike insurance", opportunityCost: "Transfer" },
                { choice: "You ride without insurance", opportunityCost: "Retention" }
              ],
              explanation: "Each situation shows a different risk management strategy: avoiding, reducing, transferring, or retaining risk."
            }
          ]
        },
        {
          title: "Mia's Internship Dilemma",
          question: "Mia just got accepted to a summer internship at a tech company. It's unpaid, but offers great experience. She also got offered a paid summer job at a café. She must choose. What's the main financial risk of choosing the internship?",
          options: [
            "Missing out on experience",
            "Losing her summer free time",
            "Not making any money",
            "Not learning to make coffee"
          ],
          followUpQuestion: {
            type: "multiple_choice",
            question: "Why is not making money the main financial risk?",
            options: [
              "Because money is always more important than experience",
              "Because she needs money for expenses and savings",
              "Because café jobs are better than tech internships",
              "Because unpaid work is always a bad choice"
            ],
            correctAnswer: 1,
            explanation: "Not making money is the main financial risk because Mia likely needs money for expenses and savings during the summer."
          }
        },
        {
          title: "Managing Time",
          question: "Mia takes the internship. It's fun, but time-consuming. Her grades might drop. What type of risk is this?",
          options: [
            "Financial",
            "Time",
            "Health",
            "No risk"
          ],
          followUpQuestion: {
            type: "multiple_choice",
            question: "Why is this a time risk?",
            options: [
              "Because time is money",
              "Because she might not have enough time for studying",
              "Because internships are always time-consuming",
              "Because she should have chosen the café job"
            ],
            correctAnswer: 1,
            explanation: "This is a time risk because the internship might take up so much time that Mia doesn't have enough time for studying, which could affect her grades."
          }
        },
        {
          title: "Safety Net",
          question: "Mia thinks about setting aside money just in case. What risk strategy is she using?",
          options: [
            "Avoidance",
            "Retention",
            "Transfer",
            "Reduction"
          ],
          followUpQuestion: {
            type: "multiple_choice",
            question: "How does setting aside money reduce risk?",
            options: [
              "It makes the internship paid",
              "It provides a financial safety net for unexpected expenses",
              "It guarantees she won't need money",
              "It makes the internship less time-consuming"
            ],
            correctAnswer: 1,
            explanation: "Setting aside money reduces risk by providing a financial safety net for unexpected expenses during the unpaid internship."
          }
        },
        {
          title: "Parents Offer Help",
          question: "Her parents offer to cover her lunch and transport. What strategy does this represent?",
          options: [
            "Transfer",
            "Avoidance",
            "Reduction",
            "Retention"
          ],
          followUpQuestion: {
            type: "multiple_choice",
            question: "How is this risk transfer?",
            options: [
              "Because her parents are taking on some of the financial burden",
              "Because they're avoiding the internship",
              "Because they're reducing the time commitment",
              "Because they're retaining all the risk"
            ],
            correctAnswer: 0,
            explanation: "This is risk transfer because Mia's parents are taking on some of the financial burden, transferring part of the financial risk from Mia to themselves."
          }
        },
        {
          title: "Looking Ahead",
          question: "Mia completes the internship. It leads to a part-time job during the school year. Was Mia's choice risky?",
          options: [
            "Yes, but she managed it well",
            "No risk at all",
            "It was the worst option",
            "Only if she needed money fast"
          ],
          followUpQuestion: {
            type: "multiple_choice",
            question: "What made Mia's risk management successful?",
            options: [
              "She avoided all risks completely",
              "She used multiple strategies: reduction (saving money) and transfer (parental help)",
              "She transferred all risks to her parents",
              "She retained all risks and got lucky"
            ],
            correctAnswer: 1,
            explanation: "Mia's risk management was successful because she used multiple strategies: risk reduction (saving money) and risk transfer (parental help), which helped her manage the financial risks of the unpaid internship."
          }
        }
      ]
    }
  ]
};

export const getLevel = (levelNumber) => {
  return riskManagementLessons.levels.find(level => level.level === levelNumber);
}; 