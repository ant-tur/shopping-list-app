import classNames from 'classnames';

const Message = ({ message, error }) => {
  return (
    <div className={classNames('message-window', { 'error-message': error })}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
