import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@import url('http://fonts.cdnfonts.com/css/sf-ui-display');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body,
#root {
  height: 100%;
}
body {
  font-family: 'SF UI Display', sans-serif;
  font-size: 1.2em;
  padding: 50px;
  background-color: #F5F5F5;
}
`;
