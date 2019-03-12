const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)

let state = {
    name: null,
    rows: 0,
    columns: 0,
    field: null
}

const mine_sweeper= (bombs, num_Rows, num_Cols)=>{
    let field = []
    const newRow = []
    for(let col = 0; col < num_Cols;col++){
        newRow.push(0)
      }
    for(let row= 0; row < num_Rows;row++){
       field.push([...newRow])
    }
    
    field = makeBombs(field,bombs,num_Rows, num_Cols)
    return field 
  }
  
const makeBombs = (field,bombs, num_Rows, num_Cols) =>{
    for(let bomb of bombs){
      for(let xCoord = bomb[0]-1; xCoord < bomb[0]+2;xCoord++){
        for(let yCoord = bomb[1]-1; yCoord < bomb[1]+2;yCoord++){
          if(yCoord >= 0 && yCoord < num_Cols-1 && xCoord >=0 && xCoord < num_Rows-1) {
            if( field[xCoord][yCoord] !== -1 && field[xCoord][yCoord] !== -1) {field[xCoord][yCoord]++}
          }
        }
      }
      field[bomb[0]][bomb[1]] = -1
    }
    return field
  }

function print_field(given_array){
    console.log('\n')
    for (let row of given_array){
        console.log(row)
    }
    console.log('\n')
}
  
function click(field, num_rows, num_cols, given_i,given_j){
    if(field[given_i][given_j] !== 0) console.log('\n','Oh no a mine, you loose!')
    else console.log('\n','no mine there, you survive!')
    if(field[given_i][given_j] !== 0) return field
    let toExplore = [[given_i,given_j]]
    while(toExplore.length > 0){
      let node = toExplore.shift()
      let currentX = node[0]
      let currentY = node[1]
      field[currentX][currentY] = -2
      for(let x = currentX-1; x <= currentX+1;x++){
        if( x >=0 && x < num_rows){
        for(let y = currentY-1; y <= currentY+1;y++){
          if(y >= 0 && y < num_cols) {
            if( field[x][y] == 0 ) {
              toExplore.push([x,y])
              field[currentX][currentY] = -2
            }
          }
        }
        }
      }
   
    }
    return field
  }

console.log('\n')
console.log('Welcome to Node.js MineSweeper')
console.log('\n')

'use strict'

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is your name?\n ', (answer) => {
      state.name = answer.trim()
      console.log('\n')
      resolve()
    })
  })
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question(`Hi ${state.name},How many columns should the minefield have? \n`, (columnsInput) => {
      state.columns = columnsInput
      resolve()
    })
  })
}

const question3 = () => {
  return new Promise((resolve, reject) => {
      rl.question(`How many rows should the minefield have?\n`,(rowInput) => {
      state.rows = rowInput

            let bombs = []
            for(let i=0; i<= Math.floor(Math.random()*state.rows) + 1;i++){
                bombs.push([Math.floor(Math.random()*state.rows),Math.floor(Math.random()*state.columns)])
            }
    
            state.field = mine_sweeper(bombs,state.rows,state.columns)
            print_field(mine_sweeper([],state.rows,state.columns))

      resolve()
    })
  })
}

const question4 = () => {
  return new Promise((resolve, reject) => {
    rl.question(`Please enter x,y coordinates to guess an empty square:\t`, (guess) => {
      let coords = guess.trim().split(",")
      let xGuess = Number(coords[0])
      let yGuess = Number(coords[1])
      state.field = click(state.field, state.rows, state.columns, xGuess, yGuess )
      print_field(state.field)
      rl.close()
    })
  })
}

const main = async () => {
  await question1()
  await question2()
  await question3()
  await question4()
  rl.close()
}

main()

rl.on('close', function(){
    console.log(`Thanks for playing Node.js Minesweeper! \n`)
})