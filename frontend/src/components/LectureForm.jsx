import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLecture } from '../features/lectures/lectureSlice';

function LectureForm() {
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
  });

  const { title, courseId } = formData;
  const { courses } = useSelector((state) => state.courses);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createLecture(formData));
    setFormData({ title: '', courseId: '' });
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Lecture</label>
          <input type="text" value={title} name="title" id="title" onChange={onChange} />
        </div>
        <div className="form-group">
          <select
            className="form-select"
            name="courseId"
            id="courseId"
            onChange={onChange}
            value={courseId}
          >
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Lecture
          </button>
        </div>
      </form>
    </section>
  );
}

export default LectureForm;
