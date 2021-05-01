export default function auth({next, store}) {
    if (!store.getters.isLoggedIn) {
        return next({
            name: 'login'
        })
    }
    return next()
}