"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Trophy, CheckCircle2, XCircle, Share2, Award, ChevronRight } from "lucide-react"

const QUESTIONS = [
  {
    question: "In what year was the 19th Amendment ratified, granting women the right to vote?",
    options: ["1910", "1920", "1930", "1940"],
    answer: "1920",
    explanation: "The 19th Amendment was ratified on August 18, 1920."
  },
  {
    question: "What is the minimum age to vote in a U.S. federal election?",
    options: ["16", "18", "21", "25"],
    answer: "18",
    explanation: "The 26th Amendment lowered the voting age to 18 in 1971."
  },
  {
    question: "True or False: You must be a U.S. citizen to vote in federal elections.",
    options: ["True", "False"],
    answer: "True",
    explanation: "U.S. citizenship is a requirement for voting in federal elections."
  },
  {
    question: "How often are members of the U.S. House of Representatives elected?",
    options: ["Every year", "Every 2 years", "Every 4 years", "Every 6 years"],
    answer: "Every 2 years",
    explanation: "Representatives serve two-year terms."
  },
  {
    question: "What is the Electoral College?",
    options: ["A university for politicians", "A body of electors who formally elect the President", "The building where votes are counted", "A group of judges"],
    answer: "A body of electors who formally elect the President",
    explanation: "The Electoral College consists of 538 electors who cast votes for President and Vice President."
  },
  {
    question: "Which amendment abolished poll taxes?",
    options: ["15th", "19th", "24th", "26th"],
    answer: "24th",
    explanation: "The 24th Amendment, ratified in 1964, prohibited poll taxes in federal elections."
  },
  {
    question: "True or False: The President is elected by direct popular vote.",
    options: ["True", "False"],
    answer: "False",
    explanation: "The President is elected by the Electoral College, not directly by popular vote."
  },
  {
    question: "How many senators does each state have?",
    options: ["Based on population", "1", "2", "4"],
    answer: "2",
    explanation: "Each state has exactly two senators, regardless of size or population."
  },
  {
    question: "What is 'Gerrymandering'?",
    options: ["A type of election software", "Manipulating district boundaries to favor a party", "A way to count mail-in ballots", "Voting twice in the same election"],
    answer: "Manipulating district boundaries to favor a party",
    explanation: "Gerrymandering is the practice of drawing electoral district lines to give an advantage to one party."
  },
  {
    question: "Which of these is NOT a requirement to register to vote in most states?",
    options: ["U.S. Citizenship", "Residency in the state", "Age 18 by election day", "Owning property"],
    answer: "Owning property",
    explanation: "Property ownership is not a requirement to vote."
  },
  {
    question: "What is an 'Incumbent'?",
    options: ["A first-time candidate", "A candidate currently holding the office", "An election official", "A voter who hasn't decided"],
    answer: "A candidate currently holding the office",
    explanation: "An incumbent is the current holder of an office or post."
  },
  {
    question: "True or False: Some states allow you to register to vote on Election Day.",
    options: ["True", "False"],
    answer: "True",
    explanation: "Several states offer Same-Day Registration (SDR)."
  },
  {
    question: "What does 'disenfranchisement' mean?",
    options: ["Winning an election by a landslide", "The revocation of the right to vote", "Joining a political party", "Running for office"],
    answer: "The revocation of the right to vote",
    explanation: "Disenfranchisement is being deprived of a right or privilege, especially the right to vote."
  },
  {
    question: "Who becomes President if both the President and Vice President can no longer serve?",
    options: ["Secretary of State", "Speaker of the House", "Chief Justice", "President Pro Tempore of the Senate"],
    answer: "Speaker of the House",
    explanation: "The Speaker of the House is second in the line of presidential succession."
  },
  {
    question: "What is a 'Swing State'?",
    options: ["A state where playground equipment is made", "A state where either candidate could reasonably win", "A state that always votes for the same party", "A state with no electoral votes"],
    answer: "A state where either candidate could reasonably win",
    explanation: "Swing states (or battleground states) are those where the population is closely divided politically."
  }
];

