import NavHeader from './ui/nav-header'
import Footer from './ui/footer'
import '@/app/ui/global.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NavHeader />
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}