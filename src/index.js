import {Renderer} from './Renderer'
import {Algorithm} from './Algorithm'

//*** CONFIG ***//
const ROWS = 20;
const COLUMNS = 20;
const UPDATE_TIMEOUT = 200;
//*** CONFIG ***//

const algorithm = new Algorithm(COLUMNS, ROWS);
const renderer = new Renderer();
renderer.drawInitialBoard(algorithm.board);
renderer.updateBoard(algorithm.board, algorithm.visitedItems, algorithm.currentHead);


const makeStepForward = algorithm => {
    if (algorithm.isAllItemsVisited()) {
        alert('complete')
    } else {
        algorithm.move();
        renderer.updateBoard(algorithm.board, algorithm.visitedItems, algorithm.currentHead);
        makeNextStep();
    }
}

const makeNextStep = () => setTimeout(() => makeStepForward(algorithm), UPDATE_TIMEOUT);

makeNextStep();
