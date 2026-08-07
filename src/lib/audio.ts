/**
 * Web Speech API Text-to-Speech Synthesizer
 * Plays native English pronunciation for difficult vocabulary and practice sentences.
 */
export function speakText(text: string, rate: number = 0.85) {
  if (!('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.')
    return
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = rate
  utterance.pitch = 1.0
  utterance.lang = 'en-US'

  // Try to pick a high quality native voice if available
  const voices = window.speechSynthesis.getVoices()
  const nativeVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')))
  if (nativeVoice) utterance.voice = nativeVoice

  window.speechSynthesis.speak(utterance)
}
