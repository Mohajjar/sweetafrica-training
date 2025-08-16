"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";

type Step = {
  title: string;
  description: string;
};

export default function MultiStepViewer({ steps }: { steps: Step[] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = steps.length;
  const isLastStep = currentStep === totalSteps;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div className="my-12 rounded-xl border bg-white shadow-lg p-8 text-center relative overflow-hidden">
      {/* Step Content */}
      <div style={{ minHeight: "150px" }}>
        {isLastStep ? (
          <div>
            <h3 className="text-xl font-bold text-gray-900">The End</h3>
            <p className="mt-2 text-gray-600 max-w-lg mx-auto">
              Conducting a thorough pre-clean walkthrough is vital for
              successful cleaning services. By following these steps, you foster
              good communication and understanding of the client's needs,
              leading to a more effective cleaning experience.
            </p>
          </div>
        ) : (
          <div>
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Step {currentStep + 1}
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {steps[currentStep].title}
            </h3>
            <p className="mt-2 text-gray-600 max-w-lg mx-auto">
              {steps[currentStep].description}
            </p>
          </div>
        )}
      </div>

      {/* Navigation and Pagination */}
      <div className="flex items-center justify-between mt-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="p-3 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous Step"
        >
          <FaArrowLeft size={16} />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {[...Array(totalSteps)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              className={`h-3 w-3 rounded-full transition-colors ${
                currentStep === i
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
          <button
            onClick={() => goToStep(totalSteps)}
            className="ml-2"
            aria-label="Final Step"
          >
            <FaCheckCircle
              className={`transition-colors ${
                isLastStep
                  ? "text-blue-600"
                  : "text-gray-300 hover:text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isLastStep}
          className="p-3 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next Step"
        >
          <FaArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
