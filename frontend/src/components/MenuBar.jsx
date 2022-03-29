import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdHelp } from 'react-icons/md';

function MenuBar() {
  const navigate = useNavigate();

  return (
    <menu className="menu-bar">
      <div className="menu-buttons">
        <button className="btn menu-button" onClick={() => navigate('/newquestionnaire')}>
          <FaPlusCircle /> Add new Questionnaire
        </button>
        <button className="btn menu-button">
          <FaPlusCircle /> Create new Report
        </button>
      </div>
      <button className="btn menu-button">
        <MdHelp /> Help
      </button>
    </menu>
  );
}

export default MenuBar;