export function QuizEngine() {
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [personalBest, setPersonalBest] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("civiciq_quiz_best")
    if (saved) setPersonalBest(parseInt(saved))
  }, [])

  useEffect(() => {
    if (showResult && score > personalBest) {
      setPersonalBest(score)
      localStorage.setItem("civiciq_quiz_best", score.toString())
    }
  }, [showResult, score, personalBest])

  const handleAnswer = (option: string) => {
    if (isAnswered) return
    setSelectedOption(option)
    setIsAnswered(true)
    if (option === QUESTIONS[currentStep].answer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const getBadge = (s: number) => {
    const percent = (s / QUESTIONS.length) * 100
    if (percent === 100) return { title: "Democracy Champion", icon: <Trophy className="h-12 w-12 text-yellow-500" /> }
    if (percent >= 70) return { title: "Civic Expert", icon: <Award className="h-12 w-12 text-blue-500" /> }
    return { title: "Civic Novice", icon: <Award className="h-12 w-12 text-gray-500" /> }
  }

  const shareScore = () => {
    alert("Score shared! (Image generation simulated)")
  }

  if (showResult) {
    const badge = getBadge(score)
    return (
      <div className="max-w-2xl mx-auto p-8 bg-surface rounded-custom shadow-custom text-center animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          {badge.icon}
        </div>
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-xl mb-6">You earned the <span className="text-primary font-bold">{badge.title}</span> badge.</p>
        <div className="bg-bg p-6 rounded-lg mb-8">
          <p className="text-4xl font-bold text-primary">{score} / {QUESTIONS.length}</p>
          <p className="text-primary/60">Correct Answers</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
          <Button onClick={shareScore} className="gap-2">
            <Share2 className="h-4 w-4" /> Share Score
          </Button>
        </div>

        {personalBest > 0 && (
          <div className="mt-8 pt-8 border-t border-primary/10">
            <p className="text-sm text-primary/60 font-medium uppercase tracking-wider">Your Personal Best</p>
            <p className="text-2xl font-bold text-primary">{personalBest} / {QUESTIONS.length}</p>
          </div>
        )}
      </div>
    )
  }

  const q = QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100

  return (
    <div className="max-w-3xl mx-auto w-full bg-surface rounded-custom shadow-custom border border-primary/10 overflow-hidden">
      <div className="h-2 bg-primary/10 w-full">
        <div 
          className="h-full bg-primary transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-8 md:p-12">
        <div className="mb-8">
          <span className="text-sm font-bold text-primary/50 uppercase tracking-widest">Question {currentStep + 1} of {QUESTIONS.length}</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 leading-tight">{q.question}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {q.options.map((option) => {
            const isCorrect = isAnswered && option === q.answer
            const isWrong = isAnswered && selectedOption === option && option !== q.answer
            
            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all flex justify-between items-center
                  ${!isAnswered ? "border-primary/10 hover:border-primary/40 hover:bg-primary/5" : ""}
                  ${isCorrect ? "border-success bg-success/10 text-success font-bold" : ""}
                  ${isWrong ? "border-red-500 bg-red-500/10 text-red-500 font-bold" : ""}
                  ${isAnswered && option !== q.answer && option !== selectedOption ? "opacity-50" : ""}
                `}
              >
                <span>{option}</span>
                {isCorrect && <CheckCircle2 className="h-5 w-5" />}
                {isWrong && <XCircle className="h-5 w-5" />}
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <div className="bg-primary/5 p-6 rounded-lg mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <h4 className="font-bold text-primary mb-1">Explanation:</h4>
            <p className="text-primary/80">{q.explanation}</p>
          </div>
        )}

        <div className="flex justify-end">
          <Button 
            onClick={nextQuestion} 
            disabled={!isAnswered}
            className="gap-2"
          >
            {currentStep === QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
