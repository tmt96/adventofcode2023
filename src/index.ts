import { argv } from 'process';
import { BaseProblemSolver } from './BaseProblemSolver';

const day = argv.length > 2 ? parseInt(argv[2], 10) : 1;
const { ProblemSolver } = await import(`./prob_${day}`);
const solver: BaseProblemSolver<unknown, unknown, unknown> = new ProblemSolver(day);
solver.solve();
