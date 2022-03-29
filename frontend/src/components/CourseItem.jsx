import { useDispatch } from 'react-redux';
import { deleteCourse } from '../features/courses/courseSlice';
import { FaRegTrashAlt } from 'react-icons/fa';

function CourseItem({ course }) {
  const dispatch = useDispatch();

  return (
    <div className="course">
      <p>{course.title}</p>
      <button className="close" onClick={() => dispatch(deleteCourse(course._id))}>
        <FaRegTrashAlt />
      </button>
    </div>
  );
}

export default CourseItem;
