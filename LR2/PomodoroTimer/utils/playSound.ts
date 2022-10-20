import Sound from 'react-native-sound'

Sound.setCategory('Playback')


export const playSound = (): void => {
  const whoosh: Sound = new Sound('' +
    'finish.wav',
    Sound.MAIN_BUNDLE,
    (error): void => {
      error && console.log('failed to load the sound', error)
      whoosh.play((success: boolean): void => {
        if (success) console.log('successfully finished playing')
        else console.log('playback failed due to audio decoding errors')
      })
    }
  )
}
