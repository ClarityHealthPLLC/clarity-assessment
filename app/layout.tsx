import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Free Mental Health & ADHD Screening | Clarity Health PLLC',
  description: 'Take our free 5-minute screening assessment for depression, anxiety, stress, and ADHD. Get your personalised results instantly from Clarity Health PLLC.',
  openGraph: {
    title: 'Free Mental Health & ADHD Screening | Clarity Health PLLC',
    description: 'Understand your brain in 5 minutes. Free screening for ADHD, depression, anxiety, and stress.',
    url: 'https://assess.clarityhealth.vip',
    siteName: 'Clarity Health PLLC',
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
