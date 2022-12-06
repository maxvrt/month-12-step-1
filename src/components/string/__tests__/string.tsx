import { reversAlgo } from '../string';

describe('алгоритм разворота', () => {
  it('алгоритм разворота', async () => {
    const reverse = await reversAlgo('тест', ()=>{}, ()=>{})
    expect(reverse).toEqual('тсет')
  });
})
