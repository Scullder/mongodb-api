import Header from '@/components/Header'

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
