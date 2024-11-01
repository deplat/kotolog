import { PetList } from '@/app/admin/_modules/pet-list'
import AvatarToggleLink from '@/app/admin/pets/AvatarToggleLink'

export default async function Pets({
  searchParams,
}: {
  searchParams: Promise<{ withAvatar: boolean }>
}) {
  const query = await searchParams
  const withAvatar = query.withAvatar
  return (
    <div className="flex h-full w-full items-center justify-center">
      <AvatarToggleLink />
      <PetList showAvatars={withAvatar} />
    </div>
  )
}
