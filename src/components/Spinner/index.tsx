import * as React from "react";
import "./index.css";

export interface ISpinnerProps {}

export default class Spinner extends React.Component<ISpinnerProps, any> {
  public render() {
    return (
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    );
  }
}
