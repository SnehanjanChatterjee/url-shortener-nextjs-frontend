import NextAuth from "next-auth"
import Google from "@auth/core/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        session({ session, token }) {
            // When implementing your account management system, you shouldn't use the email field in the ID token as a unique identifier for a user.
            // Always use the sub field as it is unique to a Google Account even if the user changes their email address.
            // sub (official doc definition) - An identifier for the user, unique among all Google accounts and never reused.
            // A Google account can have multiple email addresses at different points in time, but the sub value is never changed.
            // Use sub within your application as the unique-identifier key for the user. Maximum length of 255 case-sensitive ASCII characters.
            // References:
            // https://developers.google.com/identity/openid-connect/openid-connect
            // https://stackoverflow.com/questions/77563686/is-sub-value-of-oauth2-0-id-token-constant
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            console.log("Inside auth.ts session callback, token:", token);
            console.log("Inside auth.ts session callback, session:", session);
            return session;
        }
    },
})