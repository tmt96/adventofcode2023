import { BaseProblemSolver } from './BaseProblemSolver';

type Input = string[];
type Output1 = number;
type Output2 = number;

export class ProblemSolver extends BaseProblemSolver<Input, Output1, Output2> {
  parseInput1(input: string[]): Input {
    return input;
  }

  protected parseInput2(input: string[]): Input {
    return input
  }

  question1(input: Input): Output1 {
    return 0;
  }

  question2(input: Input): Output2 {
    return ;
  }
}
