import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { TElement, ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import style from "./sorting-page.module.css";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  const rndInt = Math.floor(Math.random() * 15) + 3;
  const [firstArr, setFirstArr] = useState<TElement[]>([]);
  const [spinner, setSpinner] = useState<number>(0);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [radio, setRadio] = useState<string>('select');
  const [isNewArr, setIsNewArr] = useState<boolean>(false);

  const delay = (time:number) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  }
  const onClickRadio = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadio((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };
  const arrToElements = (arr:number[]):TElement[] => {
    const elements:TElement[] = [];
    arr.forEach((el) => {
      elements.push({ value: el.toString(), state: ElementStates.Default })
    })
    return elements
  }

  // проверка режима сортировки для обоих функций
  const checkAscDesc = (isAscending: boolean, arr: TElement[], j: number, maxInd?: number) => {
    if (maxInd) {
      if ((!isAscending && parseInt(arr[maxInd].value) < parseInt(arr[j].value))||
        (isAscending && parseInt(arr[maxInd].value) > parseInt(arr[j].value))) return true
      else return false
    } else if(arr[j]?.value && arr[j + 1]?.value) {
      if ((isAscending && parseInt(arr[j].value) > parseInt(arr[j + 1].value))||
      (!isAscending && parseInt(arr[j].value) < parseInt(arr[j + 1].value))) return true
      else return false
    }
  }

  useEffect(() => {
    const randomArr = Array.from({length: rndInt}, () => Math.floor(Math.random() * 100));
    const elements = arrToElements(randomArr);
    setFirstArr(elements);
    setButtonDisabled(false);
  }, [isNewArr]);

  const swap = (arr: TElement[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const selectionSort = async (arr: TElement[], isAscending: boolean): Promise<void> => {
    setButtonDisabled(true);
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      await delay(100);
      let maxInd = i
      arr[i].state = ElementStates.Changing
      setFirstArr([...arr]);
      await delay(100);
      for (let j = i + 1; j < length; j++) {
        arr[j].state = ElementStates.Changing
        setFirstArr([...arr]);
        await delay(100);
        if (checkAscDesc(isAscending, arr, j, maxInd)) {
          if (i !== maxInd) {
            arr[maxInd].state = ElementStates.Default
            setFirstArr([...arr]);
          }
          maxInd  = j
        } else {
          arr[j].state = ElementStates.Default
          setFirstArr([...arr]);
        }
      }
      swap(arr, i, maxInd)
      arr[i].state = ElementStates.Modified
      if (i !== maxInd) {
        arr[maxInd].state = ElementStates.Default
      }
      setFirstArr([...arr]);
    }
    setButtonDisabled(false);
    setSpinner(0);
  }
  const bubbleSort = async (arr: TElement[], isAscending: boolean): Promise<void> => {
    setButtonDisabled(true);
    for (let i = 0; i < arr.length; i++) {
      for(let j = 0 ; j < arr.length - i - 1; j++) {
        await delay(100);
        arr[j].state = ElementStates.Changing
        arr[j + 1].state = ElementStates.Changing
        setFirstArr([...arr]);
        await delay(100);
        if (checkAscDesc(isAscending, arr, j)) {
          swap(arr, j, j + 1)
        }
        arr[j].state = ElementStates.Default
        if (j === arr.length - i - 2) {
          arr[j + 1].state = ElementStates.Modified
          if (j === 0) {
            arr[j].state = ElementStates.Modified
          }
        }
        setFirstArr([...arr]);
      }
    }
    setButtonDisabled(false);
    setSpinner(0);
  }

  const onClickDesc = async (): Promise<void> => {
    setSpinner(2);
    console.log(spinner);
    if (radio === 'select') {
      selectionSort(firstArr, false);
    } else if (radio === 'bubble') {
      bubbleSort(firstArr, false);
    }
  }
  const onClickAsc = async (): Promise<void> => {
    setSpinner(1);
    console.log(spinner);
    if (radio === 'select') {
      selectionSort(firstArr, true);
    } else if (radio === 'bubble') {
      bubbleSort(firstArr, true);
    }
  }
  const OnClickNewArr = async (): Promise<void> => {
    setIsNewArr(!isNewArr);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.container}>
        <div className={style.buttonsContainer}>
          <div className={style.radio}>
            <RadioInput
                label="Выбор"
                value="select"
                name='one'
                defaultChecked
                onChange={onClickRadio}
                disabled={buttonDisabled}
            />
            <RadioInput
                label="Пузырек"
                value="bubble"
                name='one'
                onChange={onClickRadio}
                disabled={buttonDisabled}
            />
          </div>
          <div className={style.buttons}>
            <Button
                disabled={buttonDisabled}
                isLoader={spinner === 1}
                text="По возрастанию"
                onClick={onClickAsc}
                sorting={Direction.Ascending}
            />
            <Button
                disabled={buttonDisabled}
                isLoader={spinner === 2}
                text="По убыванию"
                onClick={onClickDesc}
                sorting={Direction.Descending}
            />
            <Button
                text="Новый массив"
                onClick={OnClickNewArr}
                disabled={buttonDisabled}
                isLoader={false}
            />
          </div>
        </div>
        <ul className={style.columnsContainer}>
          {firstArr.map((el: TElement, index: number) => {
            return (
              <Column
                  key={index}
                  index={parseInt(el.value)}
                  state={el.state}
              />)
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
