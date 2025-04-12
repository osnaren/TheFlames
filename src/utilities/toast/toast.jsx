import toast from 'react-hot-toast';

export default function reactNotify(props) {
  const message = props.message;
  const type = props.type;
  const options = props.options;

  if (type === 'success') {
    toast.success(message, options);
    return;
  } else if (type === 'error') {
    toast.error(message, options);
  } else {
    toast(message, options);
  }
}
