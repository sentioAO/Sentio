/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import  { useState, useEffect } from 'react'

const steps = [
  { id: 1, title: "Install Package", description: "Install Sentinel Package", emoji: "📦" },
  { id: 2, title: "Setup Sentinel ID", description: "Configure your unique sentinel identifier", emoji: "🔐" },
  { id: 3, title: "Start Analyzing", description: "Begin the text analysis process", emoji: "🔍" },
]

export default function StepAnimation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
        setIsVisible(true)
      }, 500) // Wait for fade out before changing step
    }, 3000) // Change step every 3 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#9966FF]">
          Sentinel Demo
        </h2>
        <div className="relative h-48">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
                index === currentStep ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-100 mb-2 flex items-center">
                  <span className="mr-2 text-2xl" role="img" aria-label={`Step ${step.id} icon`}>
                    {step.emoji}
                  </span>
                  Step {step.id}: {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              <div className="flex justify-center">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full mx-1 ${
                      i <= index ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}