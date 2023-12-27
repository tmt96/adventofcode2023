import { BaseProblemSolver } from './BaseProblemSolver';

type Input = number[][];
type Output1 = number;
type Output2 = number;

export class ProblemSolver extends BaseProblemSolver<Input, Output1, Output2> {
  parseInput1(input: string[]): Input {
    return input.filter(line => line.length > 0).map(line => line.split(' ').map(num => parseInt(num, 10)));
  }

  parseInput2(input: string[]): Input {
    return this.parseInput1(input);
  }

  question1(input: Input): Output1 {
    const extrapolate = (numbers: number[]) => {
      if (numbers.every(num => num === 0)) {
        return 0;
      }

      const diff = [];
      for (let i = 1; i < numbers.length; i++) {
        diff.push(numbers[i] - numbers[i - 1]);
      }

      return extrapolate(diff) + numbers[numbers.length - 1];
    };

    return input.map(extrapolate).reduce((acc, val) => acc + val);
  }

  question2(input: Input): Output2 {
    const extrapolate = (numbers: number[]) => {
      if (numbers.every(num => num === 0)) {
        return 0;
      }

      const diff = [];
      for (let i = 1; i < numbers.length; i++) {
        diff.push(numbers[i] - numbers[i - 1]);
      }

      return numbers[0] - extrapolate(diff);
    };

    return input.map(extrapolate).reduce((acc, val) => acc + val);
  }
}
