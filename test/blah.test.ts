import { format } from '../src';

describe('blah', () => {
  it('works', () => {
    expect(format({ value: 1737785320438})).toEqual('25/1/2025');
  });
});
