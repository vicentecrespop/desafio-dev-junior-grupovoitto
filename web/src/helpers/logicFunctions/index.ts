const getFibonnaciVector = (n: number): number => {
  let i = 2
  let noFibValue = 0
  let noFibTimes = 0
  let skip = 0
  let fib = new Array()
  fib[0] = 0
  fib[1] = 1
  if(fib < 1) {
    console.log('Valores menores que 1 não serão permitidos')
  } else {
    while(fib[i -1] < n + i + 1) {
      fib[i] = fib[i - 2] + fib[i - 1]
      skip = fib[i] - fib[i -1]
      if(skip > 1) {
        for(let j =1; j < skip; j++) {
          if(noFibTimes < n) {
            noFibValue = fib[i - 1] + j
            noFibTimes++
          }
        }
      }
      i++
    }
    return noFibValue
  }
}

export const getNoFibonacciNumber = (n: number): number => {
  const value = getFibonnaciVector(n)
  return value;
};
