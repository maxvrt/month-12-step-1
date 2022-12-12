import { reversAlgo } from '../string';

describe('алгоритм разворота', () => {
  it('с четным количеством', async () => {
    const reverse = await reversAlgo('тест', ()=>{}, ()=>{});
    expect(reverse).toEqual('тсет');
  });
  it('с нечетным количеством', async () => {
    const reverse = await reversAlgo('тест1', ()=>{}, ()=>{});
    expect(reverse).toEqual('1тсет');
  });
  it('с одним символом', async () => {
    const reverse = await reversAlgo('1', ()=>{}, ()=>{});
    expect(reverse).toEqual('1');
  });
  it('пустая строка', async () => {
    const reverse = await reversAlgo('', ()=>{}, ()=>{});
    expect(reverse).toEqual('');
  });
})
