import { BaseProblemSolver } from './BaseProblemSolver';

type Input = {
  time: number[];
  distance: number[];
};
type Output1 = number;
type Output2 = number;

export class ProblemSolver extends BaseProblemSolver<Input, Output1, Output2> {
  parseInput1(input: string[]): Input {
    return {
      time: input[0]
        .split(':')[1]
        .trim()
        .split(/\s+/)
        .map(number => parseInt(number, 10)),
      distance: input[1]
        .split(':')[1]
        .trim()
        .split(/\s+/)
        .map(number => parseInt(number, 10)),
    };
  }

  parseInput2(input: string[]): Input {
    const time = parseInt(input[0].split(':')[1].replaceAll(' ', ''), 10);
    const distance = parseInt(input[1].split(':')[1].replaceAll(' ', ''), 10);
    return { time: [time], distance: [distance] };
  }

  private helper(input: Input) {
    const potentialDistances = (time: number) => {
      const result = [];
      for (let i = 0; i <= time; i++) {
        result.push(i * (time - i));
      }
      return result;
    };

    const waysToWin = (time: number, distance: number) =>
      potentialDistances(time).filter(dist => dist >= distance).length;

    let result = 1;
    for (let i = 0; i < input.time.length; i++) {
      result *= waysToWin(input.time[i], input.distance[i]);
    }
    return result;
  }

  question1(input: Input): Output1 {
    return this.helper(input);
  }

  question2(input: Input): Output2 {
    return this.helper(input);
  }
}
