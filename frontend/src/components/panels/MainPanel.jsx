import { useSelector } from 'react-redux';
import QuestionnaireItem from '../QuestionnaireItem';

function MainPanel() {
  const { questionnaires } = useSelector((state) => state.questionnaires);

  return (
    <div className="main-panel">
      <h1>Feedback questionnaires</h1>
      {questionnaires &&
        questionnaires.map((questionnaire) => (
          <div key={questionnaire._id}>
            <QuestionnaireItem questionnaire={questionnaire} />
          </div>
        ))}
    </div>
  );
}

export default MainPanel;
