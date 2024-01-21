import { BaseProblemSolver } from './BaseProblemSolver';

type Paths = {
  left: string;
  right: string;
};

type Input = {
  instructions: string;
  graph: Map<string, Paths>;
};
type Output1 = number;
type Output2 = number;

export class ProblemSolver extends BaseProblemSolver<Input, Output1, Output2> {
  parseInput1(input: string[]): Input {
    const parseNode = (line: string): [string, Paths] => {
      const [node, left, right] = [...line.matchAll(/([A-Z]){3}/g)].map(regex => regex[0]);
      return [node, { left, right }];
    };

    const instructions = input[0];
    const graph = new Map(
      input
        .slice(2)
        .filter(line => line.length > 0)
        .map(parseNode),
    );

    return { instructions, graph };
  }

  parseInput2(input: string[]): Input {
    return this.parseInput1(input);
  }

  question1(input: Input): Output1 {
    const START = 'AAA';
    const END = 'ZZZ';
    const insts = Array.from(input.instructions);

    let stepCount = 0;
    let cur = START;

    while (cur != END) {
      const inst = insts[stepCount % insts.length];
      stepCount++;
      cur = inst === 'L' ? input.graph.get(cur)!.left : input.graph.get(cur)!.right;
    }
    return stepCount;
  }

  question2(input: Input): Output2 {
    const insts = Array.from(input.instructions);

    const nodes = [...input.graph.keys()].filter(node => node.endsWith('A'));

    // we take advantage of the fact that the chains are cyclical
    const findPeriod = (node: string) => {
      let stepCount = 0;
      let cur = node;
      while (!cur.endsWith('Z')) {
        const inst = insts[stepCount % insts.length];
        stepCount++;
        cur = inst === 'L' ? input.graph.get(cur)!.left : input.graph.get(cur)!.right;
      }

      return stepCount;
    };

    const steps = nodes.map(findPeriod);
    return lcm(steps);
  }
}

function gcd(a: number, b: number) {
  // Calculate the greatest common divisor using Euclidean algorithm
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(numbers: number[]) {
  // Ensure there are at least two numbers in the array
  if (numbers.length < 2) {
    throw new Error('At least two numbers are required to find LCM.');
  }

  // Iterate through the array and calculate LCM pairwise
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = (result * numbers[i]) / gcd(result, numbers[i]);
  }

  return result;
}
