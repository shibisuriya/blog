import { redirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Series' })

export default function Page() {
  redirect('/series/how-to-manage-dotfiles')
}
