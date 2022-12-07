import { selectionSort, bubbleSort, swap, checkAscDesc  } from '../sorting-page';
import { TElement, ElementStates } from "../../../types/element-states";

describe('сортировка выбором', () => {
  it('по возрастанию', async () => {
    const arr = [{value: '42', state: ElementStates.Modified},
    {value: '73', state: ElementStates.Modified},
    {value: '89', state: ElementStates.Modified},
    {value: '15', state: ElementStates.Modified},
    {value: '59', state: ElementStates.Modified}]
    const reverse = await selectionSort(arr, true, ()=>{}, ()=>{}, ()=>{}, 0);
    console.debug('результат', reverse);
    expect(reverse).toEqual('15,42,59,73,89');
  });
  it('по убыванию', async () => {
    const arr = [{value: '42', state: ElementStates.Modified},
    {value: '73', state: ElementStates.Modified},
    {value: '89', state: ElementStates.Modified},
    {value: '15', state: ElementStates.Modified},
    {value: '59', state: ElementStates.Modified}]
    const reverse = await selectionSort(arr, false, ()=>{}, ()=>{}, ()=>{}, 0);
    console.debug('результат', reverse);
    expect(reverse).toEqual('89,73,59,42,15');
  });
  it('с одним элементом', async () => {
    const arr = [{value: '15', state: ElementStates.Modified}]
    const reverse = await selectionSort(arr, false, ()=>{}, ()=>{}, ()=>{}, 0);
    console.debug('результат', reverse);
    expect(reverse).toEqual('15');
  });
  it('пустой массив', async () => {
    const reverse = await selectionSort([], false, ()=>{}, ()=>{}, ()=>{}, 0);
    console.debug('результат', console.log(`${JSON.stringify(reverse)}`));
    expect(reverse).toEqual('');
  });
});

describe('сортировка пузырьком', () => {
  it('по возрастанию', async () => {
    const arr = [{value: '42', state: ElementStates.Modified},
    {value: '73', state: ElementStates.Modified},
    {value: '89', state: ElementStates.Modified},
    {value: '15', state: ElementStates.Modified},
    {value: '59', state: ElementStates.Modified}]
    const reverse = await bubbleSort(arr, true, ()=>{}, ()=>{}, ()=>{}, 0);
    console.debug('результат', reverse);
    expect(reverse).toEqual('15,42,59,73,89');
  });
  it('по убыванию', async () => {
    const arr = [{value: '42', state: ElementStates.Modified},
    {value: '73', state: ElementStates.Modified},
    {value: '89', state: ElementStates.Modified},
    {value: '15', state: ElementStates.Modified},
    {value: '59', state: ElementStates.Modified}]
    const reverse = await bubbleSort(arr, false, ()=>{}, ()=>{}, ()=>{}, 0);
    console.debug('результат', reverse);
    expect(reverse).toEqual('89,73,59,42,15');
  });
  it('с одним элементом', async () => {
    const arr = [{value: '15', state: ElementStates.Modified}]
    const reverse = await bubbleSort(arr, false, ()=>{}, ()=>{}, ()=>{}, 0);
    console.debug('результат', reverse);
    expect(reverse).toEqual('15');
  });
  it('пустой массив', async () => {
    const reverse = await bubbleSort([], false, ()=>{}, ()=>{}, ()=>{}, 0);
    console.debug('результат', console.log(`${JSON.stringify(reverse)}`));
    expect(reverse).toEqual('');
  });
});
