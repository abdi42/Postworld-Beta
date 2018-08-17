import { Text as BaseText } from 'native-base';

import styled from "styled-components";

export default Text = styled(BaseText)`
  font-family:"Helvetica Neue";
  font-size:${ props => props.size || 15 };
  font-weight:${ props => props.bold ? "bold" : "normal" };
  color: ${ props => props.subdue ? "#7f8c8d" : "black" }
`
