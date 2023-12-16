import { BaseProblemSolver } from './BaseProblemSolver';

export class ProblemSolver extends BaseProblemSolver<number[], number, number> {
  parseInput1(input: string[]): number[] {
    return input.map(line => {
      const digits = line.match(/[0-9]/g)!;
      return parseInt(`${digits[0]}${digits[digits.length - 1]}`, 10);
    });
  }

  protected parseInput2(input: string[]): number[] {
    const mapWordToDigit: { [key: string]: number } = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };

    return input.map(line => {
      const speltDigits = [...line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/g)];
      const digits = speltDigits.map(match =>
        Object.hasOwn(mapWordToDigit, match[1]) ? mapWordToDigit[match[1]] : match[1],
      );
      const number = parseInt(`${digits[0]}${digits[digits.length - 1]}`, 10);
      return number;
    });
  }

  question1(input: number[]): number {
    return input.reduce((acc, val) => acc + val);
  }

  question2(input: number[]): number {
    return input.reduce((acc, val) => acc + val, 0);
  }
}
