import { Spinner } from "react-bootstrap";

export const SpinLoading = ({ loading, props }) => {
  return <>{loading && <Spinner animation="border" role="status"></Spinner>}</>;
};
