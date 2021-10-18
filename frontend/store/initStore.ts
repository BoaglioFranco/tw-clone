import { useStore } from "./store"

export const initStore = (cookies: any) => { //SSR is fun (:
    let {token, user } = cookies;
    useStore.setState({user, token});
}