import Sound from 'react-native-sound'

Sound.setCategory('Playback')

export const playBeep = (): void => {
  const beep: Sound = new Sound('beep.mp3',
    Sound.MAIN_BUNDLE,
    (error): void => {
      error && console.log('failed to load the sound', error)

      beep.play((success: boolean): void => {
        if (success) {
          console.log('successfully finished playing beep')
        }
        else console.log('playback failed due to audio decoding errors')
      })
    }
  )
}
