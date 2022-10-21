let timerId: number = 0


export const runTimer = (initialSeconds: number, onTick: any, onFinish: any, duration: number): void => {
  clearTimeout(timerId)

  let seconds: number = initialSeconds

  timerId = setTimeout(function recursive() {
    console.log(seconds, duration)

    if (seconds > duration) {
      //console.log('>')
      clearTimeout(timerId)
      onFinish()
      return
    } else {
      //console.log('<')
      clearTimeout(timerId)
      ++seconds
      onTick(seconds)
      timerId = setTimeout(recursive, 1000)
    }

  }, 1000)
}

export const stopTimer = (): void => {
  clearTimeout(timerId)
}
