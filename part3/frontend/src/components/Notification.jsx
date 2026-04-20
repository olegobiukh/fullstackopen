const Notification = ({ message }) => {
  return (
    <div className={`notification notification--${message.type}`}>
      {message.text}
    </div>
  );
};

export default Notification;
