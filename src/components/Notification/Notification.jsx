import PropTypes from 'prop-types';
import s from './Notification.module.css';

function Notification({ text }) {
  return <p className="notification-text">{text}</p>;
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Notification;
