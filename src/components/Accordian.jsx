import React, { useState } from "react";
import { Button } from "antd";
import Question from "./Questions";

const Accordion = ({ accordion, onAnswerChange, onSave }) => {
  const [showButtons, setShowButtons] = useState(false);

  const handleRadioChange = (questionId, newAnswer) => {
    onAnswerChange(accordion.id, questionId, newAnswer);
    setShowButtons(true);
  };

  const handleSave = () => {
    onSave(accordion.id);
    setShowButtons(false);
  };

  const handleCancel = () => {
    setShowButtons(false);
  };

  return (
    <div>
      {accordion.questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          editable={accordion.editable}
          onRadioChange={handleRadioChange}
        />
      ))}
      {showButtons && (
        <div style={{ marginTop: "10px", textAlign: "right" }}>
          <Button
            type="primary"
            onClick={handleSave}
            style={{
              marginRight: "10px",
              background: "#172b4d",
              color: "white",
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            style={{ background: "red", color: "white" }}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default Accordion;
