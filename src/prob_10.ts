import { BaseProblemSolver } from './BaseProblemSolver';

type Input = string[];
type Output1 = number;
type Output2 = number;

enum Direction {
  North = 'North',
  East = 'East',
  South = 'South',
  West = 'West',
}

type Position = {
  x: number;
  y: number;
};

export class ProblemSolver extends BaseProblemSolver<Input, Output1, Output2> {
  parseInput1(input: string[]): Input {
    return input.filter(line => line.length > 0);
  }

  parseInput2(input: string[]): Input {
    return this.parseInput1(input);
  }

  private findNeighbor(position: Position, direction: Direction): Position {
    switch (direction) {
      case Direction.North:
        return { x: position.x, y: position.y - 1 };
      case Direction.East:
        return { x: position.x + 1, y: position.y };
      case Direction.South:
        return { x: position.x, y: position.y + 1 };
      case Direction.West:
        return { x: position.x - 1, y: position.y };
    }
  }

  private findDirectionFromPos(position: Position, curDirection: Direction, grid: Input): Direction | null {
    switch (curDirection) {
      case Direction.North:
        switch (grid[position.y][position.x]) {
          case '|':
            return Direction.North;
          case '7':
            return Direction.West;
          case 'F':
            return Direction.East;
          default:
            return null;
        }
      case Direction.East:
        switch (grid[position.y][position.x]) {
          case '-':
            return Direction.East;
          case '7':
            return Direction.South;
          case 'J':
            return Direction.North;
          default:
            return null;
        }
      case Direction.South:
        switch (grid[position.y][position.x]) {
          case '|':
            return Direction.South;
          case 'J':
            return Direction.West;
          case 'L':
            return Direction.East;
          default:
            return null;
        }
      case Direction.West:
        switch (grid[position.y][position.x]) {
          case '-':
            return Direction.West;
          case 'L':
            return Direction.North;
          case 'F':
            return Direction.South;
          default:
            return null;
        }
    }
  }

  private findLoop(input: Input): Position[] {
    let startingPoint: Position = { x: 0, y: 0 };

    // find starting point
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[0].length; x++) {
        if (input[y][x] == 'S') {
          startingPoint = { x, y };
          break;
        }
      }
    }

    let curPos = startingPoint;
    let curDirection = Direction.North;
    const result = [];

    for (const directionStr in Direction) {
      const direction = directionStr as Direction;
      const neighbor = this.findNeighbor(startingPoint, direction);
      if (this.findDirectionFromPos(neighbor, direction, input)) {
        curDirection = direction;
        break;
      }
    }

    do {
      curPos = this.findNeighbor(curPos, curDirection);
      curDirection = this.findDirectionFromPos(curPos, curDirection, input) ?? Direction.North;
      result.push(curPos);
    } while (input[curPos.y][curPos.x] !== 'S');

    return result;
  }

  question1(input: Input): Output1 {
    return this.findLoop(input).length / 2;
  }

  question2(input: Input): Output2 {
    const loop = this.findLoop(input);
    const n = loop.length;

    // Shoelace theorem to find the area of the polygon
    let area = 0;
    for (let i = 1; i < n; i++) {
      area += (loop[i - 1].y + loop[i].y) * (loop[i - 1].x - loop[i].x);
    }
    area /= 2;

    // Pick's theorem: A = i + b/2 - 1, with i number of interior points and b number of boundary points
    return area + 1 - n / 2;
  }
}
