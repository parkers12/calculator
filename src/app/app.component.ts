import {Component, OnInit} from '@angular/core';
import {TColorCalc, IButtons, buttons, TButtons} from "./models/calc.models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public templateCalc: TColorCalc = 'blue';
  public templateList: TColorCalc[] = ['dark', 'violet', 'green', 'blue', 'grey', 'red', 'yellow'];
  public buttons: IButtons[] = buttons;
  public result: string = "";
  public expression: string = "";

  constructor( ) {
  }

  public ngOnInit(): void {
    this.result = "0";
    this.changeTemplate('blue');
  }

  public getValue(buttonVal: string): void {
    switch (buttonVal) {
      case "=":
        this.getResult();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        this.getAction(buttonVal);
        break;
      case "<":
        this.backspace();
        break;
      case "+/-":
        this.getInvert();
        break;
      case "%":
        this.getPercent();
        break;
      case "AC":
          this.clearExp();
          this.clearInp();
        break;
      default:
        this.getNumber(buttonVal);
    }
  }

  private isNumeric(val: string): boolean {
    return Number.isInteger(Number(val));
  }

  private getLastSymbol() {
    return this.expression.slice(-1);
  }

  private getNumber(number: string): void {
    const lastSymbol = this.getLastSymbol();
    if (this.expression.indexOf("=") >= 0) {
      if (this.isNumeric(number) || number === ".") {
        this.clearExp();
        this.clearInp();
        this.expression = number;
        this.result = this.expression;
      }
    } else if ((lastSymbol === "%" && number === ".")
      || (lastSymbol === "." && number === ".")) {
      this.expression = this.expression;
    } else {
      const currentExpression = this.expression;
      if (currentExpression === "0") {
        this.insertCurrent(number);
      } else if (currentExpression.lastIndexOf(")") !== -1
        && currentExpression.lastIndexOf(")") === currentExpression.length - 1) {
        const resultExpression = currentExpression.slice(0, -1) + number + ")";
        this.expression = resultExpression;
        this.result = this.expression;
      } else if (number === "."
        && (lastSymbol === "+"
          || lastSymbol === "-"
          || lastSymbol === "/"
          || lastSymbol === "*"
          || lastSymbol === "%"
          || lastSymbol === "")) {
        this.expression = currentExpression + "0.";
        this.result = this.expression;
      } else {
        this.expression = currentExpression + number;
      }
      const enterVal = this.expression.split(/[^.\d]+/g);
      const lastValExp = enterVal[enterVal.length - 1];
      if (lastValExp !== "") {
        this.result = lastValExp.toString();
      }
    }
  }

  private getPercent(): void {
    const lastSymbol = this.getLastSymbol();
    if (lastSymbol !== "%" && lastSymbol !== ".") {
      const arrExp = this.expression.match(/[.\d]+/g);
      if (arrExp !== null && arrExp.length === 2) {
        const percent = (Number(arrExp[0]) / 100 * Number(arrExp[1])).toString();
        this.expression = this.expression + "%";
        this.result = percent;
      }
    }
  }

  private insertCurrent(val: string | number):void {
    this.expression = val.toString();
  }

  private getInvert():void {
    const lastSymbol = this.getLastSymbol();
    if (this.expression.lastIndexOf("=") === -1 && lastSymbol !== "%"){
      const arrExp = this.expression.match(/[.\d]+/g);
      if (arrExp === null) {
        this.expression = "0";
        this.result = this.expression;
      } else if (arrExp.length === 1) {
        let resExp = "";
        if (this.expression === "0") {
          resExp = "0";
        } else {
          resExp = this.expression.indexOf("(") === -1
            ? "(-" + arrExp[0] + ")"
            : this.expression.slice(2,-1);
        }
        this.expression = resExp;
        this.result = this.expression;
      } else {
        let resExp = "";
        if (this.expression.indexOf("(") !== -1 && this.expression.lastIndexOf("(") !== 0) {
          const lastNegative = this.expression.lastIndexOf('(');
          const positiveVal = this.expression.substring(lastNegative, this.expression.length);
          resExp = this.expression.slice(0, -positiveVal.length) + positiveVal.slice(2, -1);
          this.result = positiveVal.slice(2, -1);
        } else {
          const negativeVal = "(-" + arrExp[1] + ")";
          resExp = this.expression.slice(0, -arrExp[1].length) + negativeVal;
          this.result = negativeVal;
        }
        this.expression = resExp;
      }
    }
  }

  private getAction(sign:TButtons):void {
    const lastSymbol = this.getLastSymbol();
    if (
      lastSymbol !== sign
      && lastSymbol !== "%"
      && lastSymbol !== "="
      && (lastSymbol === "+"
        || lastSymbol === "-"
        || lastSymbol === "*"
        || lastSymbol === "/"
      )
    ) {
      this.expression = this.expression.slice(0, -1) + sign;
    } else if (
      lastSymbol !== "+"
      && lastSymbol !== "-"
      && lastSymbol !== "*"
      && lastSymbol !== "/"
      && lastSymbol !== "="
      && lastSymbol !== "%"
    ) {
      const arrExp = this.expression.match(/[.\d]+/g);
      if (arrExp === null) {
        this.expression = "0" + sign;
      } else if (arrExp.length === 1) {
        this.result = this.expression;
        this.expression = this.expression + sign;
      } else if (this.expression.indexOf("=") !== -1) {
        const resultExp = this.expression.slice(this.expression.indexOf("=") + 1);
        this.expression = resultExp + sign;
      } else {
        this.result = eval(this.expression);
        this.expression = eval(this.expression) + sign;
      }
    }
  }

  private backspace():void {
    if (this.expression.lastIndexOf("=") === -1) {
      if (this.expression.length === 1 || this.expression === "0") {
        this.result = "0";
        this.expression = "0";
      } else {
        if (this.expression.slice(-1) === ")") {
          const arrExp = this.expression.match(/[.\d]+/g);
          const posMinus = this.expression.lastIndexOf("-");
          const digit = this.expression.slice(posMinus + 1, this.expression.length - 1);
          if (arrExp !== null && arrExp.length === 2) {
            this.expression = digit.length === 1 ? this.expression.slice(0, -5) : this.expression.slice(0, -2) + ")";
            this.result = arrExp[1].length === 1 ? this.expression : "(-" + arrExp[1].slice(0, -1) + ")";
          } else if (arrExp !== null) {
            this.expression = digit.length === 1 ? "0" : this.expression.slice(0, -2) + ")";
            this.result = arrExp[0].length === 1 ? "0" : "(-" + arrExp[0].slice(0, -1) + ")";
          }
        } else {
          const withoutLastSymbol = this.expression.slice(0, -1);
          const arrExp = withoutLastSymbol.match(/[.\d]+/g);
          if (arrExp !== null) {
            this.result = arrExp[arrExp.length - 1];
          }
          this.expression = withoutLastSymbol;
        }
      }
    }
  }

  private getResult(): void {
    const arrExp = this.expression.match(/[.\d]+/g);
    if (arrExp !== null && arrExp.length === 2) {
      if (this.expression.lastIndexOf("%") > -1) {
        const percent = Number(arrExp[0]) / 100 * Number(arrExp[1]);
        const arrSign = ["+", "-", "/", "*"];
        let sign;
        arrSign.forEach(item => {
          if (this.expression.indexOf(item) !== -1) {
            sign = item;
          }
        })
        let result;
        if (sign !== undefined) {
          result = eval(arrExp[0] + sign + percent);
          this.expression = this.expression + "=" + result;
          this.result = result.toString().slice(0, 10);
        }
      } else {
        this.result = eval(this.expression).toString().slice(0, 10);
        this.expression = this.expression + "=" + this.result;
      }
    }
  }

  private clearExp(): void {
    this.expression = "";
  }
  private clearInp(): void {
    this.result = "0";
  }

  public changeTemplate(template: TColorCalc): void {
    this.templateCalc = template;
  }
}
