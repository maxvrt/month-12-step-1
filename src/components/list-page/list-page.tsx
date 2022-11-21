import React, {FormEvent, useState, useEffect} from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TElement, ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./class"

const initArr = [{value: '0', state: ElementStates.Default},{value: '34', state: ElementStates.Default},{value: '8', state: ElementStates.Default},{value: '1', state: ElementStates.Default}];
const list = new LinkedList<TElement>(initArr);

export const ListPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [index, setIndex] = useState<string>('');
  const [firstArr, setFirstArr] = useState<(TElement)[]>();
  const [spinner, setSpinner] = useState<number>();

  const onChangeText = (e: FormEvent<HTMLInputElement>): void => {
    setText(e.currentTarget.value)
  }
  const onChangeIndex = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value || ''
    setIndex(value);
  }
  const delay = (time:number) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  }
  useEffect(() => {
    setFirstArr(initArr);
    const list1 = list.getList();
    console.log(`${JSON.stringify(list1)}`);
  },[]);

  const addToHead = async () => {
    list.prepend({value: text, state: ElementStates.Default});
    setSpinner(1);
    if (firstArr && firstArr[0]){
      firstArr[0].child = {value: text, state: ElementStates.Changing};
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr[0].child = undefined;
      firstArr.unshift({value: text, state: ElementStates.Changing});
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr[0].state = ElementStates.Modified;
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr[0].state = ElementStates.Default;
      setFirstArr([...firstArr]);
      setText('');
      console.log(`${JSON.stringify(firstArr)}`);
    }
    setSpinner(undefined)
  }
  const removeFromHead = async () => {
    setSpinner(3);
    list.deleteHead();
    if (firstArr && firstArr[0]){
      firstArr[0].childBottom = {value: firstArr[0].value, state: ElementStates.Changing};
      firstArr[0].value = '';
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr.shift();
      setFirstArr([...firstArr]);
    }
    setSpinner(undefined);
  }

  const addToTail = async () => {
    setSpinner(2);
    list.append({value: text, state: ElementStates.Default});
    if (firstArr) {
      let ind = firstArr.length - 1
      firstArr[ind].child = {value: text, state: ElementStates.Changing}
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr[ind].child = undefined;
      firstArr.push({value: text, state: ElementStates.Modified});
      ind++;
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr[ind].state = ElementStates.Default;
      setFirstArr([...firstArr]);
      setText('');
    }
    setSpinner(undefined);
  }
  const removeFromTail = async () => {
    list.deleteTail();
    setSpinner(4);
    if (firstArr && firstArr[firstArr.length - 1]){
      firstArr[firstArr.length - 1].childBottom = {value: firstArr[firstArr.length - 1].value, state: ElementStates.Changing};
      firstArr[firstArr.length - 1].value = '';
      setFirstArr([...firstArr]);
      await delay(500);
      firstArr.pop();
      setFirstArr([...firstArr]);
    }
    setSpinner(undefined);
  }
  const аddByIndex = async () => {
    if(!index || !firstArr) return
    setSpinner(5);
    const idx = Number(index);
    list.insertAt({value: text, state: ElementStates.Default}, idx);
    for (let i = 0; i <= idx; i++) {
      firstArr[i].child = {value: text, state: ElementStates.Changing}
      firstArr[i].state = ElementStates.Changing
      setFirstArr([...firstArr]);
      await delay(500);
      setFirstArr([...firstArr]);
      firstArr[i].child = undefined
    }
    firstArr[idx].child = undefined
    await delay(500);
    firstArr[idx].state = ElementStates.Default;
    firstArr.splice(idx, 0, {value: text, state: ElementStates.Modified})
    setFirstArr([...firstArr]);
    firstArr[idx].state = ElementStates.Default;
    firstArr.forEach((el) => { el.state = ElementStates.Default })
    await delay(500);
    setFirstArr([...firstArr]);
    setText('');
    setSpinner(undefined);
  }
  const delByIndex = async () => {
    if(!index || !firstArr) return
    const idx = Number(index);
    setSpinner(6);
    list.deleteAt(idx);
    for (let i = 0; i <= idx; i++) {
      firstArr[i].state = ElementStates.Changing
      setFirstArr([...firstArr]);
      await delay(500);
      setFirstArr([...firstArr]);
    }
    firstArr[idx].childBottom = {value:firstArr[idx].value, state: ElementStates.Changing};
    firstArr[idx].value='';
    firstArr[idx].state = ElementStates.Default;
    setFirstArr([...firstArr]);
    await delay(500);
    firstArr.splice(idx, 1)
    setFirstArr([...firstArr]);
    firstArr.forEach((el) => { el.state = ElementStates.Default })
    await delay(500);
    setFirstArr([...firstArr]);
    setText('');
    setSpinner(undefined);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.inputBlock}>
            <Input
              placeholder='Введите значение'
              maxLength={4}
              isLimitText={true}
              value={text}
              onChange={onChangeText}
              disabled={spinner !== undefined && spinner !== 100}
            />
            <Button
              text='Добавить в head'
              onClick={addToHead}
              isLoader={spinner === 1}
              disabled={!text || spinner !== undefined && spinner !== 1}
            />
            <Button
              text='Добавить в tail'
              onClick={addToTail}
              isLoader={spinner === 2}
              disabled={!text || spinner !== undefined && spinner !== 2}
            />
            <Button
              text='Удалить из head'
              onClick={removeFromHead}
              isLoader={spinner === 3}
              disabled={spinner !== undefined && spinner !== 3}
            />
            <Button
              text='Удалить из tail'
              onClick={removeFromTail}
              isLoader={spinner === 4}
              disabled={spinner !== undefined && spinner !== 4}
            />
        </div>
        <div className={styles.inputByIndexBlock}>
            <Input
              onChange={onChangeIndex}
              value={index}
              maxLength={4}
              max={9}
              isLimitText={true}
              placeholder="Введите индекс"
              disabled={spinner === 0}
            />
            <Button
              text='Добавить по индексу'
              onClick={аddByIndex}
              isLoader={spinner === 5}
              disabled={!index || spinner !== undefined && spinner !== 5}
            />
            <Button
              text='Удалить по индексу'
              onClick={delByIndex}
              isLoader={spinner === 6}
              disabled={!index || spinner !== undefined && spinner !== 6}
            />
        </div>
        <ul className={styles.circlesContainer}>
          {firstArr && firstArr.map((el, index) => {
            return (
            <li className={styles.item} key={index}>
              <div className={styles.innerItem}>
                {el?.child ? (
                  <div className={styles.circleItem}>
                    <Circle
                    isSmall
                    letter={el.child.value}
                    state={el.child.state}
                    />
                  </div>
                ):
                  <div className={styles.circleItem}></div>
                }
                <Circle
                  letter={el?.value}
                  index={index}
                  head={index === 0 && !el?.child ? "head" : ""}
                  tail={index === firstArr.length - 1 && !el?.childBottom ? "tail" : ""}
                  state={el?.state}

                />
                {el?.childBottom ? (
                  <div className={styles.circleItemBottom}>
                    <Circle
                    isSmall
                    letter={el.childBottom.value}
                    state={el.childBottom.state}
                    />
                  </div>
                ):
                  <div className={styles.circleItemBottom}></div>
                }
              </div>
              <div className={styles.innerArrow}>
                {index < firstArr?.length - 1 && (
                  <ArrowIcon/>
                )}
              </div>
                </li>)
          })}
            </ul>
      </div>
    </SolutionLayout>
  );
};
