import React from "react";
import { Radio } from "antd";

const Question = ({ question, editable, onRadioChange }) => {
  const handleChange = (e) => {
    onRadioChange(question.id, e.target.value);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <p>{question.text}</p>
      <Radio.Group
        onChange={handleChange}
        value={question.answer}
        disabled={!editable}
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
        <Radio value="NA">NA</Radio>
      </Radio.Group>
    </div>
  );
};

export default Question;
