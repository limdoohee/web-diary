import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        list-style:none;
        border: none;
        background: none;
        .fc .fc-daygrid-day-top{
          flex-direction: row;
        }
        .fc .fc-button-primary {
          background:none;
          border:none;
        }
        .fc-icon-chevron-right:before, .fc-icon-chevron-left:before {
          color:#d9d9d9;
        }
        .fc .fc-button-primary:hover {
          background-color: #f0f0f0;
        }
      }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;
