import styles from '@/app/landing.module.css'
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="static">
      <div className="absolute top-40 left-60">
        <p>Welcome</p>
      </div>
      <div className="absolute top-80 left-60">
        <p>Follow a few simple steps to get the energy usage of each of your appliances.</p>
      </div>
      <Link href="/step-1">
        <button className="absolute bottom-72 left-60">Get started</button>
      </Link>
    </div>
  );
}
