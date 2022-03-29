import { useState } from 'react';
import CoursesPanel from '../components/panels/CoursesPanel';
import { useSelector } from 'react-redux';
import { FaPlusCircle } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QuestionsPanel from '../components/panels/QuestionsPanel';
import OpenEndedQuestion from '../components/questions/OpenEndedQuestion';
import ReactDOM from 'react-dom';

function NewQuestionnaire() {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [startValue, setStartValue] = useState('');
  const [endValue, setEndValue] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    setCourse(e.target.value);
  };

  const { courses, isLoading, isError, message } = useSelector((state) => state.courses);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#452465',
      },
      secondary: {
        main: '#e91e63',
      },
    },
  });

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e) {
    const container = document.querySelector('.questions-area');
    const draggable = document.querySelector('.dragging');
    const questionType = draggable.getAttribute('data-type');
    let newElement;

    switch (questionType) {
      case 'open-ended':
        setQuestions((prevQuestions) => [...prevQuestions, <OpenEndedQuestion />]);
        break;
      default:
        break;
    }

    console.log(questions);
  }

  return (
    <div className="newquestionnaire-panel">
      <div className="main-panel">
        <h1>Add new Questionnaire</h1>
        <ThemeProvider theme={theme}>
          <form className="newQuestionnaire-form">
            <FormControl fullWidth>
              <TextField
                label="Questionnaire Title"
                color="primary"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <div className="datetime-picker">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="Start Time/Date"
                  value={startValue}
                  onChange={(newValue) => {
                    setStartValue(newValue);
                  }}
                  minDateTime={new Date()}
                />
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="End Time/Date"
                  value={endValue}
                  onChange={(newValue) => {
                    setEndValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>

            <FormControl fullWidth>
              <InputLabel id="course-label">Select a course</InputLabel>
              <Select
                labelId="course-label"
                id="course"
                value={course}
                label="Select a course"
                onChange={handleChange}
              >
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </ThemeProvider>
        <div className="questions-area" onDragOver={onDragOver} onDrop={onDrop}>
          <p>Questions (drag and drop here)</p>
          {questions.map((question) => question)}
        </div>
        <button className="btn btn-block">Create questionnaire</button>
      </div>
      <div className="side-panel">
        <QuestionsPanel />
        <CoursesPanel />
      </div>
    </div>
  );
}

export default NewQuestionnaire;
