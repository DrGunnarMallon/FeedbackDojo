import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCourse } from '../features/courses/courseSlice';

function CourseForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createCourse({ title }));
    setTitle('');
  };

  return (
    <section className="panel-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Course</label>
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Course
          </button>
        </div>
      </form>
    </section>
  );
}

export default CourseForm;
