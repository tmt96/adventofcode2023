import { file } from 'bun';
import { join } from 'path';

export abstract class BaseProblemSolver<Input, Output1, Output2> {
  private day: number;
  private inputPath: string;
  constructor(day: number) {
    this.day = day;
    this.inputPath = join(process.cwd(), 'input', `${day}`);
  }

  protected abstract parseInput1(input: string[]): Input;
  protected abstract parseInput2(input: string[]): Input;

  private async readInput(): Promise<string[]> {
    return (await file(this.inputPath).text()).trim().split('\n');
  }

  protected abstract question1(input: Input): Output1 | Promise<Output1>;
  protected abstract question2(input: Input): Output2 | Promise<Output2>;

  public async solve() {
    const input = await this.readInput();
    console.log(`Part 1 result: ${await this.question1(this.parseInput1(input))}`);
    console.log(`Part 2 result: ${await this.question2(this.parseInput2(input))}`);
  }
}
