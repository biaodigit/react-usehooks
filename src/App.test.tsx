import React from 'react';
import { render, screen } from '@testing-library/react';

const Demo:React.FC = () => {
  return <h1>demo</h1>
}

describe('test Test component', () => {
  it('render default Test', () => {
    render(<Demo />);
    const element = screen.getByText('demo');
    expect(element).toBeInTheDocument();
  });
});
