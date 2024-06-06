import React, { useState } from "react";
import { Collapse, Card } from "antd";

import "./App.css"; // Import the custom CSS
import Accordion from "./components/Accordian";

const { Panel } = Collapse;

const initialAccordions = [
  {
    id: 1,
    questions: [
      {
        id: 1,
        text: "All objections regarding price,quality, delivary etc . successfully tackled and customer is in favour of our machine.",
        answer: "No",
      },
      { id: 2, text: "Negotiation is in progress", answer: "No" },
      {
        id: 3,
        text: "All points satisfied from 1 to 8 and customer likely to finalize within the next 1months time . ",
        answer: "No",
      },
    ],
    editable: true,
  },
  {
    id: 2,
    questions: [
      {
        id: 1,
        text: "Customer confirms order with approved blister drawing",
        answer: "No",
      },
      { id: 2, text: "Advance is given", answer: "No" },
      {
        id: 3,
        text: "Final  layout ready as per drawing and is ready at customer site",
        answer: "No",
      },
    ],
    editable: false,
  },
  {
    id: 3,
    questions: [
      { id: 1, text: "Do you like coding?", answer: "No" },
      { id: 2, text: "What is your favorite food?", answer: "No" },
      { id: 3, text: "Do you play video games?", answer: "No" },
      { id: 4, text: "Do you enjoy cooking?", answer: "No" },
      { id: 5, text: "Have you traveled abroad?", answer: "No" },
      { id: 6, text: "Do you have siblings?", answer: "No" },
    ],
    editable: false,
  },
];

function App() {
  const [accordions, setAccordions] = useState(initialAccordions);

  const handleAnswerChange = (accordionId, questionId, newAnswer) => {
    const updatedAccordions = accordions?.map((accordion) => {
      if (accordion.id === accordionId) {
        const updatedQuestions = accordion.questions.map((question) => {
          if (question.id === questionId) {
            return { ...question, answer: newAnswer };
          }
          return question;
        });
        return { ...accordion, questions: updatedQuestions };
      }
      return accordion;
    });

    setAccordions(updatedAccordions);
  };

  const handleSave = (accordionId) => {
    const updatedAccordions = accordions.map((accordion, index) => {
      if (accordion.id === accordionId) {
        const allAnswered = accordion.questions.every(
          (question) => question.answer === "Yes" || question.answer === "NA"
        );
        return { ...accordion, editable: !allAnswered };
      }
      if (index === accordionId) {
        const previousAccordion = accordions[index - 1];
        const allPreviousAnswered = previousAccordion.questions.every(
          (question) => question.answer === "Yes" || question.answer === "NA"
        );
        return { ...accordion, editable: allPreviousAnswered };
      }
      return accordion;
    });

    setAccordions(updatedAccordions);
  };

  return (
    <div className="appContainer">
      <h1 className="header">Dummy Accordian</h1>
      <Card className="cardContainer" title="Questions Set">
        <Collapse accordion>
          {accordions?.map((accordion) => (
            <Panel
              header={` Question Set-  ${accordion.id}`}
              key={accordion.id}
            >
              <Accordion
                accordion={accordion}
                onAnswerChange={handleAnswerChange}
                onSave={handleSave}
              />
            </Panel>
          ))}
        </Collapse>
      </Card>
    </div>
  );
}

export default App;
