import { Button } from '../button';
import renderer from 'react-test-renderer'
import { render, screen, fireEvent } from '@testing-library/react';

describe('Тестирование компонента Button', () => {
  it('Пустая кнопка', () => {
    const button = renderer
      .create(<Button></Button>)
      .toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Кнопка с текстом', () => {
    const button = renderer
      .create(<Button text="Развернуть"></Button>)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Кнопка без текста', () => {
    const button = renderer
      .create(<Button></Button>)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Кнопка заблокирована', () => {
    const button = renderer
      .create(<Button disabled={true}></Button>)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Кнопка с загрузкой', () => {
    const button = renderer
      .create(<Button isLoader={true}></Button>)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Кнопка с колбеком', () => {
    window.alert = jest.fn();
    const alertFunction = () => {
      alert('колбэк')
    }
    render(<Button text='alertButton' onClick={alertFunction}></Button>);
    const button = screen.getByText('alertButton');
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('колбэк');
  });
})
