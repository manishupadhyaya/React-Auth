import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "redux-zero/react";
import actions from "./actions";

const mapToProps = ({ isAuthenticated }) => ({ isAuthenticated });

export default function withAuthUser(ComponentToProtect) {
  return connect(
    mapToProps,
    actions
  )(
    class extends Component {
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          redirect: false
        };
      }

      componentDidMount() {
        fetch("/checkToken", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
          .then(res => {
            if (res.status === 200) {
              this.setState({ loading: false });
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            this.setState({ loading: false, redirect: true });
          });
      }

      render() {
        const { loading, redirect } = this.state;
        if (loading) {
          return null;
        }
        if (redirect) {
          return <Redirect to="/login" />;
        }
        console.log("withAuthUser", "props", this.props.isAuthenticated);
        if(this.props.isAuthenticated)
        {
          this.props.changeUser();
        }
        console.log("withAuthUser", "props", this.props.isAuthenticated);
        return (
          <React.Fragment>
            <ComponentToProtect {...this.props} />
          </React.Fragment>
        );
      }
    }
  );
}