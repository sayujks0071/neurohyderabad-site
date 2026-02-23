import { myFlag } from '@/flags'

export default async function Page() {
  const enabled = await myFlag()
  return <div>myFlag is {enabled ? 'on' : 'off'}</div>
}
