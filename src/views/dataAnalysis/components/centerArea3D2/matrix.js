// 转置矩阵
export function transpose(matrix) {
  let result = new Array(matrix.length).fill(0).map((arr) => new Array(matrix[0].length).fill(0))
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
      result[i][j] = matrix[j][i]
    }
  }
  return result
}
// 行列式
export function det(square) {
  // 方阵约束
  if (square.length !== square[0].length) {
    throw new Error()
  }
  // 方阵阶数
  let n = square.length

  let result = 0
  if (n > 3) {
    // n 阶
    for (let column = 0; column < n; column++) {
      // 去掉第 0 行第 column 列的矩阵
      let matrix = new Array(n - 1).fill(0).map((arr) => new Array(n - 1).fill(0))
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1; j++) {
          if (j < column) {
            matrix[i][j] = square[i + 1][j]
          } else {
            matrix[i][j] = square[i + 1][j + 1]
          }
        }
      }
      result += square[0][column] * Math.pow(-1, 0 + column) * det(matrix)
    }
  } else if (n === 3) {
    // 3 阶
    result =
      square[0][0] * square[1][1] * square[2][2] +
      square[0][1] * square[1][2] * square[2][0] +
      square[0][2] * square[1][0] * square[2][1] -
      square[0][2] * square[1][1] * square[2][0] -
      square[0][1] * square[1][0] * square[2][2] -
      square[0][0] * square[1][2] * square[2][1]
  } else if (n === 2) {
    // 2 阶
    result = square[0][0] * square[1][1] - square[0][1] * square[1][0]
  } else if (n === 1) {
    // 1 阶
    result = square[0][0]
  }
  return result
}
// 伴随矩阵
export function adjoint(square) {
  // 方阵约束
  if (square[0].length !== square.length) {
    throw new Error()
  }

  let n = square.length

  let result = new Array(n).fill(0).map((arr) => new Array(n).fill(0))
  for (let row = 0; row < n; row++) {
    for (let column = 0; column < n; column++) {
      // 去掉第 row 行第 column 列的矩阵
      let matrix = []
      for (let i = 0; i < square.length; i++) {
        if (i !== row) {
          let arr = []
          for (let j = 0; j < square.length; j++) {
            if (j !== column) {
              arr.push(square[i][j])
            }
          }
          matrix.push(arr)
        }
      }
      result[row][column] = Math.pow(-1, row + column) * det(matrix)
    }
  }
  return transpose(result)
}
// 逆矩阵
export function inv(square) {
  if (square[0].length !== square.length) {
    throw new Error()
  }
  let detValue = det(square)
  let result = adjoint(square)

  console.log(JSON.stringify(detValue))
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length; j++) {
      result[i][j] /= detValue
    }
  }
  return result
}
// 矩阵相乘
export function multiply(a, b) {
  // 相乘约束
  if (a[0].length !== b.length) {
    throw new Error()
  }
  let m = a.length
  let p = a[0].length
  let n = b[0].length

  // 初始化 m*n 全 0 二维数组
  let c = new Array(m).fill(0).map((arr) => new Array(n).fill(0))

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < p; k++) {
        c[i][j] += a[i][k] * b[k][j]
      }
    }
  }

  return c
}


export function rotate3d(alpha, beta, gamma){
  const reg = [[], [], []]
  const { sin, cos } = Math;
  reg[0][0] = cos(beta) * cos(gamma);
  reg[0][1] = cos(beta) * sin(gamma);
  reg[0][2] = -sin(beta);
  reg[1][0] = sin(alpha) * sin(beta) * cos(gamma) - cos(alpha) * sin(gamma);
  reg[1][1] = sin(alpha) * sin(beta) * sin(gamma) + cos(alpha) * cos(gamma);
  reg[1][2] = sin(alpha) * cos(beta);
  reg[2][0] = cos(alpha) * sin(beta) * cos(gamma) + sin(alpha) * sin(gamma);
  reg[2][1] = cos(alpha) * sin(beta) * sin(gamma) - sin(alpha) * cos(gamma);
  reg[2][2] = cos(alpha) * cos(beta);
  return reg;
}