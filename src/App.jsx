import "./App.css";
import { useRef, useEffect, useState } from "react";
import React from "react";

// COMPONENTS
import ProgressTab from "./components/ProgressTab";
import Button from "./components/Button";

// TAB SCREENS
import Postcode from "./screens/Postcode";
import WasteType from "./screens/WasteType";
import SelectSkip from "./screens/SelectSkip";
import PermitCheck from "./screens/PermitCheck";
import ChooseDate from "./screens/ChooseDate";
import Payment from "./screens/Payment";

const stepsInitial = [
  {
    step: 1,
    title: "Postcode",
    stepDescription: "NR32",
    screen: <Postcode />,
    data: null,
  },
  {
    step: 2,
    title: "Waste type",
    stepDescription: "Garden Waste",
    screen: <WasteType />,
    data: null,
  },
  {
    step: 3,
    title: "Select Skip",
    stepDescription: "",
    screen: <SelectSkip />,
    data: {},
  },
  {
    step: 4,
    title: "Permit Check",
    stepDescription: "",
    screen: <PermitCheck />,
    data: null,
  },
  {
    step: 5,
    title: "Choose Date",
    stepDescription: "15-06-2025",
    screen: <ChooseDate />,
    data: null,
  },
  {
    step: 6,
    title: "Payment",
    stepDescription: "",
    screen: <Payment />,
    data: null,
  },
];

function App() {
  const [steps, setSteps] = useState([...stepsInitial]);

  const [activeTab, setActiveTab] = useState(steps[2]);
  const tabRefs = useRef({});

  // Scroll to the active tab
  useEffect(() => {
    const currentRef = tabRefs.current[activeTab.step];
    if (currentRef) {
      currentRef.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  const handleContinue = () => {
    const nextStep = activeTab.step + 1;
    const next = steps.find((s) => s.step === nextStep);
    if (next) setActiveTab({ ...next });
  };

  const handleBack = () => {
    const prevStep = activeTab.step - 1;
    const prev = steps.find((s) => s.step === prevStep);
    if (prev) setActiveTab({ ...prev });
  };

  const handleTabData = (value, data = null) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.step === activeTab.step
          ? { ...step, stepDescription: value, data: data }
          : step
      )
    );
    setActiveTab((prev) => ({ ...prev, stepDescription: value }));
  };
  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="relative w-full max-w-6xl flex flex-col flex-grow space-y-5">
        {/* --------- STEPS BAR START -------- */}
        <section
          aria-label="Progress navigation"
          className="w-full overflow-x-auto scrollbar_hide rounded-lg flex justify-between items-start gap-4 p-6 scroll-smooth"
        >
          {steps.map((step, idx) => (
            <div
              key={step.step}
              ref={(el) => (tabRefs.current[step.step] = el)}
              className="flex-shrink-0"
            >
              <ProgressTab
                index={idx}
                step={step}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          ))}
        </section>
        {/* --------- STEPS BAR END -------- */}

        {/* --------- ACTIVE TAB SCREEN START -------- */}
        <section
          aria-label="Skip hiring screens"
          className="w-full flex-grow px-6 pb-16 flex flex-col items-center"
        >
          {React.cloneElement(activeTab.screen, { activeTab, handleTabData })}
        </section>
        {/* --------- ACTIVE TAB SCREEN END -------- */}

        {/* --------- BACK/NEXT BUTTONS -------- */}
        {activeTab.stepDescription && (
          <section className="fixed bottom-0 left-0 flex flex-col items-center w-full bg-gray-100 dark:bg-gray-800 p-3 md:p-6">
            <div className="flex w-full max-w-6xl justify-between items-center">
              <Button onClick={handleBack} variant="ghost">
                Back
              </Button>
              <Button onClick={handleContinue} variant="default">
                Continue
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
