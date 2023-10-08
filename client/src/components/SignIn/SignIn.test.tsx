import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from './SignIn';  // Adjust the path accordingly

// global.setImmediate = setTimeout;
// global.clearImmediate = clearTimeout;

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock the data that would typically come from Redux
const mockUser = {
  avatar: '😀',
  userName: 'TestUser',
  roomUrl: '/'
};

const mockMenu = {
  mobile: 'signIn',
  signIn: {
    isHidden: false,
  }
};

const mockWindowUI = {
  isMobile: false,
  hasFooter: false,
  width: 400,
};

describe('<SignIn />', () => {
  // beforeEach(() => {
  //   useSelector.mockImplementation((selector) => {
  //     if (selector === 'selectUser') return mockUser;
  //     if (selector === 'selectMenu') return mockMenu;
  //     if (selector === 'selectWindow') return mockWindowUI;
  //   });

  //   useDispatch.mockReturnValue(jest.fn());  // mock dispatch function
  // });

  // it('renders without crashing', () => {
  //   render(
  //     <Router>
  //       <SignIn isFrame={false} hasAvatar={true} hasLoadedCookies={true} />
  //     </Router>
  //   );
  // });

  // it('updates username input', () => {
  //   const { getByPlaceholderText } = render(
  //     <Router>
  //       <SignIn isFrame={false} hasAvatar={true} hasLoadedCookies={true} />
  //     </Router>
  //   );
  //   const input = getByPlaceholderText('username');
  //   fireEvent.change(input, { target: { value: 'NewUser' } });
  //   expect(input.value).toBe('NewUser');
  // });

  // Add more tests as needed
});