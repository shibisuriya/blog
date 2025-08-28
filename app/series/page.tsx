import { redirect } from 'next/navigation'

export default function Page({ children }) {
  redirect('/series/how-to-manage-dotfiles')
}
