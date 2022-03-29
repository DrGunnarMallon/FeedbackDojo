import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainPanel from '../components/panels/MainPanel';
import Spinner from '../components/Spinner';
import { reset, getQuestionnaires } from '../features/questionnaire/questionnaireSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { questionnaires, isLoading, isError, message } = useSelector(
    (state) => state.questionnaires
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getQuestionnaires());

    return () => dispatch(reset());
  }, [user, navigate, dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="main-dashboard">
        <MainPanel />
      </div>
    </>
  );
}

export default Dashboard;
