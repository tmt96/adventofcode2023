import { BaseProblemSolver } from './BaseProblemSolver';

type Input = number[];
type Output1 = number;
type Output2 = number;

export class ProblemSolver extends BaseProblemSolver<Input, Output1, Output2> {
  private parseCard(line: string): number {
    const data = line.split(':')[1].trim();
    const [left, right] = data.split('|');
    const winning_numbers = left
      .trim()
      .split(/[ ]+/)
      .map(str => parseInt(str.trim(), 10));
    const my_numbers = right
      .trim()
      .split(/[ ]+/)
      .map(str => parseInt(str.trim(), 10));
    return my_numbers.filter(num => winning_numbers.includes(num)).length;
  }

  parseInput1(input: string[]): Input {
    return input.filter(line => line.length > 0).map(this.parseCard);
  }

  parseInput2(input: string[]): Input {
    return this.parseInput1(input);
  }

  question1(input: Input): Output1 {
    return input
      .map(winning_count => {
        return winning_count === 0 ? 0 : 1 << (winning_count - 1);
      })
      .reduce((acc, val) => acc + val);
  }

  question2(input: Input): Output2 {
    const card_count = new Array(input.length).fill(1);
    for (const [index, winning_count] of input.entries()) {
      for (let j = 1; j <= winning_count; j++) {
        card_count[index + j] += card_count[index];
      }
    }
    return card_count.reduce((acc, val) => acc + val);
  }
}
