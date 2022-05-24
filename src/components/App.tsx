import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

const _App = (props: AppProps): JSX.Element => {
  const [fetching, setFetching] = useState<boolean>(false);

  const onButtonClick = (): void => {
    props.fetchTodos();
    setFetching(true);
  };

  const onTodoClick = (id: number): void => {
    props.deleteTodo(id);
  };

  useEffect(() => {
    if (fetching && props.todos.length) {
      setFetching(false);
    }
  }, [props.todos, fetching]);

  const renderList = (): JSX.Element[] => {
    return props.todos.map((todo: Todo) => {
      return (
        <div onClick={() => onTodoClick(todo.id)} key={todo.id}>
          {todo.title}
        </div>
      );
    });
  };

  return (
    <div>
      <button onClick={() => onButtonClick()}>Fetch</button>
      <div>{fetching && 'Loading'}</div>
      <div>{renderList()}</div>
    </div>
  );
};

const mapStateToProps = ({ todos }: StoreState): StoreState => {
  return {
    todos,
  };
};

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
