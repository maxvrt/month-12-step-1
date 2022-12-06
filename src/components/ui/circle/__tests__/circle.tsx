import { Circle } from '../circle';
import renderer from 'react-test-renderer'
import { render, screen, fireEvent } from '@testing-library/react';
import { ElementStates } from "../../../../types/element-states";

describe('Тестирование компонента Circle', () => {

	it('Circle без текста', () => {
		const circle = renderer.create(<Circle/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
  it('Circle с текстом', () => {
		const circle = renderer.create(<Circle letter='a'/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
  it('Circle с head', () => {
		const circle = renderer.create(<Circle head = 'string'/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
  it('Circle с react элементом в head', () => {
		const circle = renderer.create(<Circle head = {<Circle head = 'string'/>}/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
  it('Circle с tail', () => {
		const circle = renderer.create(<Circle tail = 'string'/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
  it('Circle с react элементом в tail', () => {
		const circle = renderer.create(<Circle tail = {<Circle head = 'string'/>}/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
  it('Circle с index', () => {
		const circle = renderer.create(<Circle index = {2}/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
  it('Circle с isSmall', () => {
		const circle = renderer.create(<Circle isSmall = {true}/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
  it('Circle с состоянием default', () => {
		const circle = renderer.create(<Circle state = {ElementStates.Default}/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
  it('Circle с состоянием changing', () => {
		const circle = renderer.create(<Circle state = {ElementStates.Changing}/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
  it('Circle с состоянием modified', () => {
		const circle = renderer.create(<Circle state = {ElementStates.Modified}/>).toJSON();
		expect(circle).toMatchSnapshot();
	});
})
