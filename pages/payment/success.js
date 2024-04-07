import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Success() {
    const router = useRouter();

    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Your payment was successful. Thank you for your purchase!</p>
            <Link href="/">Return to Home</Link>
        </div>
    );
}