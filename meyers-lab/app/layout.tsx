'use client';
import NavHeader from './ui/nav-header';
import '@/app/ui/global.css';
import { RecoilRoot } from 'recoil';
import { GlobalStateProvider } from './createContext';
import { recoilPersist } from 'recoil-persist';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      

          
      <html lang="en">
        <body className={`antialiased`}>
          <NavHeader />
          <div>
            {/* <RecoilRoot> */}
            {children}
            {/* </RecoilRoot> */}
          </div>
        </body>
      </html>
        
    </RecoilRoot>
    
  );
}
