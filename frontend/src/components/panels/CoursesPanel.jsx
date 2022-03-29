import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, getCourses } from '../../features/courses/courseSlice';
import CourseForm from '../../components/CourseForm';
import CourseItem from '../../components/CourseItem';
import Spinner from '../../components/Spinner';

function CoursesPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { courses, isLoading, isError, message } = useSelector((state) => state.courses);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getCourses());

    return () => dispatch(reset());
  }, [user, navigate, dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  // Dragging
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
      }
    ).element;
  }

  function onDragOver(e) {
    e.preventDefault();

    const container = document.querySelector('.draggable-container');

    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');

    if (afterElement === null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  }

  function onDragStart(e) {
    e.target.classList.add('dragging');
  }

  function onDragEnd(e) {
    e.target.classList.remove('dragging');
  }

  return (
    <div className="courses-panel">
      <section className="panel-header">
        <p>Courses</p>
      </section>
      <CourseForm />
      <div>
        <div className="draggable-container" onDragOver={onDragOver}>
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="courses draggable"
                draggable="true"
                id={course._id}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              >
                <CourseItem course={course} />
              </div>
            ))
          ) : (
            <h3>You have added any courses yet</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursesPanel;
