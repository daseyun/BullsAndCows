function ErrorMessage(props) {
  let errorBody = <div className="alert center">&nbsp;</div>;

  if (props.error) {
    errorBody = <div className="alert center">{props.error}</div>;
  }
  return <div className="row">{errorBody}</div>;
}

export default ErrorMessage;
