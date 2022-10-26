import Sound from 'react-native-sound'

Sound.setCategory('Playback')


export const playPomodoroIsOverSound = (): void => {
  const music: Sound = new Sound('finish.wav',
    Sound.MAIN_BUNDLE,
    (error): void => {
      error && console.log('failed to load the sound', error)

      music.play((success: boolean): void => {
        if (success) {
          console.log('successfully finished playing')

          const voice: Sound = new Sound('timeout.mp3',
            Sound.MAIN_BUNDLE,
            (error): void => {
              error && console.log('failed to load the sound', error)

              voice.play((success: boolean): void => {
                if (success) {
                  console.log('successfully finished playing')
                }
                else console.log('playback failed due to audio decoding errors')
              })
            }
          )
        }
        else console.log('playback failed due to audio decoding errors')
      })
    }
  )
}
