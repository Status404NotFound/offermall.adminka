export default function guest ({ next, store }){
    if(store.getters.isLoggedIn){
        return next({
            name: 'Admin'
        })
    }
    return next()
}