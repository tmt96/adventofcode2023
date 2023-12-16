import { argv } from 'process';
import { BaseProblemSolver } from './BaseProblemSolver';
import { ProblemSolver1 } from './prob_1';
import { ProblemSolver2 } from './prob_2';

const CONSTRUCTOR_ARRAY = [ProblemSolver1, ProblemSolver2];

const day = argv.length > 2 ? parseInt(argv[2], 10) : 1;

const solver: BaseProblemSolver<unknown, unknown, unknown> = new CONSTRUCTOR_ARRAY[day - 1]();
solver.solve();
