import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getToken } from '@/lib/token';

const PUBLIC_PATHS = ['/auth/login', '/', '/_error', '/auth/register', '/services', '/about', '/contact'];

export default function RouteGuard(props) {

    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routerChangeComplete', authCheck);
        };
    }, []);

    function isAuthenticated() {
        return getToken() !== null;
    }

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/auth/login');
        }
        else {
            setAuthorized(true);
        }
    }



    return <>{authorized === true && props.children} </>
}