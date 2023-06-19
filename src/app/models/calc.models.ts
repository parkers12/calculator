export type TColorCalc = 'dark' | 'violet' | 'green' | 'blue' | 'grey' | 'red' | 'yellow';

export type TButtons = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' |
  'AC' | 'C' | '+/-' | '%' | '+' | '-' | '*' | '/' | '=' | '<' | '.';
export interface IButtons {
  name: TButtons;
  id?: string;
  alt?: string;
}

export const buttons: IButtons[]  = [
  {
    name: 'AC',
    id: 'АС',
    alt: 'Сброс'
  },
  {
    name: '+/-',
    alt: 'invert'
  },
  {
    name: '%',
    alt: 'Проценты'
  },
  {
    name: '+',
    alt: 'Сложение'
  },
  {
    name: '1',
    alt: '1'
  },
  {
    name: '2',
    alt: '2'
  },
  {
    name: '3',
    alt: '3'
  },
  {
    name: '-',
    alt: 'Вычитание'
  },
  {
    name: '4',
    alt: '4'
  },
  {
    name: '5',
    alt: '5'
  },
  {
    name: '6',
    alt: '6'
  },
  {
    name: '*',
    alt: 'Умножение'
  },
  {
    name: '7',
    alt: '7'
  },
  {
    name: '8',
    alt: '8'
  },
  {
    name: '9',
    alt: '9'
  },
  {
    name: '/',
    alt: 'Деление'
  },
  {
    name: '<',
    alt: 'Стереть'
  },
  {
    name: '0',
    alt: '0'
  },
  {
    name: '.',
    alt: 'Дробное число'
  },
  {
    name: '=',
    alt: 'Посчитать'
  }
]
