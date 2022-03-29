import { useDispatch } from 'react-redux';
import { deleteLecture } from '../features/lectures/lectureSlice';
import { FaRegTrashAlt } from 'react-icons/fa';

function LectureItem({ lecture }) {
  const dispatch = useDispatch();

  if (!lecture) {
    return <div>Nothing</div>;
  }

  return (
    <div className="lecture">
      <div>{lecture.courseId}</div>
      <h2>{lecture.title}</h2>
      <button className="close" onClick={() => dispatch(deleteLecture(lecture._id))}>
        <FaRegTrashAlt />
      </button>
    </div>
  );
}

export default LectureItem;
