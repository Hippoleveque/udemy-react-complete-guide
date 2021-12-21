import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from "../../hooks/http-hook"

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest} = useHttp();

  const transformData = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    const requestConfig = {
      url: 'https://react-http-78834-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      method: "POST",
      body: {text: taskText},
      headers: {
        'Content-Type': 'application/json',
      }
    }

    sendTaskRequest(requestConfig, transformData.bind(null, taskText))

  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

