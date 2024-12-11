import Link from 'next/link'

const wishes = [
  {
    id: 'r3qrq23',
    name: 'Kocherga',
    description: 'Nuzhna kocherga, ochen.',
    link: 'https://kocherga.pl/',
  },
  {
    id: 'f2qf2q2',
    name: 'Tarelka',
    description: 'Nuzhna tarelka, ochen.',
    link: 'https://tarelka.cn',
  },
]

export default async function Page() {
  return (
    <div className="mx-auto max-w-4xl px-2 py-10">
      <h1 className="mb-2 px-2 text-3xl">Список нужного</h1>
      <ul className="flex w-full flex-col gap-4">
        {wishes.map((wish, index) => (
          <li key={index} className="rounded bg-stone-100 p-3">
            <div className="mb-2 text-2xl">{wish.name}</div>
            <div className="mb-2">{wish.description}</div>
            <Link href={wish.link} className="text-orange-600">
              {wish.link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
