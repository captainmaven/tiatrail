import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'TIA Learning Trail | TIA Field Guide',description:'Explore Teacher Incentive Allotment through ten Texas landmark learning stops. Lessons, practice, and your personal field guide.',icons:{icon:'/texas-learning-emblem.png',apple:'/texas-learning-emblem.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
