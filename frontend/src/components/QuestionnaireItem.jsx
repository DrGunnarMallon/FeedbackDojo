import React from 'react';

function QuestionnaireItem({ questionnaire }) {
  return (
    <div className="questionnaire-item">
      <div>{questionnaire.title}</div>
      <div>{questionnaire.course || 'n/a'}</div>
      <div>{questionnaire.order}</div>
      <div>
        {new Date(questionnaire.date).toLocaleDateString('en-gb', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
      <div>ACTIONS</div>
    </div>
  );
}

export default QuestionnaireItem;
