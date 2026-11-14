// Arrow Escape – YouTube Playables Complete Game Logic
(function () {
    // 1. YouTube Playables SDK Lifecycle Hooks
    let isYTPlayablesAvailable = typeof ytgame !== 'undefined' && ytgame.game;

    window.addEventListener('load', function () {
        if (isYTPlayablesAvailable) {
            ytgame.game.firstFrameReady();
        }
        initGame();
    });

    // 2. Constants & Data Models
    const Direction = {
        UP: { dx: 0, dy: -1 },
        DOWN: { dx: 0, dy: 1 },
        LEFT: { dx: -1, dy: 0 },
        RIGHT: { dx: 1, dy: 0 }
    };

    let currentLevelIndex = 1;
    let gridWidth = 6;
    let gridHeight = 6;
    let tiles = [];
    let moveHistory = [];
    let moveCount = 0;
    let hintCount = 3;

    // Canvas Element
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    let cellSize = 60;

    // 3. Level Generator (Deterministic 100,000 Levels)
    function generateLevel(levelNumber) {
        let seed = levelNumber * 1664525 + 1013904223;
        function random() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        }

        let size = 6;
        if (levelNumber <= 20) size = 5;
        else if (levelNumber > 1000) size = 7;

        gridWidth = size;
        gridHeight = size;

        let arrowCount = 4 + (levelNumber % 8);
        let directions = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
        let colors = ['#2563EB', '#F59E0B', '#EC4899', '#10B981', '#8B5CF6', '#EF4444'];

        let newTiles = [];
        let idCounter = 1;

        for (let i = 0; i < arrowCount; i++) {
            let x = Math.floor(random() * size);
            let y = Math.floor(random() * size);
            let dir = directions[Math.floor(random() * directions.length)];
            let color = colors[i % colors.length];

            // Prevent duplicate positions
            if (!newTiles.some(t => t.x === x && t.y === y)) {
                newTiles.push({
                    id: idCounter++,
                    x: x,
                    y: y,
                    dir: dir,
                    color: color,
                    escaping: false,
                    animProgress: 0
                });
            }
        }

        return newTiles;
    }

    // 4. Game Initialization
    function initGame() {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        loadLevel(currentLevelIndex);

        // Input Handlers
        canvas.addEventListener('click', handleCanvasClick);
        canvas.addEventListener('touchstart', handleCanvasTouch);

        document.getElementById('btn-undo').addEventListener('click', undoMove);
        document.getElementById('btn-restart').addEventListener('click', () => loadLevel(currentLevelIndex));
        document.getElementById('btn-hint').addEventListener('click', giveHint);

        // Notify YouTube SDK that Game is Ready
        if (isYTPlayablesAvailable) {
            ytgame.game.gameReady();
        }

        requestAnimationFrame(gameLoop);
    }

    function resizeCanvas() {
        let containerW = document.getElementById('canvas-wrapper').clientWidth - 32;
        let containerH = document.getElementById('canvas-wrapper').clientHeight - 32;
        let minDim = Math.min(containerW, containerH, 500);

        canvas.width = minDim;
        canvas.height = minDim;
        cellSize = minDim / gridWidth;
        render();
    }

    function loadLevel(levelNum) {
        currentLevelIndex = levelNum;
        tiles = generateLevel(levelNum);
        moveHistory = [];
        moveCount = 0;
        updateUI();
    }

    function updateUI() {
        document.getElementById('level-title').innerText = 'Bölüm ' + currentLevelIndex;
        document.getElementById('move-count').innerText = moveCount;
        document.getElementById('hint-count').innerText = hintCount;

        let diff = "Başlangıç";
        if (currentLevelIndex > 20) diff = "Kolay";
        if (currentLevelIndex > 100) diff = "Orta";
        if (currentLevelIndex > 500) diff = "Zor";
        if (currentLevelIndex > 2000) diff = "Uzman";
        document.getElementById('diff-tag').innerText = diff;
    }

    // 5. Collision & Escape Logic
    function handleCanvasClick(e) {
        let rect = canvas.getBoundingClientRect();
        let clickX = e.clientX - rect.left;
        let clickY = e.clientY - rect.top;

        let gridX = Math.floor(clickX / cellSize);
        let gridY = Math.floor(clickY / cellSize);

        let clickedTile = tiles.find(t => t.x === gridX && t.y === gridY && !t.escaping);
        if (clickedTile) {
            tryMoveTile(clickedTile);
        }
    }

    function handleCanvasTouch(e) {
        if (e.touches.length > 0) {
            let touch = e.touches[0];
            let rect = canvas.getBoundingClientRect();
            let gridX = Math.floor((touch.clientX - rect.left) / cellSize);
            let gridY = Math.floor((touch.clientY - rect.top) / cellSize);

            let clickedTile = tiles.find(t => t.x === gridX && t.y === gridY && !t.escaping);
            if (clickedTile) {
                tryMoveTile(clickedTile);
            }
        }
    }

    function canEscape(tile) {
        let currX = tile.x + tile.dir.dx;
        let currY = tile.y + tile.dir.dy;

        while (currX >= 0 && currX < gridWidth && currY >= 0 && currY < gridHeight) {
            if (tiles.some(t => t.x === currX && t.y === currY && !t.escaping)) {
                return false; // Path blocked
            }
            currX += tile.dir.dx;
            currY += tile.dir.dy;
        }
        return true; // Path is clear!
    }

    function tryMoveTile(tile) {
        if (canEscape(tile)) {
            moveHistory.push(JSON.parse(JSON.stringify(tiles)));
            tile.escaping = true;
            moveCount++;
            updateUI();

            // Check if level completed
            setTimeout(() => {
                if (tiles.every(t => t.escaping)) {
                    onLevelComplete();
                }
            }, 300);
        }
    }

    function undoMove() {
        if (moveHistory.length > 0) {
            tiles = moveHistory.pop();
            render();
        }
    }

    function giveHint() {
        if (hintCount > 0) {
            let escTile = tiles.find(t => !t.escaping && canEscape(t));
            if (escTile) {
                hintCount--;
                tryMoveTile(escTile);
            }
        }
    }

    function onLevelComplete() {
        // Submit Score to YouTube Playables
        if (isYTPlayablesAvailable && ytgame.score) {
            ytgame.score.sendScore({ score: currentLevelIndex * 100 });
        }

        setTimeout(() => {
            alert('🎉 Tebrikler! Bölüm ' + currentLevelIndex + ' Tamamlandı!');
            loadLevel(currentLevelIndex + 1);
        }, 200);
    }

    // 6. Game Render Loop
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Grid Lines
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        for (let i = 0; i <= gridWidth; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(canvas.width, i * cellSize);
            ctx.stroke();
        }

        // Draw Tiles
        tiles.forEach(tile => {
            if (!tile.escaping) {
                let px = tile.x * cellSize;
                let py = tile.y * cellSize;

                ctx.fillStyle = tile.color;
                ctx.beginPath();
                ctx.roundRect(px + 6, py + 6, cellSize - 12, cellSize - 12, 12);
                ctx.fill();

                // Draw Arrow Head
                ctx.fillStyle = '#FFFFFF';
                ctx.font = Math.floor(cellSize * 0.4) + 'px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                let arrowSymbol = '⬆️';
                if (tile.dir === Direction.DOWN) arrowSymbol = '⬇️';
                if (tile.dir === Direction.LEFT) arrowSymbol = '⬅️';
                if (tile.dir === Direction.RIGHT) arrowSymbol = '➡️';

                ctx.drawString = ctx.fillText(arrowSymbol, px + cellSize / 2, py + cellSize / 2);
            }
        });
    }

    function gameLoop() {
        render();
        requestAnimationFrame(gameLoop);
    }
})();
