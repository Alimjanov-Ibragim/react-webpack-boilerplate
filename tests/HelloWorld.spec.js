import React from 'react'
import renderer from 'react-test-renderer'
import HelloWorld from '../src/components/HelloWorld'

describe('function summa', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <HelloWorld />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sum 1+2=3', () => {
    const hello = new HelloWorld;
    expect(hello.plus(1,2)).toEqual(3);
  });
})
