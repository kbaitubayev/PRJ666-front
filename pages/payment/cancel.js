import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Cancel() {
    const router = useRouter();

    return (
        <div>
            <h1>Payment Cancelled</h1>
            <p>You have cancelled your payment.</p>
            <Link href="/">Return to Home</Link>
        </div>
    );
}