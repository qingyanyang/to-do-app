import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useAppSelector } from './store/hooks';
import message from 'antd/es/message';
import { useEffect } from 'react';

function App() {
  const { error, success } = useAppSelector((state) => state.task);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: 'error',
        content: error,
      });
    }
  }, [error, messageApi]);

  useEffect(() => {
    if (success) {
      messageApi.open({
        type: 'success',
        content: success,
      });
    }
  }, [success, messageApi]);
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
