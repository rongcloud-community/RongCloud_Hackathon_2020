(function (dependents) {
  var { Thirteen } = dependents;
  var width = 450, tableWidth = 15,
    dWidth = tableWidth * 2,
    gridCount = width / dWidth;;

  var chesses = [], canvas = null, wins = [], winCount = 0;

  var initWins = () => {
    //横排
    for (var i = 0; i < gridCount; i++) {
      for (var j = 0; j < gridCount - 4; j++) {
        for (var k = 0; k < 5; k++) {
          wins[i][j + k][winCount] = 1;
        }
        winCount += 1;
      }
    }

    //竖排
    for (var i = 0; i < gridCount; i++) {
      for (var j = 0; j < gridCount - 4; j++) {
        for (var k = 0; k < 5; k++) {
          wins[j + k][i][winCount] = 1;
        }
        winCount += 1;
      }
    }

    //正斜
    for (var i = 0; i < gridCount - 4; i++) {
      for (var j = 0; j < gridCount - 4; j++) {
        for (var k = 0; k < 5; k++) {
          wins[i + k][j + k][winCount] = 1;
        }
        winCount += 1;
      }
    }

    //反斜
    for (var i = 0; i < gridCount - 4; i++) {
      for (var j = gridCount - 1; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
          wins[i + k][j - k][winCount] = 1;
        }
        winCount += 1;
      }
    }
  };

  function Chess(options) {
    var { el } = options;
    canvas = el.getContext('2d');

    currentWins = [], remoteWins = [], isFinished = false;

    var initChessboard = () => {

      var point = width - tableWidth;

     
      for (var i = 0; i < gridCount; i++) {
        canvas.moveTo(gridCount + i * dWidth, gridCount);
        canvas.lineTo(gridCount + i * dWidth, point);
        canvas.strokeStyle = "#504e4e";
        canvas.stroke();
        canvas.moveTo(gridCount, gridCount + i * dWidth);
        canvas.lineTo(point, gridCount + i * dWidth);
        canvas.stroke();

        chesses[i] = [];
        wins[i] = [];

        for (var j = 0; j < gridCount; j++) {
          chesses[i][j] = 0;
          wins[i][j] = [];
        }
      }

      initWins();

      for (var i = 0; i < winCount; i++) {
        currentWins[i] = 0;
        remoteWins[i] = 0;
      }
    };


    var setPoint = (i, j, isCurrent) => {
      var _wins = isCurrent ? currentWins : remoteWins;
      for (var m = 0; m < winCount; m++) {
        if (wins[i][j][m]) {
          _wins[m] += 1;
          if (_wins[m] == 5) {
            isFinished = true;
          }
        }
      }
    };
    var play = function (x, y, isCurrent) {
      var i = Math.floor(x / dWidth);
      var j = Math.floor(y / dWidth);

      // 已选中直接返回
      if (chesses[i][j] == 1) {
        return;
      }
      chesses[i][j] = 1;
      setPoint(i, j, isCurrent);

      canvas.beginPath();
      canvas.arc(tableWidth + i * dWidth, tableWidth + j * dWidth, 13, 0, 2 * Math.PI);
      canvas.closePath();

      var x0 = tableWidth + i * dWidth + 2,
        y0 = tableWidth + j * dWidth - 2,
        x1 = x0, y1 = y0, r0 = 13, r1 = 0;
      var gradient = canvas.createRadialGradient(x0, y0, r0, x1, y1, r1);

      var color0 = '#000000', color1 = '#898F8D';
      if (!isCurrent) {
        color0 = '#DFDBDB';
        color1 = '#F9F9F8';
      }
      gradient.addColorStop(0, color0);
      gradient.addColorStop(1, color1);

      canvas.fillStyle = gradient;
      canvas.fill();

      return isFinished;
    }

    el.onclick = function (event) {
      var x = event.offsetX;
      var y = event.offsetY;
      
      if(!isFinished){
        var isGameover = play(i, j, true);
        if(isGameover){
          console.log('====================')
        }
      }
    };
    initChessboard();

    this.play = play;
  }
  Thirteen.Chess = Chess;
})({
  Thirteen
})