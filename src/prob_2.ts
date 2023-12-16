import { BaseProblemSolver } from './BaseProblemSolver';

type Turn = {
  red: number;
  blue: number;
  green: number;
  [key: string]: number;
};

type Game = Turn[];
type Input = Game[];
type Output1 = number;
type Output2 = number;

export class ProblemSolver2 extends BaseProblemSolver<Input, Output1, Output2> {
  constructor() {
    super(2);
  }

  private parseGame(game: string): Game {
    const turnsDescription = game.split(':')[1].trim().split(';');
    return turnsDescription.map(description => {
      const turn: Turn = { red: 0, blue: 0, green: 0 };
      const groups = description.trim().split(',');
      groups.forEach(group => {
        const [count, color] = group.trim().split(' ');
        turn[color] = parseInt(count);
      });
      return turn;
    });
  }

  parseInput1(input: string[]): Input {
    return input.map(this.parseGame);
  }

  protected parseInput2(input: string[]): Input {
    return this.parseInput1(input);
  }

  question1(input: Input): Output1 {
    const MAX_RED = 12;
    const MAX_GREEN = 13;
    const MAX_BLUE = 14;
    const valid = (turn: Turn) => turn.red <= MAX_RED && turn.green <= MAX_GREEN && turn.blue <= MAX_BLUE;
    return input.reduce((acc, game, index) => (game.every(valid) ? acc + index + 1 : acc), 0);
  }

  question2(input: Input): Output2 {
    const requiredCubeNumber = (game: Game, color: keyof Turn) => Math.max(...game.map(game => game[color]));
    const power = (game: Game) =>
      requiredCubeNumber(game, 'red') * requiredCubeNumber(game, 'blue') * requiredCubeNumber(game, 'green');

    return input.map(power).reduce((acc, val) => acc + val);
  }
}
