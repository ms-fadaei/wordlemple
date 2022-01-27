export function getRandomWord(): string {
  const samples = [
    'ticket',
    'handle',
    'puzzle',
    'store',
    'rocket',
    'phone',
    'truck',
    'screen',
    'stroke',
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
