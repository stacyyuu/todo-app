import React, {useContext} from 'react';
import {LoginContext} from './context.jsx';
import {When} from 'react-if';

const Auth = (props) => {
  const loginSettings = useContext(LoginContext);
  let youAreLoggedIn = loginSettings.loggedIn;
  let canDo = props.capability ? loginSettings.can( props.capability ) :true;
  let okToRender = youAreLoggedIn && canDo;

  return (
    <When condition={okToRender}>
      {props.children}
    </When>
  );
}

export default Auth;