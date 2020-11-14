const DIRECTIONS = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
};

export class Algorithm {
    constructor(col, row) {

        this._visitedItems = new Set();

        /**
         * List of steps make by the algorithm
         * @type {Array<CellItem>}
         * @private
         */
        this._steps = [];

        this._board = this._createBoard(col, row);

        this._currentHead = this._selectRandomHeadItem();

        this._visitedItems.add(this._currentHead);
    }

    /**
     * Makes a move to a random possible direction on the board;
     */
    move() {
        const direction = this._getRandomDirection();

        const head = this._currentHead;
        const {x, y} = head;
        let cell;

        switch (direction) {
            case DIRECTIONS.UP:
                cell = this._board[x][y - 1];
                break;
            case DIRECTIONS.DOWN:
                cell = this._board[x][y + 1];
                break;
            case DIRECTIONS.LEFT:
                cell = this._board[x - 1][y];
                break;
            case DIRECTIONS.RIGHT:
                cell = this._board[x + 1][y];
                break;

            default:
                cell = this._makePrevItemHead();
                break
        }

        this._visitedItems.add(cell);
        this._steps.push(cell);
        this._changeHead(cell);
    }

    /**
     * Checks whether all cells are visited
     * @returns {boolean}
     */
    isAllItemsVisited() {
        const columns = this._board.length;
        const rows = this._board[0].length;

        return this._visitedItems.size === columns * rows;
    };


    /**
     * Board of cells ( 2 dimensional array)
     * @type {Array<Array<CellItem>>}
     */
    get board() {
        return this._board;
    }


    /**
     * Current cursor (head)
     * @type {CellItem}
     */
    get currentHead() {
        return this._currentHead;
    }

    /**
     * Already visited items
     * @type {Set<CellItem>}
     */
    get visitedItems() {
        return this._visitedItems;
    }

    /** @private*/
    _createBoard(col, row) {
        const board = [];
        for (let i = 0; i < col; i++) {
            const column = [];
            board.push(column);
            for (let j = 0; j < row; j++) {
                column.push(new CellItem(i, j));
            }
        }

        return board;
    }

    /** @private*/
    _selectRandomHeadItem() {
        const randomX = Math.floor(Math.random() * this._board.length);
        const randomY = Math.floor(Math.random() * this._board[0].length);
        return this._board[randomX][randomY];
    }

    /** @private*/
    _isVisited(cell) {
        return this._visitedItems.has(cell);
    }

    /** @private*/
    _changeHead(newHead) {
        this._currentHead = newHead
    }

    /** @private*/
    _getRandomDirection() {
        const possibleDirections = this._getPossibleDirection();
        const index = Math.floor(Math.random() * possibleDirections.length);
        return possibleDirections[index];
    }

    /** @private*/
    _getPossibleDirection() {
        const possibleDirections = {
            [DIRECTIONS.RIGHT]: this._canMoveToDirection(DIRECTIONS.RIGHT),
            [DIRECTIONS.LEFT]: this._canMoveToDirection(DIRECTIONS.LEFT),
            [DIRECTIONS.UP]: this._canMoveToDirection(DIRECTIONS.UP),
            [DIRECTIONS.DOWN]: this._canMoveToDirection(DIRECTIONS.DOWN)
        };

        return Object.keys(possibleDirections).filter(key => possibleDirections[key]);
    }

    /** @private*/
    _canMoveToDirection(direction) {
        const {x, y} = this._currentHead;
        let cell;

        switch (direction) {
            case DIRECTIONS.UP:
                cell = this._board[x][y - 1] && this._board[x][y - 1];
                break;
            case DIRECTIONS.DOWN:
                cell = this._board[x][y + 1] && this._board[x][y + 1];
                break;
            case DIRECTIONS.LEFT:
                cell = this._board[x - 1] && this._board[x - 1][y];
                break;
            case DIRECTIONS.RIGHT:
                cell = this._board[x + 1] && this._board[x + 1][y];
                break;
        }

        return cell && !this._isVisited(cell);
    }

    /** @private*/
    _getPreviousStep() {
        return this._steps.pop();
    };

    /** @private*/
    _makePrevItemHead() {
        let prevCell = this._getPreviousStep();

        if (prevCell === this._currentHead) {
            prevCell = this._getPreviousStep();
        }

        this._changeHead(prevCell);
        return prevCell;
    };
}

class CellItem {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
