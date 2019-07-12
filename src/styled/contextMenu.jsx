import styled from 'styled-components';

export const ContextMenu = styled.nav`
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  color: #373a3c;
  font-size: 16px;
  margin: 2px 0 0;
  min-width: 160px;
  outline: none;
  padding: 5px 0;
  text-align: left;
  z-index: 9999;
`;

export const ContextMenuItem = styled.div`
  background: 0 0;
  border: 0;
  color: #373a3c;
  cursor: pointer;
  font-weight: 400;
  line-height: 1.5;
  padding: 3px 20px;
  text-align: inherit;
  white-space: nowrap;
`;
