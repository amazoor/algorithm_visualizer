import {Application, Container, Graphics} from 'pixi.js';

const CELL_SIZE = 20;
const PADDING = 1;

export class Renderer {
    constructor() {
        this.app = new Application({backgroundColor:0xFFFFFF});
        document.body.appendChild(this.app.view);
        this.mainContainer = new Container();
        this.app.stage.addChild(this.mainContainer);
    }

    drawInitialBoard(board) {
        board.forEach(col => {
            const columnContainer = new Container();
            this.mainContainer.addChild(columnContainer);
            col.forEach(item => {
                const {x, y} = item;
                const square = new Graphics();
                square.beginFill(0xcc00cc)
                square.drawRect(0, 0, CELL_SIZE, CELL_SIZE);
                square.endFill();
                square.position.set(x * (square.width + PADDING), y * (square.height + PADDING));
                columnContainer.addChild(square);
            })
        });

        this.app.renderer.resize(this.mainContainer.width, this.mainContainer.height);
    }

    updateBoard(board, visitedItems, head) {
        visitedItems.forEach(cell => {
            const square = this.mainContainer.children[cell.x].children[cell.y];
            square.clear();
            square.beginFill(0xFFFFFF);
            square.drawRect(0, 0, CELL_SIZE, CELL_SIZE);
            square.endFill();

        });

        const headCell = this.mainContainer.children[head.x].children[head.y];
        headCell.clear();
        headCell.beginFill(0x000000);
        headCell.drawRect(0, 0, CELL_SIZE, CELL_SIZE);
        headCell.endFill();
    }

}
