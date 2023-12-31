import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside

// middleware is run before any page component and is useful for authentication
export function middleware(request) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/createaccount' || path === '/userlogin' || path === '/verifyemail'

    const token = request.cookies.get("token")?.value || ""

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/userlogin', request.nextUrl))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/entertainment',
        '/sports',
        '/science',
        '/technology',
        '/business',
        '/health',
        '/createaccount',
        '/userlogin',
        '/verifyemail',
    ]
}