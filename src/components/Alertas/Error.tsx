import React from "react";

export interface IErrorProps {
  error: string;
}

function Error(props: IErrorProps) {
  return (
    <p className="alert alert-danger text-center p-2 mb-2">{props.error}</p>
  );
}

export default Error;
