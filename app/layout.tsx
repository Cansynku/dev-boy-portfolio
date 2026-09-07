import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://javier-cano-dev-boy.jcanogarcia96.chatgpt.site'),
  title: 'Javier Cano | Backend Developer · Dev Boy',
  description: 'Mi experiencia en Java, Spring Boot, APIs REST y microservicios, dentro de una consola interactiva. Explora mi perfil y descarga mi CV.',
  alternates: {canonical: '/'},
  openGraph: {type:'website',locale:'es_ES',url:'/',siteName:'Javier Cano · Dev Boy',title:'Javier Cano · Portfolio Backend Java',description:'Una consola interactiva para explorar mi experiencia, tecnologías y CV. Java · Spring Boot · AWS.'},
  twitter: {card:'summary',title:'Javier Cano · Portfolio Backend Java',description:'Explora mi experiencia y CV en una consola interactiva.'},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es"><body>{children}</body></html>;}
