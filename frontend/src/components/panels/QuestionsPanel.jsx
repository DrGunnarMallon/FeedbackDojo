import { BsSliders } from 'react-icons/bs';

function QuestionsPanel() {
  function onDragStart(e) {
    e.target.classList.add('dragging');
  }

  function onDragEnd(e) {
    e.target.classList.remove('dragging');
  }

  return (
    <div className="questions-panel">
      <h3>Question types</h3>
      <div
        draggable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        id="open-ended"
        name="open-ended"
        data-type="open-ended"
      >
        Open Ended
      </div>
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        id="slider"
        name="slider"
        data-type="slider"
      >
        <BsSliders /> &nbsp;Sliders
      </div>
      <div
        draggable="true"
        onDragStart={onDragStart}
        id="m-choice"
        name="m-choice"
        onDragEnd={onDragEnd}
        data-type="m-choice"
      >
        Multiple Choice
      </div>
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        id="m-answer"
        name="m-answer"
      >
        Multiple Answer
      </div>
    </div>
  );
}

export default QuestionsPanel;
