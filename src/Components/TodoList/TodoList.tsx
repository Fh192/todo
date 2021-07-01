import React, { useEffect, useState } from 'react';
import css from './TodoList.module.css';
import Task from '../Task/Task';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../store/store';
import { ITask, ITodoList } from '../../types/todoTypes';
import { getTodoListTasks, addNewTask } from '../../store/reducers/todoReducer';
import NoData from '../SVG/NoData';
import * as Yup from 'yup';

const CreateTaskValidationSchema = Yup.object().shape({
  title: Yup.string().max(100, 'Max length is 100 symbols'),
});

interface withRouterProps {
  todoListId: string;
}

interface MapStateProps {
  todoLists: Array<ITodoList>;
  tasks: Array<ITask>;
  tasksCount: number;
}

interface MapDispatchProps {
  getTodoListTasks: (
    todoListId: string,
    pageSize?: number,
    pageNumber?: number
  ) => void;
  addNewTask: (todoListId: string, title: string) => void;
}

type Props = MapStateProps &
  MapDispatchProps &
  RouteComponentProps<withRouterProps>;

const TodoList: React.FC<Props> = ({
  todoLists,
  tasks,
  tasksCount,
  getTodoListTasks,
  ...props
}) => {
  useEffect(
    () => getTodoListTasks(props.match.params.todoListId),
    [props.match.params.todoListId]
  );

  const [createTaskMode, setCreateTaskMode] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState(10);

  const todoList = todoLists.find(
    todoList => todoList.id === props.match.params.todoListId
  );

  return (
    <div className={css.todoListWrapper}>
      <div className={css.todoList}>
        <header className={css.header}>
          <div className={css.title}>{todoList?.title}</div>
          <div className={css.addDate}>{todoList?.addedDate.split('T')[0]}</div>
        </header>
        <div className={css.content}>
          <div className={css.createTask}>
            {createTaskMode ? (
              <>
                <Formik
                  initialValues={{ title: '' }}
                  onSubmit={(values: { title: string }) => {
                    //@ts-ignore
                    props.addNewTask(todoList?.id, values.title);
                    setCreateTaskMode(false);
                  }}
                  validationSchema={CreateTaskValidationSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className={css.inner}>
                        <Field
                          name='title'
                          placeholder='Task title...'
                          autoFocus
                        />
                        {errors.title && (
                          <div className={css.error}>{errors.title}</div>
                        )}
                      </div>

                      <button
                        className={`${css.button} ${errors.title && css.error}`}
                        disabled={!!errors.title}
                        type='submit'
                      >
                        Create
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <button
                className={css.button}
                onClick={() => setCreateTaskMode(true)}
              >
                Create new task
              </button>
            )}
          </div>
          <div className={css.tasks}>
            {tasks.length !== 0 ? (
              tasks
                .sort((a, b) => (a.order > b.order ? 1 : -1))
                .map(task => <Task key={task.id} task={task} />)
            ) : (
              <div className={css.noTasks}>
                <span className={css.noTasksText}>No tasks yet</span>
                <NoData size='100px' />
              </div>
            )}
            <div
              className={css.loadMore}
              onClick={() => {
                if (pageSize < tasksCount) {
                  setPageSize(pageSize => pageSize + 10);
                  //@ts-ignore
                  getTodoListTasks(todoList?.id, pageSize + 10);
                } else {
                  setPageSize(10);
                  //@ts-ignore
                  getTodoListTasks(todoList?.id, 10);
                }
              }}
            >
              {tasksCount > 10 && (
                <button>{pageSize < tasksCount ? `Load more` : `Hide`}</button>
              )}
            </div>
            {console.log(pageSize, tasksCount, tasksCount)}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  tasks: state.todo.tasks,
  tasksCount: state.todo.tasksCount,
  todoLists: state.todo.todoLists,
});

export default withRouter(
  connect(mapStateToProps, { getTodoListTasks, addNewTask })(TodoList)
);
