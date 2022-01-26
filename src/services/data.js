export function getRandomWord() {
  const samples = [
    'ticket',
    'handle',
    'puzzle',
    'store',
    'rocket',
    'phone',
    'truck',
    'screen',
    'strock',
    'police',
    'sport',
    'socket',
    'track',
    'border',
    'travel',
    'young',
    'window',
  ]

  return samples[new Date().getDate() % samples.length]
}
