import React, { useState } from "react";
import { Collapse, Card } from "antd";

import "./App.css"; // Import the custom CSS
import Accordion from "./components/Accordian";

const { Panel } = Collapse;

const initialAccordions = [
  {
    id: 1,
    questions: [
      { id: 1, text: "What is your name?", answer: "No" },
      { id: 2, text: "What is your age?", answer: "No" },
      { id: 3, text: "Do you have any pets?", answer: "No" },
      { id: 4, text: "What is your favorite color?", answer: "No" },
      { id: 5, text: "Do you like to travel?", answer: "No" },
      { id: 6, text: "Do you play any sports?", answer: "No" },
    ],
    editable: true,
  },
  {
    id: 2,
    questions: [
      { id: 1, text: "What is your job?", answer: "No" },
      { id: 2, text: "Where do you live?", answer: "No" },
      { id: 3, text: "Do you have a car?", answer: "No" },
      { id: 4, text: "What is your hobby?", answer: "No" },
      { id: 5, text: "Do you like reading?", answer: "No" },
      { id: 6, text: "Do you watch movies?", answer: "No" },
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
  {
    id: 4,
    questions: [
      { id: 1, text: "Do you like music?", answer: "No" },
      { id: 2, text: "What is your favorite season?", answer: "No" },
      { id: 3, text: "Do you like hiking?", answer: "No" },
      { id: 4, text: "What is your dream job?", answer: "No" },
      { id: 5, text: "Do you like painting?", answer: "No" },
      { id: 6, text: "Do you follow any sports?", answer: "No" },
    ],
    editable: false,
  },
];

function App() {
  const [accordions, setAccordions] = useState(initialAccordions);

  const handleAnswerChange = (accordionId, questionId, newAnswer) => {
    const updatedAccordions = accordions.map((accordion) => {
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
      <Card className="cardContainer" title="Accordion Questionnaire">
        <Collapse accordion>
          {accordions.map((accordion) => (
            <Panel header={`Accordion ${accordion.id}`} key={accordion.id}>
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
