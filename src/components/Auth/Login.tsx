import React from "react";

export interface ILoginProps {}

export interface ILoginState {}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>Login</div>;
  }
}

export default Login;
