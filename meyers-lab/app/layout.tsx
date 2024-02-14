import NavHeader from './ui/nav-header'

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
      </body>
    </html>
  );
}