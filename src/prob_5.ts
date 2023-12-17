import { BaseProblemSolver } from './BaseProblemSolver';

type Range = {
  src: number;
  dst: number;
  length: number;
};
type Mapping = Range[];
type Almanac = {
  seeds: number[];
  mappings: Mapping[];
};

type Input = Almanac;
type Output1 = number;
type Output2 = number;

export class ProblemSolver extends BaseProblemSolver<Input, Output1, Output2> {
  parseInput1(input: string[]): Input {
    // parse seeds
    const seeds = input[0]
      .split(':')[1]
      .trim()
      .split(' ')
      .map(seed => parseInt(seed, 10));

    // parse mappings
    const mappings: Mapping[] = [];
    let curMap: Mapping = [];
    for (const line of input.slice(2)) {
      if (line.length == 0) {
        // finish one mapping
        mappings.push(curMap);
        curMap = [];
        continue;
      }

      if (line[0].match(/[\d]/)) {
        const [dst, src, length] = line
          .trim()
          .split(' ')
          .map(num => parseInt(num, 10));
        curMap.push({ src, dst, length });
      }
    }

    return { seeds, mappings };
  }

  parseInput2(input: string[]): Input {
    return this.parseInput1(input);
  }

  private findLocation(seed: number, mappings: Mapping[]) {
    const map = (index: number, mapping: Mapping) => {
      for (const range of mapping) {
        if (index >= range.src && index < range.src + range.length) {
          return range.dst + (index - range.src);
        }
      }
      return index;
    };

    return mappings.reduce(map, seed);
  }

  question1({ seeds, mappings }: Input): Output1 {
    return Math.min(...seeds.map(seed => this.findLocation(seed, mappings)));
  }

  question2({ seeds, mappings }: Input): Output2 {
    let minLoc = Infinity;
    for (let i = 0; i < seeds.length; i += 2) {
      const start = seeds[i];
      const end = seeds[i] + seeds[i + 1];

      for (let seed = start; seed < end; seed++) {
        const loc = this.findLocation(seed, mappings);
        if (loc < minLoc) {
          minLoc = loc;
        }
      }
    }
    return minLoc;
  }
}
